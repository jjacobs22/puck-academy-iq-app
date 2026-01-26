/**
 * data-loader.js
 * Load and manage scenario data from JSON
 */

export class DataLoader {
  static cachedData = null;

  /**
   * Load all scenario data from JSON file
   * @returns {Promise<object>} Complete scenarios data
   */
  static async loadScenarios() {
    // Return cached data if available
    if (this.cachedData) {
      return this.cachedData;
    }

    try {
      const response = await fetch('data/scenarios.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.cachedData = await response.json();
      return this.cachedData;
    } catch (error) {
      console.error('Failed to load scenarios:', error);
      return null;
    }
  }

  /**
   * Get a specific module by ID
   * @param {object} data - Full scenarios data
   * @param {string} moduleId - Module ID (e.g., 'module1')
   * @returns {object|null} Module data
   */
  static getModule(data, moduleId) {
    if (!data || !data.modules) return null;
    return data.modules.find(m => m.id === moduleId) || null;
  }

  /**
   * Get a specific module by number
   * @param {object} data - Full scenarios data
   * @param {number} moduleNumber - Module number (1, 2, 3, etc.)
   * @returns {object|null} Module data
   */
  static getModuleByNumber(data, moduleNumber) {
    if (!data || !data.modules) return null;
    return data.modules.find(m => m.number === moduleNumber) || null;
  }

  /**
   * Get a specific scenario within a module
   * @param {object} moduleData - Module data
   * @param {number} scenarioNumber - Scenario number within module
   * @returns {object|null} Scenario data
   */
  static getScenario(moduleData, scenarioNumber) {
    if (!moduleData || !moduleData.scenarios) return null;
    return moduleData.scenarios.find(s => s.number === scenarioNumber) || null;
  }

  /**
   * Get a specific scenario by ID
   * @param {object} data - Full scenarios data
   * @param {string} scenarioId - Scenario ID (e.g., 'module1-scenario1')
   * @returns {object|null} Scenario data with module context
   */
  static getScenarioById(data, scenarioId) {
    if (!data || !data.modules) return null;

    for (const module of data.modules) {
      const scenario = module.scenarios.find(s => s.id === scenarioId);
      if (scenario) {
        return {
          module,
          scenario
        };
      }
    }
    return null;
  }

  /**
   * Get all modules
   * @param {object} data - Full scenarios data
   * @returns {Array} Array of all modules
   */
  static getAllModules(data) {
    return data?.modules || [];
  }

  /**
   * Get modules for a specific position
   * @param {object} data - Full scenarios data
   * @param {string} position - Position ('center', 'winger', 'defense', 'goalie')
   * @returns {Array} Array of modules for that position
   */
  static getModulesByPosition(data, position) {
    if (!data || !data.modules) return [];
    return data.modules.filter(m => m.position.includes(position));
  }

  /**
   * Get scenario count for a module
   * @param {object} moduleData - Module data
   * @returns {number} Number of scenarios
   */
  static getScenarioCount(moduleData) {
    return moduleData?.scenarios?.length || 0;
  }

  /**
   * Validate scenario data structure
   * @param {object} data - Scenarios data to validate
   * @returns {boolean} True if valid
   */
  static validateData(data) {
    if (!data || typeof data !== 'object') return false;
    if (!Array.isArray(data.modules)) return false;

    // Check each module has required fields
    for (const module of data.modules) {
      if (!module.id || !module.title || !Array.isArray(module.scenarios)) {
        return false;
      }

      // Check each scenario has required fields
      for (const scenario of module.scenarios) {
        if (!scenario.id || !scenario.title || !Array.isArray(scenario.answers)) {
          return false;
        }
        if (scenario.answers.length !== 4) {
          return false;
        }
      }
    }

    return true;
  }
}
