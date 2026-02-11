import type { Scenario } from '../scenarios';

// Module 5: Forechecking — 8 scenarios
// Forechecking happens in the opponent's zone (right end, goal at x=190)
export const module5Scenarios: Scenario[] = [
  {
    id: 'module5-scenario1',
    moduleId: 5,
    scenarioNum: 1,
    totalInModule: 8,
    title: '1-2-2 Forecheck — Your Lane',
    situation: 'The opposing D just picked up the puck in their zone. Your first forechecker (F1) is already pressuring high. You\'re coming in as the second wave. You need to pick a lane and execute.',
    question: 'As the second forward in a 1-2-2, what\'s your primary responsibility?',
    answers: [
      { text: 'Take the weak-side defenseman and cut off passing options', correct: true, feedback: 'In a 1-2-2, you\'re NOT chasing F1. You pick your lane — usually the far D — and own that space. You take away the escape pass. Simple structure, huge difference in execution.' },
      { text: 'Follow F1 and double-team the puck carrier', correct: false, feedback: 'Doubling the puck carrier leaves the other D wide open for an outlet. Your job is to take away options, not pile on the puck.' },
      { text: 'Hang high in the neutral zone as a safety valve', correct: false, feedback: 'That\'s the third man\'s job. As F2, you need to be in the zone taking away passing lanes. Get involved.' },
      { text: 'Rush to cover both defensemen at once', correct: false, feedback: 'You can\'t cover two people. Pick one — the weak-side D — and commit. Your linemate handles the other side.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'opponent', x: 180, y: 42, label: 'D', note: 'Puck carrier' },
        { type: 'teammate', x: 172, y: 45, label: 'F', note: 'F1 — pressuring' },
        { type: 'you', x: 160, y: 28, note: 'You (F2)', targetX: 170, targetY: 22 },
        { type: 'teammate', x: 160, y: 58, label: 'F', note: 'F3 — other lane' },
        { type: 'opponent', x: 178, y: 22, label: 'D', note: 'Weak-side D — your target' },
        { type: 'opponent', x: 175, y: 62, label: 'D', note: 'Strong-side D' }
      ],
      puck: { x: 180, y: 42 },
      arrows: [
        { from: { x: 160, y: 28 }, to: { x: 170, y: 22 }, style: 'solid', label: 'Take weak-side D' },
        { from: { x: 172, y: 45 }, to: { x: 180, y: 42 }, style: 'solid', label: 'F1 pressure' }
      ],
      annotations: []
    },
    gameContext: { period: 1, teamScore: 0, oppScore: 0, timeLeft: '16:45' },
    audioFolder: 'module5-122-forecheck',
    nextScenarioId: 'module5-scenario2'
  },
  {
    id: 'module5-scenario2',
    moduleId: 5,
    scenarioNum: 2,
    totalInModule: 8,
    title: 'Aggressive 2-1-2 Decision',
    situation: 'Puck is loose in the opposing zone after a dump-in. You sense the opposing team is tired and disorganized — slow line change, sloppy passes. Two of your forwards are already in deep.',
    question: 'When should you commit to a 2-1-2 (two forecheckers) instead of a standard 1-2-2?',
    answers: [
      { text: 'When you have a speed advantage and the opponent looks disorganized or tired', correct: true, feedback: 'A 2-1-2 is higher risk — you\'re gambling on creating a turnover before they regroup. Use it when you have evidence: they\'re gassed, they\'re sloppy. Read the room, then attack.' },
      { text: 'Every time the puck is loose in their zone', correct: false, feedback: 'That\'s reckless. A 2-1-2 every time burns energy and gets you burned on counters. Save it for when the read is right.' },
      { text: 'Only when trailing in the third period', correct: false, feedback: 'The 2-1-2 isn\'t a desperation play. It\'s a tactical choice based on reading the opponent\'s fatigue and disorganization. Use it any time the evidence is there.' },
      { text: 'When their forwards are deep in your zone', correct: false, feedback: 'Their forward positions don\'t matter for YOUR forecheck decision. It\'s about THEIR D\'s ability to handle pressure right now.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'teammate', x: 175, y: 38, label: 'F', note: 'F1 — already pressing' },
        { type: 'you', x: 168, y: 52, note: 'You (F2) — committing', targetX: 178, targetY: 48 },
        { type: 'teammate', x: 145, y: 42, label: 'F', note: 'F3 — safety' },
        { type: 'opponent', x: 182, y: 40, label: 'D', note: 'Scrambling' },
        { type: 'opponent', x: 180, y: 55, label: 'D', note: 'Slow getting back' }
      ],
      puck: { x: 182, y: 42 },
      arrows: [
        { from: { x: 168, y: 52 }, to: { x: 178, y: 48 }, style: 'solid', label: 'Commit as F2' },
        { from: { x: 175, y: 38 }, to: { x: 182, y: 40 }, style: 'solid', label: 'F1 pressure' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 1, oppScore: 0, timeLeft: '11:30' },
    audioFolder: 'module5-aggressive-forecheck',
    nextScenarioId: 'module5-scenario3'
  },
  {
    id: 'module5-scenario3',
    moduleId: 5,
    scenarioNum: 3,
    totalInModule: 8,
    title: 'First Man In — Angling the Puck Carrier',
    situation: 'An opposing D is exiting their zone with the puck, heading toward center ice. You\'re the closest forechecker. He can cut to the middle or go wide. You have one job: make his decision for him.',
    question: 'How do you angle the puck carrier as the first forechecker?',
    answers: [
      { text: 'Take away the middle and funnel him to the outside board where space is tight', correct: true, feedback: 'The middle of the ice is the most dangerous — speed, passing lanes, attack angles. You angle him to the board where ice is tight and support can converge. You\'re herding him into traffic.' },
      { text: 'Skate directly at him to force an immediate decision', correct: false, feedback: 'Charging straight on is a coin flip. If he makes one move, you\'re out of the play. Take an angle — control WHERE he goes.' },
      { text: 'Mirror his movement to keep him from speeding up', correct: false, feedback: 'Mirroring doesn\'t take away options. You need to REMOVE choices, not match them. Funnel him to where you want him.' },
      { text: 'Pressure from behind so he can\'t turn up ice', correct: false, feedback: 'You can\'t forecheck from behind — he\'s already facing the right way. Get in front of him, take away the middle.' }
    ],
    diagram: {
      zone: 'neutral',
      players: [
        { type: 'opponent', x: 155, y: 42, label: 'D', note: 'Exiting with puck', targetX: 120, targetY: 42 },
        { type: 'you', x: 140, y: 50, note: 'You (F1) — angling', targetX: 150, targetY: 42 },
        { type: 'teammate', x: 130, y: 28, label: 'F', note: 'F2 support' },
        { type: 'teammate', x: 130, y: 58, label: 'F', note: 'F3 support' },
        { type: 'opponent', x: 160, y: 25, label: 'F', note: 'Outlet option' }
      ],
      puck: { x: 155, y: 42 },
      arrows: [
        { from: { x: 140, y: 50 }, to: { x: 150, y: 42 }, style: 'solid', label: 'Angle to boards' },
        { from: { x: 155, y: 42 }, to: { x: 120, y: 42 }, style: 'solid', label: 'Attempted exit' }
      ],
      annotations: []
    },
    gameContext: { period: 1, teamScore: 0, oppScore: 0, timeLeft: '10:20' },
    audioFolder: 'module5-first-man-in',
    nextScenarioId: 'module5-scenario4'
  },
  {
    id: 'module5-scenario4',
    moduleId: 5,
    scenarioNum: 4,
    totalInModule: 8,
    title: 'Second Man Support — Reading F1',
    situation: 'Your forechecker (F1) just engaged the puck carrier on the boards in the opposing zone. The puck is still being battled for. You\'re F2 — do you go high to cut off the breakout, or stay low to help?',
    question: 'How do you read where to position as the second forechecker?',
    answers: [
      { text: 'Watch F1\'s body and read which way he\'s angling the play, then position accordingly', correct: true, feedback: 'F1 is steering the play one direction — watch where he\'s pushing pressure. If F1 sends it toward the boards, you go high on that side to cut the exit. If F1 keeps it low, you support the battle. Follow the structure.' },
      { text: 'Always go high to cut off the outlet pass', correct: false, feedback: 'Not always. If the puck battle is 50/50, your support could win it. Read the play — don\'t default to one position every time.' },
      { text: 'Always stay low to support the puck battle', correct: false, feedback: 'If they win the battle and you\'re low, they have a free outlet. Sometimes cutting off the exit is more valuable.' },
      { text: 'Go to the opposite side of where the puck carrier is facing', correct: false, feedback: 'You\'re reading the WRONG player. Watch F1, not the puck carrier. F1 dictates the structure — you follow.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'opponent', x: 185, y: 68, label: 'D', note: 'Puck carrier on boards' },
        { type: 'teammate', x: 183, y: 72, label: 'F', note: 'F1 — angling to boards' },
        { type: 'you', x: 165, y: 55, note: 'You (F2) — reading play' },
        { type: 'opponent', x: 178, y: 35, label: 'D', note: 'Outlet option' },
        { type: 'teammate', x: 145, y: 42, label: 'F', note: 'F3 high — safety' }
      ],
      puck: { x: 186, y: 68 },
      arrows: [
        { from: { x: 183, y: 72 }, to: { x: 186, y: 68 }, style: 'solid', label: 'F1 pressure' },
        { from: { x: 165, y: 55 }, to: { x: 172, y: 48 }, style: 'dashed', label: 'Read and position' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 1, oppScore: 1, timeLeft: '7:55' },
    audioFolder: 'module5-second-man',
    nextScenarioId: 'module5-scenario5'
  },
  {
    id: 'module5-scenario5',
    moduleId: 5,
    scenarioNum: 5,
    totalInModule: 8,
    title: 'Third Man High — Safety Valve',
    situation: 'Two of your forwards are deep in the offensive zone forechecking hard. The opposing team just cleared the puck to their point. Your forecheckers won\'t get there in time. Where are you?',
    question: 'What\'s the role of the third man high in a forecheck?',
    answers: [
      { text: 'Stay in the neutral zone ready to break up an exit or transition play', correct: true, feedback: 'The third man high is your insurance policy and breakout disruptor. You\'re high enough to read the play, close enough to pressure an exit. If they clear it cleanly, you\'re already positioned for transition.' },
      { text: 'Rush back to help defensively', correct: false, feedback: 'You\'re not a defenseman. Your job is to be in the neutral zone disrupting exits. If you bail all the way back, the opponent has a free neutral zone.' },
      { text: 'Pressure the puck carrier at the point', correct: false, feedback: 'Your forecheckers are already deep — they should pressure the point. You stay high to catch anything that gets through.' },
      { text: 'Follow your forecheckers into the zone', correct: false, feedback: 'Three forwards deep means nobody covering the exit. That\'s how you get burned on odd-man rushes. Stay disciplined.' }
    ],
    diagram: {
      zone: 'neutral',
      players: [
        { type: 'teammate', x: 170, y: 30, label: 'F', note: 'F1 — deep', faded: true },
        { type: 'teammate', x: 175, y: 55, label: 'F', note: 'F2 — deep', faded: true },
        { type: 'you', x: 135, y: 42, note: 'You (F3) — third man high' },
        { type: 'opponent', x: 145, y: 42, label: 'D', note: 'Puck at their point' },
        { type: 'opponent', x: 150, y: 25, label: 'D', note: 'Partner' }
      ],
      puck: { x: 145, y: 42 },
      arrows: [
        { from: { x: 145, y: 42 }, to: { x: 100, y: 42 }, style: 'dashed', label: 'Breakout attempt' }
      ],
      annotations: []
    },
    gameContext: { period: 1, teamScore: 1, oppScore: 0, timeLeft: '5:10' },
    audioFolder: 'module5-third-man-high',
    nextScenarioId: 'module5-scenario6'
  },
  {
    id: 'module5-scenario6',
    moduleId: 5,
    scenarioNum: 6,
    totalInModule: 8,
    title: 'Dump and Chase Execution',
    situation: 'Your team is heading into the offensive zone but the D is set up tight at the blue line. You decide to dump it in. The key: WHERE you dump it determines whether your forecheck can recover it.',
    question: 'What\'s the critical factor in a successful dump-and-chase?',
    answers: [
      { text: 'Dump it to a spot where your forecheckers have a recovery angle advantage', correct: true, feedback: 'Dump location creates chase advantage. Dump it behind the net on the strong side and now THEY have to make a cross-ice play — that\'s when you intercept. You\'re dumping to create geometry, not just throwing it away.' },
      { text: 'Dump it in as hard as possible so they can\'t clear it', correct: false, feedback: 'Speed of the dump matters less than LOCATION. A rocket into the far corner with bad recovery angles is worse than a smart dump behind the net.' },
      { text: 'Always dump it deep in the corner for a safe play', correct: false, feedback: 'The far corner is actually one of the hardest pucks to recover. Their D gets there first with better positioning. Dump smarter, not deeper.' },
      { text: 'Chase the puck carrier, not the puck', correct: false, feedback: 'You\'re chasing someone who hasn\'t touched it yet. Chase the PUCK to the spot you dumped it. That\'s the whole point of dump-and-chase.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'you', x: 138, y: 42, note: 'You — dumping in' },
        { type: 'teammate', x: 142, y: 28, label: 'F', note: 'F1 — chasing', targetX: 190, targetY: 30 },
        { type: 'teammate', x: 142, y: 58, label: 'F', note: 'F2 — support', targetX: 175, targetY: 50 },
        { type: 'opponent', x: 178, y: 25, label: 'D', note: 'Retrieving' },
        { type: 'opponent', x: 180, y: 55, label: 'D', note: 'Far side D' }
      ],
      puck: { x: 138, y: 42 },
      arrows: [
        { from: { x: 138, y: 42 }, to: { x: 193, y: 30 }, style: 'dashed', label: 'Smart dump' },
        { from: { x: 142, y: 28 }, to: { x: 190, y: 30 }, style: 'solid', label: 'Chase' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 0, oppScore: 0, timeLeft: '15:40' },
    audioFolder: 'module5-dump-chase',
    nextScenarioId: 'module5-scenario7'
  },
  {
    id: 'module5-scenario7',
    moduleId: 5,
    scenarioNum: 7,
    totalInModule: 8,
    title: 'Forecheck to Offense Transition',
    situation: 'You\'re forechecking hard in the opposing zone. The puck battle is going and then — turnover! The puck is suddenly loose, your linemate scoops it. Now it\'s YOUR possession in THEIR zone. The switch happens in half a second.',
    question: 'When you gain possession during a forecheck, what\'s your immediate read?',
    answers: [
      { text: 'Immediately shift to offensive mindset — attack toward the net', correct: true, feedback: 'A turnover during a forecheck is a gift. Their defense is scattered, their forwards are out of position. You don\'t play conservatively — you attack. One touch, eyes up, shoot or pass to the soft spot.' },
      { text: 'Continue pressuring defensively — don\'t change mindset', correct: false, feedback: 'You HAVE the puck now. The whole point of forechecking was to create this turnover. Shift gears and attack.' },
      { text: 'Pass backward to reset the play', correct: false, feedback: 'Resetting wastes the turnover advantage. Their defense is disorganized RIGHT NOW. That window closes in seconds.' },
      { text: 'Dump the puck back out and regroup', correct: false, feedback: 'You just fought to GET possession and now you\'re giving it up? Attack the chaos. This is when goals happen.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'teammate', x: 175, y: 42, label: 'F', note: 'Has puck — turnover!' },
        { type: 'you', x: 165, y: 55, note: 'You — switch to offense', targetX: 178, targetY: 50 },
        { type: 'opponent', x: 170, y: 35, label: 'D', note: 'Caught off guard' },
        { type: 'opponent', x: 180, y: 55, label: 'D', note: 'Out of position' },
        { type: 'teammate', x: 145, y: 42, label: 'F', note: 'Trailing support' }
      ],
      puck: { x: 175, y: 42 },
      arrows: [
        { from: { x: 175, y: 42 }, to: { x: 188, y: 42 }, style: 'dashed', label: 'Attack net' },
        { from: { x: 165, y: 55 }, to: { x: 178, y: 50 }, style: 'solid', label: 'Crash net' }
      ],
      annotations: []
    },
    gameContext: { period: 3, teamScore: 1, oppScore: 2, timeLeft: '8:25' },
    audioFolder: 'module5-transition',
    nextScenarioId: 'module5-scenario8'
  },
  {
    id: 'module5-scenario8',
    moduleId: 5,
    scenarioNum: 8,
    totalInModule: 8,
    title: 'Reading Forecheck Intensity',
    situation: 'You\'re running a standard 1-2-2 forecheck, but the opponent is handling your pressure easily. Calm D-men, clean breakouts. Your guys are chasing ghosts and burning energy.',
    question: 'How do you adjust forecheck pressure to stay effective?',
    answers: [
      { text: 'Read their comfort level — ease off when they\'re executing, turn it up when they look shaky', correct: true, feedback: 'Forecheck isn\'t an on-off switch — it\'s a throttle. When they\'re playing with poise, don\'t waste energy chasing. When they start looking sloppy — THAT\'S when you lean on them. It\'s chess, not anger.' },
      { text: 'Keep the same pressure all game — intensity is consistency', correct: false, feedback: 'Consistency without adjustment is predictable. They\'ll read you and exploit it. Smart teams adjust to what\'s working.' },
      { text: 'Back off completely and go passive', correct: false, feedback: 'Going passive lets them walk through the neutral zone. You need to adjust intensity, not abandon the forecheck entirely.' },
      { text: 'Increase pressure every shift to frustrate them', correct: false, feedback: 'Escalating against a team that\'s handling you burns YOUR energy. Pressure plus desperation doesn\'t create turnovers — smart pressure does.' }
    ],
    diagram: {
      zone: 'neutral',
      players: [
        { type: 'you', x: 145, y: 42, note: 'You — reading the play' },
        { type: 'teammate', x: 148, y: 28, label: 'F', note: 'Forecheck partner' },
        { type: 'teammate', x: 148, y: 58, label: 'F', note: 'Forecheck partner' },
        { type: 'opponent', x: 160, y: 42, label: 'D', note: 'Calm with puck' },
        { type: 'opponent', x: 162, y: 25, label: 'D', note: 'Clean breakout' }
      ],
      puck: { x: 160, y: 42 },
      arrows: [],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 1, oppScore: 1, timeLeft: '3:30' },
    audioFolder: 'module5-intensity',
    nextScenarioId: null
  }
];
