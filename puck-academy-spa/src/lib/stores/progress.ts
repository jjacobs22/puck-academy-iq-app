// Core progress store - tracks scenario completion, scores, and streaks
import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import {
  loadProgress,
  saveProgress,
  loadModuleScores,
  saveScenarioScore as persistScore,
  updateStreak as persistStreak,
  type Progress,
  type ModuleScores
} from '../services/storage';

// Module configuration
export interface ModuleInfo {
  name: string;
  total: number;
  icon: string;
}

export const MODULE_CONFIG: Record<number, ModuleInfo> = {
  1: { name: 'Defensive Zone', total: 7, icon: '🛡️' },
  2: { name: 'Faceoffs', total: 7, icon: '⚔️' },
  3: { name: 'Breakouts', total: 7, icon: '🚀' },
  4: { name: 'Offensive Zone', total: 7, icon: '🎯' },
  5: { name: 'Forechecking', total: 8, icon: '🔥' },
  6: { name: 'D-Zone for Defensemen', total: 7, icon: '🏒' }
};

// Default progress for SSR
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

// ============ Main Progress Store ============

function createProgressStore() {
  // Only load from localStorage in browser
  const initial = browser ? loadProgress() : defaultProgress;
  const { subscribe, set, update } = writable<Progress>(initial);

  return {
    subscribe,
    set: (value: Progress) => {
      set(value);
      saveProgress(value);
    },
    update: (fn: (p: Progress) => Progress) => {
      update(p => {
        const updated = fn(p);
        saveProgress(updated);
        return updated;
      });
    },
    // Convenience methods
    setPosition: (position: string) => {
      update(p => {
        p.position = position;
        saveProgress(p);
        return p;
      });
    },
    setCurrentModule: (moduleId: number) => {
      update(p => {
        p.currentModule = moduleId;
        saveProgress(p);
        return p;
      });
    },
    markScenarioComplete: (scenarioKey: string) => {
      update(p => {
        if (!p.completedScenarios.includes(scenarioKey)) {
          p.completedScenarios.push(scenarioKey);
          saveProgress(p);
        }
        return p;
      });
    }
  };
}

export const progress = createProgressStore();

// ============ Module Scores Store ============

const defaultModuleScores: ModuleScores = {
  currentRun: {},
  bestScore: 0,
  attempts: []
};

function createModuleScoresStore() {
  // Store scores for all modules
  const stores = new Map<number, ReturnType<typeof writable<ModuleScores>>>();

  function getStore(moduleId: number) {
    if (!stores.has(moduleId)) {
      // Only load from localStorage in browser
      const initial = browser ? loadModuleScores(moduleId) : defaultModuleScores;
      stores.set(moduleId, writable(initial));
    }
    return stores.get(moduleId)!;
  }

  return {
    getScores: (moduleId: number) => {
      return getStore(moduleId);
    },
    saveScore: (moduleId: number, scenarioId: number, correct: boolean) => {
      persistScore(moduleId, scenarioId, correct);
      const store = getStore(moduleId);
      store.update(s => {
        s.currentRun[scenarioId] = correct;
        s.bestScore = Math.max(s.bestScore, Object.values(s.currentRun).filter(Boolean).length);
        return s;
      });

      // Also update the progress store
      progress.markScenarioComplete(`module${moduleId}-scenario${scenarioId}`);
    }
  };
}

export const moduleScores = createModuleScoresStore();

// ============ Derived Stores ============

// Current module progress
export const currentModuleProgress = derived(
  progress,
  $progress => {
    const moduleId = $progress.currentModule;
    const config = MODULE_CONFIG[moduleId];
    const completed = $progress.completedScenarios.filter(
      s => s.startsWith(`module${moduleId}-`)
    ).length;

    return {
      moduleId,
      completed,
      total: config?.total || 7,
      percentage: config ? Math.round((completed / config.total) * 100) : 0
    };
  }
);

// Streak count
export const streakCount = derived(progress, $p => $p.streak.count);

// All modules progress
export const allModulesProgress = derived(progress, $progress => {
  return Object.entries(MODULE_CONFIG).map(([id, config]) => {
    const moduleId = parseInt(id);
    const completed = $progress.completedScenarios.filter(
      s => s.startsWith(`module${moduleId}-`)
    ).length;

    return {
      moduleId,
      name: config.name,
      icon: config.icon,
      completed,
      total: config.total,
      percentage: Math.round((completed / config.total) * 100),
      isComplete: completed === config.total
    };
  });
});

// Next incomplete scenario
export const nextScenario = derived(progress, $progress => {
  for (const [id, config] of Object.entries(MODULE_CONFIG)) {
    const moduleId = parseInt(id);
    for (let scenarioId = 1; scenarioId <= config.total; scenarioId++) {
      const key = `module${moduleId}-scenario${scenarioId}`;
      if (!$progress.completedScenarios.includes(key)) {
        return { moduleId, scenarioId, key };
      }
    }
  }
  return null; // All complete
});

// ============ Streak Actions ============

export function recordActivity() {
  const result = persistStreak();
  if (result.isNew) {
    progress.update(p => {
      p.streak.count = result.count;
      return p;
    });
  }
  return result;
}
