import type { Scenario } from '../scenarios';

// Module 3: Breakouts — 7 scenarios
export const module3Scenarios: Scenario[] = [
  {
    id: 'module3-scenario1',
    moduleId: 3,
    scenarioNum: 1,
    totalInModule: 7,
    title: 'Standard Breakout — Getting Open on the Wall',
    situation: 'Your D retrieves the puck behind the goal line. A single forechecker is bearing down. You\'re the right winger up near the neutral zone. Your D needs an outlet.',
    question: 'What do you do to create a breakout passing lane?',
    answers: [
      { text: 'Attack the boards hard and get low on the wall to give the D a safe outlet', correct: true, feedback: 'Immediately move to the wall and get low. By attacking the boards, you force the forechecker to commit one way and give your D a short, safe pass option.' },
      { text: 'Stay in the middle of the ice for a center option', correct: false, feedback: 'That\'s the center\'s job. As a winger, your lane is the wall. Get there and be a target your D can hit under pressure.' },
      { text: 'Back up toward your own blue line to give the D more space', correct: false, feedback: 'Retreating limits your breakout options and gives the forechecker time to close. Attack forward to be part of the solution.' },
      { text: 'Screen the forechecker so the D has time to look up', correct: false, feedback: 'Screening isn\'t your job here. Your job is to be an outlet. Move to the wall and become a target for the pass.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'teammate', x: 7, y: 42, label: 'D', note: 'Retrieving puck' },
        { type: 'you', x: 55, y: 70, note: 'You (RW)', targetX: 30, targetY: 72 },
        { type: 'opponent', x: 30, y: 45, label: 'F', note: 'Forechecker', targetX: 12, targetY: 42 },
        { type: 'teammate', x: 50, y: 42, label: 'C', note: 'Center support' },
        { type: 'teammate', x: 55, y: 15, label: 'LW', note: 'Left winger' }
      ],
      puck: { x: 6, y: 42 },
      arrows: [
        { from: { x: 55, y: 70 }, to: { x: 30, y: 72 }, style: 'solid', label: 'Get low on wall' },
        { from: { x: 30, y: 45 }, to: { x: 12, y: 42 }, style: 'solid', label: 'Forecheck' }
      ],
      annotations: []
    },
    gameContext: { period: 3, teamScore: 1, oppScore: 2, timeLeft: '14:22' },
    audioFolder: 'module3-standard-breakout',
    nextScenarioId: 'module3-scenario2'
  },
  {
    id: 'module3-scenario2',
    moduleId: 3,
    scenarioNum: 2,
    totalInModule: 7,
    title: 'Reverse Breakout',
    situation: 'Your D has the puck behind the goal line but the forechecker is cutting off the strong-side wall outlet. Your D partner is on the other side of the net. You\'re the left winger on the weak side.',
    question: 'What\'s the right play here?',
    answers: [
      { text: 'D skates behind the net to the partner, who swings it to you on the weak side', correct: true, feedback: 'The reverse is textbook when one wall is cut off. Puck moves behind the net to the other D, who has a fresh view and finds you on the open side. Patient, safe, effective.' },
      { text: 'Force a pass directly through the forechecker', correct: false, feedback: 'High risk. The forechecker is already in the lane. Trust the reverse to move the puck safely around the pressure.' },
      { text: 'Both D retreat to the blue line and reset', correct: false, feedback: 'Unnecessary retreat. You have a partner on the other side — use the reverse. Don\'t waste the positional advantage.' },
      { text: 'Center drops back behind the goal line to help', correct: false, feedback: 'That adds to the congestion behind the net. The D needs ice away from the goal line, not more bodies.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'teammate', x: 7, y: 48, label: 'D', note: 'Has puck — initiating reverse', targetX: 7, targetY: 38 },
        { type: 'teammate', x: 7, y: 35, label: 'D', note: 'Partner — receiving', targetX: 20, targetY: 15 },
        { type: 'you', x: 45, y: 15, note: 'You (LW) — open weak side', targetX: 30, targetY: 15 },
        { type: 'opponent', x: 25, y: 60, label: 'F', note: 'Cutting off strong side' },
        { type: 'teammate', x: 50, y: 42, label: 'C', note: 'Center' },
        { type: 'teammate', x: 45, y: 65, label: 'RW', note: 'Blocked by forecheck' }
      ],
      puck: { x: 6, y: 48 },
      arrows: [
        { from: { x: 7, y: 48 }, to: { x: 7, y: 38 }, style: 'dashed', label: 'Behind net' },
        { from: { x: 7, y: 35 }, to: { x: 30, y: 15 }, style: 'dashed', label: 'Swing to open side' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 2, oppScore: 2, timeLeft: '9:15' },
    audioFolder: 'module3-reverse',
    nextScenarioId: 'module3-scenario3'
  },
  {
    id: 'module3-scenario3',
    moduleId: 3,
    scenarioNum: 3,
    totalInModule: 7,
    title: 'Center Support on a Hard Forecheck',
    situation: 'Two forecheckers are aggressively attacking your D behind the net. Both wingers are being covered on the boards. You\'re the center sitting near the top of the circles.',
    question: 'What should you do?',
    answers: [
      { text: 'Skate to the middle to provide a safe release valve for the D', correct: true, feedback: 'When wingers are covered and forecheckers are committing hard, you fill the middle as an escape route. This breaks the forecheck and lets your team exit cleanly.' },
      { text: 'Attack one of the forecheckers to create a passing lane', correct: false, feedback: 'You can\'t create space by hitting a forechecker behind your own net. Your job is to be open and available in the middle.' },
      { text: 'Stay at the blue line and prepare to transition forward', correct: false, feedback: 'Too passive. With two forecheckers active, the D needs an immediate outlet. Move in to support.' },
      { text: 'Circle behind the goal line to help the D escape', correct: false, feedback: 'That adds to the congestion. The D needs ice AWAY from the goal line. A middle outlet is cleaner.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'teammate', x: 6, y: 42, label: 'D', note: 'Under pressure' },
        { type: 'you', x: 55, y: 42, note: 'You (C)', targetX: 35, targetY: 42 },
        { type: 'opponent', x: 18, y: 36, label: 'F', note: 'Hard forecheck', targetX: 8, targetY: 40 },
        { type: 'opponent', x: 20, y: 50, label: 'F', note: 'Hard forecheck', targetX: 8, targetY: 45 },
        { type: 'teammate', x: 35, y: 70, label: 'RW', faded: true, note: 'Covered' },
        { type: 'teammate', x: 35, y: 15, label: 'LW', faded: true, note: 'Covered' }
      ],
      puck: { x: 5, y: 42 },
      arrows: [
        { from: { x: 55, y: 42 }, to: { x: 35, y: 42 }, style: 'solid', label: 'Support middle' },
        { from: { x: 18, y: 36 }, to: { x: 8, y: 40 }, style: 'solid' },
        { from: { x: 20, y: 50 }, to: { x: 8, y: 45 }, style: 'solid' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 3, oppScore: 1, timeLeft: '7:40' },
    audioFolder: 'module3-center-support',
    nextScenarioId: 'module3-scenario4'
  },
  {
    id: 'module3-scenario4',
    moduleId: 3,
    scenarioNum: 4,
    totalInModule: 7,
    title: 'Winger Board Positioning',
    situation: 'Your D is retrieving the puck behind the net. A forechecker is moving in. You\'re the right winger — your positioning on the boards will determine if the D can make a clean outlet pass.',
    question: 'Where should you position on the wall?',
    answers: [
      { text: 'Low on the boards near the hash marks — short, safe pass for the D', correct: true, feedback: 'By staying low and tight to the boards, you\'re a quick escape valve. The D can make a short, accurate pass even under pressure. You control the play from there.' },
      { text: 'High on the boards near center ice for a longer pass', correct: false, feedback: 'Too high. That pass is harder to complete under forecheck pressure. Get low first, gain possession, then move it up.' },
      { text: 'Neutral ice behind the forechecker to avoid contact', correct: false, feedback: 'You\'re not helping your D escape. The forechecker is between you and the puck. Stay on the boards and be an outlet.' },
      { text: 'At the faceoff circle to provide a middle option', correct: false, feedback: 'That\'s not your job as a winger. The center handles middle support. You own the boards — get there.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'teammate', x: 7, y: 42, label: 'D', note: 'Retrieving puck' },
        { type: 'you', x: 42, y: 68, note: 'You (RW)', targetX: 28, targetY: 72 },
        { type: 'opponent', x: 30, y: 48, label: 'F', note: 'Forechecker' },
        { type: 'teammate', x: 55, y: 42, label: 'C', note: 'Center' },
        { type: 'teammate', x: 42, y: 15, label: 'LW', note: 'Left winger' }
      ],
      puck: { x: 6, y: 42 },
      arrows: [
        { from: { x: 42, y: 68 }, to: { x: 28, y: 72 }, style: 'solid', label: 'Get low on wall' }
      ],
      annotations: []
    },
    gameContext: { period: 1, teamScore: 1, oppScore: 1, timeLeft: '6:30' },
    audioFolder: 'module3-winger-boards',
    nextScenarioId: 'module3-scenario5'
  },
  {
    id: 'module3-scenario5',
    moduleId: 3,
    scenarioNum: 5,
    totalInModule: 7,
    title: 'Wheel Play — Fill the Lane',
    situation: 'Your D reads the forecheck and decides to wheel the puck up ice himself. He\'s skating hard from behind the net along the boards. You\'re the right winger and need to fill a support lane.',
    question: 'Where do you skate to support the D on the wheel play?',
    answers: [
      { text: 'Fill the middle lane and stay even or slightly ahead to be a quick pass option', correct: true, feedback: 'When the D wheels it, you fill middle. Stay engaged with his pace and be ready for a quick pass or to create a 2-on-1. That\'s the trailer\'s job on a wheel play.' },
      { text: 'Chase behind the D on the same side', correct: false, feedback: 'He\'s already committed to skating it. Fill the middle where he can see you and use you to create transition offense.' },
      { text: 'Stay back at the blue line and wait', correct: false, feedback: 'Too cautious. The D is wheeling with confidence. Support his aggressive action by filling the middle and being dangerous.' },
      { text: 'Go to the opposite wall for a safety outlet', correct: false, feedback: 'Overcomplicating it. The D is moving with speed. Your job is to fill middle, stay with him, and turn this into a rush.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'teammate', x: 25, y: 65, label: 'D', note: 'Wheeling it up', targetX: 65, targetY: 65 },
        { type: 'you', x: 45, y: 30, note: 'You (RW)', targetX: 60, targetY: 42 },
        { type: 'opponent', x: 40, y: 55, label: 'F', note: 'Trailing forecheck' },
        { type: 'teammate', x: 60, y: 42, label: 'C', note: 'Center transitioning' },
        { type: 'teammate', x: 45, y: 15, label: 'LW', note: 'Left winger' }
      ],
      puck: { x: 25, y: 65 },
      arrows: [
        { from: { x: 25, y: 65 }, to: { x: 65, y: 65 }, style: 'solid', label: 'D wheel' },
        { from: { x: 45, y: 30 }, to: { x: 60, y: 42 }, style: 'solid', label: 'Fill middle' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 2, oppScore: 0, timeLeft: '13:10' },
    audioFolder: 'module3-wheel-play',
    nextScenarioId: 'module3-scenario6'
  },
  {
    id: 'module3-scenario6',
    moduleId: 3,
    scenarioNum: 6,
    totalInModule: 7,
    title: 'Breakout Under Heavy Pressure',
    situation: 'Your D just got the puck behind the goal line. Both forecheckers are closing in hard from each side. Your winger is low on the wall and your center is in the middle — both within passing range.',
    question: 'What should the D prioritize?',
    answers: [
      { text: 'Quick, short pass to the winger on the wall — possession is the priority', correct: true, feedback: 'Under heavy pressure, don\'t be fancy. Get the puck to the winger with a safe, short pass. Escape possession cleanly, then build the breakout from there.' },
      { text: 'Thread a stretch pass to the center to skip the forecheckers', correct: false, feedback: 'Too risky. With two forecheckers closing, a stretch pass gets picked off. Take the sure thing — short pass to the wall.' },
      { text: 'Wheel it up himself on the boards', correct: false, feedback: 'With two forecheckers closing, you don\'t have separation to wheel safely. Quick outlet pass is smarter.' },
      { text: 'Retreat deeper behind the goal line and wait them out', correct: false, feedback: 'That just prolongs the pressure. You have open outlets — make the quick pass and escape.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'teammate', x: 6, y: 42, label: 'D', note: 'Under heavy pressure' },
        { type: 'opponent', x: 18, y: 35, label: 'F', note: 'Hard forecheck', targetX: 8, targetY: 40 },
        { type: 'opponent', x: 18, y: 52, label: 'F', note: 'Hard forecheck', targetX: 8, targetY: 45 },
        { type: 'you', x: 30, y: 68, label: 'RW', note: 'You — wall outlet' },
        { type: 'teammate', x: 40, y: 42, label: 'C', note: 'Middle option' }
      ],
      puck: { x: 5, y: 42 },
      arrows: [
        { from: { x: 6, y: 42 }, to: { x: 30, y: 68 }, style: 'dashed', label: 'Quick outlet' },
        { from: { x: 18, y: 35 }, to: { x: 8, y: 40 }, style: 'solid' },
        { from: { x: 18, y: 52 }, to: { x: 8, y: 45 }, style: 'solid' }
      ],
      annotations: []
    },
    gameContext: { period: 3, teamScore: 1, oppScore: 1, timeLeft: '11:55' },
    audioFolder: 'module3-heavy-pressure',
    nextScenarioId: 'module3-scenario7'
  },
  {
    id: 'module3-scenario7',
    moduleId: 3,
    scenarioNum: 7,
    totalInModule: 7,
    title: 'Stretch Pass Recognition',
    situation: 'Your D has the puck behind the goal line with time. The forechecker backed off and is playing a soft gap. Your center is at center ice with speed, and the opposing forward is way behind him. The stretch pass is there.',
    question: 'How should you capitalize on this time and space?',
    answers: [
      { text: 'Recognize the soft forecheck and fire the stretch pass to the center', correct: true, feedback: 'Perfect read. When the forechecker backs off, the stretch pass is your most dangerous option. Your center gets the puck with momentum and space — that\'s an offensive advantage.' },
      { text: 'Play it safe with a short pass to the winger', correct: false, feedback: 'Not always the right move. When you have TIME and SPACE, the stretch pass is more dangerous. Read the forecheck intensity.' },
      { text: 'Wheel it up yourself to maintain possession', correct: false, feedback: 'You have a more dangerous option. A stretch pass that puts your center 1-on-1 with a defender is better than carrying it yourself.' },
      { text: 'Wait for the forechecker to commit before deciding', correct: false, feedback: 'The forechecker backing off means you HAVE time NOW. Use it immediately. Waiting gives them a second chance to attack.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'teammate', x: 7, y: 42, label: 'D', note: 'Has puck with time' },
        { type: 'opponent', x: 38, y: 42, label: 'F', note: 'Soft gap — backed off' },
        { type: 'you', x: 100, y: 42, note: 'You (C) — stretch target', targetX: 135, targetY: 42 },
        { type: 'opponent', x: 120, y: 42, label: 'D', note: 'Deep — beaten by speed' },
        { type: 'teammate', x: 30, y: 68, label: 'RW', note: 'Secondary option' }
      ],
      puck: { x: 6, y: 42 },
      arrows: [
        { from: { x: 7, y: 42 }, to: { x: 100, y: 42 }, style: 'dashed', label: 'Stretch pass' },
        { from: { x: 100, y: 42 }, to: { x: 135, y: 42 }, style: 'solid', label: 'Exit with speed' }
      ],
      annotations: []
    },
    gameContext: { period: 3, teamScore: 1, oppScore: 2, timeLeft: '4:20' },
    audioFolder: 'module3-stretch-pass',
    nextScenarioId: null
  }
];
