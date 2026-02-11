import type { Scenario } from '../scenarios';

// Module 1: Defensive Zone Awareness — 7 scenarios
export const module1Scenarios: Scenario[] = [
  {
    id: 'module1-scenario1',
    moduleId: 1,
    scenarioNum: 1,
    totalInModule: 7,
    title: 'Reading Pressure on Your D-Man',
    situation: 'Your team is defending in your own zone. The opponent has the puck behind your net and is looking to make a play. Your defenseman is battling for position. You\'re the center, positioned in the low slot.',
    question: 'What should you focus on?',
    answers: [
      { text: 'Chase the puck carrier behind the net', correct: false, feedback: 'Chasing behind the net leaves the slot wide open. Your D-man has the puck carrier — trust them and protect the dangerous area in front.' },
      { text: 'Stay in the slot and read the play', correct: true, feedback: 'Perfect! By staying in the slot, you\'re covering the most dangerous scoring area. You can read where the puck is going and react to support your D or pick up a free opponent.' },
      { text: 'Skate to the corner to help your D-man', correct: false, feedback: 'Going to the corner creates a 2-on-1 on the puck but leaves the middle of the ice exposed. One pass across and there\'s an open shooter.' },
      { text: 'Head to the front of the net for a rebound', correct: false, feedback: 'Getting to the net makes sense on offense, but you\'re defending! You need to cover the slot and be ready to block a pass or shot.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 35, y: 42, note: 'You (C) — low slot' },
        { type: 'teammate', x: 8, y: 37, label: 'D', note: 'Battling behind net' },
        { type: 'opponent', x: 6, y: 49, note: 'Has puck behind net' },
        { type: 'opponent', x: 40, y: 26, note: 'Open in slot — danger' },
        { type: 'opponent', x: 55, y: 60, note: 'Support' }
      ],
      puck: { x: 5, y: 49 },
      arrows: [{ from: { x: 6, y: 49 }, to: { x: 40, y: 26 }, style: 'dashed', label: 'Pass threat' }],
      annotations: []
    },
    gameContext: { period: 1, teamScore: 0, oppScore: 0, timeLeft: '18:42' },
    audioFolder: 'hockey-iq-diagram',
    nextScenarioId: 'module1-scenario2'
  },
  {
    id: 'module1-scenario2',
    moduleId: 1,
    scenarioNum: 2,
    totalInModule: 7,
    title: 'The Corner Battle',
    situation: 'A loose puck is in the corner of your defensive zone. An opponent is racing to get it. Your winger is closest but will arrive at the same time as the opponent.',
    question: 'What\'s your best positioning as the center?',
    answers: [
      { text: 'Join the corner battle to outnumber them', correct: false, feedback: 'Stacking the corner leaves the front of the net unprotected. If they win the battle, there\'s no one home to stop the play.' },
      { text: 'Position between the corner and the net', correct: true, feedback: 'Smart positioning! You\'re close enough to support if your winger wins the battle, but also cutting off the passing lane to the slot if the opponent gets the puck.' },
      { text: 'Stay at the top of the circles', correct: false, feedback: 'Too far from the action. You won\'t be able to help your winger or cut off a pass in time. Get closer to the play while staying in your lane.' },
      { text: 'Go to the front of the net', correct: false, feedback: 'Parking at the net is your goalie\'s territory. You\'re more useful cutting off passing lanes and being ready to transition if your team gets the puck.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 28, y: 48, note: 'You (C)' },
        { type: 'teammate', x: 16, y: 58, label: 'LW', note: 'Racing to corner', targetX: 10, targetY: 73 },
        { type: 'opponent', x: 24, y: 70, note: 'Racing to corner', targetX: 10, targetY: 73 },
        { type: 'opponent', x: 42, y: 40, note: 'Slot lurker' }
      ],
      puck: { x: 10, y: 73 },
      arrows: [
        { from: { x: 16, y: 58 }, to: { x: 10, y: 73 }, style: 'solid' },
        { from: { x: 24, y: 70 }, to: { x: 10, y: 73 }, style: 'solid' }
      ],
      annotations: []
    },
    gameContext: { period: 1, teamScore: 0, oppScore: 0, timeLeft: '15:17' },
    audioFolder: 'scenario-2-corner-battle',
    nextScenarioId: 'module1-scenario3'
  },
  {
    id: 'module1-scenario3',
    moduleId: 1,
    scenarioNum: 3,
    totalInModule: 7,
    title: 'Cycle Coverage',
    situation: 'The opponents are cycling the puck low in your zone. They\'ve completed two passes around the boards. Your D-men are tracking the puck carrier.',
    question: 'What\'s your role in this situation?',
    answers: [
      { text: 'Pressure the puck carrier from behind', correct: false, feedback: 'Chasing the cycle is exhausting and ineffective. They\'ll just move the puck before you arrive. Let your D handle the boards.' },
      { text: 'Cover the slot and anticipate the pass to the middle', correct: true, feedback: 'Exactly right! The cycle is designed to open up a pass to the slot. By staying disciplined in the middle, you take away their best scoring opportunity.' },
      { text: 'Drop down to help your goalie', correct: false, feedback: 'You\'ll just screen your goalie and clog up their movement. Trust them to handle the shot — your job is to prevent it from getting through.' },
      { text: 'Move to the weak side to cover the far post', correct: false, feedback: 'The weak side isn\'t the threat right now. The danger is the slot — that\'s where the cycle is trying to create a scoring chance.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 35, y: 42, note: 'You (C)' },
        { type: 'teammate', x: 18, y: 55, label: 'D', note: 'Tracking cycle' },
        { type: 'teammate', x: 42, y: 48, label: 'D', note: 'Weak side' },
        { type: 'opponent', x: 15, y: 68, note: 'Cycling low', targetX: 50, targetY: 65 },
        { type: 'opponent', x: 38, y: 28, note: 'Slot threat' },
        { type: 'opponent', x: 50, y: 65, note: 'High cycle', targetX: 15, targetY: 68 }
      ],
      puck: { x: 13, y: 66 },
      arrows: [
        { from: { x: 15, y: 68 }, to: { x: 50, y: 65 }, style: 'dashed', label: 'Cycle' },
        { from: { x: 50, y: 65 }, to: { x: 38, y: 28 }, style: 'dashed', label: 'To slot' }
      ]
    },
    gameContext: { period: 1, teamScore: 0, oppScore: 1, timeLeft: '11:05' },
    audioFolder: 'scenario-3-cycle',
    nextScenarioId: 'module1-scenario4'
  },
  {
    id: 'module1-scenario4',
    moduleId: 1,
    scenarioNum: 4,
    totalInModule: 7,
    title: 'Breakout Timing',
    situation: 'Your D has recovered the puck behind the net. One forechecker is pressuring, another is high. Your winger is on the boards providing a safe option. The D is looking to start the breakout.',
    question: 'What\'s the best way to support the breakout as the center?',
    answers: [
      { text: 'Swing low through the middle to give the D a short, safe passing option', correct: true, feedback: 'That\'s how you support a breakout. Swing through the middle, give your D a short, safe option. You absorb the pressure, buy time, then move it up ice.' },
      { text: 'Skate hard toward the blue line to get open for a stretch pass', correct: false, feedback: 'Your D is under pressure — he needs help, not a long pass option. Swing low through the middle, give him an easy out.' },
      { text: 'Stay in your current position and let the D make the first move', correct: false, feedback: 'Standing still doesn\'t give your D any options. He\'s under pressure and needs a release valve. Get moving.' },
      { text: 'Go to the same boards as your winger to create a 2-on-1', correct: false, feedback: 'Doubling up on the boards doesn\'t help. Swing through the middle and open up the whole ice.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 45, y: 42, note: 'You (C)', targetX: 22, targetY: 42 },
        { type: 'teammate', x: 7, y: 42, label: 'D', note: 'Has puck behind net' },
        { type: 'teammate', x: 30, y: 22, label: 'D', note: 'Partner' },
        { type: 'teammate', x: 18, y: 72, label: 'W', note: 'Board option' },
        { type: 'opponent', x: 22, y: 36, label: 'F', note: 'Pressuring', targetX: 10, targetY: 42 },
        { type: 'opponent', x: 50, y: 25, label: 'F', note: 'High forechecker' }
      ],
      puck: { x: 6, y: 42 },
      arrows: [
        { from: { x: 45, y: 42 }, to: { x: 22, y: 42 }, style: 'dashed', label: 'Swing low' },
        { from: { x: 22, y: 36 }, to: { x: 10, y: 42 }, style: 'solid' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 1, oppScore: 1, timeLeft: '16:33' },
    audioFolder: 'scenario-4-breakout',
    nextScenarioId: 'module1-scenario5'
  },
  {
    id: 'module1-scenario5',
    moduleId: 1,
    scenarioNum: 5,
    totalInModule: 7,
    title: 'Gap Control',
    situation: 'The opposing center has the puck in the neutral zone and is driving toward your blue line. Your D is backing up to defend. You\'re backchecking from the high slot area.',
    question: 'What\'s your best backchecking play?',
    answers: [
      { text: 'Sprint directly at the puck carrier and try to poke check', correct: false, feedback: 'Charging straight at him is a gamble. If he makes one move, you\'re out of the play and it\'s a 2-on-1.' },
      { text: 'Race back to cover the trailing winger instead', correct: false, feedback: 'The trailing winger isn\'t the immediate threat. The puck carrier driving the middle is.' },
      { text: 'Angle your backcheck to take away the middle lane while closing the gap', correct: true, feedback: 'Perfect angle. You took away the middle, forced him wide, and closed the gap without overcommitting. That\'s textbook backchecking.' },
      { text: 'Match the puck carrier\'s speed and stay parallel to him', correct: false, feedback: 'Matching speed doesn\'t take anything away. Take an angle — cut off the middle, force him to the outside.' }
    ],
    diagram: {
      zone: 'neutral',
      players: [
        { type: 'you', x: 110, y: 32, note: 'You (C)', targetX: 95, targetY: 40 },
        { type: 'teammate', x: 75, y: 42, label: 'D', note: 'Backing up', targetX: 65, targetY: 42 },
        { type: 'opponent', x: 125, y: 42, label: 'C', note: 'Driving', targetX: 70, targetY: 42 },
        { type: 'opponent', x: 150, y: 25, label: 'W', note: 'Trailing', targetX: 120, targetY: 25 }
      ],
      puck: { x: 127, y: 42 },
      arrows: [
        { from: { x: 125, y: 42 }, to: { x: 70, y: 42 }, style: 'solid', label: 'Rush' },
        { from: { x: 110, y: 32 }, to: { x: 95, y: 40 }, style: 'dashed', label: 'Angle back' }
      ]
    },
    gameContext: { period: 2, teamScore: 1, oppScore: 1, timeLeft: '12:08' },
    audioFolder: 'scenario-5-gap',
    nextScenarioId: 'module1-scenario6'
  },
  {
    id: 'module1-scenario6',
    moduleId: 1,
    scenarioNum: 6,
    totalInModule: 7,
    title: 'Winger Caught Up Ice',
    situation: 'Your team just turned the puck over at the offensive blue line. Your left winger got caught deep — it\'s a 3-on-2 against your team. You\'re the center tracking back.',
    question: 'What\'s your priority on this 3-on-2 rush?',
    answers: [
      { text: 'Sprint to cover the left side where your winger should be', correct: false, feedback: 'Now you\'ve left the middle wide open. On a 3-on-2, the slot is the most dangerous area.' },
      { text: 'Stay central and take away the middle passing lane', correct: true, feedback: 'Exactly right. On a 3-on-2, the slot is the danger zone. Your two D-men can handle the wide players. Your job is to eliminate the middle option.' },
      { text: 'Pressure the puck carrier aggressively to force a quick decision', correct: false, feedback: 'You\'re the last man back in the middle. If you charge and they slip a pass behind you, it\'s a 2-on-1.' },
      { text: 'Yell at your winger to hustle back', correct: false, feedback: 'Ha — trust me, they already know. Focus on what you can control: your positioning.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 75, y: 42, note: 'You (C)', targetX: 55, targetY: 42 },
        { type: 'teammate', x: 40, y: 25, label: 'D', note: 'Defending' },
        { type: 'teammate', x: 40, y: 60, label: 'D', note: 'Defending' },
        { type: 'teammate', x: 160, y: 20, label: 'LW', faded: true, note: 'CAUGHT!' },
        { type: 'opponent', x: 65, y: 28, label: 'C', note: 'Puck carrier', targetX: 35, targetY: 42 },
        { type: 'opponent', x: 55, y: 18, label: 'W', note: 'Wide option', targetX: 30, targetY: 18 },
        { type: 'opponent', x: 55, y: 65, label: 'W', note: 'Wide option', targetX: 30, targetY: 65 }
      ],
      puck: { x: 67, y: 26 },
      arrows: [
        { from: { x: 65, y: 28 }, to: { x: 35, y: 42 }, style: 'solid', label: '3-on-2 rush' },
        { from: { x: 55, y: 18 }, to: { x: 30, y: 18 }, style: 'solid' },
        { from: { x: 55, y: 65 }, to: { x: 30, y: 65 }, style: 'solid' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 1, oppScore: 2, timeLeft: '5:44' },
    audioFolder: 'scenario-6-winger-caught',
    nextScenarioId: 'module1-scenario7'
  },
  {
    id: 'module1-scenario7',
    moduleId: 1,
    scenarioNum: 7,
    totalInModule: 7,
    title: 'D Partner Bites on the Cycle',
    situation: 'Your D partner got sucked down behind the net chasing the puck carrier. The opponent quickly moved it up to the point. You\'re the center and you\'re the only one in position to react.',
    question: 'Your D is out of position. What\'s your responsibility?',
    answers: [
      { text: 'Rush the point to block the shot', correct: false, feedback: 'If you charge the point, you\'re leaving the high slot wide open. The point man can easily pass to the slot for a one-timer.' },
      { text: 'Drop into the high slot to take away the pass to the middle', correct: true, feedback: 'When your D is out of position, you become the safety valve. By sitting in the high slot, you take away the most dangerous pass.' },
      { text: 'Slide down to help cover the front of the net', correct: false, feedback: 'Your other D has the net front. If you drop down too, you\'re leaving the high slot completely exposed.' },
      { text: 'Call for your winger to cover the point', correct: false, feedback: 'There\'s no time. The puck is already at the point. Get into the high slot and lead by positioning, not by committee.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 50, y: 32, note: 'You (C)' },
        { type: 'teammate', x: 7, y: 52, label: 'D', faded: true, note: 'Out of pos. — behind net' },
        { type: 'teammate', x: 22, y: 42, label: 'D', note: 'Net front' },
        { type: 'opponent', x: 60, y: 15, label: 'D', note: 'Point shot' },
        { type: 'opponent', x: 38, y: 38, label: 'C', note: 'Slot target' },
        { type: 'opponent', x: 16, y: 68, label: 'W', note: 'Low' },
        { type: 'opponent', x: 32, y: 68, label: 'W', note: 'Low' }
      ],
      puck: { x: 62, y: 13 },
      arrows: [
        { from: { x: 60, y: 15 }, to: { x: 38, y: 38 }, style: 'dashed', label: 'Pass threat' },
        { from: { x: 60, y: 15 }, to: { x: 35, y: 15 }, style: 'dashed', label: 'Shot' }
      ],
      annotations: []
    },
    gameContext: { period: 3, teamScore: 2, oppScore: 2, timeLeft: '8:15' },
    audioFolder: 'scenario-7-d-partner-bites',
    nextScenarioId: null
  }
];
