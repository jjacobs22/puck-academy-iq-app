# Video Assessment Feature Spec

**Feature Name:** Hockey IQ Assessment
**Status:** Concept/Design
**Author:** Jason Jacobs
**Last Updated:** February 2, 2026

---

## Overview

A personalized assessment feature where parents upload game footage and receive AI-powered analysis of their player's hockey IQ, with specific recommendations tied to Puck Academy curriculum.

**Value Proposition:** "Upload a few shifts. We'll show you exactly what to work on."

---

## User Flow

### Entry Points

1. **Landing Page CTA** (new users)
   - "Get Your Free Hockey IQ Assessment →"
   - Positioned as lead magnet / differentiated onboarding

2. **Dashboard Card** (existing users)
   - "📹 Upload Game Film for Personalized Analysis"
   - Appears after completing first module

3. **Coach's Office** (conversational)
   - Parent mentions specific concern → Coach offers to analyze footage

---

## Step-by-Step Flow

### Step 1: Context Collection
**Screen:** `assessment-upload.html`

```
┌─────────────────────────────────────────────┐
│                                             │
│  📹 Let's Analyze Your Game                 │
│                                             │
│  Upload a few shifts and we'll identify     │
│  exactly what to work on.                   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  Player's First Name                │   │
│  │  [Tyler                         ]   │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  Position                           │   │
│  │  [Center ▼                      ]   │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  Level                              │   │
│  │  [Youth AAA ▼                   ]   │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  What are you most curious about?   │   │
│  │  □ Defensive zone coverage          │   │
│  │  □ Breakout support                 │   │
│  │  □ Offensive zone positioning       │   │
│  │  □ Overall hockey IQ                │   │
│  └─────────────────────────────────────┘   │
│                                             │
│           [ Continue → ]                    │
│                                             │
└─────────────────────────────────────────────┘
```

**Data captured:**
- `playerName`: string
- `position`: "center" | "wing" | "defense"
- `level`: string
- `focusAreas`: string[]

---

### Step 2: Video Upload
**Screen:** `assessment-upload.html` (step 2)

```
┌─────────────────────────────────────────────┐
│                                             │
│  📹 Upload Tyler's Game Film                │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │                                     │   │
│  │     ┌───────────────────────┐       │   │
│  │     │                       │       │   │
│  │     │    📁 Drop file here  │       │   │
│  │     │    or click to browse │       │   │
│  │     │                       │       │   │
│  │     └───────────────────────┘       │   │
│  │                                     │   │
│  │  Accepted: .mp4, .mov (max 1GB)     │   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  💡 Best results with:                      │
│  • LiveBarn player tracking video           │
│  • 3-5 shifts minimum                       │
│  • Full ice visible                         │
│                                             │
│  Don't have LiveBarn? You can also upload   │
│  phone recordings from the stands.          │
│                                             │
│           [ Upload & Analyze → ]            │
│                                             │
└─────────────────────────────────────────────┘
```

**Technical notes:**
- Accept .mp4, .mov up to 1GB
- Upload to S3/R2 with presigned URL
- Show upload progress bar
- Validate file before processing

---

### Step 3: Processing State
**Screen:** `assessment-processing.html`

```
┌─────────────────────────────────────────────┐
│                                             │
│  🎬 Analyzing Tyler's Game...               │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │                                     │   │
│  │  [Frame thumbnail]  [Frame]  [Frame]│   │
│  │                                     │   │
│  │  ████████████░░░░░░░░░░  45%        │   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ✓ Video uploaded                           │
│  ✓ Extracting key moments                   │
│  ◉ Analyzing positioning...                 │
│  ○ Generating recommendations               │
│                                             │
│  This usually takes 2-3 minutes.            │
│  We'll email you when it's ready.           │
│                                             │
│  [ Get notified by email ]                  │
│                                             │
└─────────────────────────────────────────────┘
```

**Processing pipeline:**
1. Upload video to storage
2. Extract frames (1 per 5 seconds for overview, 1 per second for key moments)
3. Identify player position in each frame
4. Run AI analysis on frame sequences
5. Generate report
6. Store results, notify user

**Time estimate:** 2-5 minutes depending on video length

---

### Step 4: Results
**Screen:** `assessment-results.html`

```
┌─────────────────────────────────────────────┐
│                                             │
│  Tyler's Hockey IQ Assessment               │
│  Boston Jr Terriers • Center • Youth AAA    │
│                                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                             │
│  📊 OVERALL ASSESSMENT                      │
│  ┌─────────────────────────────────────┐   │
│  │                                     │   │
│  │  Hockey IQ Score: 72/100            │   │
│  │  ████████████████░░░░               │   │
│  │                                     │   │
│  │  "Tyler shows good instincts in     │   │
│  │  the defensive zone and maintains   │   │
│  │  solid positioning through the      │   │
│  │  neutral zone. Main opportunity     │   │
│  │  is breakout support timing."       │   │
│  │                                     │   │
│  │                        — Coach      │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                             │
│  💪 STRENGTHS OBSERVED                      │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ ✓ D-Zone Positioning                │   │
│  │   Holds the high slot well, doesn't │   │
│  │   chase pucks into corners          │   │
│  │   [See example →]                   │   │
│  ├─────────────────────────────────────┤   │
│  │ ✓ Neutral Zone Tracking             │   │
│  │   Stays through the middle on       │   │
│  │   backchecks, good gap control      │   │
│  │   [See example →]                   │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                             │
│  🎯 AREAS TO DEVELOP                        │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ ⚠ Breakout Support Timing           │   │
│  │   Often stationary waiting for      │   │
│  │   pass instead of skating into      │   │
│  │   space to create a passing lane    │   │
│  │                                     │   │
│  │   [Frame: Shift 5 @ 0:34]           │   │
│  │   ┌─────────────────────┐           │   │
│  │   │  [annotated frame]  │           │   │
│  │   └─────────────────────┘           │   │
│  │                                     │   │
│  │   📚 Train this: Module 3,          │   │
│  │   Scenarios 1-3                     │   │
│  │   [ Start Training → ]             │   │
│  ├─────────────────────────────────────┤   │
│  │ ⚠ O-Zone Net Front Presence         │   │
│  │   Tends to float high in offensive  │   │
│  │   zone instead of establishing      │   │
│  │   net-front position                │   │
│  │                                     │   │
│  │   📚 Train this: Module 4,          │   │
│  │   Scenarios 1, 5                    │   │
│  │   [ Start Training → ]             │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                             │
│  🏋️ YOUR PERSONALIZED TRAINING PLAN        │
│                                             │
│  Based on this assessment, here's your      │
│  recommended training sequence:             │
│                                             │
│  Week 1: Module 3 - Breakouts (focus)       │
│  Week 2: Module 4 - Offensive Zone          │
│  Week 3: Module 1 - D-Zone (reinforce)      │
│                                             │
│  [ Start Your Training Plan → ]             │
│                                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                             │
│  📤 Share this assessment                   │
│  [ Copy Link ] [ Email to Coach ]           │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Results Data Structure

```javascript
{
  assessmentId: "assess_abc123",
  playerId: "user_xyz",
  playerName: "Tyler",
  position: "center",
  level: "Youth AAA",
  createdAt: "2026-02-02T10:30:00Z",

  videoMetadata: {
    duration: 1597,  // seconds
    shiftsAnalyzed: 16,
    framesProcessed: 320,
    source: "livebarn"  // or "phone", "other"
  },

  overallScore: 72,  // 0-100

  summary: "Tyler shows good instincts in the defensive zone...",

  strengths: [
    {
      area: "D-Zone Positioning",
      description: "Holds the high slot well, doesn't chase pucks into corners",
      confidence: 0.85,
      exampleFrames: ["shift_005.jpg", "shift_010.jpg"],
      relatedModule: 1
    },
    {
      area: "Neutral Zone Tracking",
      description: "Stays through the middle on backchecks",
      confidence: 0.78,
      exampleFrames: ["shift_025.jpg"],
      relatedModule: 3
    }
  ],

  areasToImprove: [
    {
      area: "Breakout Support Timing",
      description: "Often stationary waiting for pass instead of skating into space",
      severity: "primary",  // primary, secondary
      confidence: 0.82,
      exampleFrames: ["shift_015.jpg", "shift_035.jpg"],
      timestamp: "5:34",  // where to see it in video
      recommendedModule: 3,
      recommendedScenarios: [1, 2, 3]
    },
    {
      area: "O-Zone Net Front Presence",
      description: "Tends to float high instead of establishing net-front",
      severity: "secondary",
      confidence: 0.71,
      exampleFrames: ["shift_040.jpg"],
      recommendedModule: 4,
      recommendedScenarios: [1, 5]
    }
  ],

  trainingPlan: {
    week1: { module: 3, focus: "Breakouts", priority: "primary" },
    week2: { module: 4, focus: "Offensive Zone", priority: "secondary" },
    week3: { module: 1, focus: "D-Zone", priority: "reinforce" }
  }
}
```

---

## AI Analysis System

### Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Video      │     │   Frame      │     │   AI         │
│   Upload     │ ──► │   Extractor  │ ──► │   Analysis   │
│   (S3/R2)    │     │   (ffmpeg)   │     │   (Claude)   │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
                                                 ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Results    │     │   Report     │     │   Curriculum │
│   Storage    │ ◄── │   Generator  │ ◄── │   Mapper     │
│   (Supabase) │     │              │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
```

### Processing Pipeline (Netlify Function)

```javascript
// netlify/functions/analyze-video.js

export async function handler(event) {
  const { videoUrl, playerName, position, level, focusAreas } = JSON.parse(event.body);

  // 1. Extract frames from video
  const frames = await extractFrames(videoUrl, {
    overviewInterval: 30,  // 1 frame per 30 sec for overview
    detailInterval: 5,     // 1 frame per 5 sec for detail
    maxFrames: 100
  });

  // 2. Run AI analysis
  const analysis = await analyzeFrames(frames, {
    playerName,
    position,
    level,
    focusAreas
  });

  // 3. Map to curriculum
  const recommendations = mapToCurriculum(analysis);

  // 4. Generate report
  const report = generateReport(analysis, recommendations);

  // 5. Store results
  await storeAssessment(report);

  return { statusCode: 200, body: JSON.stringify(report) };
}
```

---

## AI Analysis Prompt

See `VIDEO_ANALYSIS_PROMPT.md` for the full prompt engineering spec.

---

## Cost Analysis

### Per Assessment

| Component | Cost Estimate |
|-----------|---------------|
| Video storage (temp, 1GB) | $0.02 |
| Frame extraction (Lambda/serverless) | $0.05 |
| Claude Vision API (~50 frames) | $0.50-1.00 |
| Report generation | $0.10 |
| **Total per assessment** | **~$0.70-1.20** |

### At Scale

| Users/Month | Assessments | Cost | Revenue (@ $19/assessment) |
|-------------|-------------|------|---------------------------|
| 100 | 100 | $70-120 | $1,900 |
| 500 | 500 | $350-600 | $9,500 |
| 1,000 | 1,000 | $700-1,200 | $19,000 |

**Margin:** 85-95% at $19 price point

---

## Monetization Options

### Option A: Standalone Purchase
- $19-29 per assessment
- Good for: acquisition, one-time value

### Option B: Included with Premium Subscription
- $19.99/month includes 1 assessment/month
- Good for: retention, ongoing value

### Option C: Free Lead Magnet (Limited)
- Free assessment (limited detail)
- Full report requires subscription
- Good for: acquisition, conversion

**Recommendation:** Start with Option A to validate demand, then bundle into subscription.

---

## MVP Scope

### Phase 1: Manual (Now)
- Parent emails video to support@puckacademy.com
- You run analysis manually (like we just did)
- Email back personalized PDF report
- **Goal:** Validate demand, refine analysis quality

### Phase 2: Semi-Automated (Month 1)
- Build upload form + processing queue
- Frame extraction automated
- AI analysis automated
- Results page with basic formatting
- **Goal:** Handle 10-50 assessments/week

### Phase 3: Full Product (Month 2-3)
- Polished UI/UX
- Annotated frame examples
- Training plan integration
- Progress tracking post-assessment
- **Goal:** Self-serve at scale

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Assessment completion rate | >80% (of uploads) |
| Time to results | <5 minutes |
| User satisfaction (NPS) | >50 |
| Conversion to training | >60% start recommended module |
| Return for 2nd assessment | >30% within 60 days |

---

## Open Questions

1. **LiveBarn vs. phone footage:** How much does analysis quality degrade with phone video?
2. **Player identification:** Without SportLogiq overlay, can we reliably track the right player?
3. **Privacy:** Do we need consent flows for other players visible in footage?
4. **Storage:** How long do we keep uploaded videos?
5. **Coach sharing:** Should there be a flow to share assessment with player's actual coach?

---

## Next Steps

1. [ ] Finalize AI analysis prompt (see VIDEO_ANALYSIS_PROMPT.md)
2. [ ] Build upload form UI
3. [ ] Set up video processing pipeline
4. [ ] Test with 5-10 real videos (beta users)
5. [ ] Iterate on report format based on feedback
