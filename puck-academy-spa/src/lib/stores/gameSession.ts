// Game session store — XP, combo, speed bonuses, and Hockey IQ Rating
import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';

// ============ XP System ============

const BASE_XP = 100;

export const sessionXP = writable(0);
export const combo = writable(0); // consecutive correct answers
export const lastXPGain = writable<{ base: number; speed: number; combo: number; total: number } | null>(null);

export function awardXP(answerTimeSeconds: number): { base: number; speed: number; combo: number; total: number } {
  const currentCombo = get(combo);

  // Speed bonus
  let speedBonus = 0;
  if (answerTimeSeconds < 4) speedBonus = 25;
  else if (answerTimeSeconds < 7) speedBonus = 10;

  // Combo multiplier (1x, 1.5x, 2x, 2.5x, 3x max)
  const multiplier = Math.min(1 + currentCombo * 0.5, 3);
  const comboBonus = Math.round(BASE_XP * (multiplier - 1));
  const total = BASE_XP + speedBonus + comboBonus;

  sessionXP.update(xp => xp + total);

  const gain = { base: BASE_XP, speed: speedBonus, combo: comboBonus, total };
  lastXPGain.set(gain);

  return gain;
}

export function incrementCombo() {
  combo.update(c => c + 1);
}

export function resetCombo() {
  combo.set(0);
}

export function resetSession() {
  sessionXP.set(0);
  combo.set(0);
  lastXPGain.set(null);
}

// Combo display text
export const comboText = derived(combo, $combo => {
  if ($combo < 2) return null;
  const multiplier = Math.min(1 + $combo * 0.5, 3);
  return `${multiplier}x`;
});

// ============ Hockey IQ Rating ============

export interface HockeyIQTier {
  name: string;
  min: number;
  color: string;
}

export const HOCKEY_IQ_TIERS: HockeyIQTier[] = [
  { name: 'Learning the Game', min: 0, color: '#94A3B8' },
  { name: 'Pond Hockey', min: 50, color: '#3B82F6' },
  { name: 'Rec League', min: 65, color: '#10B981' },
  { name: 'Travel/Select', min: 75, color: '#F59E0B' },
  { name: 'Elite/Junior', min: 85, color: '#EF4444' },
  { name: 'Pro Scout', min: 95, color: '#FFD700' }
];

function loadHockeyIQ(): number {
  if (!browser) return 0;
  const stored = localStorage.getItem('puck-academy-hockey-iq');
  return stored ? parseFloat(stored) : 0;
}

function saveHockeyIQ(rating: number) {
  if (browser) {
    localStorage.setItem('puck-academy-hockey-iq', rating.toString());
  }
}

export const hockeyIQRating = writable(loadHockeyIQ());

// Subscribe to persist changes
hockeyIQRating.subscribe(rating => {
  saveHockeyIQ(rating);
});

export function getTier(rating: number): HockeyIQTier {
  for (let i = HOCKEY_IQ_TIERS.length - 1; i >= 0; i--) {
    if (rating >= HOCKEY_IQ_TIERS[i].min) {
      return HOCKEY_IQ_TIERS[i];
    }
  }
  return HOCKEY_IQ_TIERS[0];
}

export const currentTier = derived(hockeyIQRating, $rating => getTier($rating));

/**
 * Update Hockey IQ after completing a module.
 * Score is weighted: each correct answer in a 7-question module
 * shifts the rating toward a "target" based on performance.
 */
export function updateHockeyIQ(correctCount: number, totalCount: number): { oldRating: number; newRating: number } {
  const currentRating = get(hockeyIQRating);
  const percentage = correctCount / totalCount;

  // Target rating based on performance
  // Perfect = 100, 6/7 = ~90, 5/7 = ~75, 4/7 = ~60, etc.
  const targetRating = Math.round(percentage * 100);

  // Move toward target by 20% (gradual adjustment)
  const delta = (targetRating - currentRating) * 0.2;
  const newRating = Math.max(0, Math.min(100, Math.round(currentRating + delta)));

  hockeyIQRating.set(newRating);

  return { oldRating: currentRating, newRating };
}

// ============ Audio Unlock State ============

export const audioUnlocked = writable(false);

// ============ Module Session Results ============

export interface ScenarioResult {
  scenarioId: string;
  correct: boolean;
  timeSeconds: number;
  xpEarned: number;
}

export const scenarioResults = writable<ScenarioResult[]>([]);

export function recordScenarioResult(result: ScenarioResult) {
  scenarioResults.update(results => [...results, result]);
}

export function getSessionStats() {
  const results = get(scenarioResults);
  const correct = results.filter(r => r.correct).length;
  const total = results.length;
  const totalXP = results.reduce((sum, r) => sum + r.xpEarned, 0);
  const avgTime = results.length > 0
    ? results.reduce((sum, r) => sum + r.timeSeconds, 0) / results.length
    : 0;
  const bestStreak = getBestStreak(results);

  return { correct, total, totalXP, avgTime, bestStreak };
}

function getBestStreak(results: ScenarioResult[]): number {
  let best = 0;
  let current = 0;
  for (const r of results) {
    if (r.correct) {
      current++;
      best = Math.max(best, current);
    } else {
      current = 0;
    }
  }
  return best;
}
