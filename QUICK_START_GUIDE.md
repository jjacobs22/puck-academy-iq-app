# Quick Start Guide - Refactoring Puck Academy

This guide walks you through implementing the refactor in Cursor, step by step.

---

## Prerequisites

- [ ] Open your `puck-academy-iq-app` repo in Cursor
- [ ] Make sure you have the latest code from GitHub
- [ ] Create a new branch: `git checkout -b refactor/extract-shared-code`

---

## Step 1: Extract CSS (30-45 minutes)

### 1.1 Create the styles directory and file

```bash
mkdir styles
touch styles/main.css
```

### 1.2 Copy the shared CSS

1. Open the `main.css` file I created in the outputs folder
2. Copy its entire contents
3. Paste into your new `styles/main.css` file

### 1.3 Update HTML files to use shared stylesheet

**Choose 3 test files first** to validate the approach:
- `index.html`
- `onboarding.html`
- `hockey-iq-diagram.html`

For each file:

1. **Find the `<style>` block** (usually in `<head>`)

2. **Replace it with a link to the shared stylesheet:**
   ```html
   <!-- Google Fonts -->
   <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Work+Sans:wght@400;500;600&display=swap" rel="stylesheet">

   <!-- Main Styles -->
   <link rel="stylesheet" href="styles/main.css">
   ```

3. **Keep ONLY truly page-specific styles** in a minimal `<style>` block if needed

4. **Test in browser** - open the file and verify it looks identical to before

### 1.4 Once 3 files work, update the remaining 25 files

Use the same process. This is repetitive but safe.

**Files to update:**
- `training.html`
- All Module 1 scenarios (5 files)
- All Module 2 scenarios (7 files)
- All Module 3 scenarios (7 files)
- All Module 4 scenarios (7 files)
- All Module 5 scenarios (7 files)
- All Module 6 scenarios (7 files)
- `tylers-coaching-notes.html`

### 1.5 Commit your work

```bash
git add styles/main.css
git add *.html
git commit -m "Extract shared CSS to styles/main.css"
```

---

## Step 2: Extract JavaScript (1-2 hours)

### 2.1 Create the js directory and files

```bash
mkdir js
touch js/storage.js
touch js/analytics.js
touch js/scenario.js
```

### 2.2 Copy the JS modules

Copy the contents from the outputs folder:
- `storage.js` → `js/storage.js`
- `analytics.js` → `js/analytics.js`
- `scenario.js` → `js/scenario.js`

### 2.3 Update ONE scenario file to use modules

Pick a test file: `hockey-iq-diagram.html`

**Find the inline `<script>` section** (usually at bottom of `<body>`)

**Replace with:**

```html
<script type="module">
  import { createScenario } from './js/scenario.js';

  // Initialize scenario
  const scenario = createScenario({
    moduleNumber: 1,
    scenarioNumber: 1,
    scenarioId: 'module1-scenario1',
    answers: [
      {
        text: "Chase the puck carrier into the corner",
        correct: false,
        feedback: "Not the best choice here. If you chase, you abandon the high slot..."
      },
      {
        text: "Hold the high slot and read the play",
        correct: true,
        feedback: "Perfect read! By holding the high slot, you're covering the most dangerous scoring area..."
      },
      {
        text: "Pinch down to double-team",
        correct: false,
        feedback: "Too aggressive in this situation. If you pinch and they escape the corner..."
      },
      {
        text: "Communicate and stay high",
        correct: false,
        feedback: "Close, but communication alone isn't enough..."
      }
    ]
  });
</script>
```

**Key points:**
- Use `type="module"` on the script tag
- Import from `./js/scenario.js` (relative path)
- The `createScenario()` function handles everything

### 2.4 Test thoroughly

1. Open `hockey-iq-diagram.html` in browser
2. Click each answer
3. Verify:
   - Feedback displays correctly
   - Score saves to localStorage
   - "Back to Module Hub" button works
   - GA4 events fire (check Network tab)

### 2.5 Update remaining scenario files

Once one file works, apply the same pattern to all 40 scenario files.

**Important:** You'll need to adjust for each scenario:
- `moduleNumber` and `scenarioNumber`
- `scenarioId`
- `answers` array content

### 2.6 Commit your work

```bash
git add js/
git add *.html
git commit -m "Extract shared JavaScript to modules"
```

---

## Step 3: JSON Conversion (OPTIONAL - Can Wait)

This is more complex and can be done later. Only proceed if:
- Phases 1-2 are working perfectly
- You're ready to change the architecture more significantly

### 3.1 Create data directory and file

```bash
mkdir data
touch data/scenarios.json
```

### 3.2 Convert scenarios to JSON

Use the `example-scenarios.json` file I created as a template.

**Start with Module 1 only:**
- Extract all 5 Module 1 scenarios into JSON format
- Follow the schema structure

### 3.3 Create dynamic scenario.html template

Instead of 40 separate HTML files, create ONE template that loads data dynamically.

This is a bigger architectural change - recommend discussing the approach before implementing.

---

## Testing Checklist

After each phase, verify:

- [ ] All pages load without console errors
- [ ] Styles look identical to before refactor
- [ ] Answer buttons work correctly
- [ ] Feedback displays properly
- [ ] LocalStorage saves/loads correctly
- [ ] GA4 events still fire (check Network tab in DevTools)
- [ ] Navigation between pages works
- [ ] Mobile responsive layout still works
- [ ] Theory intro overlays appear (if applicable)
- [ ] Scoring system calculates correctly
- [ ] Share functionality works

---

## Deployment

### Before pushing to main:

1. **Test everything locally** with the checklist above
2. **Create a preview deployment** (if using Netlify, push to a branch and check the preview URL)
3. **Only merge to main** once you've confirmed everything works

### Deploy to Netlify:

```bash
git push origin refactor/extract-shared-code
```

Then create a Pull Request on GitHub and merge after review.

---

## Rollback Plan

If something breaks:

```bash
# Revert to previous commit
git revert HEAD

# Or discard all changes and go back to main
git checkout main
git branch -D refactor/extract-shared-code
```

Your old code is safe in git history!

---

## Common Issues & Solutions

### Issue: "Uncaught SyntaxError: Cannot use import statement outside a module"

**Solution:** Make sure your script tag has `type="module"`:
```html
<script type="module">
```

### Issue: "Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of text/html"

**Solution:** Check your import paths. They should be relative:
```javascript
import { Storage } from './js/storage.js';  // ✅ Correct
import { Storage } from 'js/storage.js';     // ❌ Wrong
```

### Issue: CSS not loading / page looks broken

**Solution:** Check the stylesheet path is correct:
```html
<link rel="stylesheet" href="styles/main.css">  <!-- If in root -->
<link rel="stylesheet" href="../styles/main.css">  <!-- If in subfolder -->
```

### Issue: GA4 events not firing

**Solution:** Make sure the GA4 script is loaded BEFORE your module script:
```html
<!-- Google Analytics (in <head>) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-0N3XTSRTM2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-0N3XTSRTM2');
</script>

<!-- Your module script (at end of <body>) -->
<script type="module">
  import { Analytics } from './js/analytics.js';
  // ...
</script>
```

---

## Next Steps After Refactor

Once this refactor is complete, you'll be able to:

1. **Add new scenarios 10x faster** - just update JSON, no HTML duplication
2. **Fix bugs once** - instead of in 40+ files
3. **Experiment with new features** - change the shared modules, not every file
4. **Build admin tools** - create a simple UI to add scenarios without touching code
5. **Scale to 100+ scenarios** - the architecture will support it

---

## Questions?

If you run into issues in Cursor:
1. Check the browser console for errors
2. Verify file paths are correct
3. Make sure you're testing with a local server (not just opening HTML files directly)
4. Use git to revert if needed

Good luck! 🏒
