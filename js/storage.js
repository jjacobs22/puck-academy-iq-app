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
   */
  saveScenarioScore(moduleNumber, scenarioNumber, isCorrect) {
    const key = `puckAcademy_module${moduleNumber}_scores`;
    const scores = this.getModuleScores(moduleNumber);
    scores.currentRun[scenarioNumber] = isCorrect;
    this.set(key, scores);
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
  }
};
