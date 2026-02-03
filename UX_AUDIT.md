# Puck Academy UX Audit
**Date:** February 3, 2026
**Goal:** Identify why the app feels "bloated and confusing"

---

## Executive Summary

Your instinct is correct. The app has accumulated significant feature complexity over the past month of rapid iteration. The core value proposition (learn hockey IQ through quick scenarios) is buried under layers of gamification, progress tracking, and engagement systems.

**The good news:** The content itself is solid — 43 scenarios across 6 modules is genuinely valuable. The bloat is in the *presentation*, not the substance.

---

## Training Hub Analysis (training.html)

### Current State: 15+ Distinct UI Elements

When a user loads training.html, they see:

| Order | Element | Purpose |
|-------|---------|---------|
| 1 | Sticky nav (6 module pills + streak) | Quick navigation |
| 2 | Header (logo + auth) | Branding + account |
| 3 | Welcome toast | Returning user acknowledgment |
| 4 | Account banner | CTA for guests to sign up |
| 5 | Best score display | Show top performance |
| 6 | Coach intro | Personalized welcome |
| 7 | "Your Progress" card | First vs. latest scores |
| 8 | Streak alert banner | Loss aversion nudge |
| 9 | Streak hero card | Current streak + record |
| 10 | Daily challenge card | Today's featured scenario |
| 11 | Overall progress card | Stats + module breakdown |
| 12 | Section divider | "Recommended for you" |
| 13-18 | 6 Module accordions | The actual content |
| 19 | Results modal | Score after completion |
| 20 | Feedback form modal | Beta feedback collection |
| 21 | Paywall modal | Upgrade CTA (currently hidden) |

**Problem:** A 13-year-old opening this on their phone sees a wall of cards and numbers before they even get to a scenario.

### Progress Displayed 6+ Different Ways

Users see their progress in:
1. Sticky nav status dots (gray/red/green per module)
2. "Your Progress" card (first vs. latest scores)
3. Overall Progress card (modules/scenarios/accuracy)
4. Module mini-breakdown cards
5. Individual module progress bars
6. Module score badges when complete

**This is confusing.** It's unclear which number matters most or what they should focus on.

### Gamification Stack

- **Streaks:** Nav counter, hero card, at-risk banner, 6 milestone celebration thresholds
- **Daily Challenge:** Rotating featured scenario
- **Scores:** Per-scenario, per-module best, overall accuracy %
- **Progress:** Scenarios completed, modules completed, percentage

Each of these *individually* makes sense. Together, they create cognitive overload.

---

## User Journey Friction Points

### New User Flow (Landing → First Scenario)

```
Landing Page
    ↓
Assessment (4 required fields: name, birth year, position, level)
    ↓
"What to expect" summary
    ↓
Training Hub (wall of UI elements)
    ↓
Click Module 1
    ↓
Theory Intro (3 slides to read/skip)
    ↓
FINALLY: First scenario
```

**Time to first scenario:** ~2-3 minutes minimum

**Duolingo comparison:** Open app → pick a lesson → start within 30 seconds

### Returning User Flow

```
Training Hub loads
    ↓
See: streak alert? daily challenge? progress cards?
    ↓
Which module was I on?
    ↓
Find module in accordion, expand it
    ↓
Click scenario
    ↓
Do scenario
    ↓
Modal appears (want feedback? share score?)
```

**The path back to "just do a quick scenario" is not obvious.**

---

## Specific Friction Points (Prioritized)

### Critical (High Impact)

1. **Too many cards before content** - The first fold is all meta-information, zero scenarios
2. **No "Quick Play" option** - Can't just pick up and do one scenario without navigating accordions
3. **Progress overload** - Multiple conflicting progress indicators
4. **Theory intros add friction** - 3-slide popups before each new module

### Moderate (Worth Addressing)

5. **Daily Challenge competes with modules** - Is this the primary CTA or a secondary option?
6. **Streak system is prominent but optional** - Takes up prime real estate
7. **Account banner interrupts flow** - Persistent until dismissed
8. **Coach intro repeats value prop** - User already chose to train

### Minor (Nice to Have)

9. **Glossary link buried in coach intro** - Could be more discoverable
10. **Share functionality is complex** - URL params, static share pages, challenge banners

---

## Recommendations

### Tier 1: Quick Wins (Do This Week)

**1. Remove or collapse the "Overall Progress" card by default**
- It duplicates what's shown in sticky nav and module progress bars
- Users who want stats can expand it

**2. Make Daily Challenge optional/hidden**
- Move to a "bonus" section or make it a toggle
- The primary path should be: pick module → do scenarios

**3. Simplify streak display**
- Keep nav counter (subtle)
- Remove the large streak hero card — it's redundant with nav
- Keep at-risk banner (that's the useful part)

**4. Reduce Theory Intro to 1 slide max**
- Or: show only on first visit, with no ability to dismiss early (force reading)
- Currently: 3 slides with skip button = worst of both worlds

### Tier 2: Structural Changes (Next Sprint)

**5. Create "Continue" button at top**
- Shows last incomplete module + next scenario
- One tap to resume where they left off

**6. Collapse all modules by default**
- Auto-expand only the one they should focus on
- Removes visual noise

**7. Consolidate progress to ONE place**
- Remove: Your Progress card, Overall Progress card, module breakdown
- Keep: Sticky nav dots + per-module progress bar
- That's enough

**8. Consider removing Assessment for beta**
- Let users jump straight to training
- Capture name/position after they've done 1-2 scenarios (proven value)

### Tier 3: Rethink (Post-Beta)

**9. Question the streak system**
- Is it driving engagement or just adding noise?
- Run an A/B test: show streaks to 50% of users

**10. Simplify the share flow**
- Static share pages, URL params, challenge banners... lots of machinery
- Maybe just: copy score to clipboard

---

## Visual: Before vs. After (Conceptual)

### Current First Fold
```
┌─────────────────────────────┐
│ [Nav: M1 M2 M3 M4 M5 M6 🔥] │ ← Sticky nav
├─────────────────────────────┤
│ PUCK ACADEMY                │ ← Header
│ [Account banner - signup]   │ ← CTA for guests
├─────────────────────────────┤
│ [Coach intro message...]    │ ← Welcome
├─────────────────────────────┤
│ [Your Progress card]        │ ← Progress #1
├─────────────────────────────┤
│ [Streak Alert!]             │ ← Gamification
├─────────────────────────────┤
│ [Streak Card: 🔥 X days]    │ ← Gamification
├─────────────────────────────┤
│ [Daily Challenge card]      │ ← Gamification
├─────────────────────────────┤
│ [Overall Progress card]     │ ← Progress #2
├─────────────────────────────┤
│ Module 1 ▼                  │ ← Finally, content!
│ Module 2 ▼                  │
│ ...                         │
└─────────────────────────────┘
```

### Proposed First Fold
```
┌─────────────────────────────┐
│ [Nav: M1 M2 M3 M4 M5 M6 🔥3]│ ← Streak in nav, subtle
├─────────────────────────────┤
│ PUCK ACADEMY                │
├─────────────────────────────┤
│ [⚠️ Streak at risk! Do 1]  │ ← Only if applicable
├─────────────────────────────┤
│ [Continue: M2 Scenario 4 →] │ ← Clear primary action
├─────────────────────────────┤
│ Module 1 ✓ 5/7              │ ← Collapsed, shows score
│ Module 2 ▼ (expanded)       │ ← Auto-expanded
│   [Scenarios grid]          │
│ Module 3                    │
│ ...                         │
└─────────────────────────────┘
```

---

## Summary: What to Cut

| Element | Action |
|---------|--------|
| Overall Progress card | **Remove** (info in nav + modules) |
| Your Progress card | **Remove** (redundant) |
| Streak hero card | **Remove** (keep nav counter) |
| Daily Challenge card | **Hide** or move to bottom |
| Coach intro | **Shorten** to 1 sentence |
| Theory Intros | **Reduce** to 1 slide |
| Welcome toast | **Keep** (unobtrusive) |
| Account banner | **Keep** (needed for beta) |

**Net effect:** Remove 4 major UI elements, simplify 2 others. The training hub becomes focused on one thing: picking your next scenario.

---

## Next Steps

1. Review this audit and decide which recommendations to pursue
2. I can implement any of these changes if you'd like
3. Consider user testing with a fresh perspective after changes

The core app is good. It just needs decluttering.
