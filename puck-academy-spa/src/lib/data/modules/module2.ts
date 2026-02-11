import type { Scenario } from '../scenarios';

// Module 2: Faceoffs — 7 scenarios
// Faceoff dots: D-zone (35,25)/(35,60), O-zone (165,25)/(165,60), NZ (80,25)/(80,60)/(120,25)/(120,60), Center (100,42.5)
export const module2Scenarios: Scenario[] = [
  {
    id: 'module2-scenario1',
    moduleId: 2,
    scenarioNum: 1,
    totalInModule: 7,
    title: 'D-Zone Faceoff Positioning',
    situation: 'Defensive zone faceoff at the left dot. You\'re the left winger. Your center is about to take the draw. The opposing right winger is aggressive and likes to crash the net hard after every draw.',
    question: 'Where should you position yourself on this defensive zone faceoff?',
    answers: [
      { text: 'Stay tight on the opposing winger to prevent him from crashing the net', correct: true, feedback: 'In a D-zone faceoff, your primary job as a winger is coverage. Shadow the opposing forward on your side. If the draw is lost, he doesn\'t get a free run at your net. Coverage first, breakout second.' },
      { text: 'Move to the hash marks to be ready for a quick breakout', correct: false, feedback: 'If you abandon your man early, you\'re giving the opposing winger a free lane to the net. Coverage comes before offensive opportunities in the D-zone.' },
      { text: 'Back up to the goal line to protect the crease', correct: false, feedback: 'Too deep. Your D-men handle crease protection. You\'re responsible for checking the opposing forward before he gets to the danger areas.' },
      { text: 'Position yourself near the blue line to intercept a clearing pass', correct: false, feedback: 'Way too far from your assignment. If they win the draw back, you\'re out of the play. Stay close to your man.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 42, y: 15, note: 'You (LW)' },
        { type: 'teammate', x: 35, y: 25, label: 'C', note: 'Taking the draw' },
        { type: 'teammate', x: 42, y: 35, label: 'RW', note: 'Right winger' },
        { type: 'teammate', x: 22, y: 15, label: 'D', note: 'Left D' },
        { type: 'teammate', x: 22, y: 35, label: 'D', note: 'Right D' },
        { type: 'opponent', x: 48, y: 15, label: 'RW', note: 'Aggressive — crashes net' },
        { type: 'opponent', x: 35, y: 25, label: 'C', note: 'Opposing center' },
        { type: 'opponent', x: 48, y: 35, label: 'LW', note: 'Left forward' }
      ],
      puck: { x: 35, y: 25 },
      arrows: [
        { from: { x: 48, y: 15 }, to: { x: 18, y: 38 }, style: 'dashed', label: 'Net crash threat' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 1, oppScore: 1, timeLeft: '15:30' },
    audioFolder: 'module2-faceoff-dzone',
    nextScenarioId: 'module2-scenario2'
  },
  {
    id: 'module2-scenario2',
    moduleId: 2,
    scenarioNum: 2,
    totalInModule: 7,
    title: 'O-Zone Faceoff — One-Timer Setup',
    situation: 'Offensive zone faceoff at the right dot. Your left D has a bomb from the point and is set up for a one-timer. If your center wins the draw back cleanly, the scoring chance is there immediately.',
    question: 'Where should you position yourself to maximize scoring chances?',
    answers: [
      { text: 'Stay at the faceoff dot ready to receive a quick pass and relay to the point', correct: true, feedback: 'Perfect. You\'re right where the puck is going. Receive the draw, quick relay to the point for the one-timer. You\'re also close to the net for a rebound.' },
      { text: 'Move immediately to the net front to screen the goalie', correct: false, feedback: 'Good instinct, but you\'re too far from the puck. If your center wins it, you need to be in the relay chain. Get to the net AFTER the shot.' },
      { text: 'Skate toward the goal line to tie up the defenseman', correct: false, feedback: 'You\'re abandoning the scoring area. The goal line is too far from where chances develop on an O-zone draw.' },
      { text: 'Back off to avoid being offside if the puck goes back', correct: false, feedback: 'You\'re already legally deep in the zone. Backing off wastes your positioning advantage. Stay aggressive.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'you', x: 158, y: 60, note: 'You (RW) — at dot' },
        { type: 'teammate', x: 165, y: 60, label: 'C', note: 'Taking the draw' },
        { type: 'teammate', x: 158, y: 42, label: 'LW', note: 'Left winger' },
        { type: 'teammate', x: 140, y: 20, label: 'D', note: 'One-timer ready!' },
        { type: 'teammate', x: 140, y: 65, label: 'D', note: 'Right point' },
        { type: 'opponent', x: 165, y: 60, label: 'C', note: 'Opposing center' },
        { type: 'opponent', x: 172, y: 42, label: 'LW', note: 'Cheating boards' }
      ],
      puck: { x: 165, y: 60 },
      arrows: [
        { from: { x: 165, y: 60 }, to: { x: 158, y: 60 }, style: 'dashed', label: 'Draw back' },
        { from: { x: 158, y: 60 }, to: { x: 140, y: 20 }, style: 'dashed', label: 'Relay to point' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 0, oppScore: 0, timeLeft: '8:45' },
    audioFolder: 'module2-faceoff-ozone',
    nextScenarioId: 'module2-scenario3'
  },
  {
    id: 'module2-scenario3',
    moduleId: 2,
    scenarioNum: 3,
    totalInModule: 7,
    title: 'Neutral Zone Faceoff Read',
    situation: 'Neutral zone faceoff. You\'re the center about to take the draw. You notice the opposing winger on your left is positioned very high — almost at the hash marks instead of staying low near the dot.',
    question: 'What does this opponent positioning tell you?',
    answers: [
      { text: 'They\'re setting up for a quick transition break if they win the draw', correct: true, feedback: 'Excellent read. A high winger in the neutral zone means they want speed in space for a counterattack. Stay aware of passing lanes and be ready to backcheck hard if the draw goes against you.' },
      { text: 'They\'re setting up a dump-and-chase', correct: false, feedback: 'Dump-and-chase doesn\'t need that high positioning. A high winger indicates they want vertical speed, not horizontal pursuit.' },
      { text: 'They\'re trying to shade the draw to one side', correct: false, feedback: 'Draw technique is about the center\'s hand placement, not winger positioning. This is about what happens AFTER the draw.' },
      { text: 'They want to crowd you and win the puck battle', correct: false, feedback: 'If that were the intent, the winger would be low near the dot. High positioning abandons the immediate battle — they\'re thinking transition.' }
    ],
    diagram: {
      zone: 'neutral',
      players: [
        { type: 'you', x: 120, y: 25, note: 'You (C) — at dot' },
        { type: 'teammate', x: 112, y: 15, label: 'LW', note: 'Left winger' },
        { type: 'teammate', x: 112, y: 35, label: 'RW', note: 'Right winger' },
        { type: 'teammate', x: 75, y: 20, label: 'D', note: 'Left D' },
        { type: 'teammate', x: 75, y: 50, label: 'D', note: 'Right D' },
        { type: 'opponent', x: 120, y: 25, label: 'C', note: 'Opposing center' },
        { type: 'opponent', x: 135, y: 12, label: 'LW', note: 'HIGH — transition threat' },
        { type: 'opponent', x: 128, y: 38, label: 'RW', note: 'Right forward' }
      ],
      puck: { x: 120, y: 25 },
      arrows: [
        { from: { x: 135, y: 12 }, to: { x: 80, y: 12 }, style: 'dashed', label: 'Transition threat' }
      ],
      annotations: []
    },
    gameContext: { period: 1, teamScore: 0, oppScore: 0, timeLeft: '12:15' },
    audioFolder: 'module2-faceoff-neutral',
    nextScenarioId: 'module2-scenario4'
  },
  {
    id: 'module2-scenario4',
    moduleId: 2,
    scenarioNum: 4,
    totalInModule: 7,
    title: 'Faceoff Loss Recovery',
    situation: 'Your center just lost the D-zone faceoff cleanly. The puck squirted toward the boards. The opposing winger on your side is advancing on it. You\'re the right winger with a chance to affect the outcome before they establish possession.',
    question: 'What\'s your immediate priority?',
    answers: [
      { text: 'Pressure the opposing winger hard — disrupt before they get set up', correct: true, feedback: 'After a faceoff loss, your job is damage control. Immediate pressure disrupts their transition and buys time for your team to organize. Speed and physicality matter here.' },
      { text: 'Skate back to the net to set up for a likely shot', correct: false, feedback: 'You\'re giving up the chance to influence the play when it matters most. The puck is still loose — contest it.' },
      { text: 'Fall back to the blue line to prevent an odd-man rush', correct: false, feedback: 'A lost draw doesn\'t automatically lead to a rush if you play the puck aggressively. Contest the immediate possession.' },
      { text: 'Switch to pick up the opposing center who won the draw', correct: false, feedback: 'You\'re chasing ghosts. Focus on the winger with the loose puck right in front of you. Handle your own responsibility first.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 42, y: 35, note: 'You (RW)' },
        { type: 'teammate', x: 35, y: 25, label: 'C', note: 'Lost the draw' },
        { type: 'teammate', x: 42, y: 15, label: 'LW', note: 'Left winger' },
        { type: 'teammate', x: 22, y: 15, label: 'D', note: 'Left D' },
        { type: 'teammate', x: 22, y: 35, label: 'D', note: 'Right D' },
        { type: 'opponent', x: 40, y: 42, label: 'LW', note: 'Advancing on puck', targetX: 32, targetY: 38 },
        { type: 'opponent', x: 30, y: 25, label: 'C', note: 'Won the draw' }
      ],
      puck: { x: 32, y: 38 },
      arrows: [
        { from: { x: 40, y: 42 }, to: { x: 32, y: 38 }, style: 'solid', label: 'Opponent advancing' },
        { from: { x: 42, y: 35 }, to: { x: 34, y: 38 }, style: 'dashed', label: 'Your pressure' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 2, oppScore: 1, timeLeft: '5:20' },
    audioFolder: 'module2-faceoff-loss',
    nextScenarioId: 'module2-scenario5'
  },
  {
    id: 'module2-scenario5',
    moduleId: 2,
    scenarioNum: 5,
    totalInModule: 7,
    title: 'Faceoff Win Execution',
    situation: 'Offensive zone faceoff. Your center just won the draw cleanly back to the left D at the point. The defense is already pushing up. You\'re the left winger — time to execute.',
    question: 'What\'s your best next move?',
    answers: [
      { text: 'Cut hard to the net-front to receive a pass and create a scoring chance', correct: true, feedback: 'After winning a faceoff cleanly, transition immediately to offense. The defense is scrambling — you cutting to the net puts instant pressure and creates a high-danger chance.' },
      { text: 'Stay at the faceoff dot and call for the puck', correct: false, feedback: 'Your current position isn\'t dangerous enough. Attack the net, get into prime scoring real estate, then shoot. Movement before shooting.' },
      { text: 'Go to the boards to maintain possession and cycle', correct: false, feedback: 'Too conservative. After a clean draw win, you want vertical aggression, not sideways movement. This is your scoring window.' },
      { text: 'Hold your position for a pass from the point', correct: false, feedback: 'The faceoff dot area isn\'t ideal for shooting. Move into a more dangerous area first. Attack the net.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'you', x: 158, y: 25, note: 'You (LW)', targetX: 178, targetY: 42 },
        { type: 'teammate', x: 165, y: 25, label: 'C', note: 'Won the draw' },
        { type: 'teammate', x: 158, y: 42, label: 'RW', note: 'Right winger' },
        { type: 'teammate', x: 140, y: 18, label: 'D', note: 'Has puck at point' },
        { type: 'teammate', x: 140, y: 55, label: 'D', note: 'Right point' },
        { type: 'opponent', x: 172, y: 35, label: 'D', note: 'Scrambling' },
        { type: 'opponent', x: 172, y: 55, label: 'D', note: 'Scrambling' }
      ],
      puck: { x: 140, y: 18 },
      arrows: [
        { from: { x: 158, y: 25 }, to: { x: 178, y: 42 }, style: 'solid', label: 'Attack net' },
        { from: { x: 140, y: 18 }, to: { x: 178, y: 42 }, style: 'dashed', label: 'Pass to net' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 1, oppScore: 0, timeLeft: '10:05' },
    audioFolder: 'module2-faceoff-win',
    nextScenarioId: 'module2-scenario6'
  },
  {
    id: 'module2-scenario6',
    moduleId: 2,
    scenarioNum: 6,
    totalInModule: 7,
    title: 'Late-Game Faceoff — Protecting the Lead',
    situation: 'You\'re a defenseman. 30 seconds left, up 2-1, D-zone faceoff. The opposing team pulled their goalie earlier. This draw could decide the game. Your forwards are asking where they should set up.',
    question: 'What\'s the best positioning strategy for this critical defensive faceoff?',
    answers: [
      { text: 'Keep everyone low, focus on containment, be ready to clear hard', correct: true, feedback: 'Textbook late-game defense. Low positioning means you\'re between the puck and your net. If they win the draw, you\'re already in shape. Conservative hockey is exactly what you need with seconds left.' },
      { text: 'Push forwards high to disrupt the opponent\'s setup', correct: false, feedback: 'Too risky with 30 seconds left. Aggressive positioning leaves your D outnumbered if the draw goes the wrong way.' },
      { text: 'Have wingers cheat for a quick transition if you win the draw', correct: false, feedback: 'With 30 seconds left, the priority isn\'t scoring — it\'s possession and time. Win the draw, consume seconds, run the clock.' },
      { text: 'Stack everyone in the slot to block everything', correct: false, feedback: 'You\'re creating a traffic jam. You can\'t clear pucks or defend the perimeter. Proper spacing and structure beats bodies in a pile.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 22, y: 42, label: 'D', note: 'You — protecting net' },
        { type: 'teammate', x: 22, y: 20, label: 'D', note: 'Partner' },
        { type: 'teammate', x: 35, y: 25, label: 'C', note: 'Taking the draw' },
        { type: 'teammate', x: 38, y: 15, label: 'LW', note: 'Low positioning' },
        { type: 'teammate', x: 38, y: 55, label: 'RW', note: 'Low positioning' },
        { type: 'opponent', x: 35, y: 25, label: 'C', note: 'Opposing center' },
        { type: 'opponent', x: 48, y: 15, label: 'LW', note: 'Left forward' },
        { type: 'opponent', x: 48, y: 55, label: 'RW', note: 'Right forward' }
      ],
      puck: { x: 35, y: 25 },
      arrows: [],
      annotations: []
    },
    gameContext: { period: 3, teamScore: 2, oppScore: 1, timeLeft: '0:30' },
    audioFolder: 'module2-faceoff-lategame',
    nextScenarioId: 'module2-scenario7'
  },
  {
    id: 'module2-scenario7',
    moduleId: 2,
    scenarioNum: 7,
    totalInModule: 7,
    title: 'Power Play Faceoff — Umbrella Setup',
    situation: 'You\'re the center on a 5-on-4 power play. Offensive zone faceoff at the left dot. Your team runs an umbrella formation — D-men at the points, forwards attacking the net. The PK is trying to disrupt your setup.',
    question: 'How should your team execute this power play faceoff?',
    answers: [
      { text: 'Win the draw, get puck to the point, forwards attack the net for tips and rebounds', correct: true, feedback: 'Perfect PP strategy. The umbrella needs all three elements: center wins the draw, forwards create immediate danger at the net, and D-men have shooting lanes from the point.' },
      { text: 'Spread out to control the perimeter and keep forwards back for support', correct: false, feedback: 'That\'s backwards. On a PP you want aggressive, high-risk positioning because you have the extra man. Attack mode, not contain mode.' },
      { text: 'Focus on cycling the puck to maintain possession', correct: false, feedback: 'Cycling is for sustained pressure later. Right after a faceoff, the umbrella is designed for quick shots. First shift is aggressive.' },
      { text: 'Have your center go for possession rather than winning the draw outright', correct: false, feedback: 'On a PP, winning the draw is huge. A clean win sets up the umbrella perfectly. Be aggressive — the extra skater means you don\'t have to settle.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'you', x: 165, y: 25, note: 'You (C) — at dot' },
        { type: 'teammate', x: 178, y: 35, label: 'LW', note: 'Net-front threat' },
        { type: 'teammate', x: 175, y: 55, label: 'RW', note: 'Net-front threat' },
        { type: 'teammate', x: 142, y: 18, label: 'D', note: 'Left point — one-timer' },
        { type: 'teammate', x: 142, y: 55, label: 'D', note: 'Right point' },
        { type: 'opponent', x: 165, y: 25, label: 'C', note: 'PK center' },
        { type: 'opponent', x: 155, y: 35, label: 'F', note: 'PK forward' },
        { type: 'opponent', x: 155, y: 50, label: 'F', note: 'PK forward' },
        { type: 'opponent', x: 175, y: 42, label: 'D', note: 'PK defenseman' }
      ],
      puck: { x: 165, y: 25 },
      arrows: [
        { from: { x: 165, y: 25 }, to: { x: 142, y: 18 }, style: 'dashed', label: 'Draw to point' },
        { from: { x: 142, y: 18 }, to: { x: 178, y: 42 }, style: 'dashed', label: 'Shot on net' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 1, oppScore: 1, timeLeft: '14:30' },
    audioFolder: 'module2-faceoff-pp',
    nextScenarioId: null
  }
];
