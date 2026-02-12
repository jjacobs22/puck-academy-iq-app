// localStorage + Supabase sync layer
// Optimistic local-first, background sync to server

import { browser } from '$app/environment';
import { supabase, saveScoreToServer, syncProgressToServer } from './supabase';
import { user } from '../stores/auth';
import { get } from 'svelte/store';

const STORAGE_KEYS = {
  progress: 'puckAcademy_progress',
  moduleScores: (moduleId: number) => `puckAcademy_module${moduleId}_scores`,
  introSeen: 'puckAcademy_introSeen',
  justCompleted: (moduleId: number) => `puckAcademy_module${moduleId}_justCompleted`
};

// ============ Progress ============

export interface Progress {
  position: string;
  level: string;
  goals: string[];
  completedScenarios: string[];
  currentModule: number;
  streak: {
    count: number;
    lastTrainingDate: string;
    bestStreak: number;
    milestonesSeen: number[];
  };
}

const defaultProgress: Progress = {
  position: 'center',
  level: '',
  goals: [],
  completedScenarios: [],
  currentModule: 1,
  streak: {
    count: 0,
    lastTrainingDate: '',
    bestStreak: 0,
    milestonesSeen: []
  }
};

export function loadProgress(): Progress {
  if (!browser) return defaultProgress;
  
  const stored = localStorage.getItem(STORAGE_KEYS.progress);
  if (stored) {
    return JSON.parse(stored);
  }
  return defaultProgress;
}

export function saveProgress(progress: Progress): void {
  if (!browser) return;
  
  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progress));

  // Background sync to server if logged in
  const currentUser = get(user);
  if (currentUser) {
    syncProgressToServer(currentUser.id, progress).catch(err => {
      console.warn('Progress sync failed, local data preserved:', err);
    });
  }
}

// ============ Module Scores ============

export interface ModuleScores {
  currentRun: Record<number, boolean>;
  bestScore: number;
  attempts: Array<{ score: number; timestamp: string }>;
}

const defaultModuleScores: ModuleScores = {
  currentRun: {},
  bestScore: 0,
  attempts: []
};

export function loadModuleScores(moduleId: number): ModuleScores {
  if (!browser) return defaultModuleScores;
  
  const stored = localStorage.getItem(STORAGE_KEYS.moduleScores(moduleId));
  if (stored) {
    return JSON.parse(stored);
  }
  return { ...defaultModuleScores };
}

export function saveScenarioScore(moduleId: number, scenarioId: number, correct: boolean): void {
  if (!browser) return;
  
  const scores = loadModuleScores(moduleId);
  scores.currentRun[scenarioId] = correct;

  // Update best score
  const currentScore = Object.values(scores.currentRun).filter(Boolean).length;
  scores.bestScore = Math.max(scores.bestScore, currentScore);

  localStorage.setItem(STORAGE_KEYS.moduleScores(moduleId), JSON.stringify(scores));

  // Background sync to server
  const currentUser = get(user);
  if (currentUser) {
    saveScoreToServer(currentUser.id, moduleId, scenarioId, correct).catch(err => {
      console.warn('Score sync failed, local data preserved:', err);
    });
  }
}

const MODULE_IDS = [1, 2, 3, 4, 5, 6] as const;

/**
 * Push all scenario completions from localStorage into the progress table.
 * Returns { count, error } so callers can show feedback.
 */
export async function syncLocalScoresToServer(userId: string): Promise<{ count: number; error?: string }> {
  if (!browser) return { count: 0 };
  const promises: { scenarioId: number; moduleId: number; correct: boolean }[] = [];
  for (const moduleId of MODULE_IDS) {
    const scores = loadModuleScores(moduleId);
    for (const [scenarioIdStr, correct] of Object.entries(scores.currentRun)) {
      const scenarioId = parseInt(scenarioIdStr, 10);
      if (Number.isNaN(scenarioId) || typeof correct !== 'boolean') continue;
      promises.push({ moduleId, scenarioId, correct });
    }
  }
  let count = 0;
  let firstError: string | undefined;
  for (const { moduleId, scenarioId, correct } of promises) {
    const { error } = await saveScoreToServer(userId, moduleId, scenarioId, correct);
    if (error) {
      if (!firstError) firstError = error.message ?? String(error);
      console.warn('Backfill score sync failed:', error);
    } else {
      count++;
    }
  }
  return { count, error: firstError };
}

export function resetModuleScores(moduleId: number): void {
  if (!browser) return;
  
  const scores = loadModuleScores(moduleId);

  // Save current run to attempts
  const currentScore = Object.values(scores.currentRun).filter(Boolean).length;
  if (Object.keys(scores.currentRun).length > 0) {
    scores.attempts.push({ score: currentScore, timestamp: new Date().toISOString() });
  }

  // Reset current run
  scores.currentRun = {};

  localStorage.setItem(STORAGE_KEYS.moduleScores(moduleId), JSON.stringify(scores));
}

// ============ Streak ============

export function updateStreak(): { count: number; isNew: boolean; milestone: number | null } {
  const progress = loadProgress();
  const today = new Date().toISOString().split('T')[0];
  const lastDate = progress.streak.lastTrainingDate;

  let isNew = false;
  let milestone: number | null = null;

  if (lastDate === today) {
    // Already trained today
    return { count: progress.streak.count, isNew: false, milestone: null };
  }

  if (lastDate) {
    const lastDateObj = new Date(lastDate);
    const todayObj = new Date(today);
    const diffDays = Math.floor((todayObj.getTime() - lastDateObj.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Streak continues
      progress.streak.count += 1;
      isNew = true;
    } else {
      // Streak broken
      progress.streak.count = 1;
      isNew = true;
    }
  } else {
    // First training
    progress.streak.count = 1;
    isNew = true;
  }

  progress.streak.lastTrainingDate = today;
  progress.streak.bestStreak = Math.max(progress.streak.bestStreak, progress.streak.count);

  // Check milestones
  const milestones = [3, 7, 14, 30, 50, 100];
  for (const m of milestones) {
    if (progress.streak.count === m && !progress.streak.milestonesSeen.includes(m)) {
      progress.streak.milestonesSeen.push(m);
      milestone = m;
      break;
    }
  }

  saveProgress(progress);

  return { count: progress.streak.count, isNew, milestone };
}

export function isStreakAtRisk(): boolean {
  const progress = loadProgress();
  const today = new Date().toISOString().split('T')[0];
  return progress.streak.lastTrainingDate !== today && progress.streak.count > 0;
}

// ============ Theory Intro ============

export function hasSeenIntro(moduleId: number): boolean {
  if (!browser) return false;
  
  const seen = localStorage.getItem(STORAGE_KEYS.introSeen);
  if (!seen) return false;
  const seenModules: number[] = JSON.parse(seen);
  return seenModules.includes(moduleId);
}

export function markIntroSeen(moduleId: number): void {
  if (!browser) return;
  
  const seen = localStorage.getItem(STORAGE_KEYS.introSeen);
  const seenModules: number[] = seen ? JSON.parse(seen) : [];
  if (!seenModules.includes(moduleId)) {
    seenModules.push(moduleId);
    localStorage.setItem(STORAGE_KEYS.introSeen, JSON.stringify(seenModules));
  }
}

// ============ Module Completion ============

export function setModuleJustCompleted(moduleId: number, score: number): void {
  if (!browser) return;
  
  localStorage.setItem(
    STORAGE_KEYS.justCompleted(moduleId),
    JSON.stringify({ score, timestamp: new Date().toISOString() })
  );
}

export function getModuleJustCompleted(moduleId: number): { score: number } | null {
  if (!browser) return null;
  
  const data = localStorage.getItem(STORAGE_KEYS.justCompleted(moduleId));
  if (data) {
    const parsed = JSON.parse(data);
    localStorage.removeItem(STORAGE_KEYS.justCompleted(moduleId)); // Clear after reading
    return parsed;
  }
  return null;
}
