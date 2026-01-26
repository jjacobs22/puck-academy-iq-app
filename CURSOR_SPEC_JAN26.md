# Cursor Spec: Theory Intro + Diagram Improvements
**Date:** January 26, 2026
**Context:** Beta feedback punch list items

---

## Background

We received beta feedback on Puck Academy and identified these priorities (in order):

1. **Theory intro before quizzes** — Users feel thrown in without foundation
2. **Diagram improvements** — Clean up visuals, fix text overlaps, better sizing
3. **Animated play unfold** — Show the play develop after correct answer (future)
4. **New content: Defense module** — Content specifically for defensemen (future)
5. **New content: Forechecking module** — F1/F2/F3 reads, etc. (future)

Difficulty level feedback was "about right" so no changes needed there.

**Goal:** Build it right, even if slower. Quality over speed.

---

## Feature 1: Theory Intro (Module Onboarding)

### Overview
Add an optional 2-3 slide intro overlay that appears when a user enters a module for the first time. Uses the Coach persona to introduce the key concept before jumping into scenarios.

### User Flow
1. User clicks on a module from `training.html`
2. If first time entering this module → show Theory Intro overlay
3. User clicks through 2-3 slides (or clicks "Skip")
4. After completing or skipping → proceed to first scenario
5. On return visits → go directly to scenarios (but "Review Intro" link available)

### UI/UX Requirements

**Overlay Design:**
- Full-screen modal overlay with dark semi-transparent backdrop
- Card-style content area (similar to existing scenario cards)
- Progress dots showing current slide (● ○ ○)
- "Skip" button always visible (top right or bottom)
- "Next" / "Got it, let's go" button to advance

**Slide Content Structure:**
Each slide has:
- Coach avatar (small, top left of card)
- Headline (Bebas Neue font, ~1.5rem)
- Body text (1-2 sentences max, Work Sans)
- Simple diagram or icon (optional, SVG inline)

**Slide Content by Module:**

### Module 1: Defensive Zone
**Slide 1:** "Your Job in the D-Zone"
- "As a center, you own the middle of the ice. Your D-men handle the boards — you take away the slot."
- Diagram: Simple rink showing center's coverage zone highlighted

**Slide 2:** "Trust the Structure"
- "When your D pressures the puck, don't chase. Stay home, cover the dangerous player, and be ready to transition."
- Diagram: Show center holding position while D pressures

**Slide 3:** "Defense Creates Offense"
- "Good positioning in the D-zone sets up the breakout. You're not just defending — you're the first step in the attack."
- CTA: "Got it, let's train →"

### Module 2: Faceoffs
**Slide 1:** "Faceoffs Are Chess, Not Checkers"
- "Winning the draw is about preparation, reads, and leverage — not just quick hands."

**Slide 2:** "Read Before You React"
- "Watch the ref's grip, the opponent's stance, and your wingers' positioning. The draw starts before the puck drops."

**Slide 3:** "Win the Possession, Not Just the Draw"
- "A 'won' faceoff that goes to the other team isn't a win. Know where you're putting it."
- CTA: "Got it, let's train →"

### Module 3: Breakouts
**Slide 1:** "Speed Kills — But Patience Scores"
- "A breakout isn't a race. It's about finding the right route and reading the pressure."

**Slide 2:** "Routes Have Names for a Reason"
- "High, low, wheel, reverse — know your options so you can make the right call under pressure."

**Slide 3:** "Support Your D"
- "Give your defenseman options. If you're not open, you're not helping."
- CTA: "Got it, let's train →"

### Technical Implementation

**Storage:**
```javascript
// localStorage key: puckAcademy_introSeen
{
  module1: true,  // User has seen Module 1 intro
  module2: false,
  module3: true
}
```

**Files to modify:**
- `training.html` — Add logic to check intro status, redirect through intro if needed
- Create new file: `module-intro.html` — Generic intro page that loads content based on module param

OR (simpler approach):
- Add intro overlay directly to first scenario of each module
- Check localStorage on page load, show overlay if not seen

**Recommended approach:** Add overlay to first scenario page of each module. Simpler, no new routing needed.

**Entry points:**
- Module 1: `hockey-iq-diagram.html` (Scenario 1-1)
- Module 2: `module2-scenario1-ref-position.html`
- Module 3: `module3-scenario1-high-low-route.html`

### Accessibility
- Escape key closes/skips overlay
- Focus trapped within modal while open
- Slides navigable via arrow keys

---

## Feature 2: Diagram Cleanup

### Current Issues
- Player circles vary in size inconsistently (18-24px radius)
- Text labels sometimes overlap shapes or get cut off
- Visual hierarchy unclear — hard to quickly parse who's who
- Feedback elements (arrows, zones) can clutter the diagram
- No consistent style guide across 19 scenarios

### Improvements to Make

**Player Sizing:**
- Standardize: You = 26px radius, teammates = 22px, opponents = 22px, puck = 8px
- "You" player should be visually distinct (gold fill + thicker stroke already good)

**Text Labels:**
- Move all text labels outside of player circles where possible
- Use consistent font size (12px for player labels, 10px for zone labels)
- Add subtle text shadow or background for readability on ice

**Visual Hierarchy:**
- Primary focus: "You" player (gold, pulsing animation)
- Secondary: Puck (animated opacity)
- Tertiary: Other players (static, clear team colors)
- Feedback elements: Only appear after answer, with smooth fade-in

**Whitespace:**
- Increase padding in rink container
- Don't crowd players near edges of viewBox

**Consistency:**
- Extract common SVG styles to a shared `<style>` block pattern
- Document the "diagram style guide" in PROJECT_CONTEXT.md

### Files to Update
All 19 scenario files need diagram review:
- Module 1: `hockey-iq-diagram.html`, `scenario-2-corner-battle.html`, `scenario-3-cycle.html`, `scenario-4-breakout.html`, `scenario-5-gap.html`
- Module 2: `module2-scenario1-ref-position.html` through `module2-scenario7-post-draw.html`
- Module 3: `module3-scenario1-high-low-route.html` through `module3-scenario7-broken-play.html`

### Approach
1. Fix one scenario as the "template" (suggest `hockey-iq-diagram.html`)
2. Document the exact styles/sizes used
3. Apply consistently to remaining 18 scenarios

---

## Code Style Reminders

From PROJECT_CONTEXT.md:

- HTML/CSS/vanilla JS (no frameworks)
- Tailwind utility classes acceptable
- Keep files self-contained when possible
- Don't add npm dependencies without asking
- Hockey-authentic language, not corporate
- All scenarios: situation → question → 4 options → feedback
- Feedback always explains *why* — not just right/wrong
- Coach persona voice: direct, confident, supportive

**Brand Colors:**
- Ice Blue: `#E8F4F8`
- Dark Blue: `#0A1628`
- Accent Red: `#C8102E`
- Silver: `#A8B2BE`
- Success Green: `#2D7A3E`
- Error Red: `#B91C1C`

**Fonts:**
- Headers: Bebas Neue
- Body: Work Sans

---

## Suggested Order of Work

1. **Theory Intro for Module 1** — Build the overlay system on `hockey-iq-diagram.html`
2. **Test & refine** — Make sure it feels right before replicating
3. **Diagram cleanup on Scenario 1-1** — Establish the template
4. **Apply intro to Modules 2 & 3** — Replicate pattern with module-specific content
5. **Apply diagram fixes to remaining scenarios** — Batch this work
6. **Update PROJECT_CONTEXT.md** — Document what changed

---

## Questions to Resolve

- Should intro be skippable mid-slide or only via Skip button?
- Do we want a "Review Intro" link on the training.html module cards?
- Should we add a brief Coach message on training.html before they pick a module? (e.g., "Pick a module to start. I'll walk you through the key concepts first.")

---

*Paste this file into Cursor to provide full context for implementation.*
