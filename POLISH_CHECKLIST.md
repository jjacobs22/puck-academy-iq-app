# Puck Academy Polish Checklist

**Goal:** Make the app feel professional before introducing payments.
**Estimated Total Time:** 6-8 hours across all items.

---

## CRITICAL (Do First) — ~1.5 hours

### 1. Add Focus-Visible States Globally
**File:** `styles/main.css`
**Time:** 15 min
**Why:** Keyboard users can't see what's focused. Accessibility violation.

```css
/* Add near the top of main.css, after :root variables */

/* Focus states for keyboard navigation */
:focus {
  outline: none;
}

:focus-visible {
  outline: 2px solid var(--accent-red);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Specific focus for buttons */
.btn:focus-visible,
.answer-btn:focus-visible,
button:focus-visible {
  outline: 2px solid var(--accent-red);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(200, 16, 46, 0.2);
}

/* Focus for form inputs */
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: none;
  border-color: var(--accent-red);
  box-shadow: 0 0 0 3px rgba(200, 16, 46, 0.15);
}
```

---

### 2. Respect Reduced Motion Preference
**File:** `styles/main.css`
**Time:** 10 min
**Why:** Infinite pulsing animations cause issues for motion-sensitive users.

```css
/* Add at the end of main.css */

/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Also update:** Any `@keyframes` with `infinite` — change to `animation-iteration-count: 3` or remove entirely.

Files to check:
- `index.html` — `.pulse-border` animation
- `hockey-iq-diagram.html` — zone overlay animations
- `training.html` — any pulsing elements

---

### 3. Fix Button Disabled States
**File:** `styles/main.css`
**Time:** 15 min
**Why:** Current `opacity: 0.5` is too subtle. Users don't realize button is disabled.

```css
/* Replace existing .btn:disabled styles */

.btn:disabled,
.btn[disabled],
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
  background: var(--silver) !important;
  border-color: var(--silver) !important;
  color: rgba(255, 255, 255, 0.7) !important;
  transform: none !important;
  box-shadow: none !important;
}

/* Tooltip hint for disabled buttons (optional) */
.btn:disabled::after {
  content: attr(data-disabled-reason);
  /* Only shows if you add data-disabled-reason="Complete all fields" to the button */
}
```

---

### 4. Add Button Loading States
**File:** `styles/main.css`
**Time:** 20 min
**Why:** Click → nothing happens → feels broken.

```css
/* Button loading state */
.btn.loading {
  position: relative;
  color: transparent !important;
  pointer-events: none;
}

.btn.loading::after {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  top: 50%;
  left: 50%;
  margin-left: -9px;
  margin-top: -9px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: btn-spinner 0.6s linear infinite;
}

@keyframes btn-spinner {
  to { transform: rotate(360deg); }
}
```

**Usage in JS:**
```javascript
// When button is clicked
btn.classList.add('loading');
btn.disabled = true;

// When action completes
btn.classList.remove('loading');
btn.disabled = false;
```

**Apply to:**
- `index.html` — "Start Training" CTA
- `assessment.html` — "Start Training" submit
- `training.html` — scenario card clicks
- All scenario files — "Next" button

---

### 5. Add Alt Text to SVG Diagrams
**Files:** All 43 scenario HTML files
**Time:** 30 min (batch find/replace)
**Why:** Screen readers can't describe the rink. Complete accessibility failure.

**Find:** `<svg class="rink"`
**Replace with:** `<svg class="rink" role="img" aria-label="Hockey rink diagram showing [DESCRIPTION]"`

Example descriptions:
- Module 1: "defensive zone positioning with player in high slot"
- Module 2: "faceoff circle with player stances"
- Module 3: "breakout routes from defensive zone"

**Batch approach in Cursor:**
1. Search all scenario files for `<svg class="rink"`
2. Add `role="img" aria-label="Hockey rink diagram"` to each
3. Customize descriptions for key scenarios (at minimum: first scenario of each module)

---

## HIGH PRIORITY — ~2 hours

### 6. Fix Mobile Layouts (<500px)
**File:** `styles/main.css`
**Time:** 45 min
**Why:** Kids on phones = your main users. Current breakpoints skip small phones.

```css
/* Add new mobile breakpoint */
@media (max-width: 500px) {
  /* Reduce base padding */
  .container {
    padding: 0 12px;
  }

  /* Stack form rows */
  .form-row {
    flex-direction: column;
    gap: 12px;
  }

  .form-row > * {
    width: 100% !important;
  }

  /* Smaller buttons */
  .btn {
    padding: 12px 20px;
    font-size: 0.95rem;
  }

  /* Tighter cards */
  .card {
    padding: 16px;
  }

  /* Smaller scenario numbers */
  .scenario-number {
    font-size: 2rem;
  }

  /* Tighter feedback boxes */
  .feedback-box {
    padding: 16px;
  }

  /* Single column grids */
  .scenarios-grid {
    grid-template-columns: 1fr;
  }

  /* Smaller rink diagram */
  .rink-container {
    max-height: 350px;
  }

  /* Reduce modal padding */
  .modal-content {
    padding: 20px;
    margin: 10px;
    max-height: 90vh;
  }
}
```

---

### 7. Fix Answer Button Feedback
**File:** `styles/main.css`
**Time:** 20 min
**Why:** Current hover (just border change) is too subtle. Need press/active states.

```css
/* Enhanced answer button states */
.answer-btn {
  transition: all 0.15s ease;
}

.answer-btn:hover:not(:disabled):not(.selected) {
  background: rgba(200, 16, 46, 0.1);
  border-color: var(--accent-red);
  transform: translateY(-1px);
}

.answer-btn:active:not(:disabled) {
  transform: translateY(1px);
  background: rgba(200, 16, 46, 0.15);
}

/* Selected state (before reveal) */
.answer-btn.selected {
  background: rgba(200, 16, 46, 0.15);
  border-color: var(--accent-red);
  border-width: 2px;
}

/* After answer revealed - fade non-selected */
.answer-btn.revealed:not(.selected) {
  opacity: 0.5;
}

/* Correct answer highlight */
.answer-btn.correct {
  background: rgba(45, 122, 62, 0.2);
  border-color: var(--success-green);
}

/* Incorrect answer highlight */
.answer-btn.incorrect {
  background: rgba(200, 16, 46, 0.2);
  border-color: var(--accent-red);
}
```

---

### 8. Consistent Border Radius
**File:** `styles/main.css`
**Time:** 15 min
**Why:** Currently 4px, 8px, 10px, 12px, 15px all used randomly. Looks amateur.

**Decision:** Use 8px everywhere except pills (full round).

```css
/* Update :root variables */
:root {
  --radius-sm: 6px;   /* small elements, inputs */
  --radius-md: 8px;   /* cards, buttons, modals */
  --radius-lg: 12px;  /* large cards, hero sections */
  --radius-full: 9999px; /* pills, avatars */
}
```

**Then find/replace:**
- `border-radius: 4px` → `border-radius: var(--radius-sm)`
- `border-radius: 10px` → `border-radius: var(--radius-md)`
- `border-radius: 12px` → `border-radius: var(--radius-md)`
- `border-radius: 15px` → `border-radius: var(--radius-lg)`

---

### 9. Make Borders Actually Visible
**File:** `styles/main.css`
**Time:** 15 min
**Why:** `rgba(255,255,255,0.1)` at 1px is nearly invisible. Cards blend together.

```css
/* Update border color variable */
:root {
  --border-subtle: rgba(255, 255, 255, 0.15);  /* was 0.1 */
  --border-default: rgba(255, 255, 255, 0.2);  /* new */
  --border-strong: rgba(255, 255, 255, 0.3);   /* for emphasis */
}

/* Apply to cards */
.card,
.module-card,
.scenario-card {
  border: 1px solid var(--border-default);
}

/* Hover gets stronger border */
.card:hover,
.scenario-card:hover {
  border-color: var(--border-strong);
}
```

---

### 10. Soften Rink Container Contrast
**Files:** All scenario HTML files OR create shared class
**Time:** 15 min
**Why:** Pure white (#fff) on dark blue is harsh. Feels jarring.

```css
/* Add to main.css */
.rink-container {
  background: #F8FAFC;  /* Softer off-white */
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
}
```

---

## MEDIUM PRIORITY — ~2 hours

### 11. Copy/Tone Consistency Pass
**Files:** `index.html`, `assessment.html`, `training.html`
**Time:** 30 min
**Why:** Mixing casual ("Talk to Coach") with formal ("Position") feels unprofessional.

**Decide on a voice:** Confident coach, not marketing speak.

| Current | Better |
|---------|--------|
| "Train Your Hockey IQ Like the Pros" | "Become a Smarter Player" |
| "Real situations you'll face in games" | "30-second scenarios that test every read" |
| "Talk to Coach" | "Ask Coach" |
| "Start Training →" | "Start Training" (remove arrow or use everywhere) |
| "Your Modules" | "Your Training Plan" |
| "Start your first streak today!" | "Complete any scenario to start your streak" |

---

### 12. Add Empty States
**File:** `training.html`
**Time:** 30 min
**Why:** What does it look like with no progress? Currently just... empty.

```html
<!-- Add inside the progress section when no modules started -->
<div class="empty-state">
  <div class="empty-icon">🎯</div>
  <p>Complete your first scenario to start tracking progress</p>
</div>
```

```css
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: var(--silver);
}

.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
  opacity: 0.7;
}

.empty-state p {
  font-size: 0.95rem;
  max-width: 280px;
  margin: 0 auto;
}
```

---

### 13. Add Error States for Forms
**File:** `styles/main.css` + `assessment.html`
**Time:** 30 min
**Why:** If validation fails, users see nothing. No red border, no message.

```css
/* Error state for inputs */
input.error,
select.error {
  border-color: var(--accent-red) !important;
  background: rgba(200, 16, 46, 0.05);
}

/* Error message */
.error-message {
  color: var(--accent-red);
  font-size: 0.85rem;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.error-message::before {
  content: "⚠";
}
```

**In assessment.html JS:**
```javascript
// Show error
input.classList.add('error');
errorEl.textContent = 'Please enter a valid year';
errorEl.style.display = 'block';

// Clear error
input.classList.remove('error');
errorEl.style.display = 'none';
```

---

### 14. Add Semantic HTML to Module Headers
**File:** `training.html`
**Time:** 20 min
**Why:** Screen readers don't know module headers are clickable.

**Current:**
```html
<div class="module-header" onclick="toggleModule(1)">
```

**Better:**
```html
<button class="module-header"
        onclick="toggleModule(1)"
        aria-expanded="false"
        aria-controls="module-1-content">
```

**Update JS to toggle `aria-expanded`:**
```javascript
function toggleModule(moduleId) {
  const header = document.querySelector(`#module-${moduleId} .module-header`);
  const isExpanded = header.getAttribute('aria-expanded') === 'true';
  header.setAttribute('aria-expanded', !isExpanded);
  // ... rest of toggle logic
}
```

---

### 15. Add Progress Dots ARIA Labels
**File:** `assessment.html`
**Time:** 10 min
**Why:** Screen reader users can't understand the progress indicator.

**Current:**
```html
<div class="progress-dots">
  <span class="dot active"></span>
  <span class="dot"></span>
  ...
</div>
```

**Better:**
```html
<div class="progress-dots" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="4" aria-label="Step 1 of 4">
  <span class="dot active" aria-hidden="true"></span>
  <span class="dot" aria-hidden="true"></span>
  ...
</div>
```

**Update JS when step changes:**
```javascript
progressDots.setAttribute('aria-valuenow', currentStep);
progressDots.setAttribute('aria-label', `Step ${currentStep} of 4`);
```

---

## LOW PRIORITY (Nice to Have) — ~1 hour

### 16. Fade In Feedback Text
**File:** `styles/main.css`
**Time:** 10 min

```css
.feedback-box {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

### 17. Add Streak Celebration Animation
**File:** `training.html` + `styles/main.css`
**Time:** 20 min

```css
.streak-badge.celebrating {
  animation: pop 0.4s ease;
}

@keyframes pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
```

---

### 18. Scenario Card Press Effect
**File:** `styles/main.css`
**Time:** 10 min

```css
.scenario-card:active {
  transform: scale(0.98);
  box-shadow: var(--shadow-sm);
}
```

---

### 19. "Next Scenario" Instead of "Next"
**Files:** All scenario HTML files
**Time:** 15 min (find/replace)

**Find:** `>Next<`
**Replace:** `>Next Scenario<`

---

## Testing Checklist

After making changes, test:

- [ ] Tab through entire app with keyboard only
- [ ] Test on iPhone SE (smallest common phone)
- [ ] Test with screen reader (VoiceOver on Mac: Cmd+F5)
- [ ] Test with `prefers-reduced-motion` enabled
- [ ] Click every button and verify feedback
- [ ] Complete a scenario end-to-end
- [ ] Check all form validation states

---

## Done!

When complete, the app should:
- Feel responsive to every interaction
- Work for keyboard and screen reader users
- Look good on a 375px phone screen
- Have consistent visual language
- Handle errors gracefully

Good luck! 🏒
