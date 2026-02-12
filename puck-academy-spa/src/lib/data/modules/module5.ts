import type { Scenario } from '../scenarios';

// Module 5: Forechecking — 8 scenarios
// Forechecking happens in the opponent's zone (right end, goal at x=190)
export const module5Scenarios: Scenario[] = [
  {
    id: 'module5-scenario1',
    moduleId: 5,
    scenarioNum: 1,
    totalInModule: 8,
    title: 'F1 Angle of Approach',
    coachCue: "F1 doesn't just charge at the puck. You take an angle that limits where the D can go — force them one way, take away their best option.",
    introSlides: [
      { title: 'Forechecking Is About Layers', body: '"A good forecheck isn\'t three guys chasing the puck. It\'s three layers of pressure — F1 dictates, F2 supports, F3 protects. Everyone has a job."' },
      { title: 'F1\'s Job: Dictate, Don\'t Chase', body: '"F1 doesn\'t just charge at the puck. You take an angle that limits where the D can go — force them one way, take away their best option."' },
      { title: 'Read Before You Commit', body: '"Don\'t just fly in. Read if you have support before you commit to pressure. If F2 isn\'t there, contain. If F2 is in position, attack."' }
    ],
    situation: 'You\'re F1 entering the zone on the forecheck. The D has the puck behind their net. Their other D is on the far side. F2 is trailing you on the weak side. What angle do you take?',
    question: 'How do you approach the puck carrier?',
    answers: [
      { text: 'Arc toward his strong side to take away the D-to-D pass', correct: true, feedback: 'Take away their best option — the D-to-D pass. By arcing toward his strong side, you force him to go the other way where F2 is waiting. That\'s how you dictate the play instead of just chasing.' },
      { text: 'Skate straight at the D to pressure him immediately', correct: false, feedback: 'Don\'t just skate at the puck — skate to take away options. If you arc toward his strong side, you take away the D-to-D pass and force him toward F2. Forechecking is about angles, not straight lines.' },
      { text: 'Go wide to the boards to cut off the rim', correct: false, feedback: 'Cutting off the rim leaves the D-to-D pass wide open — their best breakout option. Take away the highest-percentage play first. Arc toward the strong side.' },
      { text: 'Stay high and let him come to you', correct: false, feedback: 'Hanging back gives the D all the time in the world to make a clean breakout. F1 needs to apply pressure with purpose — take an angle, take away options, force the play.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'opponent', x: 193, y: 42, label: 'D', note: 'Puck behind net' },
        { type: 'opponent', x: 178, y: 22, label: 'D', note: 'Far-side D — D-to-D target' },
        { type: 'you', x: 165, y: 50, note: 'You (F1) — choosing angle', targetX: 185, targetY: 35 },
        { type: 'teammate', x: 155, y: 28, label: 'F', note: 'F2 — weak side' },
        { type: 'teammate', x: 140, y: 42, label: 'F', note: 'F3 — high' }
      ],
      puck: { x: 193, y: 42 },
      arrows: [
        { from: { x: 165, y: 50 }, to: { x: 185, y: 35 }, style: 'solid', label: 'Arc to strong side' },
        { from: { x: 193, y: 42 }, to: { x: 178, y: 22 }, style: 'dashed', label: 'D-to-D (take this away)' }
      ],
      annotations: []
    },
    gameContext: { period: 1, teamScore: 0, oppScore: 0, timeLeft: '16:45' },
    audioFolder: 'module5-f1-angle',
    nextScenarioId: 'module5-scenario2'
  },
  {
    id: 'module5-scenario2',
    moduleId: 5,
    scenarioNum: 2,
    totalInModule: 8,
    title: 'F1 vs F2 Read',
    coachCue: "When someone else is F1, you're F2 — your job is different. Take the high lane, cut off the D-to-D or outlet. F2 supports by taking away options, not chasing the puck.",
    introSlides: [
      { title: 'Forechecking Is About Layers', body: '"A good forecheck isn\'t three guys chasing the puck. It\'s three layers of pressure — F1 dictates, F2 supports, F3 protects. Everyone has a job."' },
      { title: 'F1\'s Job: Dictate, Don\'t Chase', body: '"F1 doesn\'t just charge at the puck. You take an angle that limits where the D can go — force them one way, take away their best option."' },
      { title: 'Read Before You Commit', body: '"Don\'t just fly in. Read if you have support before you commit to pressure. If F2 isn\'t there, contain. If F2 is in position, attack."' }
    ],
    situation: 'Your winger entered the zone first and is forechecking hard on the D. You\'re the second forward in. The D still has the puck but F1 is closing fast. What\'s your role?',
    question: 'As the second forward in, what\'s your job?',
    answers: [
      { text: 'Take the high lane and cut off the D-to-D pass or outlet to the weak side', correct: true, feedback: 'F2 supports the forecheck by taking away outlets. Your job isn\'t to join the puck battle — it\'s to cut off passing lanes. F1 pressures, you take the high lane. If they\'re forced into a bad play, you\'re there to intercept.' },
      { text: 'Join F1 on the puck carrier — double team him', correct: false, feedback: 'When someone else is F1, you\'re F2 — your job is different. Take the high lane, cut off the D-to-D or the outlet pass. If you double team, the whole weak side opens up. F2 supports by taking away options, not chasing the puck.' },
      { text: 'Stay back at the blue line as the safety', correct: false, feedback: 'That\'s F3\'s job, not yours. As F2, you need to be in the zone supporting the forecheck by cutting off outlets. Get in there.' },
      { text: 'Go straight to the net front for a rebound', correct: false, feedback: 'Nobody\'s shot on net yet. Your job right now is forechecking structure — take away the D-to-D and outlet lanes. Get to work.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'opponent', x: 185, y: 60, label: 'D', note: 'Puck carrier' },
        { type: 'teammate', x: 180, y: 62, label: 'F', note: 'F1 — closing on D' },
        { type: 'you', x: 165, y: 42, note: 'You (F2) — reading play', targetX: 175, targetY: 32 },
        { type: 'opponent', x: 180, y: 25, label: 'D', note: 'D-to-D target' },
        { type: 'teammate', x: 140, y: 42, label: 'F', note: 'F3 — high safety' }
      ],
      puck: { x: 185, y: 60 },
      arrows: [
        { from: { x: 165, y: 42 }, to: { x: 175, y: 32 }, style: 'solid', label: 'Take high lane' },
        { from: { x: 185, y: 60 }, to: { x: 180, y: 25 }, style: 'dashed', label: 'D-to-D (cut this off)' }
      ],
      annotations: []
    },
    gameContext: { period: 1, teamScore: 0, oppScore: 0, timeLeft: '14:20' },
    audioFolder: 'module5-f1-f2-read',
    nextScenarioId: 'module5-scenario3'
  },
  {
    id: 'module5-scenario3',
    moduleId: 5,
    scenarioNum: 3,
    totalInModule: 8,
    title: 'Pressure vs Contain',
    coachCue: "Without support, you contain — not attack. Take away time and space while your teammates catch up. Contain, angle, and wait for F2.",
    introSlides: [
      { title: 'Forechecking Is About Layers', body: '"A good forecheck isn\'t three guys chasing the puck. It\'s three layers of pressure — F1 dictates, F2 supports, F3 protects. Everyone has a job."' },
      { title: 'F1\'s Job: Dictate, Don\'t Chase', body: '"F1 doesn\'t just charge at the puck. You take an angle that limits where the D can go — force them one way, take away their best option."' },
      { title: 'Read Before You Commit', body: '"Don\'t just fly in. Read if you have support before you commit to pressure. If F2 isn\'t there, contain. If F2 is in position, attack."' }
    ],
    situation: 'You\'re F1 and got deep fast, but your teammates are still coming through the neutral zone. The D has the puck and is looking to move it. No F2 support yet. Do you attack or contain?',
    question: 'What\'s the right play without support?',
    answers: [
      { text: 'Contain and angle — take away time and space while waiting for F2', correct: true, feedback: 'Without support, you contain — not attack. Take away time and space while your teammates catch up. If you commit and miss, they\'re gone the other way 3-on-2. Contain, angle, and wait for F2. Then you can attack together.' },
      { text: 'Attack hard — if you can force a quick turnover, you\'re in alone', correct: false, feedback: 'Don\'t overcommit. When you don\'t have support, contain is the play. Attacking 1-on-1 without backup is how you give up odd-man rushes. Buy time, and once F2 is in position, then you can pressure.' },
      { text: 'Back off completely and wait at the hash marks', correct: false, feedback: 'Too passive. You still need to apply pressure — just smart pressure. Take away their easy options and force them to hold the puck until your support arrives.' },
      { text: 'Go cover the forward in the middle instead', correct: false, feedback: 'Abandoning F1 duties leaves the puck carrier completely free. Contain and angle — that\'s your job until support arrives.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'opponent', x: 185, y: 42, label: 'D', note: 'Puck carrier — looking to move it' },
        { type: 'you', x: 170, y: 48, note: 'You (F1) — no support yet' },
        { type: 'teammate', x: 130, y: 35, label: 'F', note: 'F2 — still in NZ', faded: true },
        { type: 'teammate', x: 125, y: 50, label: 'F', note: 'F3 — trailing', faded: true },
        { type: 'opponent', x: 180, y: 25, label: 'D', note: 'Far-side D' }
      ],
      puck: { x: 185, y: 42 },
      arrows: [
        { from: { x: 170, y: 48 }, to: { x: 178, y: 45 }, style: 'solid', label: 'Contain — don\'t commit' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 1, oppScore: 0, timeLeft: '11:30' },
    audioFolder: 'module5-pressure-contain',
    nextScenarioId: 'module5-scenario4'
  },
  {
    id: 'module5-scenario4',
    moduleId: 5,
    scenarioNum: 4,
    totalInModule: 8,
    title: 'Angling to the Boards',
    coachCue: "Angling is about steering them where you want — not just chasing. Arc from outside to inside so you take away the middle and force him to the boards where F2 is waiting.",
    introSlides: [
      { title: 'Forechecking Is About Layers', body: '"A good forecheck isn\'t three guys chasing the puck. It\'s three layers of pressure — F1 dictates, F2 supports, F3 protects. Everyone has a job."' },
      { title: 'F1\'s Job: Dictate, Don\'t Chase', body: '"F1 doesn\'t just charge at the puck. You take an angle that limits where the D can go — force them one way, take away their best option."' },
      { title: 'Read Before You Commit', body: '"Don\'t just fly in. Read if you have support before you commit to pressure. If F2 isn\'t there, contain. If F2 is in position, attack."' }
    ],
    situation: 'The opposing D is trying to skate the puck through the neutral zone. F2 is positioned along the boards. You\'re tracking the puck carrier. How do you steer him?',
    question: 'What\'s the best angle to take on the puck carrier?',
    answers: [
      { text: 'Arc outside to inside, forcing him toward the boards where F2 is waiting', correct: true, feedback: 'Angling is about steering them where you want — not just chasing. By coming from outside to inside, you force him to the boards where F2 is waiting. Now it\'s 2-on-1 instead of a foot race.' },
      { text: 'Take the shortest path straight to him', correct: false, feedback: 'Don\'t just skate at him — steer him. Arc from outside to inside so you take away the middle and force him to the boards. F2 is waiting there. Angling makes forechecking a team play, not a solo mission.' },
      { text: 'Stay in front of him to slow him down', correct: false, feedback: 'Just slowing him down doesn\'t take away options. You need to funnel him to where your support is. Arc your angle to force him to the boards.' },
      { text: 'Let him go wide and cut off the middle', correct: false, feedback: 'Letting him go wide gives him the boards and time. You want to FORCE him wide into F2 — that\'s different from letting him choose.' }
    ],
    diagram: {
      zone: 'neutral',
      players: [
        { type: 'opponent', x: 150, y: 42, label: 'D', note: 'Carrying through NZ', targetX: 100, targetY: 42 },
        { type: 'you', x: 130, y: 50, note: 'You (F1) — angling', targetX: 145, targetY: 42 },
        { type: 'teammate', x: 140, y: 72, label: 'F', note: 'F2 — on the boards' },
        { type: 'teammate', x: 120, y: 30, label: 'F', note: 'F3 — support' }
      ],
      puck: { x: 150, y: 42 },
      arrows: [
        { from: { x: 130, y: 50 }, to: { x: 145, y: 42 }, style: 'solid', label: 'Arc outside-in' },
        { from: { x: 150, y: 42 }, to: { x: 140, y: 72 }, style: 'dashed', label: 'Forced to boards' }
      ],
      annotations: []
    },
    gameContext: { period: 1, teamScore: 0, oppScore: 0, timeLeft: '10:20' },
    audioFolder: 'module5-angling',
    nextScenarioId: 'module5-scenario5'
  },
  {
    id: 'module5-scenario5',
    moduleId: 5,
    scenarioNum: 5,
    totalInModule: 8,
    title: 'Reading the Breakout',
    coachCue: "Great forecheckers anticipate. When you read the pass, jump the lane — either you intercept it or you\'re first on the receiver. Trust your read.",
    introSlides: [
      { title: 'Forechecking Is About Layers', body: '"A good forecheck isn\'t three guys chasing the puck. It\'s three layers of pressure — F1 dictates, F2 supports, F3 protects. Everyone has a job."' },
      { title: 'F1\'s Job: Dictate, Don\'t Chase', body: '"F1 doesn\'t just charge at the puck. You take an angle that limits where the D can go — force them one way, take away their best option."' },
      { title: 'Read Before You Commit', body: '"Don\'t just fly in. Read if you have support before you commit to pressure. If F2 isn\'t there, contain. If F2 is in position, attack."' }
    ],
    situation: 'F1 is pressuring the D who has the puck behind the net. The D\'s head is up and he\'s looking to hit their forward on the weak side wall. You see the pass coming. What do you do?',
    question: 'You\'ve read the breakout pass. How do you respond?',
    answers: [
      { text: 'Cheat toward the passing lane to intercept or be first on the receiver', correct: true, feedback: 'When you read the pass, jump the lane. Either you intercept it or you\'re first on the receiver. That\'s how you turn their breakout into a turnover. Trust your read — if you see it, attack it.' },
      { text: 'Go help F1 pressure the D before he can pass', correct: false, feedback: 'You saw the pass coming — that\'s the read. Now act on it. Cheat toward that lane — if you intercept, you\'re in alone. If you don\'t, you\'re still first to the receiver. Great forecheckers anticipate.' },
      { text: 'Stay where you are — the pass might not happen', correct: false, feedback: 'Trust your read. You see the D\'s head and eyes — he\'s making that pass. If you hesitate, you miss the interception window. Jump the lane.' },
      { text: 'Drop back to cover the middle', correct: false, feedback: 'Dropping back is safe but you\'re giving up a turnover opportunity. You read the play — now make a play. Cheat toward the lane and turn their breakout into your possession.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'opponent', x: 193, y: 42, label: 'D', note: 'Behind net — looking weak side' },
        { type: 'teammate', x: 188, y: 48, label: 'F', note: 'F1 — pressuring' },
        { type: 'you', x: 165, y: 32, note: 'You (F2) — reading pass', targetX: 155, targetY: 22 },
        { type: 'opponent', x: 150, y: 18, label: 'F', note: 'Breakout target on wall' },
        { type: 'teammate', x: 140, y: 42, label: 'F', note: 'F3 — high' }
      ],
      puck: { x: 193, y: 42 },
      arrows: [
        { from: { x: 193, y: 42 }, to: { x: 150, y: 18 }, style: 'dashed', label: 'Breakout pass' },
        { from: { x: 165, y: 32 }, to: { x: 155, y: 22 }, style: 'solid', label: 'Jump the lane' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 1, oppScore: 1, timeLeft: '7:55' },
    audioFolder: 'module5-read-breakout',
    nextScenarioId: 'module5-scenario6'
  },
  {
    id: 'module5-scenario6',
    moduleId: 5,
    scenarioNum: 6,
    totalInModule: 8,
    title: 'Loose Puck Battle',
    coachCue: "Puck battles are won with body position, not just sticks. Get inside, seal him off with your body, then collect the puck. Body first, puck second.",
    introSlides: [
      { title: 'Forechecking Is About Layers', body: '"A good forecheck isn\'t three guys chasing the puck. It\'s three layers of pressure — F1 dictates, F2 supports, F3 protects. Everyone has a job."' },
      { title: 'F1\'s Job: Dictate, Don\'t Chase', body: '"F1 doesn\'t just charge at the puck. You take an angle that limits where the D can go — force them one way, take away their best option."' },
      { title: 'Read Before You Commit', body: '"Don\'t just fly in. Read if you have support before you commit to pressure. If F2 isn\'t there, contain. If F2 is in position, attack."' }
    ],
    situation: 'A pass got broken up and there\'s a loose puck along the boards. Both you and the opposing D are racing for it — it\'s a true 50/50. F2 is behind you as support. How do you approach this battle?',
    question: 'What\'s the best way to win this 50/50 puck battle?',
    answers: [
      { text: 'Get inside position, body first, seal him off, then secure the puck', correct: true, feedback: 'Puck battles are won with body position, not just sticks. Get inside, seal him off with your body, then collect the puck. Skating in to scoop it usually means you get hit and lose it. Body first, puck second.' },
      { text: 'Get there first with speed and try to scoop the puck away', correct: false, feedback: '50/50 battles are about positioning. Get your body between him and the puck first. Seal him off, then work the puck. If you try to scoop it without establishing position, he\'ll just take your body and the puck.' },
      { text: 'Poke check it away before he gets there', correct: false, feedback: 'A poke check on a loose puck is risky — if you miss, you\'ve got no body position. Get inside, seal him off, then control it.' },
      { text: 'Let F2 take the battle and support from behind', correct: false, feedback: 'You\'re closer — it\'s your puck to win. F2 supports from behind, but the initial battle is yours. Get your body in there.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'you', x: 170, y: 65, note: 'You — racing for puck', targetX: 182, targetY: 68 },
        { type: 'opponent', x: 185, y: 58, label: 'D', note: 'Also racing', targetX: 182, targetY: 68 },
        { type: 'teammate', x: 160, y: 55, label: 'F', note: 'F2 — support behind' },
        { type: 'teammate', x: 140, y: 42, label: 'F', note: 'F3 — high' }
      ],
      puck: { x: 182, y: 68 },
      arrows: [
        { from: { x: 170, y: 65 }, to: { x: 182, y: 68 }, style: 'solid', label: 'Body first' },
        { from: { x: 185, y: 58 }, to: { x: 182, y: 68 }, style: 'solid' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 0, oppScore: 0, timeLeft: '15:40' },
    audioFolder: 'module5-loose-puck',
    nextScenarioId: 'module5-scenario7'
  },
  {
    id: 'module5-scenario7',
    moduleId: 5,
    scenarioNum: 7,
    totalInModule: 8,
    title: 'Turnover Transition',
    coachCue: "When the forecheck creates a turnover, ATTACK. The D are scrambling, the goalie\'s not set — this is exactly when you shoot. Quick shot, good things happen in chaos.",
    introSlides: [
      { title: 'Forechecking Is About Layers', body: '"A good forecheck isn\'t three guys chasing the puck. It\'s three layers of pressure — F1 dictates, F2 supports, F3 protects. Everyone has a job."' },
      { title: 'F1\'s Job: Dictate, Don\'t Chase', body: '"F1 doesn\'t just charge at the puck. You take an angle that limits where the D can go — force them one way, take away their best option."' },
      { title: 'Read Before You Commit', body: '"Don\'t just fly in. Read if you have support before you commit to pressure. If F2 isn\'t there, contain. If F2 is in position, attack."' }
    ],
    situation: 'Your forecheck just won the puck! F2 stripped the D and fed it to you in the slot area. The opposing D are scrambling and their goalie just got a new angle on you. What do you do with the puck?',
    question: 'The forecheck created a turnover. What\'s the play?',
    answers: [
      { text: 'Shoot quick while the goalie and D are out of position', correct: true, feedback: 'When the forecheck creates a turnover, ATTACK. The D are scrambling, the goalie\'s not set — this is exactly when you shoot. Waiting lets them recover. Quick shot, get it to the net, good things happen in chaos.' },
      { text: 'Look for F3 trailing — make the extra pass', correct: false, feedback: 'Don\'t let them reset. Turnovers are dangerous because of the chaos — don\'t give them time to recover. Quick shot when the goalie and D are scrambling. Over-passing lets them get back in position.' },
      { text: 'Carry wide to improve your angle', correct: false, feedback: 'Carrying wide gives the D time to recover and the goalie time to set. You have a lane NOW. Attack the moment.' },
      { text: 'Pull up and reset the play — don\'t force it', correct: false, feedback: 'Resetting is the opposite of what you want. The chaos IS the advantage. Quick shot, good things happen. Don\'t give them time to sort themselves out.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'you', x: 165, y: 42, note: 'You — puck in slot!' },
        { type: 'teammate', x: 180, y: 55, label: 'F', note: 'F2 — made the strip' },
        { type: 'opponent', x: 175, y: 35, label: 'D', note: 'Scrambling' },
        { type: 'opponent', x: 182, y: 50, label: 'D', note: 'Out of position' },
        { type: 'teammate', x: 145, y: 42, label: 'F', note: 'F3 trailing' }
      ],
      puck: { x: 165, y: 42 },
      arrows: [
        { from: { x: 165, y: 42 }, to: { x: 190, y: 42 }, style: 'solid', label: 'Shoot quick!' }
      ],
      annotations: []
    },
    gameContext: { period: 3, teamScore: 1, oppScore: 2, timeLeft: '8:25' },
    audioFolder: 'module5-turnover-transition',
    nextScenarioId: 'module5-scenario8'
  },
  {
    id: 'module5-scenario8',
    moduleId: 5,
    scenarioNum: 8,
    totalInModule: 8,
    title: 'F2 is Gassed',
    coachCue: "When your F2 is late and tired, don\'t go all-in. Angle and contain — make them earn their breakout instead of giving them a free odd-man rush.",
    introSlides: [
      { title: 'Forechecking Is About Layers', body: '"A good forecheck isn\'t three guys chasing the puck. It\'s three layers of pressure — F1 dictates, F2 supports, F3 protects. Everyone has a job."' },
      { title: 'F1\'s Job: Dictate, Don\'t Chase', body: '"F1 doesn\'t just charge at the puck. You take an angle that limits where the D can go — force them one way, take away their best option."' },
      { title: 'Read Before You Commit', body: '"Don\'t just fly in. Read if you have support before you commit to pressure. If F2 isn\'t there, contain. If F2 is in position, attack."' }
    ],
    situation: 'Your team just dumped the puck in and you\'re the first forward (F1) arriving on the forecheck. You glance back and see your F2 is clearly gassed — they\'re coasting and way behind the play. Your F3 is covering high. Their D has the puck behind the net and is looking to make a play. Your F2 is gassed and late. How do you approach this forecheck?',
    question: 'F2 is late. How do you forecheck?',
    answers: [
      { text: 'Angle and contain — take away one option and force a predictable play', correct: true, feedback: 'This is the smart play when you\'re short support. Take a good angle, eliminate the strong-side option, and funnel the puck somewhere predictable. You\'re not trying to win the puck — you\'re trying to slow them down until F2 recovers or F3 can help. Make them earn their breakout instead of giving them a free odd-man rush.' },
      { text: 'Full send — pressure hard and try to force a turnover before they realize you\'re alone', correct: false, feedback: 'I love the compete, but you\'re gambling. If you go all-in and the D makes one good pass, you\'re completely out of the play and your tired F2 can\'t bail you out. You\'ve just turned a manageable situation into a 2-on-1 the other way. Controlled pressure is the play here.' },
      { text: 'Peel off and wait for F2 to catch up before engaging', correct: false, feedback: 'I get the logic, but if you give their D free time and space, they\'ll pick you apart. A good breakout pass while you\'re waiting turns into an easy zone exit. You still need to apply pressure — just smart pressure. Angle and contain.' },
      { text: 'Cheat toward the D-to-D pass to try for an interception', correct: false, feedback: 'High risk, low reward right now. If you guess wrong, you\'re completely out of position and their D has all the time in the world. Interceptions are great when you have support to cover if you miss. Right now, you don\'t. Play the percentages — angle, contain, and wait for help.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'opponent', x: 193, y: 42, label: 'D', note: 'Behind net with puck' },
        { type: 'you', x: 170, y: 48, note: 'You (F1) — F2 is gassed' },
        { type: 'teammate', x: 130, y: 42, label: 'F', note: 'F2 — gassed, way behind', faded: true },
        { type: 'teammate', x: 140, y: 25, label: 'F', note: 'F3 — covering high' },
        { type: 'opponent', x: 180, y: 22, label: 'D', note: 'Far-side D' }
      ],
      puck: { x: 193, y: 42 },
      arrows: [
        { from: { x: 170, y: 48 }, to: { x: 182, y: 45 }, style: 'solid', label: 'Angle & contain' }
      ],
      annotations: []
    },
    gameContext: { period: 3, teamScore: 2, oppScore: 2, timeLeft: '3:30' },
    audioFolder: 'module5-f2-gassed',
    nextScenarioId: null
  }
];
