/**
 * analytics.js
 * Google Analytics 4 event tracking for Puck Academy
 */

export const Analytics = {
  /**
   * Check if Google Analytics is loaded
   * @returns {boolean} True if gtag is available
   */
  isLoaded() {
    return typeof window.gtag === 'function';
  },

  /**
   * Track when a user answers a scenario question
   * @param {number} moduleNumber - Module number
   * @param {number} scenarioNumber - Scenario number
   * @param {boolean} isCorrect - Whether answer was correct
   */
  trackScenarioAnswer(moduleNumber, scenarioNumber, isCorrect) {
    if (!this.isLoaded()) return;

    gtag('event', 'scenario_answer', {
      module: moduleNumber,
      scenario: scenarioNumber,
      correct: isCorrect,
      scenario_id: `module${moduleNumber}-scenario${scenarioNumber}`
    });
  },

  /**
   * Track when a user completes a full module
   * @param {number} moduleNumber - Module number
   * @param {number} score - Score achieved
   * @param {number} totalScenarios - Total scenarios in module
   */
  trackModuleComplete(moduleNumber, score, totalScenarios) {
    if (!this.isLoaded()) return;

    const percentage = Math.round((score / totalScenarios) * 100);

    gtag('event', 'module_complete', {
      module: moduleNumber,
      score: score,
      total: totalScenarios,
      percentage: percentage,
      perfect_score: score === totalScenarios
    });
  },

  /**
   * Track when a user shares their score
   * @param {number} moduleNumber - Module number
   * @param {number} score - Score being shared
   * @param {string} method - Share method ('native' or 'clipboard')
   */
  trackShareScore(moduleNumber, score, method = 'unknown') {
    if (!this.isLoaded()) return;

    gtag('event', 'share_score', {
      module: moduleNumber,
      score: score,
      method: method
    });
  },

  /**
   * Track when feedback form is opened
   * @param {string} source - Where feedback was triggered from
   */
  trackFeedbackFormOpen(source = 'unknown') {
    if (!this.isLoaded()) return;

    gtag('event', 'feedback_form_open', {
      source: source
    });
  },

  /**
   * Track when theory intro is shown
   * @param {number} moduleNumber - Module number
   */
  trackTheoryIntroView(moduleNumber) {
    if (!this.isLoaded()) return;

    gtag('event', 'theory_intro_view', {
      module: moduleNumber
    });
  },

  /**
   * Track when theory intro is skipped
   * @param {number} moduleNumber - Module number
   * @param {number} slideNumber - Which slide they were on when skipped
   */
  trackTheoryIntroSkip(moduleNumber, slideNumber) {
    if (!this.isLoaded()) return;

    gtag('event', 'theory_intro_skip', {
      module: moduleNumber,
      slide: slideNumber
    });
  },

  /**
   * Track onboarding completion
   * @param {object} data - Onboarding data (position, ageLevel, goals)
   */
  trackOnboardingComplete(data) {
    if (!this.isLoaded()) return;

    gtag('event', 'onboarding_complete', {
      position: data.position,
      age_level: data.ageLevel,
      goals: data.goals?.join(','),
      email_provided: !!data.email
    });
  },

  /**
   * Track page view (for single-page app navigation)
   * @param {string} pageName - Name of the page/view
   */
  trackPageView(pageName) {
    if (!this.isLoaded()) return;

    gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  },

  /**
   * Track when user retries a module
   * @param {number} moduleNumber - Module number
   * @param {number} previousScore - Previous best score
   */
  trackModuleRetry(moduleNumber, previousScore) {
    if (!this.isLoaded()) return;

    gtag('event', 'module_retry', {
      module: moduleNumber,
      previous_score: previousScore
    });
  },

  /**
   * Track custom events
   * @param {string} eventName - Custom event name
   * @param {object} eventParams - Event parameters
   */
  trackCustomEvent(eventName, eventParams = {}) {
    if (!this.isLoaded()) return;

    gtag('event', eventName, eventParams);
  }
};
