# PROJECT_CONTEXT.md

**Last Updated:** January 21, 2026  
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

---

## PRODUCT SCOPE

### MVP Features (Must Have)

**Core Learning Experience:**
- Video-based scenario presentation with realistic rink diagrams
- Multiple choice decision points ("What should you do here?")
- Immediate feedback with explanation of correct/incorrect choices
- Progress through linear modules (must complete to unlock next)
- 5 interactive defensive zone scenarios (currently built)

**Onboarding Flow:**
- Position selection (Center, Winger, Defense, Goalie)
- Email capture (optional) for follow-up
- Age/level selection (12-13 A/AA through 16+ High School)
- Improvement area selection (Defensive Zone, Faceoffs, Breakouts, Offensive Zone, Overall Hockey IQ)

**User Progress:**
- Progress tracking across scenarios
- Completion indicators for each module
- Simple streak/achievement display

**Data Collection:**
- Netlify Forms integration for email capture during onboarding
- Google Forms integration for beta feedback collection

### Post-MVP Features (Nice to Have)

**Enhanced Learning:**
- Spaced repetition algorithm (Duolingo-style) to reinforce difficult scenarios
- Video breakdown tools (pause, draw on screen, slow-mo)
- Expert commentary from elite coaches
- Branching scenarios where decisions play out on video

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
2. **Onboarding:** Complete 5-step flow (position → email → age/level → goals → start)
3. **Module Hub:** See Module 1 (Defensive Zone) available with 5 scenarios
4. **Scenario Experience:**
   - View rink diagram with situation description
   - Read the question ("What should you do?")
   - Select from 4 answer options
   - Receive immediate feedback (correct/incorrect with explanation)
   - Progress to next scenario
5. **Completion:** Finish all 5 scenarios, see progress summary
6. **Feedback:** Prompted to complete Google Form with beta feedback
7. **Return:** Come back to continue or review scenarios

### Key Screens/Pages

| Screen | Purpose | Key Elements |
|--------|---------|--------------|
| `onboarding.html` | Capture user info and personalize experience | Position picker, email input (optional), age/level selector, goal selection |
| `index.html` | Module hub showing available training | Module cards with status (available/locked/coming soon), progress indicators |
| `hockey-iq-diagram.html` | Scenario 1 - Defensive zone pressure read | SVG rink diagram, situation text, 4-option answer buttons, feedback display |
| `scenario-2-corner-battle.html` | Scenario 2 - Corner battle support | Same structure as Scenario 1 with different content |
| `scenario-3-cycle.html` | Scenario 3 - Cycle coverage | Same structure |
| `scenario-4-breakout.html` | Scenario 4 - Breakout positioning | Same structure |
| `scenario-5-gap.html` | Scenario 5 - Gap control decision | Same structure, includes "Give Feedback" CTA |

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
| Frontend | HTML, CSS, JavaScript (vanilla) | No framework for simplicity; Tailwind for utility classes |
| Hosting | Netlify | Auto-deploy from GitHub, free tier sufficient |
| Version Control | GitHub | Repository: `jjacobs22/puck-academy-iq-app` |
| Form Handling | Netlify Forms | Captures onboarding emails |
| Feedback Collection | Google Forms | External form linked from app |
| Editor | Cursor | Local development environment |

### File Structure

```
puck-academy-iq-app/
├── index.html                    # Module hub / landing page
├── onboarding.html               # 5-step onboarding flow
├── hockey-iq-diagram.html        # Scenario 1: D-zone pressure read
├── scenario-2-corner-battle.html # Scenario 2: Corner battle
├── scenario-3-cycle.html         # Scenario 3: Cycle coverage
├── scenario-4-breakout.html      # Scenario 4: Breakout positioning
├── scenario-5-gap.html           # Scenario 5: Gap control
└── assets/
    ├── css/
    │   └── styles.css            # Shared styles (optional - currently inline)
    ├── js/
    │   └── training.js           # Scenario logic (optional - currently inline)
    └── images/
        └── rink-full.png         # Hockey rink diagram asset
```

### Data Model

**User Progress (localStorage):**
```javascript
{
  position: "center",
  email: "player@email.com",  // optional
  ageLevel: "14-15 AAA",
  goals: ["defensive-zone", "faceoffs"],
  completedScenarios: ["scenario-1", "scenario-2"],
  currentModule: 1,
  streak: 3
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
| Netlify Forms | Email capture | Hidden form field in onboarding.html |
| Google Forms | Beta feedback | External link from scenario completion |
| Google Fonts | Typography | Bebas Neue (headers), Work Sans (body) |

### Environment & Deployment

**Development:**
- Clone repo locally
- Edit in Cursor
- Test by opening HTML files in browser

**Deployment:**
- Push to `main` branch on GitHub
- Netlify auto-deploys within ~30 seconds
- Live URL: `https://hockeyiq.netlify.app/`

**No environment variables required for MVP**

---

## CURRENT STATE

### What's Working ✅
- **Onboarding flow:** 5-step personalization working end-to-end
- **Module hub:** Shows Module 1 with 5 scenario cards
- **5 complete scenarios:** All playable with questions, answers, and feedback
- **SVG rink diagrams:** Clean visual representation of defensive zone situations
- **Progress tracking:** localStorage saves completed scenarios
- **Email capture:** Netlify Forms collecting onboarding emails
- **Feedback form:** Google Forms linked for beta feedback
- **Mobile responsive:** Works on phone/tablet
- **GitHub → Netlify pipeline:** Auto-deploy on push

### What's Partially Working ⚠️
- **Scenario navigation:** Users can complete scenarios but returning to hub sometimes needs refresh
- **Progress persistence:** Works locally but no server-side backup
- **Non-center users:** Onboarding captures their email with "notify me" but no content for them

### What's Not Started 🔲
- Module 2: Faceoffs (planned)
- Module 3: Breakouts (planned)
- Module 4: Offensive Zone (planned)
- Assessment/testing functionality
- Streak/gamification features
- Coach/parent dashboards
- Position-specific content beyond centers
- Payment/subscription system

### Known Bugs 🐛
1. **Status inconsistency:** Scenario cards occasionally show "Coming Soon" instead of "Start" after clearing cache
2. **Progress reset:** If user clears browser data, all progress is lost
3. **No error handling:** If scenario fails to load, no user-friendly message

### Technical Debt 📋
- **Inline styles:** CSS is duplicated across HTML files; should extract to shared stylesheet
- **Inline JavaScript:** Scenario logic duplicated; should extract to shared JS file
- **No build process:** Manual file management; could benefit from simple bundler
- **Hardcoded scenarios:** Scenario data embedded in HTML; should move to JSON for easier updates

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

---

## ROADMAP & PRIORITIES

### Current Sprint/Focus (January 2026)
1. **Beta launch:** Send app to 10-15 beta testers via onboarding link
2. **Feedback collection:** Monitor Netlify Forms and Google Forms responses
3. **Quick iterations:** Fix any blocking bugs reported by testers

### Next Up (February 2026)
- Analyze beta feedback and identify top 3 improvements
- Add 2-3 more defensive zone scenarios based on feedback
- Build Module 2: Faceoffs (5 scenarios)
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
- Feedback always explains *why* — not just right/wrong

---

## CHANGELOG

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
