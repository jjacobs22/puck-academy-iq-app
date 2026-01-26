# Puck Academy - Technical Debt Cleanup Plan

**Goal**: Extract duplicated code, convert scenarios to JSON, and create a maintainable architecture for scaling to 100+ scenarios.

**Estimated Time**: 4-6 hours of focused work in Cursor

---

## Phase 1: Extract Shared CSS (90 minutes)

### Current Problem
- 28+ HTML files each have `<style>` blocks with identical CSS
- Updating colors, fonts, or spacing requires changing 28+ files
- Risk of inconsistencies and copy-paste errors

### Solution
Create a single `styles/main.css` file with all shared styles.

### Steps

**1.1 Create CSS File Structure**
```
puck-academy-iq-app/
├── styles/
│   ├── main.css          # All shared styles
│   └── components.css    # Reusable components (optional Phase 2)
```

**1.2 Extract Common Styles to `styles/main.css`**

Organize into sections:
```css
/* ===== CSS VARIABLES ===== */
:root {
  --ice-blue: #E8F4F8;
  --dark-blue: #0A1628;
  --accent-red: #C8102E;
  --silver: #A8B2BE;
  --success-green: #10B981;
  --warning-yellow: #F59E0B;

  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  --font-header: 'Bebas Neue', sans-serif;
  --font-body: 'Work Sans', sans-serif;
}

/* ===== BASE STYLES ===== */
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: var(--font-body);
  background: var(--dark-blue);
  color: var(--ice-blue);
}

/* ===== LAYOUT ===== */
.container { max-width: 800px; margin: 0 auto; padding: 2rem; }

/* ===== BUTTONS ===== */
.btn { /* base button styles */ }
.btn-primary { /* primary button */ }
.btn-secondary { /* secondary button */ }

/* ===== RINK DIAGRAMS ===== */
.rink-container {
  background: white;
  border-radius: 8px;
  padding: 25px;
  margin: 2rem 0;
}
.rink-svg { /* SVG specific styles */ }

/* ===== SCENARIO STRUCTURE ===== */
.situation-text { /* situation description */ }
.question-text { /* question heading */ }
.answers-grid { /* answer button layout */ }
.feedback-box { /* feedback display */ }

/* ===== MODALS ===== */
.modal-overlay { /* modal background */ }
.modal-content { /* modal box */ }

/* ===== THEORY INTRO ===== */
.theory-overlay { /* intro overlay */ }
.theory-slide { /* slide content */ }
```

**1.3 Update All HTML Files**

Replace `<style>` blocks with:
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scenario Title | Puck Academy</title>

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Work+Sans:wght@400;500;600&display=swap" rel="stylesheet">

  <!-- Main Styles -->
  <link rel="stylesheet" href="styles/main.css">

  <!-- Page-specific styles (if needed) -->
  <style>
    /* Only put truly unique styles here */
  </style>
</head>
```

**1.4 Test Each Page**
- Open each HTML file in browser
- Verify styling looks identical to before
- Check responsive behavior on mobile

**Files to Update (28 total)**:
- `index.html`
- `onboarding.html`
- `training.html`
- All 5 Module 1 scenarios
- All 7 Module 2 scenarios
- All 7 Module 3 scenarios
- All 7 Module 4 scenarios
- All 7 Module 5 scenarios
- All 7 Module 6 scenarios
- `tylers-coaching-notes.html`

---

## Phase 2: Extract Shared JavaScript (2 hours)

### Current Problem
- Each scenario has identical functions for:
  - LocalStorage management
  - Progress tracking
  - Score calculation
  - Navigation
  - GA4 event tracking

### Solution
Create modular JS files for shared functionality.

### Steps

**2.1 Create JS File Structure**
```
puck-academy-iq-app/
├── js/
│   ├── storage.js        # LocalStorage utilities
│   ├── progress.js       # Progress tracking
│   ├── scoring.js        # Score calculation
│   ├── analytics.js      # GA4 event tracking
│   └── scenario.js       # Scenario interaction logic
```

**2.2 Create `js/storage.js`**
```javascript
// LocalStorage utility functions
export const Storage = {
  get(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  // Progress helpers
  getProgress() {
    return this.get('puckAcademy_progress') || {
      completedScenarios: [],
      currentModule: 1
    };
  },

  markScenarioComplete(scenarioId) {
    const progress = this.getProgress();
    if (!progress.completedScenarios.includes(scenarioId)) {
      progress.completedScenarios.push(scenarioId);
    }
    this.set('puckAcademy_progress', progress);
  },

  // Score helpers
  getModuleScores(moduleNumber) {
    return this.get(`puckAcademy_module${moduleNumber}_scores`) || {
      currentRun: {},
      bestScore: 0
    };
  },

  saveScenarioScore(moduleNumber, scenarioNumber, isCorrect) {
    const key = `puckAcademy_module${moduleNumber}_scores`;
    const scores = this.getModuleScores(moduleNumber);
    scores.currentRun[scenarioNumber] = isCorrect;
    this.set(key, scores);
  }
};
```

**2.3 Create `js/analytics.js`**
```javascript
// Google Analytics 4 event tracking
export const Analytics = {
  trackScenarioAnswer(moduleNumber, scenarioNumber, isCorrect) {
    if (window.gtag) {
      gtag('event', 'scenario_answer', {
        module: moduleNumber,
        scenario: scenarioNumber,
        correct: isCorrect
      });
    }
  },

  trackModuleComplete(moduleNumber, score, totalScenarios) {
    if (window.gtag) {
      gtag('event', 'module_complete', {
        module: moduleNumber,
        score: score,
        total: totalScenarios,
        percentage: Math.round((score / totalScenarios) * 100)
      });
    }
  },

  trackShareScore(moduleNumber, score) {
    if (window.gtag) {
      gtag('event', 'share_score', {
        module: moduleNumber,
        score: score
      });
    }
  }
};
```

**2.4 Create `js/scenario.js`**
```javascript
import { Storage } from './storage.js';
import { Analytics } from './analytics.js';

export class Scenario {
  constructor(config) {
    this.moduleNumber = config.moduleNumber;
    this.scenarioNumber = config.scenarioNumber;
    this.scenarioId = config.scenarioId;
    this.answers = config.answers;
  }

  handleAnswer(answerIndex) {
    const answer = this.answers[answerIndex];

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

  showFeedback(answer) {
    const feedbackBox = document.getElementById('feedback');
    feedbackBox.className = `feedback-box ${answer.correct ? 'correct' : 'incorrect'}`;
    feedbackBox.innerHTML = `
      <strong>${answer.correct ? '✓ Correct!' : '✗ Not quite.'}</strong>
      <p>${answer.feedback}</p>
      <button onclick="window.location.href='training.html'" class="btn-primary">
        Back to Module Hub
      </button>
    `;
    feedbackBox.style.display = 'block';
  }
}
```

**2.5 Update Scenario HTML Files**

Replace inline `<script>` with:
```html
<script type="module">
  import { Scenario } from './js/scenario.js';

  // Initialize scenario with configuration
  const scenario = new Scenario({
    moduleNumber: 1,
    scenarioNumber: 1,
    scenarioId: 'module1-scenario1',
    answers: [
      {
        text: "Chase the puck carrier",
        correct: false,
        feedback: "Not the best choice here. If you chase..."
      },
      {
        text: "Hold the high slot",
        correct: true,
        feedback: "Perfect read! By holding the high slot..."
      },
      // ... other answers
    ]
  });

  // Attach to buttons
  document.querySelectorAll('.answer-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => scenario.handleAnswer(index));
  });
</script>
```

**2.6 Test Thoroughly**
- Test each scenario loads correctly
- Verify answers trigger correct feedback
- Confirm localStorage saves properly
- Check GA4 events fire in Network tab

---

## Phase 3: Convert Scenarios to JSON (2 hours)

### Current Problem
- Scenario data is embedded in HTML
- Can't easily export/import scenarios
- Hard to analyze content across modules
- No way to build content management tools

### Solution
Create a JSON data structure for all scenarios.

### Steps

**3.1 Design JSON Schema**

Create `data/scenarios.json`:
```json
{
  "modules": [
    {
      "id": "module1",
      "title": "Defensive Zone",
      "description": "Master your defensive responsibilities as a center",
      "position": "center",
      "scenarioCount": 5,
      "theoryIntro": {
        "slides": [
          {
            "title": "Your Job in the D-Zone",
            "content": "As a center, you're the defensive quarterback...",
            "diagram": "optional-svg-or-image-path"
          }
        ]
      },
      "scenarios": [
        {
          "id": "module1-scenario1",
          "number": 1,
          "title": "Reading Pressure on Your D-Man",
          "situation": "Your team is defending a 2-1 lead late in the third period...",
          "question": "What should you do?",
          "rinkPosition": "defensive-zone-low",
          "diagram": {
            "type": "svg",
            "elements": [
              { "type": "player", "team": "you", "x": 400, "y": 350, "label": "YOU" },
              { "type": "player", "team": "teammate", "x": 200, "y": 400, "number": "4" },
              { "type": "player", "team": "opponent", "x": 250, "y": 300 },
              { "type": "puck", "x": 180, "y": 380 }
            ]
          },
          "answers": [
            {
              "text": "Chase the puck carrier into the corner",
              "correct": false,
              "feedback": "Not the best choice here. If you chase, you abandon the high slot..."
            },
            {
              "text": "Hold the high slot and read the play",
              "correct": true,
              "feedback": "Perfect read! By holding the high slot, you're covering the most dangerous scoring area..."
            },
            {
              "text": "Pinch down to double-team",
              "correct": false,
              "feedback": "Too aggressive in this situation. If you pinch and they escape..."
            },
            {
              "text": "Communicate and stay high",
              "correct": false,
              "feedback": "Close, but communication alone isn't enough..."
            }
          ]
        }
        // ... more scenarios
      ]
    }
    // ... more modules
  ]
}
```

**3.2 Create Data Loading Script `js/data-loader.js`**
```javascript
export class DataLoader {
  static async loadScenarios() {
    try {
      const response = await fetch('data/scenarios.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to load scenarios:', error);
      return null;
    }
  }

  static getModule(data, moduleId) {
    return data.modules.find(m => m.id === moduleId);
  }

  static getScenario(moduleData, scenarioNumber) {
    return moduleData.scenarios.find(s => s.number === scenarioNumber);
  }
}
```

**3.3 Create Dynamic Scenario Renderer**

Instead of 40 separate HTML files, create:
- `scenario.html` (single template file)
- URL param determines which scenario loads: `scenario.html?module=1&scenario=3`

```html
<!-- scenario.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="styles/main.css">
</head>
<body>
  <div id="scenario-container">
    <!-- Dynamically populated -->
  </div>

  <script type="module">
    import { DataLoader } from './js/data-loader.js';
    import { ScenarioRenderer } from './js/scenario-renderer.js';

    async function loadScenario() {
      // Get URL params
      const params = new URLSearchParams(window.location.search);
      const moduleNum = params.get('module');
      const scenarioNum = params.get('scenario');

      // Load data
      const data = await DataLoader.loadScenarios();
      const module = DataLoader.getModule(data, `module${moduleNum}`);
      const scenario = DataLoader.getScenario(module, parseInt(scenarioNum));

      // Render
      const renderer = new ScenarioRenderer(scenario, module);
      renderer.render(document.getElementById('scenario-container'));
    }

    loadScenario();
  </script>
</body>
</html>
```

**3.4 Migration Strategy**

You don't have to migrate all at once:
1. Start with Module 1 (5 scenarios)
2. Test thoroughly
3. Migrate remaining modules
4. Keep old HTML files until fully validated
5. Delete old files once confident

---

## Phase 4: Benefits & Future Possibilities

### Immediate Benefits
- ✅ Update styles in one place → affects all 40+ scenarios
- ✅ Fix bugs in shared logic once instead of 40 times
- ✅ Add new scenarios 10x faster (just edit JSON)
- ✅ Consistent behavior across all content

### Future Possibilities (Post-Refactor)
- **Content Management**: Build a simple admin UI to add/edit scenarios
- **A/B Testing**: Test different feedback approaches
- **Localization**: Translate scenarios to French for Quebec market
- **Dynamic Difficulty**: Adjust scenario difficulty based on user performance
- **Coach Dashboard**: Export scenario data for team analysis
- **API**: Serve scenarios via API for native app
- **Scenario Marketplace**: Let coaches submit scenarios for review

---

## Execution Checklist for Cursor

### Week 1: CSS Extraction
- [ ] Create `styles/main.css`
- [ ] Extract all common styles
- [ ] Update 5 test files (index, onboarding, training, 2 scenarios)
- [ ] Test in browser
- [ ] Update remaining 25 files
- [ ] Commit: "Extract shared CSS to styles/main.css"

### Week 2: JS Extraction
- [ ] Create `js/storage.js`
- [ ] Create `js/analytics.js`
- [ ] Create `js/scenario.js`
- [ ] Update 2 test scenarios to use modules
- [ ] Test thoroughly
- [ ] Update remaining scenarios
- [ ] Commit: "Extract shared JS to modules"

### Week 3: JSON Conversion (Optional - Can Wait)
- [ ] Design final JSON schema
- [ ] Convert Module 1 to JSON
- [ ] Build `scenario.html` template
- [ ] Test Module 1 scenarios
- [ ] Migrate remaining modules
- [ ] Commit: "Convert scenarios to JSON data structure"

---

## Testing Checklist

After each phase:
- [ ] All pages load without errors
- [ ] Styles look identical to before
- [ ] LocalStorage saving/loading works
- [ ] GA4 events still fire
- [ ] Mobile responsive behavior intact
- [ ] Theory intros still appear first time
- [ ] Scoring system calculates correctly
- [ ] Share functionality works
- [ ] Navigation between pages works

---

## Git Strategy

**Branch Structure**:
```
main (production)
  ├── refactor/css-extraction
  ├── refactor/js-modules
  └── refactor/json-conversion
```

**Commit Often**:
- "Extract CSS variables to main.css"
- "Move button styles to shared stylesheet"
- "Update Module 1 scenarios to use main.css"
- "Create storage.js utility module"
- etc.

**Don't Push Broken Code to Main**:
- Test each phase fully before merging
- Keep old code until new code is validated
- Deploy to Netlify preview branch first

---

## Questions to Consider

1. **Do you want to keep 40 separate HTML files or consolidate to one template?**
   - Separate files = easier to manage initially
   - One template = more scalable long-term

2. **Should Theory Intros be in JSON or stay in HTML?**
   - JSON = more flexible
   - HTML = easier to style uniquely

3. **Do you want to keep GA4 inline or extract to config?**
   - Inline = visible
   - Config = cleaner but harder to debug

---

## Time Estimate

- **Phase 1 (CSS)**: 90 minutes
- **Phase 2 (JS)**: 2 hours
- **Phase 3 (JSON)**: 2 hours (optional)
- **Testing**: 1 hour
- **Buffer**: 1 hour

**Total: 4-7 hours of focused work**

---

**Ready to start in Cursor?** I recommend starting with Phase 1 (CSS extraction) since it's the safest and gives immediate benefits.
