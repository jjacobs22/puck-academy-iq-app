/**
 * scenario-renderer.js
 * Dynamically render scenarios from JSON data
 */

import { createScenario } from './scenario.js';

export class ScenarioRenderer {
  /**
   * Create a scenario renderer
   * @param {object} scenarioData - Scenario data from JSON
   * @param {object} moduleData - Module data from JSON
   */
  constructor(scenarioData, moduleData) {
    this.scenario = scenarioData;
    this.module = moduleData;
  }

  /**
   * Render complete scenario to a container element
   * @param {HTMLElement} container - Container element to render into
   */
  render(container) {
    if (!container) {
      console.error('Container element not found');
      return;
    }

    container.innerHTML = this.buildHTML();
    this.attachInteractivity();
  }

  /**
   * Build complete HTML for scenario
   * @returns {string} HTML string
   */
  buildHTML() {
    return `
      <div class="container">
        <h1>${this.scenario.title}</h1>

        <div class="situation-text">
          ${this.scenario.situation}
        </div>

        ${this.renderDiagram()}

        <h3 class="question-text">${this.scenario.question}</h3>

        <div class="answers-grid">
          ${this.renderAnswers()}
        </div>

        <div id="feedback" class="feedback-box"></div>
      </div>
    `;
  }

  /**
   * Render rink diagram
   * @returns {string} HTML for diagram
   */
  renderDiagram() {
    if (!this.scenario.diagram) return '';

    const { viewBox = '0 0 800 400', elements = [] } = this.scenario.diagram;

    return `
      <div class="rink-container">
        <svg class="rink-svg" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">
          <!-- Ice surface -->
          <rect x="50" y="50" width="700" height="300"
                fill="#E8F4F8" stroke="#0A1628" stroke-width="3" rx="20"/>

          <!-- Center line -->
          <line x1="400" y1="50" x2="400" y2="350"
                stroke="#C8102E" stroke-width="4"/>

          <!-- Blue lines -->
          <line x1="250" y1="50" x2="250" y2="350"
                stroke="#3B82F6" stroke-width="3"/>
          <line x1="550" y1="50" x2="550" y2="350"
                stroke="#3B82F6" stroke-width="3"/>

          <!-- Dynamic elements -->
          ${elements.map(el => this.renderElement(el)).join('')}
        </svg>

        <div class="rink-legend">
          <div class="legend-item">
            <div class="legend-dot you"></div>
            <span>You</span>
          </div>
          <div class="legend-item">
            <div class="legend-dot teammate"></div>
            <span>Teammate</span>
          </div>
          <div class="legend-item">
            <div class="legend-dot opponent"></div>
            <span>Opponent</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render individual diagram element
   * @param {object} element - Element data
   * @returns {string} SVG element HTML
   */
  renderElement(element) {
    switch (element.type) {
      case 'player':
        return this.renderPlayer(element);
      case 'puck':
        return this.renderPuck(element);
      case 'arrow':
        return this.renderArrow(element);
      case 'text':
        return this.renderText(element);
      default:
        return '';
    }
  }

  /**
   * Render player circle
   */
  renderPlayer(el) {
    const colors = {
      you: '#C8102E',
      teammate: '#3B82F6',
      opponent: '#666'
    };
    const color = el.color || colors[el.team] || '#666';
    const radius = el.radius || (el.team === 'you' ? 26 : 22);

    return `
      <circle cx="${el.x}" cy="${el.y}" r="${radius}"
              fill="${color}" stroke="#000" stroke-width="2"/>
      ${el.label ? `
        <text x="${el.x}" y="${el.y + 5}"
              text-anchor="middle" fill="white"
              font-weight="bold" font-size="14">
          ${el.label}
        </text>
      ` : ''}
      ${el.number ? `
        <text x="${el.x}" y="${el.y + 5}"
              text-anchor="middle" fill="white"
              font-weight="bold" font-size="12">
          ${el.number}
        </text>
      ` : ''}
    `;
  }

  /**
   * Render puck
   */
  renderPuck(el) {
    return `
      <circle cx="${el.x}" cy="${el.y}" r="8"
              fill="#1a1a1a" stroke="#000" stroke-width="2"/>
    `;
  }

  /**
   * Render arrow
   */
  renderArrow(el) {
    return `
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10"
                refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#C8102E"/>
        </marker>
      </defs>
      <line x1="${el.x}" y1="${el.y}" x2="${el.x2}" y2="${el.y2}"
            stroke="#C8102E" stroke-width="3"
            marker-end="url(#arrowhead)"/>
    `;
  }

  /**
   * Render text label
   */
  renderText(el) {
    return `
      <text x="${el.x}" y="${el.y}"
            text-anchor="middle" fill="#0A1628"
            font-weight="bold" font-size="16">
        ${el.label}
      </text>
    `;
  }

  /**
   * Render answer buttons
   * @returns {string} HTML for answers
   */
  renderAnswers() {
    return this.scenario.answers.map((answer, index) => `
      <button class="answer-btn" data-index="${index}">
        ${answer.text}
      </button>
    `).join('');
  }

  /**
   * Attach interactivity after rendering
   */
  attachInteractivity() {
    const scenario = createScenario({
      moduleNumber: this.module.number,
      scenarioNumber: this.scenario.number,
      scenarioId: this.scenario.id,
      answers: this.scenario.answers
    });
  }
}
