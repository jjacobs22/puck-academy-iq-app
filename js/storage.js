/**
 * storage.js
 * LocalStorage utility functions for Puck Academy
 */

export const Storage = {
  /**
   * Get data from localStorage
   * @param {string} key - The localStorage key
   * @returns {any} Parsed JSON data or null
   */
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return null;
    }
  },

  /**
   * Set data in localStorage
   * @param {string} key - The localStorage key
   * @param {any} value - Data to store (will be JSON stringified)
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
    }
  },

  /**
   * Remove item from localStorage
   * @param {string} key - The localStorage key
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
    }
  },

  /**
   * Clear all localStorage data
   */
  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },

  // ===== PROGRESS HELPERS =====

  /**
   * Get user progress data
   * @returns {object} Progress object with completedScenarios, currentModule, etc.
   */
  getProgress() {
    return this.get('puckAcademy_progress') || {
      position: null,
      email: null,
      ageLevel: null,
      goals: [],
      completedScenarios: [],
      currentModule: 1,
      streak: 0
    };
  },

  /**
   * Save user progress data
   * @param {object} progress - Progress object to save
   */
  saveProgress(progress) {
    this.set('puckAcademy_progress', progress);
  },

  /**
   * Mark a scenario as complete
   * @param {string} scenarioId - Scenario identifier (e.g., 'module1-scenario1')
   */
  markScenarioComplete(scenarioId) {
    const progress = this.getProgress();
    if (!progress.completedScenarios.includes(scenarioId)) {
      progress.completedScenarios.push(scenarioId);
      this.saveProgress(progress);
    }
  },

  /**
   * Check if a scenario is complete
   * @param {string} scenarioId - Scenario identifier
   * @returns {boolean} True if scenario is complete
   */
  isScenarioComplete(scenarioId) {
    const progress = this.getProgress();
    return progress.completedScenarios.includes(scenarioId);
  },

  // ===== SCORE HELPERS =====

  /**
   * Get scores for a specific module
   * @param {number} moduleNumber - Module number (1, 2, 3, etc.)
   * @returns {object} Score object with currentRun and bestScore
   */
  getModuleScores(moduleNumber) {
    const key = `puckAcademy_module${moduleNumber}_scores`;
    return this.get(key) || {
      currentRun: {},
      bestScore: 0
    };
  },

  /**
   * Save score for a specific scenario
   * @param {number} moduleNumber - Module number
   * @param {number} scenarioNumber - Scenario number within module
   * @param {boolean} isCorrect - Whether answer was correct
   * @returns {object} Streak update result { streakChanged, newStreak, milestone }
   */
  saveScenarioScore(moduleNumber, scenarioNumber, isCorrect) {
    const key = `puckAcademy_module${moduleNumber}_scores`;
    const scores = this.getModuleScores(moduleNumber);
    scores.currentRun[scenarioNumber] = isCorrect;
    this.set(key, scores);

    // Update streak after every scenario completion
    const streakResult = this.updateStreak();

    // Sync to Supabase if logged in (async, non-blocking)
    this.syncToSupabase();

    return streakResult;
  },

  /**
   * Sync progress to Supabase (if available and logged in)
   * Called automatically when scores are saved
   */
  async syncToSupabase() {
    try {
      // Dynamic import to avoid circular dependencies
      const { syncProgressToServer } = await import('./supabase.js');
      await syncProgressToServer();
    } catch (e) {
      // Silently fail if not logged in or supabase not available
      console.log('Sync skipped:', e.message);
    }
  },

  /**
   * Calculate total score for current run
   * @param {number} moduleNumber - Module number
   * @returns {number} Number of correct answers
   */
  calculateCurrentScore(moduleNumber) {
    const scores = this.getModuleScores(moduleNumber);
    const answers = Object.values(scores.currentRun);
    return answers.filter(correct => correct === true).length;
  },

  /**
   * Update best score if current score is higher
   * @param {number} moduleNumber - Module number
   * @param {number} currentScore - Current score achieved
   */
  updateBestScore(moduleNumber, currentScore) {
    const key = `puckAcademy_module${moduleNumber}_scores`;
    const scores = this.getModuleScores(moduleNumber);
    if (currentScore > scores.bestScore) {
      scores.bestScore = currentScore;
      this.set(key, scores);
    }
  },

  /**
   * Reset current run scores for a module
   * @param {number} moduleNumber - Module number
   */
  resetCurrentRun(moduleNumber) {
    const key = `puckAcademy_module${moduleNumber}_scores`;
    const scores = this.getModuleScores(moduleNumber);
    scores.currentRun = {};
    this.set(key, scores);
  },

  // ===== THEORY INTRO TRACKING =====

  /**
   * Check if user has seen theory intro for a module
   * @param {number} moduleNumber - Module number
   * @returns {boolean} True if intro has been seen
   */
  hasSeenIntro(moduleNumber) {
    const seen = this.get('puckAcademy_introSeen') || [];
    return seen.includes(moduleNumber);
  },

  /**
   * Mark theory intro as seen for a module
   * @param {number} moduleNumber - Module number
   */
  markIntroSeen(moduleNumber) {
    let seen = this.get('puckAcademy_introSeen') || [];
    if (!seen.includes(moduleNumber)) {
      seen.push(moduleNumber);
      this.set('puckAcademy_introSeen', seen);
    }
  },

  // ===== ONBOARDING =====

  /**
   * Save onboarding data
   * @param {object} data - Onboarding data (position, email, ageLevel, goals)
   */
  saveOnboarding(data) {
    const progress = this.getProgress();
    Object.assign(progress, data);
    this.saveProgress(progress);
  },

  /**
   * Check if onboarding is complete
   * @returns {boolean} True if user has completed onboarding
   */
  isOnboardingComplete() {
    const progress = this.getProgress();
    return progress.position !== null;
  },

  // ===== STREAK HELPERS =====

  /**
   * Get today's date as ISO string (YYYY-MM-DD) in user's local timezone
   * @returns {string} Date string like "2026-01-30"
   */
  getTodayDateISO() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  /**
   * Calculate days since a specific date
   * @param {string} dateISO - Date in ISO format (YYYY-MM-DD)
   * @returns {number} Days since that date (0 = today, 1 = yesterday, etc.)
   */
  getDaysSinceDate(dateISO) {
    if (!dateISO) return Infinity;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [year, month, day] = dateISO.split('-').map(Number);
    const pastDate = new Date(year, month - 1, day);
    pastDate.setHours(0, 0, 0, 0);

    const diffMs = today - pastDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
  },

  /**
   * Get streak data from progress
   * @returns {object} Streak object with count, lastTrainingDate, bestStreak, milestonesSeen
   */
  getStreakData() {
    const progress = this.getProgress();

    // Initialize streak object if it doesn't exist or is old format
    if (!progress.streak || typeof progress.streak === 'number') {
      return {
        count: 0,
        lastTrainingDate: null,
        bestStreak: 0,
        milestonesSeen: []
      };
    }

    return progress.streak;
  },

  /**
   * Get current streak count
   * @returns {number} Current streak days
   */
  getStreakCount() {
    const streak = this.getStreakData();
    const daysSince = this.getDaysSinceDate(streak.lastTrainingDate);

    // If more than 1 day has passed, streak is broken
    if (daysSince > 1) {
      return 0;
    }

    return streak.count;
  },

  /**
   * Get best streak ever achieved
   * @returns {number} Best streak days
   */
  getBestStreak() {
    const streak = this.getStreakData();
    return streak.bestStreak || 0;
  },

  /**
   * Check if user has trained today
   * @returns {boolean} True if trained today
   */
  trainedToday() {
    const streak = this.getStreakData();
    if (!streak.lastTrainingDate) return false;
    return streak.lastTrainingDate === this.getTodayDateISO();
  },

  /**
   * Check if streak is at risk (have active streak but haven't trained today)
   * @returns {boolean} True if streak is at risk
   */
  isStreakAtRisk() {
    const streak = this.getStreakData();
    const daysSince = this.getDaysSinceDate(streak.lastTrainingDate);

    // At risk if: have a streak, last trained yesterday, haven't trained today
    return streak.count > 0 && daysSince === 1;
  },

  /**
   * Update streak after completing a scenario
   * Called automatically from saveScenarioScore
   * @returns {object} { streakChanged, newStreak, milestone }
   */
  updateStreak() {
    const progress = this.getProgress();
    const today = this.getTodayDateISO();

    // Initialize streak object if needed
    if (!progress.streak || typeof progress.streak === 'number') {
      progress.streak = {
        count: 0,
        lastTrainingDate: null,
        bestStreak: 0,
        milestonesSeen: []
      };
    }

    // If already trained today, no change
    if (progress.streak.lastTrainingDate === today) {
      return { streakChanged: false, newStreak: progress.streak.count, milestone: null };
    }

    const daysSince = this.getDaysSinceDate(progress.streak.lastTrainingDate);
    let milestone = null;

    if (daysSince > 1) {
      // Gap of more than 1 day - reset streak
      progress.streak.count = 1;
    } else {
      // Consecutive day (or first ever) - increment
      progress.streak.count++;
    }

    // Update last training date
    progress.streak.lastTrainingDate = today;

    // Update best streak if needed
    if (progress.streak.count > progress.streak.bestStreak) {
      progress.streak.bestStreak = progress.streak.count;
    }

    // Check for milestone
    const milestones = [3, 7, 14, 30, 50, 100];
    if (milestones.includes(progress.streak.count)) {
      if (!progress.streak.milestonesSeen.includes(progress.streak.count)) {
        milestone = progress.streak.count;
      }
    }

    // Save progress
    this.saveProgress(progress);

    return {
      streakChanged: true,
      newStreak: progress.streak.count,
      milestone: milestone
    };
  },

  /**
   * Check if a specific milestone has been reached and not yet shown
   * @param {number} days - Milestone day count (3, 7, 14, 30)
   * @returns {boolean} True if milestone reached and not shown
   */
  checkMilestone(days) {
    const streak = this.getStreakData();
    const milestones = [3, 7, 14, 30, 50, 100];

    if (!milestones.includes(days)) return false;
    if (streak.count !== days) return false;
    if (streak.milestonesSeen && streak.milestonesSeen.includes(days)) return false;

    return true;
  },

  /**
   * Mark a milestone as seen (so it won't show again)
   * @param {number} days - Milestone day count
   */
  markMilestoneAsSeen(days) {
    const progress = this.getProgress();

    if (!progress.streak) return;
    if (!progress.streak.milestonesSeen) {
      progress.streak.milestonesSeen = [];
    }

    if (!progress.streak.milestonesSeen.includes(days)) {
      progress.streak.milestonesSeen.push(days);
      this.saveProgress(progress);
      this.syncToSupabase();
    }
  }
};
