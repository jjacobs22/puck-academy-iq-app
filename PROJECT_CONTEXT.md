# PROJECT_CONTEXT.md

**Last Updated:** February 3, 2026  
**Project:** Puck Academy Hockey IQ Training App  
**Author:** Jason Jacobs

---

## PRODUCT OVERVIEW

### Vision
Build "Duolingo for Hockey IQ" — a self-paced micro-learning app that systematically trains hockey decision-making through video-based scenarios, ultimately becoming the definitive two-way center development system sought after by elite programs worldwide.

### Problem Statement
There's a massive gap in hockey development between generic youth curricula and expensive elite 1-on-1 coaching. Players ages 12-15 need systematic training in hockey IQ and decision-making, but current solutions focus heavily on physical skills while ignoring the cognitive aspects of the game. Parents are spending thousands on ice time and skills coaches without addressing the mental game that separates good players from great ones. Most elite programs can teach systems and tactics, but they struggle to systematically develop hockey IQ and decision-making — they rely on either innate talent or inconsistent video review. There's no structured, progressive curriculum for teaching the cognitive side of the game.

### Value Proposition
Unlike VR-based solutions (Sense Arena - $500+ hardware required) or abstract cognitive training (IntelliGym), Puck Academy delivers accessible, systematic hockey IQ education through video-based pattern recognition training that works on any phone or tablet. We're the "online ground school" that teaches the *why* behind decisions — not just repetitive drills.

Unlike expensive private coaching ($1,000+ per package), Puck Academy makes elite hockey IQ development accessible to everyone at a fraction of the cost, available anywhere, anytime.

### Target Customers

**Primary User: The Competitive Youth Center (12-15 years old)**
- Playing AA/AAA level hockey, aspires to high school varsity, prep school, or junior hockey
- Already committed to the sport — on the ice 3-5x per week
- Motivated but may resist "homework" disguised as an app
- Current behavior: Watches NHL highlights passively, gets inconsistent video feedback from coaches
- What motivates them: Getting better, making the next team, being the smartest player on the ice
- What frustrates them: Generic advice, boring drills, not understanding *why* certain plays work

**Secondary User: The Hockey Parent**
- Investing heavily in their child's development ($5K-15K+ annually on hockey)
- Wants measurable progress and structured training beyond ice time
- Often feels like they're "throwing money at the problem" without a clear development path
- Current behavior: Pays for skills coaches, travel teams, camps — but struggles to find hockey IQ training
- What motivates them: Giving their kid every advantage, seeing tangible improvement
- What frustrates them: Lack of visibility into what their kid is learning, no way to measure mental game progress

**Future User: The Youth Hockey Coach**
- Looking for tools to supplement on-ice instruction
- Wants to assign specific modules based on player position and development needs
- Interested in aggregate data on where their team needs improvement

### Success Metrics (MVP Validation)
1. **Engagement:** 10-15 beta users complete at least 3 modules
2. **Session depth:** Users spend 10-15 minutes per session, 3-4x per week
3. **Retention:** 80%+ user retention after first week
4. **Learning outcomes:** Pre/post assessment shows improvement in decision-making scenarios
5. **Qualitative signal:** Players and parents report genuine value in feedback

### User Feedback Insights (February 2026)

**Emerging audience: Adult beer league players**
- Multiple users discovering the app via Reddit are adult beginners/beer league players
- They see value in learning positioning & strategy fundamentals they never learned growing up
- One user forwarded the site to his entire beer league team (beginners)

**Content feedback:**
- "Highlights answers to a lot of common questions regarding positioning & strategy" — validates core value prop
- "More geared towards forwards" — opportunity for defense-specific content
- Request for "big picture" module on team zone setups/strategy
- "Very little resources for these topics vs gear/skating/shooting tutorials" — confirms market gap

**Use cases beyond target demo:**
- Coaches using it to teach systems to youth teams (U9+)
- Adult learners who didn't grow up playing minor hockey
- Players learning new systems when joining a new team

**Quotes:**
> "I'd use a resource like this for my minor hockey kids teams once we start teaching positioning & strategy" — Andrew L. (coaches U5, plays men's beer league)

> "I definitely can see getting value from it, and I actually forwarded the website to my beer league team, as a lot of my teammates are beginners." — Brandan I.

---

## PRODUCT SCOPE

### MVP Features (Must Have)

**Core Learning Experience:**
- Video-based scenario presentation with realistic rink diagrams
- Multiple choice decision points ("What should you do?")
- Immediate feedback with explanation of correct/incorrect choices
- Progress through linear modules (must complete to unlock next)
- **43 interactive scenarios across 6 modules:**
  - Module 1: Defensive Zone (7 scenarios) — Centers
  - Module 2: Faceoffs (7 scenarios) — Centers
  - Module 3: Breakouts (7 scenarios) — Centers
  - Module 4: Offensive Zone (7 scenarios) — Centers
  - Module 5: Forechecking (8 scenarios) — Centers
  - Module 6: D-Zone (7 scenarios) — Defensemen
- Scoring system tracking correct/incorrect answers per module
- Results modal with score display and performance-based messaging

**Onboarding Flow:**
- Position selection (Center, Winger, Defense, Goalie)
- Email capture (optional) for follow-up
- Level selection (Youth A/AA, Youth AAA, High School/Prep, Juniors/College, Pro/Semi-Pro, Adult Rec)
- Improvement area selection (Defensive Zone, Faceoffs, Breakouts, Offensive Zone, Overall Hockey IQ)

**User Progress:**
- Progress tracking across scenarios
- Completion indicators for each module
- Score tracking (best score and current run)
- Simple streak/achievement display (planned)

**Sharing & Social:**
- Share Score button on results modal
- Native share (mobile) with Web Share API
- Clipboard fallback (desktop)
- Score included in share URL parameter
- Challenge banner on landing page when accessed via shared link

**Data Collection:**
- Supabase accounts for user registration (email via magic link auth)
- Google Forms integration for beta feedback collection

### Post-MVP Features (Nice to Have)

**Enhanced Learning:**
- Spaced repetition algorithm (Duolingo-style) to reinforce difficult scenarios
- Video breakdown tools (pause, draw on screen, slow-mo)
- Expert commentary from elite coaches
- Branching scenarios where decisions play out on video
- **Video-based scenarios** (beta feedback Jan 2026):
  - 5-10 second clips of pros/college players in real game situations
  - "Based on this clip, what should player X do?" format
  - Clip plays, pauses at decision point, user selects answer
  - Helmet cam POV for immersive first-person experience
  - Requires: video sourcing/licensing, hosting considerations

**Engagement & Gamification:**
- Daily challenges and streak tracking
- Leaderboards (compare with teammates or age group)
- Badge/level system that becomes meaningful to coaches and scouts
- "Rep tracking" — "You've made 500 defensive zone reads this month"

**Expanded Content:**
- Module 2: Faceoffs (win techniques, puck protection, support positioning)
- Module 3: Breakouts (transition reads, support vs. stretch decisions)
- Module 4: Offensive Zone
- Position-specific tracks beyond centers (wingers, defensemen)
- Skill level differentiation (A/AA/AAA, High School, Prep)

**Platform Expansion:**
- Native iOS/Android apps
- Offline mode for travel (bus to games, etc.)
- Coach dashboard for team management
- Parent progress visibility dashboard

**Assessment & Credentialing:**
- Pre/post assessment with percentile rankings
- Certification levels that programs recognize ("Level 3 Certified Center")
- Integration with MyHockeyRankings or recruiting platforms

### Non-Goals (Out of Scope)

- **Physical skill training** — We don't teach skating, shooting, or stickhandling
- **Live coaching** — No human-in-the-loop feedback or video calls
- **Team management features** — Not building a team communication platform
- **VR/AR components** — Keeping it accessible on any device
- **User-generated content** — All scenarios are curated/validated by experts
- **Native mobile apps for MVP** — Web-first approach (responsive design)
- **Payment/subscription for beta** — Free beta, monetization comes later
- **All positions simultaneously** — Starting narrow with centers only

---

## USER EXPERIENCE

### Core User Flow

1. **Discovery:** User finds app via Puck Academy podcast/newsletter or direct link
2. **Onboarding:** Complete 5-step flow (value prop → position → level → goals → start)
3. **Module Hub:** See all 6 modules available with 43 total scenarios
4. **Scenario Experience:**
   - View rink diagram with situation description
   - Read the question ("What should you do?")
   - Select from 4 answer options
   - Receive immediate feedback (correct/incorrect with explanation)
   - Scenario marked complete, return to module hub
5. **Module Completion:** Finish all 5 scenarios, see results modal with score
6. **Share Score:** Option to share results via native share or clipboard
7. **Feedback:** Prompted to complete Google Form with beta feedback
8. **Return:** Come back to retry for better score or review scenarios

### Scoring System

**How It Works:**
- Each scenario tracks correct (true) or incorrect (false) in `scoreData.currentRun`
- Results modal shows X/5 score when all scenarios completed
- Best score saved to localStorage for future reference
- Performance-based messaging:
  - 5/5: "PERFECT SCORE!" with trophy emoji 🏆
  - 4/5: "GREAT JOB!" with fire emoji 🔥
  - 3/5: "GOOD EFFORT!" with star emoji ⭐
  - 0-2/5: "KEEP LEARNING!" with books emoji 📚

**Data Structure:**
```javascript
// localStorage key: puckAcademy_scores
{
  currentRun: {
    1: true,   // Scenario 1: correct
    2: false,  // Scenario 2: incorrect
    3: true,   // etc.
    4: true,
    5: false
  },
  bestScore: 4  // Best score achieved
}
```

### Share Functionality (Challenge a Friend)

**Current Implementation:**
- "🏒 Challenge a Friend" button appears in results modal after completing module
- Uses Web Share API on mobile (native share sheet)
- Falls back to clipboard copy on desktop
- Share message includes score, module name, and competitive challenge text
- URL includes module context: `hockeyiq.netlify.app?score=X&module=Y&total=Z`

**Challenge Banner on Landing Page:**
- Shows module name (D-Zone, Faceoffs, Breakouts, Offense, Forecheck, D-Men)
- Displays correct score total based on module (7 or 8 scenarios)
- "Accept the Challenge →" button replaces standard "Start Training" CTA

**Share Messages:**
- Perfect: "I got a PERFECT SCORE on Puck Academy's [Module] training! 🏆 Think you can beat me?"
- Great: "I scored X/Y on Puck Academy's [Module] training! 🔥 Think you can do better?"
- Other: "I scored X/Y on Puck Academy's Hockey IQ training! 🏒 Test your hockey brain:"

**Static Share Pages (January 26, 2026):**
Share links now point to static HTML pages (`/share/0.html` through `/share/7.html`) with pre-baked OG meta tags:
- Each page has personalized title/description for the score (🏆 for perfect, 🔥 for great, etc.)
- Pages instantly redirect to `/?score=X` so challenge banner still displays
- This replaced Netlify Edge Functions, eliminating edge function credit costs entirely

Social platforms (iMessage, Twitter, Facebook) fetch OG tags from the static pages before the redirect happens.

### Key Screens/Pages

| Screen | Purpose | Key Elements |
|--------|---------|--------------|
| `index.html` | Landing page with challenge banner for shared links | Hero section, features, Start Training CTA, challenge message if `?score=X` parameter present |
| `onboarding.html` | Capture user info and personalize experience | Position picker, level selector (Youth to Pro to Adult Rec), email input (optional), goal selection |
| `training.html` | Module hub showing scenarios and results | Scenario cards with status, progress bar, score display, results modal with share button |
| `hockey-iq-diagram.html` | Scenario 1 - Defensive zone pressure read | SVG rink diagram, situation text, 4-option answer buttons, feedback display |
| `scenario-2-corner-battle.html` | Scenario 2 - Corner battle support | Same structure as Scenario 1 with different content |
| `scenario-3-cycle.html` | Scenario 3 - Cycle coverage | Same structure |
| `scenario-4-breakout.html` | Scenario 4 - Breakout positioning | Same structure |
| `scenario-5-gap.html` | Scenario 5 - Gap control decision | Same structure |

### Design Principles

1. **Completable in 10-15 minutes** — Each session should fit between school and practice
2. **Mobile-first** — Designed for phone/tablet use (bus rides, waiting at rink)
3. **No account required to start** — Reduce friction; email capture is optional
4. **Feel like an insider advantage, not homework** — Positioned as "film room" training, not educational content
5. **Clear decision points** — Scenarios pause at the moment of truth, not during action
6. **Immediate feedback** — Know right/wrong instantly with explanation of *why*
7. **Authentic hockey feel** — Dark ice blue theme, professional look that appeals to competitive players

---

## TECHNICAL ARCHITECTURE

### Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Frontend | HTML, CSS, JavaScript (vanilla) | No framework for simplicity |
| Hosting | Netlify | Auto-deploy from GitHub, free tier sufficient |
| Version Control | GitHub | Repository: `jjacobs22/puck-academy-iq-app` |
| Form Handling | Netlify Forms | Captures onboarding emails (form name: `player-signup`) |
| Feedback Collection | Google Forms | External form linked from app |
| Editor | Cursor | Local development environment |

### File Structure

```
puck-academy-iq-app/
├── index.html                    # Landing page with challenge banner
├── onboarding.html               # 5-step onboarding flow
├── training.html                 # Module hub with all 6 modules, scoring, results modal
│
├── # Shared Assets (Refactored Jan 26, 2026)
├── styles/
│   └── main.css                  # Shared CSS (variables, reset, buttons, modals, etc.)
├── js/
│   ├── storage.js                # LocalStorage utilities
│   ├── analytics.js              # GA4 event tracking
│   ├── scenario.js               # Scenario class (for future use)
│   ├── data-loader.js            # JSON data loading (for future use)
│   └── scenario-renderer.js      # Dynamic scenario rendering (for future use)
│
├── # Module 1: Defensive Zone (7 scenarios)
├── hockey-iq-diagram.html        # Scenario 1-1: D-zone pressure read
├── scenario-2-corner-battle.html # Scenario 1-2: Corner battle
├── scenario-3-cycle.html         # Scenario 1-3: Cycle coverage
├── scenario-4-breakout.html      # Scenario 1-4: Breakout positioning
├── scenario-5-gap.html           # Scenario 1-5: Gap control
├── scenario-6-winger-caught.html # Scenario 1-6: Winger caught up ice (3-on-2)
├── scenario-7-d-partner-bites.html # Scenario 1-7: D partner out of position
│
├── # Module 2: Faceoffs (7 scenarios)
├── module2-scenario1-ref-position.html
├── module2-scenario2-advantage.html
├── module2-scenario3-cheat-feet.html
├── module2-scenario4-tieup.html
├── module2-scenario5-leverage.html
├── module2-scenario6-forehand-backhand.html
├── module2-scenario7-post-draw.html
│
├── # Module 3: Breakouts (7 scenarios)
├── module3-scenario1-high-low-route.html
├── module3-scenario2-reading-pressure.html
├── module3-scenario3-forehand-receive.html
├── module3-scenario4-cut-laterally.html
├── module3-scenario5-support-stretch.html
├── module3-scenario6-forecheck-pattern.html
├── module3-scenario7-broken-play.html
│
├── # Module 4: Offensive Zone (7 scenarios)
├── module4-scenario1-net-front.html
├── module4-scenario2-cycle-support.html
├── module4-scenario3-soft-ice.html
├── module4-scenario4-backdoor.html
├── module4-scenario5-screen-tip.html
├── module4-scenario6-high-slot.html
├── module4-scenario7-ozone-turnover.html
│
├── # Module 5: Forechecking (8 scenarios)
├── module5-scenario1-f1-angle.html
├── module5-scenario2-f1-f2-read.html
├── module5-scenario3-pressure-contain.html
├── module5-scenario4-angling.html
├── module5-scenario5-read-breakout.html
├── module5-scenario6-loose-puck.html
├── module5-scenario7-turnover-transition.html
├── module5-scenario8-f2-gassed.html  # F2 is gassed, solo forecheck
│
├── # Module 6: D-Zone for Defensemen (7 scenarios)
├── module6-scenario1-gap-control.html
├── module6-scenario2-puck-retrieval.html
├── module6-scenario3-d-to-d.html
├── module6-scenario4-net-front-battle.html
├── module6-scenario5-when-to-pinch.html
├── module6-scenario6-first-pass.html
├── module6-scenario7-zone-coverage.html
│
├── # Personalized Training
├── tylers-coaching-notes.html    # Tyler's personalized training doc (printable)
│
├── # Static Share Pages (for social previews)
├── share/
│   ├── 0.html through 7.html     # Pre-baked OG tags, redirect to /?score=X
│
├── # Coach's Office (AI Advisory Chat)
├── coach.html                    # Coach's Office chat interface
│
├── # Netlify Functions
├── netlify/
│   └── functions/
│       ├── coach.js              # Anthropic API serverless function
│       └── package.json          # Function dependencies
│
├── # Documentation & Config
├── PROJECT_CONTEXT.md            # This file - project documentation
├── REFACTOR_PLAN.md              # Technical debt cleanup plan
├── QUICK_START_GUIDE.md          # Step-by-step refactoring guide
├── og-image.html                 # Template reference for OG image design
├── coach-prototype.html          # Conversational coach prototype (experimental)
├── package.json                  # Root package.json for Netlify builds
├── netlify.toml                  # Netlify configuration (functions directory)
└── assets/
    └── images/
        └── rink-full.png         # Hockey rink diagram asset
```

### Data Model

**User Progress (localStorage key: `puckAcademy_progress`):**
```javascript
{
  position: "center",
  email: "player@email.com",  // optional
  level: "Youth AAA",  // or "Juniors/College", "Adult Rec", etc.
  goals: ["defensive-zone", "faceoffs"],
  completedScenarios: [1, 2, 3, 4, 5],
  currentModule: 1,
  streak: 3
}
```

**Scoring Data (localStorage key: `puckAcademy_scores`):**
```javascript
{
  currentRun: {
    1: true,   // correct
    2: false,  // incorrect
    3: true,
    4: true,
    5: false
  },
  bestScore: 4
}
```

**Scenario Data (inline in HTML, future: JSON):**
```javascript
{
  id: "scenario-1",
  title: "Reading Pressure on Your D-Man",
  situation: "Your team is defending...",
  question: "What should you do?",
  answers: [
    { text: "Chase the puck carrier", correct: false, feedback: "..." },
    { text: "Hold the high slot", correct: true, feedback: "..." },
    // ...
  ],
  rinkPosition: "defensive-zone-low"
}
```

### Third-Party Integrations

| Service | Purpose | Integration Point |
|---------|---------|-------------------|
| Supabase | User accounts & data sync | Magic link auth, progress/scores stored in Postgres |
| Resend | Transactional email | New user signup notifications, future: weekly progress emails |
| Anthropic API | AI chat | Coach's Office feature (`netlify/functions/coach.js`) |
| Static Share Pages | Social OG previews | `/share/*.html` pages with pre-baked OG meta tags |
| Google Forms | Beta feedback | External link from scenario completion and results modal |
| Google Fonts | Typography | Bebas Neue (headers), Work Sans (body) |
| Web Share API | Native sharing | Share button in results modal |

### Environment & Deployment

**Development:**
- Clone repo locally
- Edit in Cursor
- Test by opening HTML files in browser

**Deployment:**
- Push to `main` branch on GitHub
- Netlify auto-deploys within ~30 seconds
- Live URL: `https://hockeyiq.netlify.app/`

**Environment Variables (Netlify):**
- `ANTHROPIC_API_KEY` — For Coach's Office AI chat
- `RESEND_API_KEY` — For email notifications

---

## CURRENT STATE

### What's Working ✅
- **Landing page:** Shows challenge banner when accessed via shared link with `?score=X`
- **Onboarding flow:** 5-step personalization working end-to-end
- **Module hub (training.html):** Shows all 6 modules with independent progress tracking, position-based ordering
- **Theory Intro overlays:** 3-slide Coach intro appears first time entering each module, with "Review intro" links
- **43 complete scenarios across 6 modules:** All playable with questions, answers, and Coach feedback
  - Module 1: Defensive Zone (7 scenarios) — Centers
  - Module 2: Faceoffs (7 scenarios) — Centers
  - Module 3: Breakouts (7 scenarios) — Centers
  - Module 4: Offensive Zone (7 scenarios) — Centers
  - Module 5: Forechecking (8 scenarios) — Centers
  - Module 6: D-Zone (7 scenarios) — Defensemen
- **Refactored codebase:** Shared CSS (`styles/main.css`) and JS modules (`js/storage.js`, `js/analytics.js`)
- **SVG rink diagrams:** Clean visual representation with improved padding and consistent styling
- **Progress tracking:** localStorage saves completed scenarios per module
- **Scoring system:** Tracks correct/incorrect per scenario per module, calculates score, saves best score
- **Results modal:** Shows score with module-specific performance-based messaging
- **Share button:** Opens native share sheet (mobile) or copies to clipboard (desktop), uses static share pages for OG previews
- **Feedback form:** Google Forms linked from results modal + prompt after first module completion
- **Google Analytics 4:** Full tracking with custom events (scenario_answer, module_complete, share_score, feedback_form_open)
- **Position clarity in onboarding:** Defense/Goalie show "Coming Soon", wingers get note about Faceoffs being center-specific
- **Tyler's personalized training:** Standalone printable coaching notes based on game feedback
- **Mobile responsive:** Works on phone/tablet
- **GitHub → Netlify pipeline:** Auto-deploy on push
- **User accounts (Stage 1):** Supabase auth with magic link email, progress syncs to server in real-time
- **Streak system:** Daily training streaks with nav counter, hero card, at-risk banner, milestone celebrations (3/7/14/30/50/100 days)
- **Coach's Office:** AI-powered advisory chat for hockey parents to discuss their kid's development, get recommendations, and gain perspective

### What's Partially Working ⚠️
- **Scenario navigation:** Users can complete scenarios but returning to hub sometimes needs refresh
- **Non-center users:** Defense/Goalie disabled with "Coming Soon"; Wingers can use forward content with note about Faceoffs module

### What's Not Started 🔲
- ~~Module 2: Faceoffs~~ ✅ **DONE** (7 scenarios)
- ~~Module 3: Breakouts~~ ✅ **DONE** (7 scenarios)
- ~~Module 4: Offensive Zone~~ ✅ **DONE** (7 scenarios)
- ~~Module 5: Forechecking~~ ✅ **DONE** (7 scenarios)
- ~~Module 6: D-Zone (Defensemen)~~ ✅ **DONE** (7 scenarios)
- Goalie-specific modules
- Google OAuth for sign-in (magic link works, Google requires setup)
- Branded auth emails (custom SMTP + email templates in Supabase)
- Assessment/testing functionality
- ~~Streak/gamification features~~ ✅ **DONE** (daily streaks, milestones)
- Coach/parent dashboards
- Payment/subscription system (spec complete, Stage 2 pending)
- **Animated correct answer playback** (beta feedback Feb 2026) — show the correct play animated after answering, like a mini replay

### Known Bugs 🐛
1. ~~**Share text not appearing:** When sharing via Messages, only the URL is shared without the accompanying text message~~ **FIXED** - Combined text+URL into single share parameter; iOS now shows context text with link preview
2. **Status inconsistency:** Scenario cards occasionally show "Coming Soon" instead of "Start" after clearing cache
3. **Progress reset:** If user clears browser data, all progress is lost
4. **No error handling:** If scenario fails to load, no user-friendly message

### Technical Debt 📋
- ~~**Inline styles:** CSS is duplicated across HTML files; should extract to shared stylesheet~~ **DONE** - Extracted to `styles/main.css`
- ~~**Inline JavaScript:** Scenario logic duplicated; should extract to shared JS file~~ **DONE** - Extracted to `js/storage.js` and `js/analytics.js`
- **No build process:** Manual file management; could benefit from simple bundler
- **Hardcoded scenarios:** Scenario data embedded in HTML; should move to JSON for easier updates
- ~~**No Open Graph tags:** Shared links don't show rich previews on social platforms~~ **DONE** - Static share pages with pre-baked OG tags

---

## DESIGN DECISIONS LOG

### Decision 1: Start with Centers Only
- **Context:** Considered building for all positions simultaneously vs. narrow focus
- **Options considered:** All positions, forwards only, centers only
- **Decision:** Centers only for MVP
- **Rationale:** Centers have the most complex decision-making requirements, are the "QBs" of hockey, and represent the highest-value position for this type of training. Narrow focus allows deeper curriculum development and proves the concept before expanding.

### Decision 2: Web-First, No Native Apps
- **Context:** Parents asked about iOS/Android apps
- **Options considered:** Native apps, React Native, PWA, responsive web
- **Decision:** Responsive web app
- **Rationale:** Fastest to build and iterate; works on all devices immediately; no app store approval delays; can convert to PWA or native later once validated. The 12-15 age group uses browsers constantly anyway.

### Decision 3: No Account Required to Start
- **Context:** Debated gating content behind login
- **Options considered:** Required login, optional email, fully anonymous
- **Decision:** Optional email capture during onboarding
- **Rationale:** Zero friction to start means more beta testers; optional email still builds list from engaged users; COPPA-friendly since not requiring info from minors.

### Decision 4: Static Rink Diagrams Over Video
- **Context:** Considered using video clips vs. SVG diagrams for scenarios
- **Options considered:** NHL video clips, custom filmed scenarios, animated diagrams, static SVG
- **Decision:** Static SVG rink diagrams with situation descriptions
- **Rationale:** Faster to produce content; avoids copyright issues with NHL footage; cleaner decision points (video continues moving, diagrams pause at the moment); easier to update and iterate.

### Decision 5: GitHub + Netlify Over No-Code Tools
- **Context:** Explored Webflow, Bubble, Replit as faster options
- **Options considered:** Webflow, Bubble, Replit, custom code + Netlify
- **Decision:** Custom HTML/CSS/JS deployed via GitHub → Netlify
- **Rationale:** More control over iterations; skills transfer to future development; auto-deploy pipeline is simple enough; avoids platform lock-in and monthly fees.

### Decision 6: Defensive Zone as First Module
- **Context:** Could have started with faceoffs, breakouts, or offensive concepts
- **Options considered:** Faceoffs (most discrete), breakouts (exciting), defensive zone (hardest to teach)
- **Decision:** Defensive zone positioning for centers
- **Rationale:** Biggest gap in existing training; most coaches struggle to teach this systematically; immediate differentiation from "skills training" apps; proves we can teach the hard stuff.

### Decision 7: Scoring System Before More Content
- **Context:** Debated whether to add more scenarios or gamification first
- **Options considered:** Build Module 2, add scoring, add streaks
- **Decision:** Add scoring system to existing Module 1
- **Rationale:** Scoring adds replayability to existing content; creates reason to retry and improve; enables sharing scores (viral loop); validates engagement before building more content.

### Decision 8: Collect Full Profile Before Email
- **Context:** Debated when to ask for email in onboarding flow
- **Options considered:** Email first, email last, email optional throughout
- **Decision:** Position → Level → Goals → Email (optional) → Start
- **Rationale:** Users more likely to provide email after investing time in profile; feels like natural continuation; captures more qualified leads.

### Decision 9: Wait on Module 2 Until Beta Feedback
- **Context:** After building scoring and share features, considered building more content
- **Options considered:** Build Module 2 immediately, wait for feedback
- **Decision:** Wait for beta feedback before building Module 2
- **Rationale:** Need to validate current format works before investing in more content; beta testers will reveal if difficulty is right, what topics they want next, and if the format is engaging enough.

---

## ROADMAP & PRIORITIES

### Current Sprint/Focus (January 2026)
1. ✅ **Scoring system:** Track correct/incorrect, show results modal
2. ✅ **Share functionality:** Share score via native share or clipboard
3. ✅ **Fix share bug:** Updated share params + added OG meta tags for rich previews
4. ✅ **Dynamic OG images:** Netlify Edge Functions generate score-based preview images
5. **Beta launch:** Send app to 10-15 beta testers via onboarding link
6. **Feedback collection:** Monitor Netlify Forms and Google Forms responses

### Next Up (February 2026)
- Analyze beta feedback and identify top 3 improvements
- Add additional scenarios based on feedback
- ~~Build Module 2: Faceoffs~~ ✅ **DONE**
- ~~Build Module 3: Breakouts~~ ✅ **DONE**
- Build Module 4: Offensive Zone
- Implement basic streak tracking

### Backlog (Q1-Q2 2026)
- Module 3: Breakouts
- Module 4: Offensive Zone
- Pre/post assessment functionality
- Parent notification emails (weekly progress)
- Improved mobile experience
- Explore partnership with Hunter Bishop for curriculum validation

### Blockers
- **Content creation:** Need to source/create more scenario content (currently have 5)
- **Expert validation:** Haven't yet validated curriculum with elite development coach
- **Video assets:** If moving beyond SVG diagrams, need video production capabilities

---

## BUSINESS CONTEXT

### Monetization Model (Post-Beta)

**Primary: Subscription (B2C)**
- Individual player: ~$9.99-19.99/month or $79-149/year
- Family package: 2-4 players at discount
- Price precedent: IntelliGym charges ~$15-20/month; Project Hockey IQ at $19.99/month

**Secondary: Institutional Licensing (B2B)**
- Team licenses: Per-player pricing for clubs
- Program partnerships: Revenue share with hockey associations (like IntelliGym + USA Hockey)
- Prep school/academy deals: Annual site licenses

**Freemium Option:**
- Module 1 free forever
- Modules 2+ require subscription
- Hook users with value, convert engaged users

### Competitive Landscape

| Competitor | What They Do | Price | Our Advantage |
|------------|--------------|-------|---------------|
| **Hockey IntelliGym** | Abstract cognitive training game | ~$15-20/mo | More engaging, hockey-specific scenarios, teaches *why* not just reps |
| **Sense Arena** | VR-based drill repetition | $500+ hardware + subscription | No hardware required, accessible anywhere, educational not just reactive |
| **Project Hockey IQ** | Daily video lessons + coaching | $19.99/mo | Micro-learning format, self-paced, more interactive |
| **Private Coaching** | 1-on-1 video analysis | $1,000+ per package | 100x more affordable, available anytime |
| **YouTube** | Free hockey content | Free | Structured curriculum, active learning, progress tracking |

**Our positioning:** "Learn hockey IQ, then train it." We're the systematic education that other tools drill.

### Launch Plan (Beta → Paid)

**Phase 1: Closed Beta (Now - Feb 2026)**
- 10-15 users from Puck Academy podcast/newsletter audience
- Direct outreach to hockey parents in personal network
- Gather feedback, iterate, prove engagement

**Phase 2: Open Beta (Mar-Apr 2026)**
- Open to broader Puck Academy audience
- Aim for 100-200 users
- Test retention and completion rates at scale

**Phase 3: Paid Launch (Q2 2026)**
- Introduce subscription with free Module 1
- Target: 500 paying subscribers by end of Q2
- Begin outreach to hockey programs for B2B pilot

**Distribution channels:**
- Puck Academy podcast mentions
- Newsletter promotions
- Hockey parent Facebook groups
- Reddit (r/hockeyplayers, r/hockeyparents)
- Youth hockey coach networks
- Partner with 2-3 local programs for pilot

---

## WORKING AGREEMENTS

### Code Style & Conventions

**HTML:**
- Use semantic HTML5 elements
- Keep inline styles minimal; prefer shared CSS classes
- Mobile-first responsive design
- IDs for JavaScript hooks, classes for styling

**CSS:**
- BEM-ish naming when not using Tailwind
- Color variables defined in `:root`
- Consistent spacing scale (multiples of 5px or 0.25rem)
- Brand colors: 
  - Ice Blue: `#E8F4F8`
  - Dark Blue: `#0A1628`
  - Accent Red: `#C8102E`
  - Silver: `#A8B2BE`

**JavaScript:**
- Vanilla JS (no frameworks for MVP)
- localStorage for client-side state
- Clear function names describing action
- Comments for non-obvious logic

**Files:**
- Lowercase with hyphens: `scenario-2-corner-battle.html`
- Descriptive names over abbreviations

### AI Instructions (for Claude/Cursor)

**IMPORTANT - After every code change:**
- Always update PROJECT_CONTEXT.md changelog before pushing to GitHub
- Include what was changed and why
- Update any relevant sections (What's Working, Known Bugs, Technical Debt, etc.)
- This ensures project knowledge stays current across sessions

**Preferred approaches:**
- HTML/CSS/vanilla JS for frontend (no React yet)
- Tailwind utility classes acceptable
- Netlify for hosting
- Keep files self-contained when possible

**Things to avoid:**
- Don't add npm dependencies without asking
- Don't create separate CSS files unless explicitly requested
- Don't add authentication — keeping it simple for now

**Tone/style for copy:**
- Hockey-authentic language (not corporate)
- Direct and confident, not hedging
- Appeal to competitive mindset ("Get smarter than your opponent")
- Avoid "homework" or "education" framing — this is "training"

**Project-specific rules:**
- All scenarios should follow same structure: situation → question → 4 options → feedback
- Rink diagrams use consistent SVG format
- Progress saves to localStorage under `puckAcademy_progress` key
- Scores save to localStorage under `puckAcademy_scores` key
- Feedback always explains *why* — not just right/wrong

---

## CHANGELOG

### February 3, 2026 - Hockey IQ Test Page & Migrations

**Added:**
- `hockey-iq-test.html` - Standalone Hockey IQ test page
- `og-hockey-iq-test.png` / `.svg` - Open Graph images for social sharing
- `migrations/create_email_signups.sql` - Database migration for email signups

---

### February 3, 2026 - SvelteKit SPA Version Added

**Created new SvelteKit SPA in `puck-academy-spa/` folder:**

A modern, component-based version of the app with hot reload for faster iteration.

**Features included:**
- GA4 analytics integration (`src/lib/services/analytics.ts`)
- Audio service with folder mapping for all 43 scenarios
- Progress/streak tracking with Supabase sync
- SSR disabled for pure SPA mode
- Netlify static adapter configured
- Auto-unregisters legacy service workers (fixes caching issues from old HTML app)
- 3 sample scenarios (Module 1 scenarios 1-3)

**Key files:**
| File | Purpose |
|------|---------|
| `src/routes/+page.svelte` | Landing page |
| `src/routes/hub/+page.svelte` | Module hub |
| `src/lib/components/Scenarios/ScenarioContainer.svelte` | Core scenario experience |
| `src/lib/data/scenarios.ts` | Scenario data (3 samples, 40 more to migrate) |
| `src/app.css` | Design system variables |

**To run locally:**
```bash
cd puck-academy-spa
npm install
npm run dev
# Open http://localhost:5173
```

**To deploy:** Create new Netlify site pointing to `puck-academy-spa` subfolder with base directory set.

**Still needed:**
- Migrate remaining 40 scenarios to `scenarios.ts`
- Add results modal for module completion
- Theory intro overlays

---

### February 3, 2026 - Fix Continue Button Loading Issue

**Fixed bug where Continue button was stuck on "Loading...":**
- Added try/catch error handling to `updateContinueButton()` function
- Wrapped initialization sequence in try/catch with fallback
- Exposed `updateContinueButton` and `updateDisplay` globally via `window` object
- Auth module now calls `updateContinueButton()` after syncing progress from server
- This ensures the Continue button updates correctly after login

---

### February 3, 2026 - UX Declutter & Continue Button

**Major UX simplification based on audit findings:**

The training hub had accumulated 15+ UI elements, showing progress 6 different ways. Users saw a wall of cards before reaching actual scenarios.

**Changes to training.html:**
- Added **"Continue" button** at top — one-tap resume showing next incomplete scenario (e.g., "M2: The Tie-Up Decision")
- **Hidden redundant elements:**
  - Best Score display (scores shown per module instead)
  - "Your Progress" card (redundant with module progress bars)
  - Streak hero card (kept streak in nav counter only)
  - Daily Challenge card (reduces cognitive load)
  - Overall Progress card (info already in nav + modules)
- **Shortened Coach intro** from 3 sentences to 1, moved glossary link inline
- Continue button turns green with "All scenarios complete! 🏆" when done

**Result:** Training hub now focuses on one clear action: Continue where you left off, or pick a module.

**Files added:**
- `UX_AUDIT.md` — Full audit documenting bloat issues, 10 recommendations, visual before/after

**Files modified:**
- `training.html` — ~200 lines: Continue button, hidden elements, shortened intro

---

### February 3, 2026 - Re-engagement Email Functions & Documentation

**Added two new scheduled email functions for user re-engagement:**

Based on `REENGAGEMENT_EMAILS_SPEC.md`, implemented automated email campaigns to bring back users who've dropped off.

**Day 2 Nudge (`netlify/functions/day2-nudge.js`):**
- Targets users who signed up yesterday but haven't been active today
- Catches the biggest drop-off point (day 2 churn)
- Subject: "Ready for your next scenario?"
- Friendly, low-pressure copy encouraging return
- Scheduled daily at 6pm ET (11pm UTC)

**Win-back (`netlify/functions/winback.js`):**
- Targets users whose last activity was exactly 7 days ago
- Personalizes subject based on streak history:
  - Users with 3+ day streak: "Your X-day streak is waiting"
  - Others: "We saved your spot"
- Adds urgency for users who had built streaks
- Scheduled daily at 1pm ET (6pm UTC)

**Email cadence summary:**
| Email | Trigger | Time (ET) |
|-------|---------|-----------|
| Streak-at-Risk | Has 2+ streak, didn't train today | 10am |
| Day 2 Nudge | Signed up yesterday, no activity today | 6pm |
| Win-back | Last active exactly 7 days ago | 1pm |

**Files added:**
- `netlify/functions/day2-nudge.js`
- `netlify/functions/winback.js`
- `REENGAGEMENT_EMAILS_SPEC.md` — Full spec for re-engagement email system

**Files modified:**
- `netlify.toml` — Added schedules for both functions
- `training.html` — Temporarily disabled paywall initialization (click issue workaround)

---

### February 2, 2026 - UX Polish & Navigation Cleanup

**Accessibility improvements (CRITICAL fixes from POLISH_CHECKLIST.md):**
- Added focus-visible states globally for keyboard navigation
- Added `@media (prefers-reduced-motion: reduce)` to respect user preferences
- Enhanced disabled button states (gray background, clearer visual)
- Added `.btn.loading` class with spinner animation for async actions
- Limited infinite animations to 3-5 iterations (index.html, hockey-iq-diagram.html)

**Removed Video Assessment from navigation:**
- Removed "📹 Film Review" from training.html sticky nav
- Removed "📹 Get personalized film review" CTA from index.html
- Removed promo link from training.html coach intro
- Files kept but not linked (video-assessment.html, specs still exist)

**Disabled Coach's Office (to reduce Netlify function credits):**
- Removed "💬 Ask Coach" from training.html sticky nav
- Removed "Talk to Coach" secondary CTA from index.html
- Removed all links to coach.html — feature is now hidden
- Files kept (coach.html, netlify/functions/coach.js) but not discoverable
- Can be re-enabled later by adding links back

**Files modified:**
- `styles/main.css` — Focus states, reduced motion, disabled/loading buttons
- `index.html` — Removed secondary CTAs, limited animations
- `training.html` — Removed nav items, added footer Coach link
- `hockey-iq-diagram.html` — Limited pulse animations
- `prototype-animated-scenario.html` — Limited pulse animations

---

### February 2, 2026 - Streak Reminder Emails & Daily Challenge

**Added "Streak at Risk" email notification system:**
- Created `netlify/functions/streak-reminder.js` — scheduled function that:
  - Queries Supabase for users where `streak.count >= 2` AND `streak.lastTrainingDate = yesterday`
  - Sends personalized email via Resend with their streak count
  - Email copy: "🔥 Your [X]-day streak is at risk! Complete one scenario today to keep it alive."
- Schedule configured in `netlify.toml` to run daily at 10am ET (3pm UTC)
- Uses same patterns as `new-user-notification.js`

**Environment variables required:**
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — Service role key for server-side queries
- `RESEND_API_KEY` — Already configured

**Added Daily Challenge feature:**
- New "Today's Challenge" card on training.html
- Rotates through all 43 scenarios based on day of year (deterministic)
- Shows module name, scenario title, and CTA button
- Button changes to "✓ Completed" once user finishes that scenario
- Updates when page regains focus
- Tracks `daily_challenge_start` analytics event

**Files added:**
- `netlify/functions/streak-reminder.js`

**Files modified:**
- `netlify/functions/package.json` — Added `@supabase/supabase-js` dependency
- `netlify.toml` — Added scheduled function config
- `styles/main.css` — Added ~110 lines of daily challenge card styles
- `training.html` — Added daily challenge HTML card + ~150 lines of JS logic

---

### February 2, 2026 - Video Assessment Feature

**Added personalized film review feature:**
- New `video-assessment.html` page for uploading game footage
- AI-powered analysis of player's hockey IQ from video clips
- Generates personalized recommendations tied to Puck Academy modules
- Created `VIDEO_ASSESSMENT_SPEC.md` with detailed product spec
- Created `VIDEO_ANALYSIS_PROMPT.md` with AI analysis prompt template
- Added `scripts/analyze_video.py` for video processing

**Sample assessment output:**
- `tyler_assessment.md` — example assessment report (Hockey IQ Score: 74/100)
- `tyler_assessment_raw.json` — raw API response for debugging/reference

**Navigation updates:**
- Added "Film Review" link to training.html nav bar
- Added video assessment CTA to index.html landing page
- Promotional link in training.html coach section

**Files added:**
- `video-assessment.html`
- `VIDEO_ASSESSMENT_SPEC.md`
- `VIDEO_ANALYSIS_PROMPT.md`
- `scripts/analyze_video.py`

**Files modified:**
- `index.html` — added CTA link
- `training.html` — added nav item and promo link

---

### February 1, 2026 - New User Email Notifications

**Added email notifications for new signups:**
- Created `netlify/functions/new-user-notification.js` — receives Supabase webhook, sends email via Resend
- Email includes: user email, name, position, level, age (calculated from birth_year), signup time
- Link to admin dashboard included in notification email
- Optional webhook secret verification for security

**Setup required:**
1. Add `RESEND_API_KEY` environment variable in Netlify (already have Resend account)
2. Create Database Webhook in Supabase pointing to `/.netlify/functions/new-user-notification`

**Files added:**
- `netlify/functions/new-user-notification.js`

**Files modified:**
- `netlify/functions/package.json` — added resend dependency

---

### February 1, 2026 - Admin Dashboard Enhancements

**Added usage trends charts:**
- New "Usage Trends (Last 7 Days)" section with two bar charts
- Daily Signups chart (red bars) — new user registrations per day
- Daily Activity chart (green bars) — scenarios completed per day
- Visual at-a-glance view of whether usage is growing or declining

**Files modified:**
- `admin.html` — Added trends section HTML, CSS for chart styling, renderTrends() function

---

### February 1, 2026 - Coach's Office Auth Requirement

**Require sign-in to see Coach's response (Option B):**
- Users can type their first message freely
- Auth modal appears before showing Coach's response: "Sign in to see Coach's response"
- Message is saved; after magic link auth, conversation continues seamlessly
- Captures high-intent users (parents actively seeking help)
- Follow-up messages work normally once authenticated

**Technical implementation:**
- `isAuthenticated()` check before showing response
- `pendingMessage` stores message during auth flow
- `showCoachAuthModal()` displays inline auth form
- `supabase.auth.onAuthStateChange()` listener continues conversation after sign-in

**Files modified:**
- `coach.html` — Auth flow, modal UI, conversation continuation logic

---

### February 1, 2026 - Supabase RLS Fixes for Admin Dashboard

**Fixed Row Level Security policies blocking admin dashboard queries:**
- `profiles` table: Added policy to let authenticated users view all profiles
- `progress` table: Added policy to let authenticated users view all progress
- `coach_conversations` table: Disabled RLS (analytics data, no sensitive info)

**SQL required in Supabase:**
```sql
-- Profiles: allow viewing all
create policy "Authenticated users can view all profiles"
  on profiles for select using (auth.uid() is not null);

-- Progress: allow viewing all
create policy "Authenticated users can view all progress"
  on progress for select using (auth.uid() is not null);

-- Coach conversations: disable RLS
alter table coach_conversations disable row level security;
```

---

### January 31, 2026 - Coach Chat Analytics

**Added Coach's Office usage tracking:**
- Coach conversations now logged to Supabase `coach_conversations` table
- Tracks user_id, message_count, and timestamp for each conversation start
- Admin dashboard displays "Coach Chats" count in scorecards

**Files modified:**
- `coach.html` — Supabase integration, logs conversation starts
- `admin.html` — New "Coach Chats" scorecard, fetches from coach_conversations table

**Database requirement:**
- Create `coach_conversations` table in Supabase with columns: id, user_id, message_count, created_at

---

### January 30, 2026 - Coach's Office Feature

**Added "Coach's Office" — an AI-powered advisory chat for hockey parents:**

Based on research into player development tools (Sportlogiq, Hudl have no public APIs) and the challenge of data collection from parents, pivoted to a simpler approach: a free-text chat where parents can discuss their kid's development and get helpful guidance.

**Concept:**
- "Got something on your mind?" — parents can vent, ask questions, share concerns
- Coach is an **advisor**, not a replacement for their kid's actual coach
- No data entry required — just natural conversation
- Recommends curriculum, drills, and perspective based on what parents share

**System Prompt:**
- Warm, knowledgeable youth hockey development advisor persona
- Validates emotions before giving advice
- Recommends relevant Puck Academy modules when appropriate
- Stays in advisory lane — never undermines the player's actual coach
- Keeps hockey parent politics (playing time, team drama) in perspective

**Integration Points:**
- Added "💬 Coach" nav pill to `training.html` sticky navigation
- Added secondary CTA on `index.html`: "Got a question? Talk to Coach →"

**Technical Implementation:**
- Created `coach.html` — full chat interface with conversation history
- Created Netlify serverless function (`netlify/functions/coach.js`) to call Anthropic API
- Uses Claude claude-sonnet-4-20250514 model with 1024 max tokens
- System prompt passed with each request to maintain persona
- Graceful error handling with fallback messaging

**Setup required:**
- `ANTHROPIC_API_KEY` environment variable must be set in Netlify dashboard

**Files added:**
- `coach.html` — Coach's Office chat page
- `netlify/functions/coach.js` — Serverless API function
- `netlify/functions/package.json` — Function dependencies
- `package.json` (root) — For Netlify to install dependencies

**Files modified:**
- `training.html` — Added Coach nav pill
- `index.html` — Added secondary CTA
- `netlify.toml` — Added functions directory configuration

**Bugs fixed during development:**
- Analytics.track not a function → Used gtag directly via trackEvent function
- Deploy failed → Added root package.json for dependency installation
- Double message appearing → Removed duplicate onclick handler

---

### January 30, 2026 - UX Improvements & Bug Fixes

**Completed module UX:**
- Completed modules show green score badge (e.g., "✓ 5/7") in collapsed state
- Progress bar hidden for completed modules (badge shows score instead)
- "Try Again" button inside completed modules to reset and retake
- Completed modules collapse by default, expandable to review answers

**Review mode for scenarios:**
- Clicking completed scenarios opens in review mode
- Shows "📖 Review Mode - Your answer is locked" banner
- Correct answer highlighted, all options disabled
- Users can review but not change their answer

**Your Progress section fixes:**
- Now shows "In progress" status for partially completed modules
- Fixed "Not started yet" showing incorrectly for started modules
- Module cards are now clickable - scrolls to and expands that module

**Unified auth flow:**
- Removed signup/signin distinction - single "Continue with Email" flow
- Works for both new and existing accounts
- Clearer messaging: "No password needed — just click the link in your email"

**JavaScript fixes:**
- Fixed variable ordering in review mode (answered declared before use)
- Fixed module header click not working (pointer-events on children)
- Added debug logging for module completion detection

**Files modified:**
- `training.html` — accordion UX, progress section, clickable cards
- `js/auth-modal.js` — unified auth flow
- `js/supabase.js` — debug logging for saveScoreAttempt
- Module 1 scenario files (7 files) — review mode, variable ordering fix

---

### January 30, 2026 - Collapsible Accordion Modules

**Redesigned module/scenario hierarchy for clarity:**
- Modules now display as collapsible accordion sections
- Click module header to expand/collapse and reveal scenarios
- Only one module open at a time (accordion behavior)
- Auto-expands first incomplete module on page load
- Chevron indicator shows expand/collapse state
- Progress bar and count visible in both collapsed/expanded states

**Fixed Module 1 storage key mismatch:**
- Scenarios were saving to `puckAcademy_module1_scores`
- training.html was reading from legacy `puckAcademy_scores`
- Now both use `puckAcademy_module1_scores` consistently
- Progress now displays correctly on training.html

**Fixed hardcoded /5 values:**
- Updated default score displays from `/5` to `/7`
- Best score now uses dynamic `moduleConfigs[1].total`

**Files modified:** `training.html`

---

### January 30, 2026 - Bug Fixes & Share Images

**Fixed module completion results modal:**
- Module 1 scenarios were incorrectly checking for 5 scenarios (now correctly checks for 7)
- Standardized localStorage key format to `puckAcademy_module1_justCompleted`
- Results modal now properly shows when returning to training.html after completing a module

**Fixed auth modal JavaScript errors:**
- Added null checks for commented-out elements (Google button, divider)
- "Sign in" link in auth modal now works correctly

**Added OG share images:**
- Created score-specific images for social sharing (score-0.png through score-8.png)
- Added share/8.html for perfect Module 5 scores (8/8)
- Improved social preview when sharing scores

**Files modified:**
- `js/auth-modal.js` — null element checks
- Module 1 scenario files (7 files) — fixed completion detection
- `share/*.html` — updated meta tags
- Added `share/score-*.png` images

---

### January 30, 2026 - Score History & Progress Tracking

**Added score history tracking for improvement visualization:**
- Each module attempt is now saved with timestamp to localStorage
- New "Your Progress" section on training.html shows first vs latest scores
- Users can track improvement over time (e.g., "First: 4/7 → Latest: 6/7")
- Designed for future percentile comparisons by age/level as data accumulates

**Supabase sync for score history:**
- Added `saveScoreAttempt()` function to `js/supabase.js`
- Every completed module attempt syncs to Supabase `scores` table
- Enables cross-device progress tracking for logged-in users
- Added `getScoreHistoryFromServer()` for retrieving past attempts

**Files modified:**
- `training.html` — Added score history functions and "Your Progress" UI
- `js/supabase.js` — Added saveScoreAttempt and getScoreHistoryFromServer functions

---

### January 30, 2026 - Admin Dashboard Data Enhancements

**Added new user data columns to admin dashboard:**
- Name column — displays user's first name from profile
- Age column — calculated from birth_year field
- Attempts column — shows total module attempts per user

**New "Module Attempts" scorecard:**
- Shows total number of module attempts across all users
- Helps track engagement depth beyond just user signups

**Files modified:** `admin.html`

---

### January 30, 2026 - Streamlined Onboarding → Assessment

**Removed redundant onboarding flow:**
- Landing page now links directly to `assessment.html` (skips `onboarding.html`)
- The old onboarding asked Position and Level, then assessment asked them again
- Now users go: Landing → Assessment → Training (cleaner flow)

**Assessment flow (2 steps):**
1. Name, Birth Year, Position, Level
2. What to expect + personalized module list → Start Training

**Files modified:**
- `index.html` — all links now point to assessment.html instead of onboarding.html

---

### January 30, 2026 - Assessment Flow

**Added personalized assessment/program builder:**
- Created `assessment.html` — new page for personalized program setup
- Coach persona introduces the app and collects player info
- Shows position-specific modules before starting

**Files added:**
- `assessment.html`

---

### January 30, 2026 - Admin Dashboard Improvements

**Added sign-in form directly to admin dashboard:**
- Built-in email input and magic link authentication on admin.html
- Users can now sign in directly without being redirected to training.html
- Handles auth state changes for seamless login experience
- Styled form with success/error messaging

**Fixed score distribution display:**
- Changed labels from confusing "X/7" to "X pts"
- Fixes issue where "8/7" appeared (Module 5 has 8 scenarios)

**Files modified:** `admin.html`

---

### January 30, 2026 - Landing Page Auth Indicator

**Added auth status display to landing page header:**
- Shows user email + "Sign Out" button when logged in (top-right corner)
- Shows "Sign In" button when logged out
- CTA button changes from "Start Training" to "Continue Training" for logged-in users
- Consistent auth experience across landing page and training page

**File modified:** `index.html`

---

### January 30, 2026 - Required Registration

**Made registration required to use the app:**
- Users must now create an account to access training content
- `training.html` shows a mandatory auth modal (can't be dismissed) for non-logged-in users
- All 43 scenario pages redirect to training.html if user not authenticated
- Onboarding flow unchanged — users complete onboarding, then see auth modal on training.html
- Auth callback picks up onboarding data (position, level, goals) from localStorage and saves to profile

**Technical Implementation:**
- Created `js/auth-guard.js` — shared module that checks auth and redirects if not logged in
- Updated `js/auth-modal.js` — added `required` option to prevent dismissing modal
- Updated `training.html` — added `checkAuthAndGate()` function
- Added auth-guard import to all 43 scenario files

---

### January 30, 2026 - Auth UI Improvements & Admin Dashboard

**Improved logged-in user experience in header:**
- Moved auth UI into header area for better visibility
- Added prominent "Sign In" button (styled, not just a link)
- Shows user email + "Sign Out" button when logged in
- Added welcome toast notification for returning users ("Welcome back! Your progress is synced.")
- Toast auto-hides after 3 seconds with fade animation

**Created admin dashboard (`admin.html`):**
- Real-time analytics dashboard querying Supabase directly
- Scorecards: Total users, active today, active this week, scenarios completed, avg accuracy, avg streak
- Module performance table: started vs completed counts with completion percentage
- Score distribution visualization
- Recent users list with join dates
- Top streakers leaderboard
- Full user table with email, position, level, scenarios, accuracy, streak, join date
- Requires login to view (any authenticated user for now, can add admin role check later)
- Auto-refresh button to pull latest data

**Files Created:**
- `admin.html` — Full admin analytics dashboard

---

### January 30, 2026 - Diagram Label Fix

**Fixed YOUR ZONE label position in intro diagram:**
- Moved the "YOUR ZONE" text label in `hockey-iq-diagram.html` from inside the highlighted zone to below it
- Improves visual clarity so the label doesn't overlap with the zone indicator

---

### January 30, 2026 - Streak System Implementation

**Added daily training streak system to improve retention:**

Based on beta feedback that users "try it, like it, but don't return," implemented a Duolingo-style streak system to create habit formation and loss aversion.

**Core Features:**
- Track consecutive days of training (complete any scenario to maintain streak)
- Streak counter displayed in sticky nav bar (🔥 X day streak)
- Streak hero card below coach intro showing current streak and personal best
- "At risk" banner when user has active streak but hasn't trained today
- Milestone celebration modals at 3, 7, 14, 30, 50, and 100 days
- Streak data syncs to Supabase for logged-in users

**Technical Implementation:**
- Added 10+ new streak methods to `js/storage.js`:
  - `updateStreak()`, `getStreakCount()`, `getBestStreak()`, `trainedToday()`, `isStreakAtRisk()`
  - `checkMilestone()`, `markMilestoneAsSeen()`, `getTodayDateISO()`, `getDaysSinceDate()`
- `saveScenarioScore()` now calls `updateStreak()` automatically
- Streak data stored in `puckAcademy_progress.streak` object:
  ```javascript
  streak: {
    count: 3,
    lastTrainingDate: "2026-01-30",
    bestStreak: 7,
    milestonesSeen: [3, 7]
  }
  ```

**UI Changes:**
- `training.html`: Added streak nav display, hero card, at-risk banner, milestone modal system
- `styles/main.css`: Added ~150 lines of streak-related CSS (display, animations, modals)
- `index.html`: Added streak challenge banner for `?challenge=streak&days=X` links

**Share Integration:**
- Share messages now include streak info if user has 3+ day streak
- URL includes `&streak=X` parameter
- Landing page shows friend's streak in challenge banner

**Files Modified:**
- `js/storage.js` — Core streak logic
- `training.html` — Streak UI and JavaScript
- `styles/main.css` — Streak styling
- `index.html` — Streak challenge banner

---

### January 29, 2026 - Glossary, Bug Fixes, and UX Improvements

**Created hockey terminology glossary (glossary.html):**
Based on beta feedback from a newer player struggling with hockey terminology ("wtf is a half wall? is that the boards?"), created a comprehensive glossary page with:
- 20+ hockey terms with definitions, examples, and diagrams
- Categories: Rink Areas, Positioning, Plays & Systems, Faceoffs
- Search functionality to find terms quickly
- Visual diagrams for concepts like "half wall," "cycle," and "linesman lean"
- Linked from training.html coach intro: "New to hockey terms? Check the Glossary →"

**Fixed Firefox/Android bug preventing answer selection:**
- `module5-scenario8-f2-gassed.html` had duplicate `const SCENARIO_NUMBER = 8;` declaration (lines 311 and 328)
- This caused a JavaScript error in strict mode, preventing the last answer from being selected
- Removed duplicate declaration and fixed voice toggle scoping issue

**Added X close button to results modal:**
- User feedback requested an X button instead of only having text options to close
- Added `<button class="modal-close">` to resultsModal in training.html

**Fixed "Back to Modules" link overflow on mobile:**
- Updated `styles/main.css` .back-link with `max-width` and `white-space: nowrap`
- Added responsive breakpoint at 480px to make link relative-positioned on small screens
- Prevents link from overlapping title on narrow viewports

**Improved faceoff scenario clarity for beginners:**
- Enhanced module2-scenario1-ref-position.html situation text with explicit explanation:
  - "Your forehand is to your right as you face the opponent" (for lefties)
  - Explanation of what linesman lean means and how to read it
- Added "YOUR FOREHAND SIDE →" label to the diagram
- Updated intro slide 2 with clearer explanation of forehand/backhand concept

---

### January 28, 2026 - Feedback Form Email Field & Bug Fixes

**Added optional email field to feedback form:**
- Users can now optionally provide their email if they'd like a response
- Field labeled "Your email (optional - if you'd like a response)"
- Submits to Netlify Forms alongside feedback text
- Enables direct follow-up with engaged beta testers

**Fixed faceoff diagram text alignment issues:**
- Scenarios 1, 2, and 6 had overlapping/unclear text labels
- Replaced single "lean" label with clearer "LM leaning your way ↘" positioned off to the side
- Consolidated player handedness labels (e.g., "You (R) vs Opp (L)")
- Consistent styling across all faceoff scenarios with linesman positioning

**Made diagram labels gender-neutral:**
- Changed "Him (L)" to "Opp (L)" in scenario 6 for inclusivity

**Fixed Module 2 Scenario 7 (Post-Draw) diagram:**
- Puck direction was incorrect - showed going to blue line instead of toward opponent's net
- In offensive zone lost faceoff, opponent pulls puck back toward their goal
- Moved opposing D and puck to correct positions (near their net)
- Updated label to "Lost → opp D" for clarity

**Fixed JavaScript error preventing feedback from showing:**
- Module 2 Scenario 7 and Module 3 Scenario 7 both referenced undefined `scoreData` variable
- This caused a JS error that prevented the feedback panel (with "Back to Modules" button) from appearing
- Fixed by using `Storage.getModuleScores(MODULE_NUMBER)` to get score data
- Users can now properly complete these scenarios and navigate back to the module hub

**Files updated:**
- `training.html` — Added email field to feedback form
- `module2-scenario1-ref-position.html` — Fixed text alignment
- `module2-scenario2-advantage.html` — Fixed text alignment  
- `module2-scenario6-forehand-backhand.html` — Fixed text alignment, gender-neutral labels
- `module2-scenario7-post-draw.html` — Fixed diagram direction, fixed JS error
- `module3-scenario7-broken-play.html` — Fixed JS error

---

### January 28, 2026 - Fixed Faceoff Intro Diagram (Missing Ref)

**Added referee to Module 2 faceoff intro slide:**

The first intro slide in Module 2 (Faceoffs) showed "GRIP?", "STANCE?", "REF?" as things to watch for, but the ref wasn't actually visible in the diagram.

**Fix:**
- Added orange REF circle to the first intro slide diagram
- Made "REF?" label orange with arrow (➜) pointing to the ref position
- Repositioned elements for better visual clarity

**File updated:** `module2-scenario1-ref-position.html`

---

### January 28, 2026 - Streamlined Onboarding & Prominent Account Registration

**Removed redundant email capture from onboarding:**

With Supabase accounts now available, the "Notify Me" email step in onboarding was redundant. Users who create accounts provide their email anyway, and the account registration prompt on training.html comes at a better moment (after experiencing value).

**Changes to onboarding.html:**
- Removed Step 5 (email capture via Netlify Forms)
- Reduced onboarding from 6 steps to 5 steps
- Removed hidden Netlify Forms element
- Cleaner, faster path from discovery to training

**Enhanced account registration on training.html:**
- Added "Already have an account? Sign In" link in header for returning users
- Updated account banner copy: "Don't lose your progress!" (more compelling)
- Changed button text to "Create Free Account"
- Changed icon from 💾 to 🔒 (emphasizes security/permanence)
- Sign In link hidden when user is logged in
- Sign In link opens auth modal in signin mode

**Result:** Onboarding is faster (one less step), and account creation is more prominent with clear value proposition.

---

### January 28, 2026 - Challenge a Friend Feature

**Enhanced sharing to be more competitive and module-aware:**

The share functionality has been upgraded to make challenging friends more engaging and contextual.

**Changes:**
- Share button text changed from "Share Score" to "🏒 Challenge a Friend"
- Share URL now includes module number and total scenarios (e.g., `?score=5&module=3&total=7`)
- Landing page challenge banner now shows the specific module name (e.g., "D-Zone", "Faceoffs", "Breakouts")
- Challenge banner displays correct score total based on module (e.g., "5/7" for 7-scenario modules, "6/8" for Module 5)
- Share text is more competitive: "Think you can beat me?"
- Start Training button changes to "Accept the Challenge →" when accessed via challenge link

**Files updated:**
- `index.html` — Enhanced challenge banner with module-aware messaging
- `training.html` — Updated share function to include module context

**Result:** Sharing scores now feels more like a direct challenge and provides proper context about which module was completed.

---

### January 28, 2026 - Real-Time Supabase Score Sync

**Added real-time syncing of scores to Supabase whenever a scenario is answered:**

Previously, scores only synced to Supabase on login or when returning to training.html. This meant users who completed scenarios but didn't return to the hub might lose their progress if they switched devices.

**The fix:**
- Added `syncToSupabase()` call inside `Storage.saveScenarioScore()` in `js/storage.js`
- Added direct sync calls to Module 4-6 scenarios that use direct localStorage writes
- All 43 scenarios now sync progress to Supabase immediately after each answer (if user is logged in)

**Files updated:**
- `js/storage.js` — Added sync method to saveScenarioScore
- 17 scenario files in Modules 4-6 — Added direct Supabase sync calls

**Result:** Users logged in with magic link now have their progress saved to the server in real-time, enabling seamless cross-device experience.

---

### January 28, 2026 - Fixed Module 6 Diagram Orientations

**Standardized all D-Zone (Defensemen) scenarios to have consistent diagram orientation:**

The problem: Scenarios 1, 4, and 7 had the goal on the right side of the diagram, while scenarios 2, 3, 5, and 6 had the goal on the left side. This inconsistency was confusing, especially on mobile (reported via Reddit feedback).

The fix:
- Flipped diagrams in scenarios 1, 4, and 7 so goal is on the left side
- All Module 6 scenarios now show opponents attacking from right to left
- Consistent with how defensemen would view the play in their own zone

**Files updated:**
- `module6-scenario1-gap-control.html`
- `module6-scenario4-net-front-battle.html` 
- `module6-scenario7-zone-coverage.html`

---

### January 27, 2026 - Added Sticky Module Navigation

**Added sticky navigation bar to training.html for quick module access:**

Based on beta feedback requesting a "table of contents" to avoid scrolling through all modules.

Features:
- Horizontal scrollable nav bar that sticks to top when scrolling
- Module pills with emoji icons: 🛡️ D-Zone, ⚔️ Faceoffs, 🚀 Breakouts, 🎯 Offense, 🔥 Forecheck, 🏒 D-Men
- Status indicator dots on each pill:
  - Gray = not started
  - Red = in progress (some scenarios completed)
  - Green = module complete
- Active module highlighted as you scroll
- Smooth scroll to module on click
- Mobile-responsive (horizontal scroll on small screens)

**Technical:**
- Pure CSS sticky positioning
- JavaScript scroll observer for active state
- `updateNavStatus()` called on progress changes

---

### January 27, 2026 - Fixed Theory Intro Skip/Next Bug

**Fixed JavaScript scoping issue that prevented Theory Intro overlay buttons from working:**

The problem: `skipIntro()` and `nextSlide()` were defined inside ES6 module scope (`<script type="module">`), but the `onclick` handlers in the HTML (`onclick="skipIntro()"`, `onclick="nextSlide()"`) were trying to call them from the global scope. Clicking "Skip" or "Next" on the intro overlay did nothing.

The fix:
- Added `window.skipIntro = skipIntro;` and `window.nextSlide = nextSlide;` to expose functions globally
- Same pattern as the voice toggle fix

**Files updated:** 5 first-scenario files (one per module):
- `module2-scenario1-ref-position.html`
- `module3-scenario1-high-low-route.html`
- `module4-scenario1-net-front.html`
- `module5-scenario1-f1-angle.html`
- `module6-scenario1-gap-control.html`

Note: `hockey-iq-diagram.html` (Module 1) already had this fix via a different pattern.

---

### January 27, 2026 - Fixed Voice Audio Bug

**Fixed JavaScript scoping issue that prevented voice narration from working:**

The problem: `voiceEnabled`, `playAudio()`, and `stopAudio()` were defined inside ES6 module scope (`<script type="module">`), but `toggleVoice()` was in a separate regular `<script>` block. ES6 modules have isolated scope, so the toggle button couldn't access the audio functions.

The fix:
- Moved `toggleVoice()` inside the module block
- Exposed via `window.toggleVoice = toggleVoice`
- Removed the orphaned separate script block

**Files updated:** 38 scenario HTML files across all modules.

Voice now properly:
- Auto-plays setup narration on page load (500ms delay)
- Plays correct/incorrect feedback after answering
- Toggles on/off with the Voice button

---

### January 27, 2026 - Updated Player Level Options

**Restructured onboarding level selection to cover full player spectrum:**

Old options (youth-focused):
- 12-13 • A/AA, 12-13 • AAA, 14-15 • A/AA, 14-15 • AAA, 16+ • High School, Other

New options (all players):
- **Youth • A/AA** — Recreational/competitive youth
- **Youth • AAA** — Elite youth
- **High School / Prep** — Varsity, prep school
- **Juniors / College** — USHL, NAHL, NCAA, ACHA
- **Pro / Semi-Pro** — ECHL, AHL, NHL, overseas
- **Adult Rec** — Beer league, adult recreational

Also updated scenario counts in onboarding summary (Module 1: 7, Module 5: 8).

---

### January 27, 2026 - New "Broken Structure" Scenarios

**Added 3 new scenarios based on Reddit feedback about covering for teammates:**

Based on beer league feedback about positioning when teammates are out of position or gassed.

**Module 1 (Defensive Zone) - 2 new scenarios:**
- **Scenario 1-6: Winger Caught Up Ice** (`scenario-6-winger-caught.html`)
  - Situation: 3-on-2 rush against, your winger is behind the play
  - Correct: Stay central, take away middle passing lane
  - Teaches: Slot protection on odd-man rushes

- **Scenario 1-7: D Partner Bites on the Cycle** (`scenario-7-d-partner-bites.html`)
  - Situation: D partner stuck behind net, puck goes to point
  - Correct: Drop into high slot to take away point-to-slot pass
  - Teaches: Covering for out-of-position teammates

**Module 5 (Forechecking) - 1 new scenario:**
- **Scenario 5-8: F2 is Gassed** (`module5-scenario8-f2-gassed.html`)
  - Situation: F2 is tired and late, you're F1 alone on forecheck
  - Correct: Angle and contain, force predictable play
  - Teaches: Solo forecheck patience when lacking support

**Technical Updates:**
- Updated `training.html` with new scenario cards and module configs
- Module 1 now has 7 scenarios (was 5)
- Module 5 now has 8 scenarios (was 7)
- Updated `scenario-5-gap.html` to link to scenario 6
- Updated `module5-scenario7-turnover-transition.html` to link to scenario 8
- Added narration text to `scripts/generate-audio.py`
- Generated 12 new audio files (4 per scenario) using ElevenLabs Josh voice
- Total scenarios: 43 (was 40)

---

### January 26, 2026 - Static Share Pages (Edge Function Removal)

**Problem:** Netlify Edge Functions were consuming credits on every homepage visit, even when no score parameter was present. This was costing ~1000 edge function invocations per 1000 visitors.

**Solution:** Replaced edge functions with static share pages.

**Changes Made:**
- Created `/share/` directory with static HTML pages for scores 0-7
- Each page has pre-baked OG meta tags with personalized titles/descriptions
- Pages redirect instantly to `/?score=X` so challenge banner still displays
- Updated `training.html` share URL from `?score=X` to `/share/X`
- Removed `netlify/edge-functions/inject-og-tags.ts`
- Removed `netlify/edge-functions/og-image.ts`
- Updated `netlify.toml` to remove edge function configurations

**Result:** Edge function costs reduced to zero. Social preview functionality preserved.

---

### January 26, 2026 - ElevenLabs Voice Narration

**Added professional voice narration to all 40 scenarios:**
- Generated 160 MP3 audio files using ElevenLabs API
- Voice: Josh (male, authoritative coach tone)
- 4 audio clips per scenario: setup, prompt, correct, incorrect

**Audio Implementation:**
- Setup narration auto-plays when scenario loads
- Correct/incorrect feedback audio plays on answer
- Voice toggle button (🔊/🔇) in bottom-right corner
- Audio files stored in `/audio/{scenario-name}/` directories

**Files Added:**
- `scripts/generate-audio.py` — ElevenLabs audio generation script
- `scripts/add-audio-to-scenarios.py` — Batch file updater
- `scripts/add-audio-feedback.py` — Audio feedback calls
- `/audio/` — 160 MP3 files (13 MB total)

**Scenario 1 (hockey-iq-diagram.html):**
- Full animation + audio integration
- Players and puck animate during narration
- Uses Audio API instead of browser TTS

**Scenarios 2-40:**
- Voice narration added (no animations yet)
- Audio plays over static diagrams

---

### January 26, 2026 - Diagram Bug Fix

**Fixed puck/player positions in 3 scenarios:**
Text described the puck as "behind the net" but diagrams showed it in front of the net.

- **module3-scenario1-high-low-route.html**: Moved D-man and puck from x=100/115 to x=50/35 (behind net)
- **module3-scenario2-reading-pressure.html**: Moved D-man and puck from x=100/115 to x=50/35 (behind net)
- **module4-scenario2-cycle-support.html**: Moved winger and puck from x=400/385 to x=460/475 (behind O-zone net)

Also adjusted forechecker pressure arrow in module3-scenario1 to point toward new D position.

---

### January 26, 2026 - Codebase Refactoring (Phases 1 & 2)

**Phase 1: CSS Extraction**
- Created `styles/main.css` with shared styles (CSS variables, reset, typography, buttons, modals, forms, etc.)
- Updated all 40+ HTML files to link to shared stylesheet
- Page-specific styles kept inline only when truly unique
- Benefit: Update colors, fonts, spacing in one place

**Phase 2: JavaScript Extraction**
- Created `js/storage.js` — centralized LocalStorage utilities
- Created `js/analytics.js` — centralized GA4 event tracking
- Created `js/scenario.js` — Scenario class for future use
- All 40 scenario files now use ES modules (`type="module"`)
- Replaced direct `localStorage` calls with `Storage` module methods
- Replaced direct `gtag()` calls with `Analytics` module methods
- Benefit: Fix bugs in one place, consistent tracking across all scenarios

**UX Improvement:**
- Replaced jarring pulsing animation on "YOU" player with subtle golden glow (`drop-shadow`)

**Files Created:**
- `styles/main.css`
- `js/storage.js`
- `js/analytics.js`
- `js/scenario.js`
- `js/data-loader.js` (for future JSON-based scenarios)
- `js/scenario-renderer.js` (for future dynamic rendering)

---

### January 26, 2026 - Major Content Expansion (Modules 4-6)

**New Modules Added:**
- **Module 4: Offensive Zone (7 scenarios)** — Net front presence, cycle support, finding soft ice, backdoor reads, screen vs. deflection, high slot threat, O-zone turnovers
- **Module 5: Forechecking (7 scenarios)** — F1 angle of approach, F1 vs F2 reads, pressure vs contain, angling, reading breakouts, loose puck battles, turnover transitions
- **Module 6: D-Zone for Defensemen (7 scenarios)** — Gap control, puck retrieval, D-to-D decisions, net front battles, when to pinch, first pass under pressure, zone coverage

**Content Summary:**
- Added 21 new interactive scenarios
- Total content now: 40 scenarios across 6 modules
- Centers curriculum complete (Modules 1-5, 33 scenarios)
- Defensemen curriculum started (Module 6, 7 scenarios)

**Onboarding Updated:**
- Defense position now selectable (no longer "Coming Soon")
- Updated position note to reflect available content

**Technical:**
- All new scenarios include Theory Intro overlays
- GA4 event tracking built into all scenarios
- LocalStorage progress tracking for new modules

---

### January 26, 2026 - Theory Intro & Diagram Improvements

**Theory Intro Overlays:**
Based on beta feedback that users felt "thrown in without foundation", added a 3-slide Theory Intro overlay that appears when users first enter each module:

- **Module 1 (Defensive Zone):** "Your Job in the D-Zone", "Trust the Structure", "Defense Creates Offense"
- **Module 2 (Faceoffs):** "Faceoffs Are Chess, Not Checkers", "Read Before You React", "Win the Possession, Not Just the Draw"
- **Module 3 (Breakouts):** "Speed Kills — But Patience Scores", "Routes Have Names for a Reason", "Support Your D"

Features:
- Full-screen modal overlay with progress dots (● ○ ○)
- Coach persona introduces key concepts before scenarios
- Skip button always visible
- Keyboard navigation (Enter/Arrow Right to advance, Escape to skip)
- localStorage tracks which intros user has seen (`puckAcademy_introSeen`)
- "Review intro" links added to training.html module cards (visible after first completion)
- URL parameter `?review=intro` forces intro to show for returning users

**Diagram Improvements:**
- Standardized rink container padding from 20px to 25px across all 19 scenarios
- Simplified legend text from "You (#23)" to "You" for clarity
- Template established for player sizing: You = 26px radius, teammates/opponents = 22px
- Player label changed from "23" to "YOU" in template scenarios for better visual identification

**Files Modified:**
- `hockey-iq-diagram.html`: Full intro overlay + diagram cleanup (template)
- `module2-scenario1-ref-position.html`: Full intro overlay + diagram cleanup
- `module3-scenario1-high-low-route.html`: Full intro overlay + diagram cleanup
- `training.html`: Added "Review intro" links for each module
- All 19 scenario files: Rink container padding and legend text updates

**Technical Details:**
- Intro seen status stored in `puckAcademy_introSeen` localStorage key
- Intro CSS and JS self-contained in each first-scenario file
- Diagrams in intro slides are simplified SVGs showing key concepts

**Remaining Work:**
- Player circle size updates (r=24 → r=26) partially applied; template established for consistency
- Full diagram style guide to be documented for future scenarios

---

### January 25, 2026 - Analytics & Onboarding Improvements

**Google Analytics 4 Integration:**
- Added GA4 tracking (G-0N3XTSRTM2) to all 22 HTML pages
- Custom events implemented:
  - `scenario_answer`: tracks module, scenario, correct/incorrect
  - `module_complete`: tracks module, score, percentage
  - `share_score`: tracks when users share their results
  - `feedback_form_open`: tracks feedback prompt engagement

**Feedback Prompt:**
- Added modal prompt after first module completion asking for feedback
- Only shows once per user (tracked in localStorage)
- Links to Google Form for beta feedback collection

**Onboarding Position Clarity:**
- Defense and Goalie options now grayed out with "Coming Soon" badge
- Added note: "We're starting with forward-focused training. Defense & goalie modules are in development."
- Wingers see a heads-up on final screen: "The Faceoffs module is center-specific. Feel free to skip it, or learn what your center is reading!"
- Clicking disabled positions shows friendly alert explaining content is coming soon

**Files Updated:**
- All 22 HTML files: GA4 script added
- `training.html`: Feedback prompt modal, custom event tracking
- `onboarding.html`: Position selection improvements, winger-specific messaging

---

### January 25, 2026 - Added Module 2 (Faceoffs) and Module 3 (Breakouts)

**New Content Added:**
- **Module 2: Faceoffs** — 7 complete scenarios covering faceoff strategy for centers:
  1. Reading the Ref Position
  2. Recognizing Who Has the Advantage
  3. When to Cheat Your Feet
  4. The Tie-Up Decision
  5. Leverage and Body Position
  6. Forehand vs. Backhand Read
  7. Post-Draw Responsibility

- **Module 3: Breakouts** — 7 complete scenarios covering breakout routes and reads:
  1. High Route vs. Low Route
  2. Reading Pressure — When to Go Quick
  3. Receiving on Forehand vs. Backhand
  4. When to Cut Laterally
  5. Support vs. Stretch
  6. Recognizing the Forecheck Pattern
  7. Broken Play Recovery

**New Files Created:**
- Module 2: `module2-scenario1-ref-position.html` through `module2-scenario7-post-draw.html`
- Module 3: `module3-scenario1-high-low-route.html` through `module3-scenario7-broken-play.html`
- Tyler's Coaching Notes: `tylers-coaching-notes.html` — personalized training doc based on game feedback

**Updated Files:**
- `training.html` — Now displays all three modules with independent progress tracking and scoring
  - Each module has its own localStorage key for scores
  - Results modal adapts to show module-specific messaging
  - Share functionality includes module name

**Technical Notes:**
- Module 2 scores stored in `puckAcademy_module2_scores`
- Module 3 scores stored in `puckAcademy_module3_scores`
- Correct answer positions randomized across scenarios (not all B)
- All scenarios use Coach persona voice for feedback
- SVG diagrams created for each scenario type (faceoff circles, breakout views, etc.)

**Tyler's Personalized Training:**
Created standalone HTML page (`tylers-coaching-notes.html`) with 3 personalized scenarios based on game feedback:
1. The High Route Problem (breakout routes)
2. Faceoff Leverage (stance mechanics)
3. Backcheck Awareness (defensive scanning)

This page is printable/saveable as PDF for offline reference.

---

### January 23, 2026 - Updated Onboarding Flow

**New Onboarding Structure:**
1. Value Prop: "See the Ice Before Everyone Else" - emphasizes pattern recognition
2. Position: "What's Your Position?" - cleaner copy
3. Level: "Where Are You At?" - covers full spectrum (Youth to Pro to Adult Rec)
4. Goals: "What Do You Want to Work On?" - select all that apply
5. Email: "Want Updates?" - concise, no spam promise
6. Ready: "Let's Go." - shows available + coming soon modules

**Key Changes:**
- Added compelling value prop as first step
- "5-10 minutes. No skates required." tagline
- Removed profile preview from email step (cleaner)
- Tightened copy throughout

---

### January 23, 2026 - Added Coach Persona to Main App

**Changes Made:**
- Added "Coach" intro message on training.html module hub
- Updated all results modal messages to sound like Coach talking (personalized, encouraging)
- Updated feedback text in all 5 scenarios to conversational Coach-style
- Coach avatar and styled intro box on training page

**Coach Persona Voice:**
- Direct, confident, supportive
- Explains the "why" conversationally
- Signs off with "— Coach"
- Encourages without being patronizing
- Uses hockey-authentic language

**Testing Hypothesis:**
Will beta testers respond to the Coach persona? Does it make the experience feel more engaging than a standard quiz?

---

### January 23, 2026 - Conversational "Coach" Experience Exploration

**Vision Shift Explored:**
Investigated pivoting from "quiz app" to "relationship-based AI hockey mentor" — inspired by Rayfit's conversational fitness coach approach.

**The Big Idea:**
Instead of Puck Academy being a training tool you open, complete scenarios, and close — it becomes a **persistent relationship** with an AI coach ("Coach") who:
- Knows your context (position, level, goals, team situation, mental state)
- Shows up at key moments (before games, after tough losses, during tryout season)
- Handles the full spectrum: on-ice IQ, mental game, hockey life, goal setting
- Feels like texting with a trusted mentor, not using an app

**Key Insight:**
The scenarios still matter, but they get woven INTO conversations rather than being the whole product. Coach asks "How'd the game go?" → you mention turnovers → Coach offers a relevant scenario → feedback feels like coaching, not right/wrong.

**Prototype Built:**
Created `coach-prototype.html` — a working chat-based interface that demonstrates:
- Dark mode iMessage-style UI (mobile-first, 480px max width)
- Coach persona with avatar, "online" status, typing indicators
- Conversational onboarding (asks your name, how you're feeling)
- Adaptive responses based on user input (confident vs frustrated)
- Scenario card embedded inline in chat conversation
- Quick reply buttons for common responses
- Coach explains the *why* after answers in natural language

**Prototype Flow:**
1. Coach initiates with warm intro
2. Gets player's name (personalization)
3. Checks in on how they're feeling about their game
4. Offers a D-zone read naturally in conversation
5. Scenario appears as card within chat
6. Player taps answer, it becomes a chat message
7. Coach responds conversationally (not just "correct/incorrect")
8. Allows follow-up questions
9. Wraps up with relationship-building

**Technical Notes:**
- Single HTML file, vanilla JS, no dependencies
- State machine drives conversation flow
- Variable typing delays based on message length
- Quick replies prevent auto-advance (bug fix applied)
- Console logging added for debugging flow issues

**Known Issue (WIP):**
Scenario card not appearing after "Alright, check this out" message — debugging in progress. Check browser console for state flow.

**Decision Pending:**
Whether to pursue this direction vs. staying with current quiz-style MVP for beta validation. Recommendation: validate scenarios work first, then wrap relationship layer around them post-beta.

**Files:**
- Prototype: `coach-prototype.html`
- Reference: Rayfit (rayfit.com) for conversational fitness coach inspiration

---

### January 22, 2026 (Late Evening)
- Implemented Netlify Edge Functions for dynamic OG image generation
- Created `netlify/edge-functions/og-image.tsx` - generates PNG images with embedded score using `og_edge` library
- Created `netlify/edge-functions/inject-og-tags.ts` - intercepts requests and injects dynamic OG meta tags based on `?score=` parameter
- Created `netlify.toml` to configure edge function routing
- Updated `index.html` OG image URLs to point to dynamic `/og-image` endpoint
- Score-based image variations: 🏆 (5/5), 🔥 (4/5), 🏒 (2-3/5), 😬 (0-1/5)
- Rich link previews now show personalized content when sharing scores
- Fixed iMessage sharing: combined text+URL into single parameter so context text appears with link
- Share now shows message like "I got a PERFECT SCORE on Puck Academy's..." above the link preview
- Randomized correct answer positions across scenarios (was all B, now B/D/C/A/C) to prevent pattern exploitation
- Fixed default OG tags to show "Train Your Hockey IQ" instead of "Beat My Score" when sharing without a score

### January 22, 2026 (Evening)
- Fixed share bug: Updated `shareResults()` to use separate `title`, `text`, and `url` parameters for better platform compatibility
- Added Open Graph meta tags (`og:image`, dimensions) to index.html and training.html for rich link previews
- Added Twitter Card meta tags for better Twitter/X sharing
- Created `og-image.html` template (1200x630) for generating the social share image
- Note: iOS Messages may still only show link preview (platform limitation), but preview now looks compelling

### January 22, 2026 (Earlier)
- Added scoring system to track correct/incorrect answers per scenario
- Added results modal showing score (X/5) with performance-based messaging
- Added Share Score button with Web Share API (mobile) and clipboard fallback (desktop)
- Added challenge banner to index.html that displays when accessed via shared link with `?score=X` parameter
- Share URL now includes score parameter for personalized landing experience
- Updated "Complete Module Assessment" button to open feedback form
- Identified bug: share text not appearing in Messages (only bare URL shared)
- Updated PROJECT_CONTEXT.md with all recent changes

### January 21, 2026
- Created PROJECT_CONTEXT.md to centralize all project knowledge
- App deployed to https://hockeyiq.netlify.app/
- All 5 defensive zone scenarios working
- GitHub → Netlify auto-deploy pipeline active
- Ready for beta testing with 10-15 users

### January 20, 2026
- Pushed all HTML files to GitHub repository
- Connected GitHub repo to Netlify for auto-deployment
- Set up Netlify Forms for email capture
- Created Google Form for beta feedback collection

### January 17, 2026
- Created module hub with 5 scenario cards
- Built onboarding flow with 5 steps
- Designed SVG rink diagrams for defensive zone

### January 14, 2026
- Created initial product specification document
- Defined MVP features and success metrics
- Established target user personas

### Earlier (2024-2025)
- Extensive research on hockey IQ development methodology
- Podcast interviews with Ken Martel (USA Hockey), Hunter Bishop, and other experts
- Competitive analysis of IntelliGym, Sense Arena, Project Hockey IQ
- Defined "Duolingo for Hockey IQ" vision
- Built early prototypes in various formats

---

*This document should be updated whenever major decisions are made, features are added, or the project direction changes.*
