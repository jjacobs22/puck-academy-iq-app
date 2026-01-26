/**
 * scenario.js
 * Core scenario interaction logic for Puck Academy
 */

import { Storage } from './storage.js';
import { Analytics } from './analytics.js';

export class Scenario {
  /**
   * Create a scenario instance
   * @param {object} config - Scenario configuration
   * @param {number} config.moduleNumber - Module number (1, 2, 3, etc.)
   * @param {number} config.scenarioNumber - Scenario number within module
   * @param {string} config.scenarioId - Unique scenario ID
   * @param {Array} config.answers - Array of answer objects
   */
  constructor(config) {
    this.moduleNumber = config.moduleNumber;
    this.scenarioNumber = config.scenarioNumber;
    this.scenarioId = config.scenarioId;
    this.answers = config.answers;
    this.feedbackElement = null;
    this.hasAnswered = false;
  }

  /**
   * Initialize scenario (attach event listeners, etc.)
   */
  init() {
    this.attachAnswerListeners();
    this.checkIfAlreadyCompleted();
  }

  /**
   * Attach click listeners to answer buttons
   */
  attachAnswerListeners() {
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        if (!this.hasAnswered) {
          this.handleAnswer(index);
        }
      });
    });
  }

  /**
   * Handle answer selection
   * @param {number} answerIndex - Index of selected answer
   */
  handleAnswer(answerIndex) {
    if (this.hasAnswered) return;

    const answer = this.answers[answerIndex];
    this.hasAnswered = true;

    // Disable all answer buttons
    this.disableAnswerButtons();

    // Track analytics
    Analytics.trackScenarioAnswer(
      this.moduleNumber,
      this.scenarioNumber,
      answer.correct
    );

    // Save score
    Storage.saveScenarioScore(
      this.moduleNumber,
      this.scenarioNumber,
      answer.correct
    );

    // Mark complete
    Storage.markScenarioComplete(this.scenarioId);

    // Show feedback
    this.showFeedback(answer);
  }

  /**
   * Display feedback for the selected answer
   * @param {object} answer - Answer object with correct, text, feedback properties
   */
  showFeedback(answer) {
    const feedbackBox = document.getElementById('feedback');
    if (!feedbackBox) {
      console.error('Feedback element not found');
      return;
    }

    this.feedbackElement = feedbackBox;

    // Set feedback class based on correctness
    feedbackBox.className = `feedback-box ${answer.correct ? 'correct' : 'incorrect'}`;

    // Build feedback HTML
    const icon = answer.correct ? '✓' : '✗';
    const title = answer.correct ? 'Correct!' : 'Not quite.';

    feedbackBox.innerHTML = `
      <strong>${icon} ${title}</strong>
      <p>${answer.feedback}</p>
      <button onclick="window.location.href='training.html'" class="btn btn-primary">
        Back to Module Hub
      </button>
    `;

    // Show feedback
    feedbackBox.style.display = 'block';

    // Scroll to feedback
    feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /**
   * Disable all answer buttons after selection
   */
  disableAnswerButtons() {
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach(btn => {
      btn.disabled = true;
      btn.style.opacity = '0.6';
      btn.style.cursor = 'not-allowed';
    });
  }

  /**
   * Check if this scenario was already completed in a previous session
   */
  checkIfAlreadyCompleted() {
    if (Storage.isScenarioComplete(this.scenarioId)) {
      // Optionally show a "previously completed" indicator
      console.log(`Scenario ${this.scenarioId} was previously completed`);
    }
  }

  /**
   * Get current progress for this module
   * @returns {object} Progress stats
   */
  getModuleProgress() {
    const scores = Storage.getModuleScores(this.moduleNumber);
    const totalAnswered = Object.keys(scores.currentRun).length;
    const correctAnswers = Storage.calculateCurrentScore(this.moduleNumber);

    return {
      totalAnswered,
      correctAnswers,
      bestScore: scores.bestScore
    };
  }
}

/**
 * Utility function to create and initialize a scenario
 * @param {object} config - Scenario configuration
 * @returns {Scenario} Initialized scenario instance
 */
export function createScenario(config) {
  const scenario = new Scenario(config);
  scenario.init();
  return scenario;
}
