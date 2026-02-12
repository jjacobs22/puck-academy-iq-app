const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, LevelFormat, HeadingLevel,
        BorderStyle, WidthType, ShadingType, PageBreak, PageNumber } = require('docx');

// ─── Shared formatting helpers ───
const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

function heading(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({ heading: level, children: [new TextRun(text)] });
}

function para(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    ...opts,
    children: Array.isArray(text) ? text : [new TextRun(text)]
  });
}

function bold(text) { return new TextRun({ text, bold: true }); }
function italic(text) { return new TextRun({ text, italics: true }); }
function red(text) { return new TextRun({ text, bold: true, color: "C8102E" }); }
function green(text) { return new TextRun({ text, bold: true, color: "2D7A3E" }); }

function severityCell(sev) {
  const colors = {
    "GUTTED": { fill: "FDEDED", color: "C8102E" },
    "SIGNIFICANT": { fill: "FFF3CD", color: "856404" },
    "MODERATE": { fill: "FFF3CD", color: "856404" },
    "MINOR": { fill: "D4EDDA", color: "155724" },
    "OK": { fill: "D4EDDA", color: "155724" },
  };
  const c = colors[sev] || colors["MODERATE"];
  return new TableCell({
    borders, width: { size: 1200, type: WidthType.DXA },
    shading: { fill: c.fill, type: ShadingType.CLEAR },
    margins: cellMargins,
    verticalAlign: "center",
    children: [new Paragraph({ children: [new TextRun({ text: sev, bold: true, color: c.color, size: 20 })] })]
  });
}

function textCell(text, width, opts = {}) {
  const runs = Array.isArray(text) ? text : [new TextRun({ text, size: 20 })];
  return new TableCell({
    borders, width: { size: width, type: WidthType.DXA },
    shading: opts.shading ? { fill: opts.shading, type: ShadingType.CLEAR } : undefined,
    margins: cellMargins,
    children: [new Paragraph({ children: runs })]
  });
}

function scenarioRow(num, originalTitle, newTitle, severity, issue) {
  return new TableRow({
    children: [
      textCell(`S${num}`, 500),
      textCell(originalTitle, 2200),
      textCell(newTitle, 2200),
      severityCell(severity),
      textCell(issue, 3460),
    ]
  });
}

function headerRow() {
  const hdr = (text, width) => new TableCell({
    borders, width: { size: width, type: WidthType.DXA },
    shading: { fill: "0A1628", type: ShadingType.CLEAR },
    margins: cellMargins,
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, color: "FFFFFF", size: 20 })] })]
  });
  return new TableRow({
    children: [hdr("#", 500), hdr("Original", 2200), hdr("Cursor Rewrite", 2200), hdr("Severity", 1200), hdr("Issue", 3460)]
  });
}

// ─── Document content ───

const children = [];

// Title page
children.push(
  new Paragraph({ spacing: { before: 4000 } }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: "PUCK ACADEMY", font: "Arial", size: 56, bold: true, color: "0A1628" })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 600 },
    children: [new TextRun({ text: "Scenario Content Audit", font: "Arial", size: 36, color: "C8102E" })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: "Original HTML Scenarios vs. Cursor SPA Rewrite", size: 24, color: "666666" })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "February 2026", size: 22, color: "999999" })]
  }),
  new Paragraph({ children: [new PageBreak()] })
);

// Executive Summary
children.push(
  heading("Executive Summary"),
  para([
    new TextRun("When Cursor rebuilt the app as a SvelteKit SPA, it rewrote the scenario content across all 43 scenarios. The UI/UX improvements (inline coach cues, optional Learn the Basics link, gamification layer) are solid. But "),
    bold("the scenario content itself was significantly downgraded in 3 of 6 modules."),
  ]),
  para([
    new TextRun("The pattern is consistent: Cursor replaced "),
    bold("specific, high-leverage game reads"),
    new TextRun(" (the kind a $150/hr development coach teaches) with "),
    bold("generic positioning knowledge"),
    new TextRun(" (the kind you find in any coaching manual). This matters because the content IS the product. If the scenarios feel like a textbook quiz, Puck Academy is a commodity. If they feel like a coach whispering in your ear during a game, it\u2019s the thing nobody else is building."),
  ]),
  para(""),
);

// Severity legend
children.push(
  heading("Severity Legend", HeadingLevel.HEADING_2),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [1500, 7860],
    rows: [
      new TableRow({ children: [
        severityCell("GUTTED"),
        textCell("Original teaching intent completely replaced. Scenario teaches something fundamentally different.", 7860)
      ]}),
      new TableRow({ children: [
        severityCell("SIGNIFICANT"),
        textCell("Core read or decision was genericized. Still related to the topic but lost the specific insight.", 7860)
      ]}),
      new TableRow({ children: [
        severityCell("MODERATE"),
        textCell("Teaching intent preserved but framing or specificity downgraded.", 7860)
      ]}),
      new TableRow({ children: [
        severityCell("OK"),
        textCell("Content is equivalent or acceptably close to original.", 7860)
      ]}),
    ]
  }),
  para(""),
  new Paragraph({ children: [new PageBreak()] })
);

// ─── MODULE 1 ───
children.push(
  heading("Module 1: Defensive Zone Awareness"),
  para([green("Verdict: Mostly preserved."), new TextRun(" This module fared best. 5 of 7 scenarios kept the original teaching intent. Two have moderate framing shifts.")]),
  para(""),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [500, 2200, 2200, 1200, 3460],
    rows: [
      headerRow(),
      scenarioRow(1, "Defensive Zone Coverage", "Reading Pressure on Your D-Man", "OK", "Same core read: center covers slot while D handles boards. Framing slightly different but teaching intact."),
      scenarioRow(2, "Corner Battle Support", "The Corner Battle", "MODERATE", "Original: stay HIGH in slot to protect passing lane. New: position BETWEEN corner and net. Different positioning, less emphasis on the passing lane read."),
      scenarioRow(3, "Reading the Cycle", "Cycle Coverage", "OK", "Same read: anticipate the pass from the cycle, slide into the lane. Preserved."),
      scenarioRow(4, "Breakout Timing", "Breakout Timing", "OK", "Identical teaching: swing low through middle for short safe option."),
      scenarioRow(5, "Gap Control", "Gap Control", "OK", "Same read: angle backcheck to take away the middle lane."),
      scenarioRow(6, "Winger Caught Up Ice", "Winger Caught Up Ice", "OK", "Same read: stay central, take away middle on 3-on-2."),
      scenarioRow(7, "D Partner Bites on Cycle", "D Partner Bites on Cycle", "OK", "Same read: drop into high slot to cover point-to-slot pass."),
    ]
  }),
  para(""),
  new Paragraph({ children: [new PageBreak()] })
);

// ─── MODULE 2 ───
children.push(
  heading("Module 2: Faceoffs"),
  para([red("Verdict: Gutted."), new TextRun(" This is the most significant content loss. The original module taught faceoff TECHNIQUE for centers \u2014 reading the ref, grip adjustments, leverage mechanics, forehand/backhand decisions, competitive edges. These are the exact high-value reads that differentiate Puck Academy from a coaching manual. Cursor replaced all 7 scenarios with generic \u201Cwhere should other positions stand during faceoffs\u201D questions. This is hockey 101, not development coaching.")]),
  para(""),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [500, 2200, 2200, 1200, 3460],
    rows: [
      headerRow(),
      scenarioRow(1, "Reading the Ref Position", "D-Zone Faceoff Positioning", "GUTTED", "Original: read linesman\u2019s body lean to decide forehand approach. Specific, high-value faceoff technique. New: where should LW stand on D-zone draw. Basic positioning."),
      scenarioRow(2, "Recognizing Who Has Advantage", "O-Zone Faceoff \u2014 One-Timer Setup", "GUTTED", "Original: same-handed matchup, linesman position determines advantage. Nuanced read. New: where to stand as RW for relay to point. Generic."),
      scenarioRow(3, "When to Cheat Your Feet", "Neutral Zone Faceoff Read", "GUTTED", "Original: pushing competitive boundaries in high-leverage moments (cheating feet). Teaches competing. New: reading opponent winger positioning. Unrelated."),
      scenarioRow(4, "The Tie-Up Decision", "Faceoff Loss Recovery", "GUTTED", "Original: adapting strategy when outmatched (tie-up vs clean win). Smart hockey. New: what to do after center lost draw. Different topic entirely."),
      scenarioRow(5, "Leverage and Body Position", "Faceoff Win Execution", "GUTTED", "Original: lower body mechanics for faceoff power (weight on balls of feet). Physical technique. New: cut to net after won draw. Unrelated."),
      scenarioRow(6, "Forehand vs. Backhand Read", "Late-Game Faceoff \u2014 Protecting Lead", "GUTTED", "Original: adapting when patterns fail, switching forehand/backhand with positional advantage. New: conservative positioning with 30 sec left. Different topic."),
      scenarioRow(7, "Post-Draw Responsibility", "Power Play Faceoff \u2014 Umbrella Setup", "GUTTED", "Original: recovery to high slot after lost draw (what to do when it goes wrong). New: PP faceoff execution with umbrella. Different topic."),
    ]
  }),
  para(""),
  para([
    bold("What was lost: "),
    new TextRun("The original Module 2 was the strongest example of \u201Cdevelopment coach in your pocket.\u201D It taught reads that most youth players never learn: how the linesman\u2019s lean affects your approach, when to switch from backhand to forehand, leverage mechanics, competitive edge tactics (cheating feet), and the mental game of adapting when outmatched. This is exactly the kind of content your brain dump describes as underserved."),
  ]),
  para([
    bold("What replaced it: "),
    new TextRun("Generic faceoff positioning for non-centers. Where to stand as a winger. What to do after a won/lost draw. These are fine scenarios but they\u2019re not teaching faceoff IQ for the player taking the draw \u2014 they\u2019re teaching basic team structure."),
  ]),
  new Paragraph({ children: [new PageBreak()] })
);

// ─── MODULE 3 ───
children.push(
  heading("Module 3: Breakouts"),
  para([red("Verdict: Significantly changed."), new TextRun(" The original taught specific decision-making reads for centers during breakouts \u2014 how you receive the puck matters (forehand vs backhand route), when to cut laterally vs dump, reading forecheck patterns. Cursor\u2019s version is more of a generic breakout playbook from multiple positions.")]),
  para(""),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [500, 2200, 2200, 1200, 3460],
    rows: [
      headerRow(),
      scenarioRow(1, "High Route vs. Low Route", "Standard Breakout \u2014 Getting Open", "SIGNIFICANT", "Original: center\u2019s route choice (come LOW to receive on forehand with vision). Specific technique. New: winger attacks boards to get low. Different position, different read."),
      scenarioRow(2, "Reading Pressure \u2014 Quick", "Reverse Breakout", "GUTTED", "Original: flash to weak side when heavy pressure dictates. In-the-moment read. New: D reverses behind net. Completely different play."),
      scenarioRow(3, "Forehand vs. Backhand Receive", "Center Support on Hard Forecheck", "GUTTED", "Original: arc your route wider to receive on forehand with vision. This is a GREAT coaching insight \u2014 a small adjustment that changes everything. New: generic center support. Lost."),
      scenarioRow(4, "When to Cut Laterally", "Winger Board Positioning", "GUTTED", "Original: cut into soft ice to create time, don\u2019t panic-dump. Teaches poise. New: winger positioning on boards. Different topic."),
      scenarioRow(5, "Support vs. Stretch", "Wheel Play \u2014 Fill the Lane", "SIGNIFICANT", "Original: stay as close support until breakout is complete (don\u2019t abandon too early). New: fill middle on wheel play. Related but lost the timing/patience insight."),
      scenarioRow(6, "Recognizing Forecheck Pattern", "Breakout Under Heavy Pressure", "SIGNIFICANT", "Original: reading 1-2-2 trap and possessing through it. Strategic. New: quick short pass under pressure. More reactive, less strategic."),
      scenarioRow(7, "Broken Play Recovery", "Stretch Pass Recognition", "GUTTED", "Original: transition to defense when breakout fails. Teaches mental transition. New: when to fire stretch pass on soft forecheck. Completely different."),
    ]
  }),
  para(""),
  para([
    bold("Key loss: "),
    new TextRun("Scenario 3 (\u201CReceiving on Forehand vs. Backhand\u201D) was the best example of a small, specific coaching insight that changes everything. \u201CArc your route wider to receive on forehand with vision.\u201D That\u2019s a 2-second adjustment that most kids never think about. It\u2019s gone."),
  ]),
  new Paragraph({ children: [new PageBreak()] })
);

// ─── MODULE 4 ───
children.push(
  heading("Module 4: Offensive Zone IQ"),
  para([new TextRun({ text: "Verdict: Moderately changed.", bold: true, color: "856404" }), new TextRun(" Topics are roughly aligned but several scenarios shifted from in-the-moment reads to concept explanations.")]),
  para(""),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [500, 2200, 2200, 1200, 3460],
    rows: [
      headerRow(),
      scenarioRow(1, "Net-Front Positioning", "Net-Front Positioning", "OK", "Similar: get to net front, angled to see the puck for tips. Core read preserved."),
      scenarioRow(2, "Cycle Support", "Cycling the Puck Low", "MODERATE", "Original: when/how to support the cycle. New: when to cycle (linemate has inside position). Shifted from support read to execution rule."),
      scenarioRow(3, "Soft Ice / Finding Space", "Shot Selection", "SIGNIFICANT", "Original: finding open ice in the O-zone. New: shot selection decision (shoot vs pass). Different skill entirely."),
      scenarioRow(4, "Backdoor Play", "Screening the Goalie", "SIGNIFICANT", "Original: recognizing and executing backdoor play. New: legal screen technique. Different topic."),
      scenarioRow(5, "Screen / Tip", "Back-Door Play Recognition", "MODERATE", "Original: screening for point shot. New: backdoor recognition. Topic swapped with S4 \u2014 content exists but in different slot."),
      scenarioRow(6, "High Slot Positioning", "Getting Point Shots Through", "SIGNIFICANT", "Original: finding the quiet space in the high slot. Teaches spatial awareness. New: shoot low through traffic from the point. Different position and read."),
      scenarioRow(7, "O-Zone Turnover Recovery", "Winning Dump-In Battle", "SIGNIFICANT", "Original: what to do when turnover happens in O-zone. Teaches transition. New: dump-in race/angle. Different situation."),
    ]
  }),
  new Paragraph({ children: [new PageBreak()] })
);

// ─── MODULE 5 ───
children.push(
  heading("Module 5: Forechecking"),
  para([red("Verdict: Significantly changed."), new TextRun(" The originals were situational (pressure vs contain without support, what to do when F2 is gassed, 50/50 puck battles). Cursor replaced them with forechecking systems and concepts (1-2-2 vs 2-1-2, dump and chase, reading intensity). More abstract, less \u201Cin the moment.\u201D")]),
  para(""),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [500, 2200, 2200, 1200, 3460],
    rows: [
      headerRow(),
      scenarioRow(1, "F1 Angle of Approach", "1-2-2 Forecheck \u2014 Your Lane", "SIGNIFICANT", "Original: specific angle to take away D-to-D pass. New: system positioning in 1-2-2. Lost the in-the-moment angle read."),
      scenarioRow(2, "F1 vs F2 Read", "Aggressive 2-1-2 Decision", "GUTTED", "Original: F2 role when F1 is pressuring (take high lane, cut off outlets). New: when to use 2-1-2 forecheck. Completely different \u2014 system choice vs in-play role execution."),
      scenarioRow(3, "Pressure vs Contain", "First Man In \u2014 Angling", "MODERATE", "Original: contain when no support (patience). New: take middle, funnel to boards. Similar but lost the \u201Cwithout support\u201D nuance."),
      scenarioRow(4, "Angling to the Boards", "Second Man Support \u2014 Reading F1", "MODERATE", "Original: arc outside-to-inside to force to boards. New: read F1\u2019s angle and position accordingly. Related, different framing."),
      scenarioRow(5, "Reading the Breakout", "Third Man High \u2014 Safety Valve", "GUTTED", "Original: read breakout pass and jump the lane to intercept. Anticipation. New: generic F3 stays high. Lost the anticipation read entirely."),
      scenarioRow(6, "Loose Puck Battle", "Dump and Chase Execution", "GUTTED", "Original: body position wins 50/50 puck battles (body first, puck second). Physical technique. New: where to dump the puck. Completely different."),
      scenarioRow(7, "Turnover Transition", "Forecheck to Offense Transition", "OK", "Similar: when forecheck creates turnover, attack immediately. Preserved."),
      scenarioRow(8, "F2 is Gassed", "Reading Forecheck Intensity", "GUTTED", "Original: adapt forecheck when your F2 is tired and late (specific situational read). New: abstract concept of throttling pressure. Lost the specificity."),
    ]
  }),
  para(""),
  para([
    bold("Key loss: "),
    new TextRun("Scenario 8 (\u201CF2 is Gassed\u201D) was one of the most realistic scenarios in the entire app. It taught a situational read that actually happens every game: your support is tired, you\u2019re alone, what do you do? The answer (angle and contain, don\u2019t gamble) is exactly the kind of game IQ that separates players. It was replaced with a generic concept about \u201Creading forecheck intensity.\u201D"),
  ]),
  new Paragraph({ children: [new PageBreak()] })
);

// ─── MODULE 6 ───
children.push(
  heading("Module 6: D-Zone for Defensemen"),
  para([new TextRun({ text: "Verdict: Moderately changed.", bold: true, color: "856404" }), new TextRun(" Some scenarios preserved well, others swapped for different defensive concepts. Less damaging than Modules 2, 3, and 5 because the replacements are still solid D-zone teaching.")]),
  para(""),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [500, 2200, 2200, 1200, 3460],
    rows: [
      headerRow(),
      scenarioRow(1, "Gap Control", "Gap Control on Rush", "OK", "Both teach gap management. New version emphasizes strong-side vs weak-side gap, which is a fine variation."),
      scenarioRow(2, "Puck Retrieval", "Pinching vs Staying Home", "SIGNIFICANT", "Original: shoulder check + quick first play to winger. Teaches puck retrieval technique. New: when NOT to pinch. Different topic."),
      scenarioRow(3, "D-to-D Decision", "Clearing the Crease", "SIGNIFICANT", "Original: reading F2 in the D-to-D lane (don\u2019t force it). High-value read. New: physically clearing net front. Different skill."),
      scenarioRow(4, "Net Front Battle", "D-to-D Under Pressure", "MODERATE", "Original: inside position and box out at net front. New: D-to-D decision (similar to OLD S3). Content exists but moved."),
      scenarioRow(5, "When to Pinch", "Blocking Passing Lanes", "SIGNIFICANT", "Original: pinch with center support as safety net. New: read passer\u2019s eyes to collapse passing lane. Different read."),
      scenarioRow(6, "First Pass Under Pressure", "Stepping Up in Neutral Zone", "SIGNIFICANT", "Original: rim it hard when under pressure with no clean pass. Teaches simple-and-effective. New: when to step up in NZ. Different zone, different decision."),
      scenarioRow(7, "Zone Coverage", "Recovery After Beaten Wide", "SIGNIFICANT", "Original: weak-side D stays home, front of net. New: sprint inside after beaten wide. Different situation (proactive vs recovery)."),
    ]
  }),
  new Paragraph({ children: [new PageBreak()] })
);

// ─── Summary & Recommendations ───
children.push(
  heading("Summary: What Was Lost"),
  para("Across all 43 scenarios, the damage breaks down as follows:"),
  para(""),
);

const summaryData = [
  ["GUTTED", "15", "Scenario teaches something fundamentally different from original"],
  ["SIGNIFICANT", "13", "Core read genericized or topic shifted"],
  ["MODERATE", "5", "Teaching preserved but framing/specificity downgraded"],
  ["OK", "10", "Content equivalent or acceptably close"],
];

children.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [2000, 1000, 6360],
    rows: [
      new TableRow({ children: [
        textCell([new TextRun({ text: "Severity", bold: true, color: "FFFFFF", size: 20 })], 2000, { shading: "0A1628" }),
        textCell([new TextRun({ text: "Count", bold: true, color: "FFFFFF", size: 20 })], 1000, { shading: "0A1628" }),
        textCell([new TextRun({ text: "Meaning", bold: true, color: "FFFFFF", size: 20 })], 6360, { shading: "0A1628" }),
      ]}),
      ...summaryData.map(([sev, count, meaning]) => new TableRow({
        children: [severityCell(sev), textCell(count, 1000), textCell(meaning, 6360)]
      }))
    ]
  }),
  para(""),
  para([
    bold("28 of 43 scenarios (65%)"),
    new TextRun(" need content restoration or significant revision to match the original teaching quality."),
  ]),
  para(""),
);

children.push(
  heading("Recommendations"),
  para(""),
  heading("1. Restore Module 2 (Faceoffs) completely", HeadingLevel.HEADING_2),
  para("This is the highest priority. The original 7 scenarios were the best content in the app and the strongest proof-of-concept for the \u201Cdevelopment coach in your pocket\u201D positioning. Every scenario taught a specific faceoff read that most youth players never learn. Port the original content into the SPA data format."),
  para(""),

  heading("2. Restore lost \u201Csignature\u201D scenarios in other modules", HeadingLevel.HEADING_2),
  para("Some scenarios were standouts that perfectly embody the product vision. These should be restored first:"),
  para([new TextRun({ text: "\u2022 ", size: 22 }), bold("M3-S3: Forehand vs. Backhand Receive"), new TextRun(" \u2014 small route adjustment that changes everything")], { indent: { left: 360 } }),
  para([new TextRun({ text: "\u2022 ", size: 22 }), bold("M5-S8: F2 is Gassed"), new TextRun(" \u2014 the most realistic situational read in the app")], { indent: { left: 360 } }),
  para([new TextRun({ text: "\u2022 ", size: 22 }), bold("M5-S6: Loose Puck Battle"), new TextRun(" \u2014 body position technique (body first, puck second)")], { indent: { left: 360 } }),
  para([new TextRun({ text: "\u2022 ", size: 22 }), bold("M3-S7: Broken Play Recovery"), new TextRun(" \u2014 mental transition when breakout fails")], { indent: { left: 360 } }),
  para([new TextRun({ text: "\u2022 ", size: 22 }), bold("M6-S3: D-to-D Decision"), new TextRun(" \u2014 reading F2 in the lane (don\u2019t force it)")], { indent: { left: 360 } }),
  para(""),

  heading("3. Keep the Cursor scenarios that are actually good", HeadingLevel.HEADING_2),
  para("Not everything Cursor wrote is bad. Some new scenarios are solid and could be additional content rather than replacements. Candidates to keep (but not as replacements for originals):"),
  para([new TextRun({ text: "\u2022 ", size: 22 }), new TextRun("M2-S6: Late-Game Faceoff (protecting a lead)")], { indent: { left: 360 } }),
  para([new TextRun({ text: "\u2022 ", size: 22 }), new TextRun("M5-S1: 1-2-2 Forecheck system positioning")], { indent: { left: 360 } }),
  para([new TextRun({ text: "\u2022 ", size: 22 }), new TextRun("M6-S7: Recovery after being beaten wide")], { indent: { left: 360 } }),
  para(""),

  heading("4. Establish a content quality bar", HeadingLevel.HEADING_2),
  para("For each scenario, apply this test: \u201CWould a parent paying $150/hr for a development coach expect their kid to learn this?\u201D If the answer is \u201Cno, this is basic hockey knowledge,\u201D the scenario isn\u2019t good enough. The scenarios should teach reads that most kids never think about \u2014 not positioning rules they\u2019d learn in their first team practice."),
);

// ─── Build document ───
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "0A1628" },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "C8102E" },
        paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 1 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "Puck Academy \u2014 Scenario Audit", size: 18, color: "999999", italics: true })]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Page ", size: 18, color: "999999" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "999999" })]
        })]
      })
    },
    children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/sessions/zealous-jolly-babbage/mnt/puck-academy-iq-app/Puck_Academy_Scenario_Audit.docx", buffer);
  console.log("Audit document created successfully.");
});
