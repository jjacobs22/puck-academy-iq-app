import type { Scenario } from '../scenarios';

// Module 6: D-Zone for Defensemen — 7 scenarios
// Defensive end: our goal at x=10
export const module6Scenarios: Scenario[] = [
  {
    id: 'module6-scenario1',
    moduleId: 6,
    scenarioNum: 1,
    totalInModule: 7,
    title: 'Gap Control on the Rush',
    situation: 'An opposing forward is carrying the puck up ice with speed. You\'re the last D back. He\'s on his strong side with the puck on his forehand. You need to decide how much space to surrender.',
    question: 'What determines the right gap on a 1-on-1 rush?',
    answers: [
      { text: 'Tighter gap when he\'s on his strong side; more space if he\'s on his weak side and has to work harder', correct: true, feedback: 'A forward on his strong side is in his wheelhouse — tighter gap. On his weak side, he has to work harder for that shot, so you can play deeper. You\'re reading his advantage, not just his speed.' },
      { text: 'Always give space until he hits the slot', correct: false, feedback: 'If you give a skilled forward that much free ice, he\'ll walk in and pick his spot. Adjust your gap to his handedness and angle.' },
      { text: 'Back up to the goal line', correct: false, feedback: 'Way too much ice surrendered. He\'ll have time and space to pick you apart. Play the gap based on the matchup.' },
      { text: 'Skate at him immediately to force a decision', correct: false, feedback: 'If he makes one move, you\'re beaten clean. Controlled gap based on reading his hands and angle is smarter.' }
    ],
    diagram: {
      zone: 'neutral',
      players: [
        { type: 'you', x: 70, y: 42, note: 'You (D) — last man back' },
        { type: 'opponent', x: 110, y: 30, label: 'F', note: 'Driving strong side', targetX: 50, targetY: 35 },
        { type: 'teammate', x: 85, y: 60, label: 'D', note: 'Partner — far side' },
        { type: 'opponent', x: 120, y: 55, label: 'W', note: 'Trailing support' }
      ],
      puck: { x: 112, y: 30 },
      arrows: [
        { from: { x: 110, y: 30 }, to: { x: 50, y: 35 }, style: 'solid', label: 'Rush' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 1, oppScore: 1, timeLeft: '9:50' },
    audioFolder: 'module6-gap-control',
    nextScenarioId: 'module6-scenario2'
  },
  {
    id: 'module6-scenario2',
    moduleId: 6,
    scenarioNum: 2,
    totalInModule: 7,
    title: 'Pinching vs Staying Home',
    situation: 'Your team has the puck cycling in the offensive zone. You\'re at the point watching the play develop. There\'s a loose puck along the boards — you could jump down and keep possession. But the opposing center is lurking, looking for a transition.',
    question: 'What\'s the key indicator that you should NOT pinch?',
    answers: [
      { text: 'You can\'t see where their transition threats are, OR your partner isn\'t positioned to cover', correct: true, feedback: 'A pinch only works if you KNOW you\'re covered. If you can\'t account for their fast guys or your partner is out of position, stay home. A turnover against a pinching D is an odd-man rush the other way.' },
      { text: 'If the opposing center is anywhere near your zone', correct: false, feedback: 'Their center being in the area isn\'t automatically a no-pinch. It depends on where he is relative to your partner. Read the full picture.' },
      { text: 'If the puck is more than 40 feet from their goal', correct: false, feedback: 'Distance from the goal doesn\'t determine pinch safety. It\'s about coverage and transition risk.' },
      { text: 'If your forwards are all below the goal line', correct: false, feedback: 'Forward positioning below the goal line actually makes it SAFER to pinch — they can recover if you turn it over. The question is about your partner and their threats.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'you', x: 140, y: 30, note: 'You (D) — considering pinch' },
        { type: 'teammate', x: 148, y: 55, label: 'D', note: 'Partner' },
        { type: 'teammate', x: 180, y: 65, label: 'F', note: 'Cycling' },
        { type: 'opponent', x: 160, y: 42, label: 'C', note: 'Transition threat' },
        { type: 'opponent', x: 155, y: 22, label: 'W', note: 'Position unclear' }
      ],
      puck: { x: 185, y: 55 },
      arrows: [
        { from: { x: 140, y: 30 }, to: { x: 175, y: 50 }, style: 'dashed', label: 'Pinch?' },
        { from: { x: 160, y: 42 }, to: { x: 100, y: 42 }, style: 'dashed', label: 'Counter if turnover' }
      ],
      annotations: []
    },
    gameContext: { period: 1, teamScore: 1, oppScore: 0, timeLeft: '7:30' },
    audioFolder: 'module6-pinch-decision',
    nextScenarioId: 'module6-scenario3'
  },
  {
    id: 'module6-scenario3',
    moduleId: 6,
    scenarioNum: 3,
    totalInModule: 7,
    title: 'Clearing the Crease',
    situation: 'Scramble in front of your net. Two opposing forwards are in tight — one has planted himself in the crease. Your goalie is fighting for sight lines. The puck is loose in the high slot.',
    question: 'What\'s your responsibility when an opponent is camped in your crease?',
    answers: [
      { text: 'Physically move him out — your crease, your responsibility', correct: true, feedback: 'You own that space. A player set up in your paint is scoring on any puck that gets through. Be physical, be direct, move him. Your goalie needs a clean office.' },
      { text: 'Let the goalie handle it — it\'s his territory', correct: false, feedback: 'Your goalie shouldn\'t have to fight a forward AND make saves. That\'s YOUR job. Clear the body, let the goalie see the puck.' },
      { text: 'Only clear him if he has the puck', correct: false, feedback: 'A player without the puck in your crease is just as dangerous — he\'s a tip, screen, and rebound threat. Get him out regardless.' },
      { text: 'Focus on the loose puck instead', correct: false, feedback: 'If you leave a guy camped in the crease while chasing the puck, any shot is a high-danger chance. Clear the body first.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 18, y: 48, note: 'You (D) — clear the crease' },
        { type: 'opponent', x: 15, y: 40, label: 'F', note: 'Camped in crease' },
        { type: 'opponent', x: 28, y: 52, label: 'F', note: 'In close' },
        { type: 'teammate', x: 30, y: 35, label: 'D', note: 'Partner' }
      ],
      puck: { x: 35, y: 42 },
      arrows: [
        { from: { x: 35, y: 42 }, to: { x: 12, y: 42 }, style: 'dashed', label: 'Shot threat' }
      ],
      annotations: []
    },
    gameContext: { period: 3, teamScore: 2, oppScore: 2, timeLeft: '4:15' },
    audioFolder: 'module6-clear-crease',
    nextScenarioId: 'module6-scenario4'
  },
  {
    id: 'module6-scenario4',
    moduleId: 6,
    scenarioNum: 4,
    totalInModule: 7,
    title: 'D-to-D Under Pressure',
    situation: 'Your team is under pressure in the D-zone. You have the puck. Your partner is on the other side, open. But there\'s a forward between you who could intercept a cross-ice pass. A winger is also available up the wall.',
    question: 'What\'s the higher-percentage outlet?',
    answers: [
      { text: 'Read the positioning: if the lane to your partner is clean, D-to-D; if traffic is thick, go up the wall', correct: true, feedback: 'It\'s situational. D-to-D in open ice is great. D-to-D through a forward is a turnover in the slot. Going up the wall cleanly works. Scanning in real time — that\'s a veteran read.' },
      { text: 'Always go D-to-D across the ice for security', correct: false, feedback: 'D-to-D through traffic is one of the most dangerous turnovers in hockey — it happens right in the slot. Read the lane first.' },
      { text: 'Always push it up the wall', correct: false, feedback: 'The wall isn\'t always open either. Sometimes D-to-D is the better play. Read both options and pick the safest one.' },
      { text: 'Pass to the goalie and reset', correct: false, feedback: 'That\'s a last resort, not a first option. You have outlets available — make a read and execute.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 30, y: 55, note: 'You (D) — under pressure' },
        { type: 'teammate', x: 30, y: 25, label: 'D', note: 'Partner — open' },
        { type: 'opponent', x: 32, y: 42, label: 'F', note: 'In the lane' },
        { type: 'teammate', x: 55, y: 68, label: 'W', note: 'Wall outlet' },
        { type: 'opponent', x: 38, y: 55, label: 'F', note: 'Pressuring you', targetX: 30, targetY: 55 }
      ],
      puck: { x: 30, y: 55 },
      arrows: [
        { from: { x: 30, y: 55 }, to: { x: 30, y: 25 }, style: 'dashed', label: 'D-to-D?' },
        { from: { x: 30, y: 55 }, to: { x: 55, y: 68 }, style: 'dashed', label: 'Up wall?' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 0, oppScore: 1, timeLeft: '12:40' },
    audioFolder: 'module6-d-to-d',
    nextScenarioId: 'module6-scenario5'
  },
  {
    id: 'module6-scenario5',
    moduleId: 6,
    scenarioNum: 5,
    totalInModule: 7,
    title: 'Blocking Passing Lanes',
    situation: 'The opposing team is working the puck on the perimeter in your zone. They\'re looking for a pass through the middle to the slot. You can see the lane opening. Your partner is already engaged. You need to collapse without leaving the weak side exposed.',
    question: 'How do you block a passing lane without getting outmaneuvered?',
    answers: [
      { text: 'Play the passer\'s eyes and body — collapse only when you see the pass being committed', correct: true, feedback: 'You\'re reading the passer\'s INTENT. Watch his eyes, his shoulders — when you see the commitment, THEN you collapse. Move too early and he has an outlet. It\'s a timing game.' },
      { text: 'Skate directly into the lane and plant yourself', correct: false, feedback: 'If you commit to the lane early, the passer sees you and finds another option. Stay dynamic, read intent, then react.' },
      { text: 'Stay in your position and let the goalie read the pass', correct: false, feedback: 'You can prevent the pass from happening at all. Don\'t make your goalie do extra work — take away the option.' },
      { text: 'Chase the intended receiver instead', correct: false, feedback: 'Chasing the receiver means you\'re reacting to THEIR play. Blocking the lane means you\'re dictating what they can\'t do.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 35, y: 42, note: 'You (D) — reading passer' },
        { type: 'opponent', x: 45, y: 60, label: 'F', note: 'Puck carrier — looking middle' },
        { type: 'opponent', x: 25, y: 38, label: 'F', note: 'Slot target' },
        { type: 'teammate', x: 30, y: 58, label: 'D', note: 'Partner — engaged' },
        { type: 'opponent', x: 50, y: 22, label: 'W', note: 'Weak side' }
      ],
      puck: { x: 45, y: 60 },
      arrows: [
        { from: { x: 45, y: 60 }, to: { x: 25, y: 38 }, style: 'dashed', label: 'Pass to slot threat' }
      ],
      annotations: []
    },
    gameContext: { period: 3, teamScore: 3, oppScore: 2, timeLeft: '6:00' },
    audioFolder: 'module6-blocking-lanes',
    nextScenarioId: 'module6-scenario6'
  },
  {
    id: 'module6-scenario6',
    moduleId: 6,
    scenarioNum: 6,
    totalInModule: 7,
    title: 'Stepping Up in the Neutral Zone',
    situation: 'The opposing team is transitioning through the neutral zone with possession. You\'re a D with the option to step up and pressure the puck carrier before he gains your zone, or hang back and let your forwards pressure him first.',
    question: 'When should you step up and attack in the neutral zone?',
    answers: [
      { text: 'Only when you have a high degree of certainty you\'ll separate him from the puck', correct: true, feedback: 'Stepping up is aggressive, and aggression fails without the read. If you step and miss, he has a free lane into your zone. Step when you see slow hands, a committed direction, or a bad pass. Controlled aggression.' },
      { text: 'Always step up to keep them out of your zone', correct: false, feedback: 'If you step up on every entry and miss once, you\'re giving up odd-man rushes. Be selective.' },
      { text: 'Never step up — let the forwards handle it', correct: false, feedback: 'Sometimes the D stepping up is the most disruptive play available. Don\'t be passive — be smart about when you attack.' },
      { text: 'Step up on skilled players to disrupt them early', correct: false, feedback: 'Skilled players are actually the HARDEST to step up on — they make you pay for mistakes. Step up based on your READ, not their reputation.' }
    ],
    diagram: {
      zone: 'neutral',
      players: [
        { type: 'you', x: 80, y: 42, note: 'You (D) — deciding' },
        { type: 'opponent', x: 108, y: 42, label: 'F', note: 'Puck carrier — entering NZ', targetX: 70, targetY: 42 },
        { type: 'teammate', x: 72, y: 55, label: 'D', note: 'Partner' },
        { type: 'teammate', x: 95, y: 30, label: 'F', note: 'Backcheck' },
        { type: 'opponent', x: 115, y: 25, label: 'W', note: 'Support' },
        { type: 'opponent', x: 115, y: 60, label: 'W', note: 'Support' }
      ],
      puck: { x: 108, y: 42 },
      arrows: [
        { from: { x: 108, y: 42 }, to: { x: 70, y: 42 }, style: 'solid', label: 'Entry attempt' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 2, oppScore: 1, timeLeft: '10:15' },
    audioFolder: 'module6-stepping-up',
    nextScenarioId: 'module6-scenario7'
  },
  {
    id: 'module6-scenario7',
    moduleId: 6,
    scenarioNum: 7,
    totalInModule: 7,
    title: 'Recovery After Being Beaten Wide',
    situation: 'A winger just beat you along the boards. He\'s got speed and possession heading toward your goal line. Your first instinct is panic — but you\'ve got inside positioning and he hasn\'t shot yet.',
    question: 'What\'s your recovery play after getting beaten to the outside?',
    answers: [
      { text: 'Sprint to get inside position between him and the net — cut off the interior lane', correct: true, feedback: 'When you\'re beat, recovery is about geometry, not chasing. Sprint to get between him and the scoring areas. He\'s got the perimeter but you own the inside. He\'ll have to make a difficult pass or take a low-percentage shot.' },
      { text: 'Chase him from behind for a poke check', correct: false, feedback: 'Chasing from behind rarely works against a fast winger. You\'re always a step late. Get inside and take away the dangerous areas instead.' },
      { text: 'Back up toward the goal line to take away a wraparound', correct: false, feedback: 'The wraparound isn\'t the immediate threat — the cut to the net is. Get inside first, then worry about where he goes.' },
      { text: 'Call for help from your partner', correct: false, feedback: 'Your partner should already be reading the play. Focus on what YOU can do — recover your inside positioning.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 45, y: 18, note: 'You (D) — beaten wide', targetX: 20, targetY: 30 },
        { type: 'opponent', x: 35, y: 12, label: 'W', note: 'Beat you with speed', targetX: 10, targetY: 20 },
        { type: 'teammate', x: 35, y: 55, label: 'D', note: 'Partner' },
        { type: 'teammate', x: 50, y: 42, label: 'F', note: 'Backchecking' }
      ],
      puck: { x: 35, y: 12 },
      arrows: [
        { from: { x: 35, y: 12 }, to: { x: 10, y: 20 }, style: 'solid', label: 'Winger driving' },
        { from: { x: 45, y: 18 }, to: { x: 20, y: 30 }, style: 'dashed', label: 'Recovery — get inside' }
      ],
      annotations: []
    },
    gameContext: { period: 3, teamScore: 2, oppScore: 3, timeLeft: '1:45' },
    audioFolder: 'module6-recovery',
    nextScenarioId: null
  }
];
