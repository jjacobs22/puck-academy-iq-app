import type { Scenario } from '../scenarios';

// Module 4: Offensive Zone IQ — 7 scenarios
// Offensive end: goal at x=190, crease curves (190,32)→(178,42.5)→(190,53)
export const module4Scenarios: Scenario[] = [
  {
    id: 'module4-scenario1',
    moduleId: 4,
    scenarioNum: 1,
    totalInModule: 7,
    title: 'Net-Front Positioning',
    situation: 'Your D has the puck at the point and is about to shoot. You\'re planted about 15 feet in front of the goalie. A defenseman is trying to clear you out. The shot is coming.',
    question: 'What\'s your primary job on this net-front play?',
    answers: [
      { text: 'Position in the crease area, angled to see the puck for tips and deflections', correct: true, feedback: 'You want to be a threat, not an obstacle. Plant yourself in the hard areas — shoulders square to the point, one foot in the crease. You need to see the puck coming so you can tip it, and your body naturally screens.' },
      { text: 'Stand directly between the shooter and goalie to guarantee a screen', correct: false, feedback: 'A blind screen means you can\'t tip the puck. You need to see it coming. Position where you can both screen AND deflect.' },
      { text: 'Back up toward the goal line to give the shooter a clear lane', correct: false, feedback: 'You\'re too deep and you\'re no longer a scoring threat. Stay in the hard area where you can tip, screen, and crash for rebounds.' },
      { text: 'Move to the side of the net for rebounds only', correct: false, feedback: 'You\'re abandoning the highest-danger area. Net-front presence creates tips, screens, AND rebounds. Don\'t pick one — be all three.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'you', x: 178, y: 42, note: 'You — net front' },
        { type: 'teammate', x: 140, y: 42, label: 'D', note: 'Shooting from point' },
        { type: 'teammate', x: 160, y: 65, label: 'LW', note: 'Low support' },
        { type: 'opponent', x: 175, y: 50, label: 'D', note: 'Trying to clear you' },
        { type: 'opponent', x: 155, y: 35, label: 'D', note: 'Blocking lane' }
      ],
      puck: { x: 140, y: 42 },
      arrows: [
        { from: { x: 140, y: 42 }, to: { x: 188, y: 42 }, style: 'dashed', label: 'Shot' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 1, oppScore: 1, timeLeft: '9:30' },
    audioFolder: 'module4-net-front',
    nextScenarioId: 'module4-scenario2'
  },
  {
    id: 'module4-scenario2',
    moduleId: 4,
    scenarioNum: 2,
    totalInModule: 7,
    title: 'Cycling the Puck Low',
    situation: 'You\'re below the goal line on the boards with the puck. A defender is closing fast. Your linemate has inside position at the hash marks, and there\'s a winger high in the slot. You feel the pressure coming.',
    question: 'When is the RIGHT time to cycle the puck around the boards?',
    answers: [
      { text: 'When your linemate has inside position on his defender and can attack the pass', correct: true, feedback: 'Cycling only works if you have a target. Your linemate needs inside leverage, the defender needs to be overextended, and you need a passing lane. Cycling with purpose is puck control.' },
      { text: 'Any time you\'re under pressure below the goal line', correct: false, feedback: 'Don\'t just move the puck for the sake of movement. Cycling into traffic is a turnover. Make sure someone can USE the pass.' },
      { text: 'Every time you get the puck below the goal line', correct: false, feedback: 'That becomes predictable. Sometimes holding it, sometimes going behind the net, sometimes cycling — read the play.' },
      { text: 'When the goalie is deep in the net', correct: false, feedback: 'Goalie positioning doesn\'t determine your cycle decision. Your teammates\' positioning does.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'you', x: 192, y: 65, note: 'You — below goal line' },
        { type: 'teammate', x: 170, y: 42, label: 'C', note: 'Inside position at hash' },
        { type: 'teammate', x: 155, y: 30, label: 'RW', note: 'High in slot' },
        { type: 'opponent', x: 185, y: 60, label: 'D', note: 'Closing on you', targetX: 192, targetY: 65 },
        { type: 'opponent', x: 172, y: 50, label: 'D', note: 'Covering hash' }
      ],
      puck: { x: 193, y: 65 },
      arrows: [
        { from: { x: 192, y: 65 }, to: { x: 170, y: 42 }, style: 'dashed', label: 'Cycle pass' },
        { from: { x: 185, y: 60 }, to: { x: 192, y: 65 }, style: 'solid' }
      ],
      annotations: []
    },
    gameContext: { period: 1, teamScore: 0, oppScore: 0, timeLeft: '8:15' },
    audioFolder: 'module4-cycling',
    nextScenarioId: 'module4-scenario3'
  },
  {
    id: 'module4-scenario3',
    moduleId: 4,
    scenarioNum: 3,
    totalInModule: 7,
    title: 'Shot Selection',
    situation: 'You\'re in the left circle with the puck, 30 feet from goal. Decent angle. But a trailer is moving into the slot with a better scoring chance — there\'s a defender between you and him though. One second to decide.',
    question: 'What drives your shoot-or-pass decision?',
    answers: [
      { text: 'The quality of your pass and whether the trailer\'s scoring window is open', correct: true, feedback: 'Shot selection is about expected goal value. If your pass gets through and he\'s one-timing from the slot, that\'s higher probability. But if the defender is in the lane, YOU take the play. Read what\'s open.' },
      { text: 'Always shoot from the circle — that\'s your job', correct: false, feedback: 'Shots from the circle are fine, but a clean slot one-timer is worth more. Don\'t shoot out of ego — shoot when it\'s the best option.' },
      { text: 'Whether you\'re a left-shot or right-shot', correct: false, feedback: 'Your handedness matters for execution, but the decision is about what creates the best scoring chance right NOW.' },
      { text: 'The goalie\'s positioning', correct: false, feedback: 'Goalie positioning is a factor, but the bigger question is: can you make a higher-quality play by passing? Read the full picture.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'you', x: 155, y: 25, note: 'You — left circle' },
        { type: 'teammate', x: 160, y: 42, label: 'C', note: 'Trailer entering slot', targetX: 170, targetY: 40 },
        { type: 'opponent', x: 158, y: 35, label: 'D', note: 'Between you and trailer' },
        { type: 'opponent', x: 165, y: 55, label: 'D', note: 'Far side' },
        { type: 'teammate', x: 145, y: 60, label: 'RW', note: 'Weak side' }
      ],
      puck: { x: 155, y: 25 },
      arrows: [
        { from: { x: 155, y: 25 }, to: { x: 188, y: 42 }, style: 'dashed', label: 'Shoot?' },
        { from: { x: 155, y: 25 }, to: { x: 170, y: 40 }, style: 'dashed', label: 'Pass?' }
      ],
      annotations: []
    },
    gameContext: { period: 3, teamScore: 2, oppScore: 2, timeLeft: '3:45' },
    audioFolder: 'module4-shot-selection',
    nextScenarioId: 'module4-scenario4'
  },
  {
    id: 'module4-scenario4',
    moduleId: 4,
    scenarioNum: 4,
    totalInModule: 7,
    title: 'Screening the Goalie',
    situation: 'Your team has possession at the point. A shot is coming and you\'re positioned 12 feet in front of the goalie. You want to make his job harder — but the refs are watching for interference.',
    question: 'How do you screen effectively without getting called?',
    answers: [
      { text: 'Keep your stick down, body between the puck lane and goalie, but don\'t initiate contact', correct: true, feedback: 'A legal screen is presence without interference. Occupy space, be a big body, let the goalie see your number on your back — but don\'t hook, lean, or tie up his arms. The ref will let it go if you\'re playing the puck.' },
      { text: 'Lean on the goalie\'s pads to feel where he\'s moving', correct: false, feedback: 'That\'s goaltender interference. You can\'t initiate contact with the goalie in the crease. Screen with your body position, not your hands.' },
      { text: 'Move into the crease before the shot and stand your ground', correct: false, feedback: 'Being in the crease before the puck arrives is asking for a penalty. Establish position just outside and let the play come to you.' },
      { text: 'Screen from the side of the net where the ref can\'t see', correct: false, feedback: 'The ref can see everything. And screening from the side is useless anyway — you need to be between the shooter and the goalie.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'you', x: 178, y: 42, note: 'You — screening' },
        { type: 'teammate', x: 140, y: 25, label: 'D', note: 'About to shoot' },
        { type: 'opponent', x: 175, y: 50, label: 'D', note: 'Trying to clear you' },
        { type: 'opponent', x: 155, y: 38, label: 'D', note: 'Blocking lane' },
        { type: 'teammate', x: 165, y: 60, label: 'LW', note: 'Low support' }
      ],
      puck: { x: 140, y: 25 },
      arrows: [
        { from: { x: 140, y: 25 }, to: { x: 188, y: 42 }, style: 'dashed', label: 'Incoming shot' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 0, oppScore: 1, timeLeft: '14:20' },
    audioFolder: 'module4-screening',
    nextScenarioId: 'module4-scenario5'
  },
  {
    id: 'module4-scenario5',
    moduleId: 4,
    scenarioNum: 5,
    totalInModule: 7,
    title: 'Back-Door Play Recognition',
    situation: 'You\'re the winger on the weak side. Your center is driving hard toward the net, pulling the defenseman with him. The puck carrier on the perimeter is looking around. That leaves you wide open on the back door.',
    question: 'What tells you the back-door pass is coming to you?',
    answers: [
      { text: 'You\'re in a scoring area, the defender has committed to the center, and the puck carrier is looking your way', correct: true, feedback: 'Back-door isn\'t a set play — it\'s reading movement. If the center\'s drive pulls the defender and the puck carrier can see you\'re open, that\'s your cue. Don\'t cheat early — read and react.' },
      { text: 'The defenseman loses sight of you', correct: false, feedback: 'That\'s part of it, but the trigger is the PUCK CARRIER. He needs to see you and have a passing lane. Watch the puck, not just your defender.' },
      { text: 'Your center makes eye contact before the drive', correct: false, feedback: 'Pre-arranged signals aren\'t how real-time hockey works. Read the play as it develops. Your center is creating space — you exploit it.' },
      { text: 'There\'s space behind the defenseman', correct: false, feedback: 'Space alone isn\'t enough. You need the puck carrier to recognize the opportunity AND have a clear lane. All three elements matter.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'you', x: 170, y: 22, note: 'You — back door, OPEN' },
        { type: 'teammate', x: 165, y: 42, label: 'C', note: 'Driving to net', targetX: 182, targetY: 42 },
        { type: 'teammate', x: 145, y: 58, label: 'RW', note: 'Puck carrier — looking' },
        { type: 'opponent', x: 170, y: 35, label: 'D', note: 'Following center', targetX: 180, targetY: 42 },
        { type: 'opponent', x: 165, y: 58, label: 'D', note: 'On puck carrier' }
      ],
      puck: { x: 145, y: 58 },
      arrows: [
        { from: { x: 165, y: 42 }, to: { x: 182, y: 42 }, style: 'solid', label: 'Center drive' },
        { from: { x: 145, y: 58 }, to: { x: 170, y: 22 }, style: 'dashed', label: 'Back-door pass' }
      ],
      annotations: []
    },
    gameContext: { period: 3, teamScore: 1, oppScore: 1, timeLeft: '6:10' },
    audioFolder: 'module4-back-door',
    nextScenarioId: 'module4-scenario6'
  },
  {
    id: 'module4-scenario6',
    moduleId: 4,
    scenarioNum: 6,
    totalInModule: 7,
    title: 'Getting Point Shots Through',
    situation: 'You\'re at the point with the puck. Opposing D-men are converging to block. A forward is screening in front of the net, another is crashing for rebounds. You need to get this shot through.',
    question: 'What\'s your best tactic to get the puck to the net?',
    answers: [
      { text: 'Shoot low through traffic — use the screen and let the deflectors work', correct: true, feedback: 'Low shots through traffic beat defenders more than high ones. Your screener can deflect it, the goalie can\'t see it, and if it gets through there\'s a rebound. Let it rip low and hard.' },
      { text: 'Shoot high to beat the defenders', correct: false, feedback: 'High shots over traffic are hard to control and rarely create secondary chances. Low and hard gives you tips, screens, AND rebounds.' },
      { text: 'Wait for a clear shooting lane', correct: false, feedback: 'Waiting for daylight means you\'re not getting shots through under pressure. That\'s not how you create chances. Fire it low through the mess.' },
      { text: 'Pass back out and reset the play', correct: false, feedback: 'You have a screen, a crash guy, and a shooting lane through traffic. This IS the play. Don\'t pass up the opportunity.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'you', x: 140, y: 25, note: 'You (D) — at point' },
        { type: 'teammate', x: 178, y: 42, label: 'C', note: 'Screening' },
        { type: 'teammate', x: 168, y: 55, label: 'LW', note: 'Crashing for rebound' },
        { type: 'opponent', x: 155, y: 30, label: 'D', note: 'Converging to block' },
        { type: 'opponent', x: 158, y: 42, label: 'D', note: 'Blocking lane' }
      ],
      puck: { x: 140, y: 25 },
      arrows: [
        { from: { x: 140, y: 25 }, to: { x: 188, y: 42 }, style: 'dashed', label: 'Low and hard' }
      ],
      annotations: []
    },
    gameContext: { period: 1, teamScore: 0, oppScore: 0, timeLeft: '4:50' },
    audioFolder: 'module4-point-shots',
    nextScenarioId: 'module4-scenario7'
  },
  {
    id: 'module4-scenario7',
    moduleId: 4,
    scenarioNum: 7,
    totalInModule: 7,
    title: 'Winning the Dump-In Battle',
    situation: 'Your team dumps the puck in deep during an offensive push. It\'s a race for the loose puck behind the net. The opposing D is closer but has his back turned. You\'re coming from a different angle.',
    question: 'What\'s your best move to win this puck battle?',
    answers: [
      { text: 'Angle your body to cut him off before he reaches the puck — own the space', correct: true, feedback: 'You don\'t need to reach the puck first — you need to own the space. Get your body in his path, make him change direction, then attack the puck. Positioning and angling beats raw speed.' },
      { text: 'Go for the puck directly — fastest player wins', correct: false, feedback: 'He\'s closer. You won\'t win a foot race. But you CAN win the positioning battle. Use your angle to cut him off.' },
      { text: 'Wait for him to touch it first, then make the play', correct: false, feedback: 'You\'re giving up initiative. By the time he has possession, you\'re chasing. Get your body involved early.' },
      { text: 'Chase him into the corner and battle after he gets it', correct: false, feedback: 'Now you\'re on defense. The whole point of a dump-in is to recover the puck. Use your angle to prevent him from establishing control.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'you', x: 175, y: 68, note: 'You — angling in', targetX: 192, targetY: 60 },
        { type: 'opponent', x: 182, y: 48, label: 'D', note: 'Back turned — closer', targetX: 193, targetY: 58 },
        { type: 'teammate', x: 165, y: 55, label: 'C', note: 'Support' },
        { type: 'opponent', x: 175, y: 30, label: 'D', note: 'Far side' }
      ],
      puck: { x: 193, y: 58 },
      arrows: [
        { from: { x: 175, y: 68 }, to: { x: 192, y: 60 }, style: 'solid', label: 'Cut off angle' },
        { from: { x: 182, y: 48 }, to: { x: 193, y: 58 }, style: 'solid' }
      ],
      annotations: []
    },
    gameContext: { period: 3, teamScore: 2, oppScore: 3, timeLeft: '2:15' },
    audioFolder: 'module4-puck-retrieval',
    nextScenarioId: null
  }
];
