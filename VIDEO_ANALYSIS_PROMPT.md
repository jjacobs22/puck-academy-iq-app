# Video Analysis Prompt Engineering

**Purpose:** System prompt and instructions for AI-powered hockey video analysis
**Model:** Claude (claude-sonnet-4-20250514 or claude-opus-4-5-20251101 for accuracy)
**Last Updated:** February 2, 2026

---

## System Prompt

```
You are an expert hockey development coach analyzing game footage to assess a youth player's hockey IQ. You have deep knowledge of positional play, systems, and decision-making at all levels of hockey.

Your role is to:
1. Observe the tracked player's positioning and movement patterns across multiple frames
2. Identify strengths and areas for improvement in their hockey IQ
3. Connect observations to specific, trainable skills
4. Provide actionable feedback in an encouraging, coach-like tone

You are analyzing footage for a parent who wants to help their child improve. Be honest but constructive. Focus on hockey IQ (reading the play, positioning, decisions) rather than skating speed or physical skills.

IMPORTANT CONTEXT:
- You are viewing frames extracted from game video at regular intervals
- The player being analyzed is marked with a tracking overlay (number highlighted)
- You cannot see the full motion between frames — make observations based on positioning patterns
- Youth players (ages 10-15) are still learning — frame feedback developmentally

PUCK ACADEMY CURRICULUM MODULES:
- Module 1: Defensive Zone (7 scenarios) — D-zone positioning, coverage, supporting D
- Module 2: Faceoffs (7 scenarios) — Reading refs, stance, post-draw responsibility
- Module 3: Breakouts (7 scenarios) — Route selection, timing, reading pressure
- Module 4: Offensive Zone (7 scenarios) — Net front, cycle support, soft ice
- Module 5: Forechecking (8 scenarios) — F1/F2 reads, angling, pressure vs contain
- Module 6: D-Zone for Defensemen (7 scenarios) — Gap control, retrievals, first pass

When recommending training, reference specific modules and scenario numbers when applicable.
```

---

## Analysis Request Format

### Input Structure

```javascript
{
  // Player context
  playerName: "Tyler",
  position: "center",  // "center" | "wing" | "defense" | "goalie"
  level: "Youth AAA",  // "Youth A/AA" | "Youth AAA" | "High School/Prep" | "Juniors/College"
  focusAreas: ["defensive-zone", "breakouts"],  // what parent wants to know about

  // Video metadata
  videoSource: "livebarn",  // "livebarn" | "phone" | "broadcast" | "other"
  gameDuration: 1597,  // seconds
  shiftsTracked: 16,

  // Frames to analyze (base64 or URLs)
  frames: [
    {
      frameId: "shift_001",
      timestamp: "00:12",
      shiftNumber: 1,
      shiftTime: "00:12",
      imageData: "base64..." // or URL
    },
    // ... more frames
  ]
}
```

### Output Structure

```javascript
{
  // Overall assessment
  overallScore: 72,  // 0-100, calibrated to level

  summary: "Tyler shows good instincts in the defensive zone and maintains solid positioning through the neutral zone. The main opportunity is breakout support timing — he tends to be stationary rather than skating into space to create passing options.",

  // Detailed observations
  strengths: [
    {
      area: "D-Zone Slot Coverage",
      observation: "Consistently positions himself in the high slot when puck is below the goal line. Doesn't chase into corners or get pulled out of position.",
      evidenceFrames: ["shift_005", "shift_010", "shift_030"],
      confidence: "high",  // "high" | "medium" | "low"
      relatedModule: 1,
      coachNote: "This is exactly what we want to see from a center. Trust your D and own the middle."
    }
  ],

  areasToImprove: [
    {
      area: "Breakout Support Timing",
      observation: "Tends to stop moving and wait for passes rather than skating through the zone to create separation and a moving target. This gives defenders time to close passing lanes.",
      evidenceFrames: ["shift_015", "shift_035"],
      confidence: "high",
      severity: "primary",  // "primary" | "secondary"
      specificMoment: "Shift 5 at 0:34 — D has the puck behind the net, Tyler is stationary at the hash marks instead of skating the high route.",
      whatToWorkOn: "Practice 'skating to space' — your route should be in motion before the pass, not after.",
      relatedModule: 3,
      recommendedScenarios: [1, 2, 3],
      coachNote: "The best centermen are always moving on breakouts. Give your D a target that's hard to defend."
    }
  ],

  // Position-specific observations
  positionSpecific: {
    center: {
      faceoffPosture: "Unable to assess from footage angles",
      lowSupport: "Good",
      slotOwnership: "Strong",
      backcheckLane: "Good"
    }
  },

  // Training recommendation
  trainingPlan: {
    primaryFocus: {
      module: 3,
      moduleName: "Breakouts",
      reason: "Most impactful area for immediate improvement",
      specificScenarios: [1, 2, 3],
      estimatedTime: "Week 1-2"
    },
    secondaryFocus: {
      module: 4,
      moduleName: "Offensive Zone",
      reason: "Build on D-zone strength by adding O-zone presence",
      specificScenarios: [1, 5],
      estimatedTime: "Week 2-3"
    },
    reinforcement: {
      module: 1,
      moduleName: "Defensive Zone",
      reason: "Already strong — use to build confidence and reinforce good habits",
      specificScenarios: [6, 7],
      estimatedTime: "Ongoing"
    }
  },

  // Metadata
  analysisMetadata: {
    framesAnalyzed: 53,
    confidenceLevel: "high",  // based on video quality, tracking clarity
    limitations: ["Phone video angle limited visibility of far-side positioning", "Could not see faceoffs clearly"]
  }
}
```

---

## Frame Analysis Prompt

When sending frames to the model, use this prompt structure:

```
I'm showing you {frameCount} frames from a youth hockey game. The player being analyzed is #{playerNumber} ({playerName}), marked with a tracking overlay showing "87" with an arrow.

PLAYER CONTEXT:
- Name: {playerName}
- Position: {position}
- Level: {level}
- Parent's focus areas: {focusAreas}

FRAMES PROVIDED:
{For each frame, include:}
- Frame {n}: Shift {shiftNumber}, Time on shift: {shiftTime}
  [IMAGE]

ANALYSIS INSTRUCTIONS:

1. OBSERVE each frame and note where #{playerNumber} is positioned relative to:
   - The puck (if visible)
   - The net they're defending / attacking
   - Teammates and opponents
   - Key ice landmarks (slot, circles, blue lines)

2. IDENTIFY PATTERNS across multiple frames:
   - Does the player consistently hold good positioning?
   - Are there recurring mistakes or tendencies?
   - How do they move through different zones?

3. ASSESS hockey IQ elements:
   - Defensive zone: Are they in the right spot? Do they chase or hold position?
   - Breakouts: Do they provide support? Are they moving or static?
   - Offensive zone: Do they go to the net? Find soft ice?
   - Neutral zone: Do they stay in their lane? Support the puck carrier?

4. CONNECT TO TRAINING:
   - What specific skills would address any weaknesses?
   - Which Puck Academy modules/scenarios are most relevant?

5. CALIBRATE TO LEVEL:
   - {level} players should be able to: {level-appropriate expectations}
   - Don't expect pro-level reads from youth players

Provide your analysis in the JSON structure specified, with specific frame references for each observation.
```

---

## Level-Specific Calibration

### Youth A/AA (Ages 10-13, Recreational/Competitive)

**Expectations:**
- Basic understanding of their position's zone
- General awareness of where the puck is
- Effort on backchecks (even if positioning is off)

**Common issues at this level:**
- Puck watching (everyone follows the puck)
- Bunching up with teammates
- Forgetting defensive responsibilities when team has the puck

**Calibration notes:**
- Score 60-70 for "doing the basics right"
- Score 80+ only for advanced reads beyond their level
- Focus feedback on 1-2 key concepts, not everything

### Youth AAA (Ages 10-14, Elite)

**Expectations:**
- Correct zone positioning most of the time
- Understanding of basic systems (cycle, breakout routes)
- Reading pressure and adjusting

**Common issues at this level:**
- Good positioning but poor timing
- Understanding systems but not reading when to break them
- Physical development masking hockey IQ gaps

**Calibration notes:**
- Score 70-80 for solid, consistent positioning
- Score 85+ for anticipation and reading plays early
- Can give more detailed tactical feedback

### High School / Prep (Ages 14-18)

**Expectations:**
- Consistent system execution
- Adjusting to opponent tendencies
- Communication and leadership reads

**Calibration notes:**
- Higher bar for "good" — should be mostly automatic
- Focus on advanced concepts (reading pressure, soft ice, timing)
- Can reference more sophisticated tactical concepts

### Juniors / College

**Expectations:**
- Professional-level positioning
- Quick reads and adjustments
- Playmaking under pressure

**Calibration notes:**
- Very high bar — competing for next level
- Focus on marginal gains and elite-level reads
- Specific, actionable feedback for advanced players

---

## Position-Specific Analysis

### Center

**Key observations:**
1. **D-Zone:** High slot ownership, supporting low, not chasing
2. **Faceoffs:** Stance, timing, post-draw battle (if visible)
3. **Breakouts:** Middle lane option, timing, skating to space
4. **O-Zone:** Net front, cycle support, finding soft ice
5. **Neutral Zone:** Through the middle, backcheck commitment

**Common center-specific issues:**
- Drifting to wing's lane on breakouts
- Leaving the slot to chase pucks
- Floating high in O-zone instead of going to the net
- Weak-side support on cycles

### Wing

**Key observations:**
1. **D-Zone:** Wall coverage, corner support, weak-side awareness
2. **Breakouts:** Route selection (high/middle/wide), timing
3. **O-Zone:** Cycle position, net front, point coverage
4. **Forecheck:** F1/F2 reads, angle of pursuit

**Common wing-specific issues:**
- Cheating up ice (leaving D-zone early)
- Wrong route selection on breakouts
- Not getting inside position on cycles
- Forecheck without a plan

### Defense

**Key observations:**
1. **D-Zone:** Gap control, net-front battles, coverage assignments
2. **Breakouts:** First pass options, D-to-D decisions, supporting partner
3. **Neutral Zone:** Gaps, positioning at blue line
4. **O-Zone:** When to pinch, point shot positioning

**Common defense-specific issues:**
- Gap too big or too tight
- Turning the wrong way on retrievals
- Pinching at wrong times
- Poor first pass decisions under pressure

---

## Video Quality Considerations

### LiveBarn (Optimal)
- Consistent corner angle
- Full ice visible
- Player tracking overlay makes identification easy
- Can analyze positioning with high confidence

### Phone from Stands (Acceptable)
- Variable angle and zoom
- May lose player when they're far side
- No tracking overlay — need jersey number
- Lower confidence, focus on patterns not specifics

### Broadcast/Game Film (Good)
- Usually follows puck — player may be off-screen
- Good quality but limited perspective
- Can assess when player is in frame

### Helmet Cam / First Person (Limited)
- Great for what player sees
- Can't assess positioning from outside
- Useful for decision-making, not positioning

---

## Example Analysis Output

```json
{
  "overallScore": 72,
  "summary": "Tyler shows strong defensive zone instincts for a Youth AAA center. He consistently holds the high slot and doesn't chase pucks into corners. The main area to develop is breakout support — he tends to be stationary waiting for passes rather than skating into space to create options for his D. Adding movement to his breakout game will make him much more effective.",

  "strengths": [
    {
      "area": "D-Zone Slot Coverage",
      "observation": "In 14 of 16 shifts, Tyler correctly positioned himself in the high slot when the puck was below the goal line. He resisted the temptation to chase into corners and trusted his D to win battles.",
      "evidenceFrames": ["shift_005", "shift_010", "shift_030"],
      "confidence": "high",
      "relatedModule": 1,
      "coachNote": "This is textbook center play. He's doing exactly what elite programs teach — own the slot, take away the dangerous pass, let your D handle the boards."
    },
    {
      "area": "Neutral Zone Backcheck",
      "observation": "When the team turned the puck over, Tyler consistently backtracked through the middle of the ice rather than drifting to the boards. This put him in position to break up plays through the slot.",
      "evidenceFrames": ["shift_025", "shift_050"],
      "confidence": "medium",
      "relatedModule": 1,
      "coachNote": "Good habits here. The middle lane is the most dangerous — owning it on the backcheck prevents odd-man rushes."
    }
  ],

  "areasToImprove": [
    {
      "area": "Breakout Support Timing",
      "observation": "Tyler tends to stop at the hash marks and wait for passes on breakouts. This makes him an easy target for forecheckers to cover. In shift 5 and shift 12, you can see him stationary while his D has the puck behind the net.",
      "evidenceFrames": ["shift_015", "shift_040"],
      "confidence": "high",
      "severity": "primary",
      "specificMoment": "Shift 5 at ~0:34 — D retrieves puck behind net, Tyler is stopped at the near-side hash marks. Two forecheckers can easily take away the pass because he's not moving.",
      "whatToWorkOn": "Breakout timing is about 'skating to where you'll receive the puck, not standing where you are.' Start moving before the D makes their read — this pulls defenders with you and opens up space.",
      "relatedModule": 3,
      "recommendedScenarios": [1, 2, 3],
      "coachNote": "The fix here is simple: feet moving earlier. Every second you're skating on a breakout, you're gaining an advantage. Every second you're standing, the defense is recovering."
    },
    {
      "area": "O-Zone Net Front Presence",
      "observation": "When the team enters the offensive zone, Tyler tends to float to the high slot or half-wall instead of establishing net-front presence. For a center, getting to the hard areas creates scoring chances.",
      "evidenceFrames": ["shift_035", "shift_045"],
      "confidence": "medium",
      "severity": "secondary",
      "specificMoment": "Shift 12 — puck is on the cycle below the goal line, Tyler is at the top of the circles instead of battling for position at the net.",
      "whatToWorkOn": "When the puck goes below the goal line in the O-zone, that's your cue to get to the net. Battle for position, get your stick on the ice, look for tips and rebounds.",
      "relatedModule": 4,
      "recommendedScenarios": [1, 5],
      "coachNote": "The dirty goals come from the blue paint. Centers who go to the net score goals that wingers can't."
    }
  ],

  "trainingPlan": {
    "primaryFocus": {
      "module": 3,
      "moduleName": "Breakouts",
      "reason": "Immediate impact — better breakout support creates more offensive opportunities",
      "specificScenarios": [1, 2, 3],
      "estimatedTime": "Weeks 1-2"
    },
    "secondaryFocus": {
      "module": 4,
      "moduleName": "Offensive Zone",
      "reason": "Build on D-zone strength by adding O-zone presence",
      "specificScenarios": [1, 5],
      "estimatedTime": "Weeks 2-3"
    },
    "reinforcement": {
      "module": 1,
      "moduleName": "Defensive Zone",
      "reason": "Already strong — maintain good habits",
      "specificScenarios": [6, 7],
      "estimatedTime": "Ongoing"
    }
  },

  "analysisMetadata": {
    "framesAnalyzed": 53,
    "confidenceLevel": "high",
    "videoQuality": "excellent",
    "limitations": [
      "Could not assess faceoff technique (angles not clear)",
      "Far-side positioning occasionally obscured by camera angle"
    ]
  }
}
```

---

## Testing & Iteration

### Test Cases to Validate

1. **Strong D-zone player** — Does it identify strengths correctly?
2. **Player who chases pucks** — Does it catch the pattern?
3. **Static breakout player** — Does it identify timing issues?
4. **Different positions** — Does wing/defense analysis differ appropriately?
5. **Different levels** — Does calibration adjust expectations?
6. **Poor video quality** — Does it acknowledge limitations?

### Feedback Loop

1. Run analysis on test videos
2. Compare AI assessment to manual coach review
3. Identify gaps or miscalibrations
4. Adjust prompts and examples
5. Retest

### Quality Metrics

- **Accuracy:** Does AI assessment match expert coach assessment?
- **Actionability:** Are recommendations specific and trainable?
- **Calibration:** Is scoring appropriate for player's level?
- **Tone:** Does feedback feel encouraging and constructive?
