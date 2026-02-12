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
    coachCue: "Close gap in the neutral zone, then match speed backward. You want to take away his time and space without overcommitting. Skating up to close gap, then pivoting keeps you in control.",
    introSlides: [
      { title: 'Defense Starts With Position', body: '"As a D-man, you\'re the last line before the goalie. Your job isn\'t to make highlight hits — it\'s to take away time and space, make the right first play, and keep the puck out of the net."' },
      { title: 'Gap Is Everything', body: '"Too much gap? They walk around you. Too tight? They blow by you. The right gap depends on speed, support, and where you are on the ice."' },
      { title: 'First Play, Best Play', body: '"When you get the puck, you need to know your options before it arrives. Quick, smart decisions start the breakout — hesitation leads to turnovers."' }
    ],
    situation: '2-on-2 rush coming at you. The forward has the puck in the neutral zone with speed. Your partner is covering the trailer. You\'re currently at your own blue line. What do you do with your gap?',
    question: 'How do you manage your gap on this rush?',
    answers: [
      { text: 'Skate forward to close gap at the red line, then match his speed backward', correct: true, feedback: 'Close gap in the NZ, then match speed backward. You want to take away his time and space without overcommitting. Skating up to close gap, then pivoting and skating backward with him keeps you in control.' },
      { text: 'Stay at the blue line and wait for him to come to you', correct: false, feedback: 'Waiting at the blue line gives him too much ice. The right play is to skate forward and close that gap around the red line, then match his speed skating backward. You dictate the terms, not him.' },
      { text: 'Challenge him at the red line and go for the hit', correct: false, feedback: 'Going for a hit is gambling. If he makes one move you\'re out of the play and it\'s a breakaway. Close the gap, then match speed — stay in control.' },
      { text: 'Back up quickly to protect the slot', correct: false, feedback: 'Backing up gives him all the ice in the world. Close the gap first, then retreat with him. You need to take away his time and space, not surrender it.' }
    ],
    diagram: {
      zone: 'neutral',
      players: [
        { type: 'you', x: 55, y: 42, note: 'You (D) — at blue line', targetX: 80, targetY: 42 },
        { type: 'opponent', x: 110, y: 30, label: 'F', note: 'Driving with speed', targetX: 50, targetY: 35 },
        { type: 'teammate', x: 60, y: 55, label: 'D', note: 'Partner — covering trailer' },
        { type: 'opponent', x: 120, y: 55, label: 'W', note: 'Trailing support' }
      ],
      puck: { x: 112, y: 30 },
      arrows: [
        { from: { x: 55, y: 42 }, to: { x: 80, y: 42 }, style: 'solid', label: 'Close gap' },
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
    title: 'Puck Retrieval Under Pressure',
    coachCue: "Shoulder check, then quick up the wall. Your winger is the outlet — use him. Don\'t give the forechecker time to pin you. Check your shoulder so you know what\'s coming, then get it up quick and clean.",
    introSlides: [
      { title: 'Defense Starts With Position', body: '"As a D-man, you\'re the last line before the goalie. Your job isn\'t to make highlight hits — it\'s to take away time and space, make the right first play, and keep the puck out of the net."' },
      { title: 'Gap Is Everything', body: '"Too much gap? They walk around you. Too tight? They blow by you. The right gap depends on speed, support, and where you are on the ice."' },
      { title: 'First Play, Best Play', body: '"When you get the puck, you need to know your options before it arrives. Quick, smart decisions start the breakout — hesitation leads to turnovers."' }
    ],
    situation: 'They dumped it into your corner. You\'re going back to retrieve it but F1 is forechecking hard on your tail. Your winger is on the wall as an outlet, D partner at the far post. What\'s your play?',
    question: 'You get to the puck first with pressure coming. What do you do?',
    answers: [
      { text: 'Shoulder check, then quick up the boards to your winger', correct: true, feedback: 'Shoulder check, then quick up the wall. Your winger is the outlet — use him. Don\'t give the forechecker time to pin you. Check your shoulder so you know what\'s coming, then get it up quick and clean.' },
      { text: 'Stop and reverse it behind the net to your partner', correct: false, feedback: 'With pressure on your back, you need to get it out fast. Your winger is open on the wall. Going behind the net gives the forechecker time to close and set up their forecheck. Quick up to your winger.' },
      { text: 'Carry it behind the net to buy time', correct: false, feedback: 'Carrying it behind the net with F1 on your tail is risky. You could get pinned. Your winger is the clean outlet — shoulder check and get it up the wall.' },
      { text: 'Rim it hard around the boards', correct: false, feedback: 'Rimming it is a 50/50 play at best. Your winger is open on the wall — that\'s a clean, controlled breakout. Use your outlet.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 8, y: 65, note: 'You (D) — retrieving', targetX: 8, targetY: 65 },
        { type: 'opponent', x: 22, y: 60, label: 'F', note: 'F1 — forechecking hard', targetX: 10, targetY: 65 },
        { type: 'teammate', x: 30, y: 72, label: 'W', note: 'Winger — wall outlet' },
        { type: 'teammate', x: 15, y: 25, label: 'D', note: 'Partner — far post' }
      ],
      puck: { x: 8, y: 65 },
      arrows: [
        { from: { x: 8, y: 65 }, to: { x: 30, y: 72 }, style: 'solid', label: 'Quick up wall' },
        { from: { x: 22, y: 60 }, to: { x: 10, y: 65 }, style: 'solid', label: 'F1 pressure' }
      ],
      annotations: []
    },
    gameContext: { period: 1, teamScore: 0, oppScore: 0, timeLeft: '12:30' },
    audioFolder: 'module6-puck-retrieval',
    nextScenarioId: 'module6-scenario3'
  },
  {
    id: 'module6-scenario3',
    moduleId: 6,
    scenarioNum: 3,
    totalInModule: 7,
    title: 'D-to-D Decision',
    coachCue: "Just because your partner looks open doesn\'t mean the pass is there. F2 sitting in that lane means the D-to-D gets picked off. Read the whole ice — go up the wall instead.",
    introSlides: [
      { title: 'Defense Starts With Position', body: '"As a D-man, you\'re the last line before the goalie. Your job isn\'t to make highlight hits — it\'s to take away time and space, make the right first play, and keep the puck out of the net."' },
      { title: 'Gap Is Everything', body: '"Too much gap? They walk around you. Too tight? They blow by you. The right gap depends on speed, support, and where you are on the ice."' },
      { title: 'First Play, Best Play', body: '"When you get the puck, you need to know your options before it arrives. Quick, smart decisions start the breakout — hesitation leads to turnovers."' }
    ],
    situation: 'You have the puck behind your net. F1 is coming but not on you yet. Your D partner is open on the far post, but F2 is sitting in the high slot watching that passing lane. Do you go D-to-D?',
    question: 'Your partner looks open. What\'s the read?',
    answers: [
      { text: 'Don\'t force the D-to-D — F2 is in the lane, go up the wall to the winger instead', correct: true, feedback: 'F2 is sitting in that D-to-D lane — that pass gets picked off. Just because your partner looks open doesn\'t mean the pass is there. Go up the wall to the winger instead. Live to fight another day.' },
      { text: 'Move it D-to-D — he\'s open and it changes the point of attack', correct: false, feedback: 'Your partner might look open, but F2 is reading that pass. A picked-off D-to-D in your own zone is a Grade A chance against. Don\'t force it — go up the wall to the winger. Safe and effective.' },
      { text: 'Carry it yourself out the strong side', correct: false, feedback: 'Carrying it with F1 coming is risky. You have a clean outlet up the wall to your winger. Use it.' },
      { text: 'Wait behind the net for a better option to develop', correct: false, feedback: 'Waiting gives F1 time to close on you. You already have a good option — the winger on the wall. Make the play.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 12, y: 42, note: 'You (D) — behind net' },
        { type: 'teammate', x: 12, y: 22, label: 'D', note: 'Partner — far post' },
        { type: 'opponent', x: 25, y: 48, label: 'F', note: 'F1 — coming' },
        { type: 'opponent', x: 28, y: 35, label: 'F', note: 'F2 — sitting in lane' },
        { type: 'teammate', x: 30, y: 68, label: 'W', note: 'Winger on wall' }
      ],
      puck: { x: 12, y: 42 },
      arrows: [
        { from: { x: 12, y: 42 }, to: { x: 12, y: 22 }, style: 'dashed', label: 'D-to-D? NO — F2 in lane' },
        { from: { x: 12, y: 42 }, to: { x: 30, y: 68 }, style: 'solid', label: 'Up the wall' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 0, oppScore: 1, timeLeft: '8:15' },
    audioFolder: 'module6-d-to-d',
    nextScenarioId: 'module6-scenario4'
  },
  {
    id: 'module6-scenario4',
    moduleId: 6,
    scenarioNum: 4,
    totalInModule: 7,
    title: 'Net Front Battle',
    coachCue: "Inside position is everything. Get your body between him and the net, stick on his stick so he can\'t tip it. Your goalie needs to see the shot — your job is making sure their guy can\'t touch it.",
    introSlides: [
      { title: 'Defense Starts With Position', body: '"As a D-man, you\'re the last line before the goalie. Your job isn\'t to make highlight hits — it\'s to take away time and space, make the right first play, and keep the puck out of the net."' },
      { title: 'Gap Is Everything', body: '"Too much gap? They walk around you. Too tight? They blow by you. The right gap depends on speed, support, and where you are on the ice."' },
      { title: 'First Play, Best Play', body: '"When you get the puck, you need to know your options before it arrives. Quick, smart decisions start the breakout — hesitation leads to turnovers."' }
    ],
    situation: 'They\'re cycling in your zone. Their D has the puck at the point and is looking to shoot. Their forward is parked at your net front, trying to screen and get position for tips/rebounds. How do you handle him?',
    question: 'Shot is coming from the point. What\'s your priority?',
    answers: [
      { text: 'Get inside position and box him out — stick on his stick, body between him and the net', correct: true, feedback: 'Inside position is everything. Get your body between him and the net, stick on his stick so he can\'t tip it. Your goalie needs to see the shot — that\'s his job. Your job is making sure their guy can\'t touch it.' },
      { text: 'Block the shot — get in front of it', correct: false, feedback: 'Net front battles are won with position. Get inside — body between him and the net, stick on his stick. Don\'t try to block the shot yourself. Own that crease with your positioning.' },
      { text: 'Push him hard into the goalie to disrupt everyone', correct: false, feedback: 'Pushing him into the goalie is goaltender interference on YOU. Get inside position — body between him and net, stick on his stick. Control the net front cleanly.' },
      { text: 'Let the goalie see the shot and focus on clearing the rebound', correct: false, feedback: 'Your goalie seeing the shot means nothing if their guy is free to tip it. Get inside position, stick on his stick, and take away the deflection. That\'s the highest-danger play.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 15, y: 42, note: 'You (D) — own the crease' },
        { type: 'opponent', x: 18, y: 38, label: 'F', note: 'Camped at net front' },
        { type: 'opponent', x: 40, y: 42, label: 'D', note: 'Point — about to shoot' },
        { type: 'teammate', x: 30, y: 55, label: 'D', note: 'Partner' },
        { type: 'teammate', x: 35, y: 30, label: 'F', note: 'Covering high' }
      ],
      puck: { x: 40, y: 42 },
      arrows: [
        { from: { x: 40, y: 42 }, to: { x: 10, y: 42 }, style: 'dashed', label: 'Shot coming' }
      ],
      annotations: []
    },
    gameContext: { period: 3, teamScore: 2, oppScore: 2, timeLeft: '4:15' },
    audioFolder: 'module6-net-front-battle',
    nextScenarioId: 'module6-scenario5'
  },
  {
    id: 'module6-scenario5',
    moduleId: 6,
    scenarioNum: 5,
    totalInModule: 7,
    title: 'When to Pinch',
    coachCue: "This is when you pinch — you have a good angle, you\'re closer, and your center is reading the play. If you win it, you keep possession. If you lose it, your center covers. Smart, supported aggression.",
    introSlides: [
      { title: 'Defense Starts With Position', body: '"As a D-man, you\'re the last line before the goalie. Your job isn\'t to make highlight hits — it\'s to take away time and space, make the right first play, and keep the puck out of the net."' },
      { title: 'Gap Is Everything', body: '"Too much gap? They walk around you. Too tight? They blow by you. The right gap depends on speed, support, and where you are on the ice."' },
      { title: 'First Play, Best Play', body: '"When you get the puck, you need to know your options before it arrives. Quick, smart decisions start the breakout — hesitation leads to turnovers."' }
    ],
    situation: 'You\'re at the point in the O-zone. A pass just bounced off the boards and there\'s a loose puck. Their winger is going for it, but you\'re closer. Your center is reading the play and can cover if needed. Do you pinch?',
    question: '50/50 puck on the wall — pinch or stay home?',
    answers: [
      { text: 'Pinch — you\'re closer, your center has your back if you miss', correct: true, feedback: 'This is when you pinch — you have a good angle, you\'re closer, and your center is reading the play. If you win it, you keep possession. If you lose it, your center covers. That\'s smart, supported aggression.' },
      { text: 'Stay at the point — too risky, let the forwards battle for it', correct: false, feedback: 'This is a good time to pinch. You have support from your center, you\'re closer to the puck, and the risk is low. Staying home when you have support is leaving offense on the table. Pinch with purpose when you have a safety net.' },
      { text: 'Wait and see who gets there first', correct: false, feedback: 'Hesitation loses 50/50 pucks. You\'re closer AND you have coverage. Go get it.' },
      { text: 'Skate back to the blue line to prevent a breakaway', correct: false, feedback: 'Way too cautious for this situation. Your center is covering. You\'re closer to the puck. Pinch and keep possession alive.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'you', x: 140, y: 25, note: 'You (D) — at point, closer' },
        { type: 'opponent', x: 160, y: 18, label: 'W', note: 'Going for loose puck' },
        { type: 'teammate', x: 155, y: 42, label: 'C', note: 'Center — reading, can cover' },
        { type: 'teammate', x: 148, y: 55, label: 'D', note: 'Partner' },
        { type: 'teammate', x: 180, y: 60, label: 'W', note: 'Cycling low' }
      ],
      puck: { x: 155, y: 15 },
      arrows: [
        { from: { x: 140, y: 25 }, to: { x: 155, y: 15 }, style: 'solid', label: 'Pinch — you\'re closer' }
      ],
      annotations: []
    },
    gameContext: { period: 1, teamScore: 1, oppScore: 0, timeLeft: '7:30' },
    audioFolder: 'module6-when-to-pinch',
    nextScenarioId: 'module6-scenario6'
  },
  {
    id: 'module6-scenario6',
    moduleId: 6,
    scenarioNum: 6,
    totalInModule: 7,
    title: 'First Pass Under Pressure',
    coachCue: "When there\'s no play, get it out. A hard rim around the boards gets it to your winger and gets you out of trouble. No turnovers in your own zone. Rim it hard and clean — let them chase it.",
    introSlides: [
      { title: 'Defense Starts With Position', body: '"As a D-man, you\'re the last line before the goalie. Your job isn\'t to make highlight hits — it\'s to take away time and space, make the right first play, and keep the puck out of the net."' },
      { title: 'Gap Is Everything', body: '"Too much gap? They walk around you. Too tight? They blow by you. The right gap depends on speed, support, and where you are on the ice."' },
      { title: 'First Play, Best Play', body: '"When you get the puck, you need to know your options before it arrives. Quick, smart decisions start the breakout — hesitation leads to turnovers."' }
    ],
    situation: 'Heavy forecheck. F1 is on you, F2 is taking away the pass to your partner. You have the puck but no time and no clean pass up the middle. What\'s your play?',
    question: 'Under pressure with no clean pass. What do you do?',
    answers: [
      { text: 'Rim it hard around the boards to the far winger', correct: true, feedback: 'When there\'s no play, get it out. A hard rim around the boards gets it to your winger and gets you out of trouble. No turnovers in your own zone. Rim it hard and clean — let them chase it.' },
      { text: 'Try to beat F1 with a move and create space', correct: false, feedback: 'Don\'t force it. Under pressure with no play? Get it out. Trying to make something happen is how turnovers in your own zone happen. Rim it hard around the boards to the far side. Live to fight another day.' },
      { text: 'Force the pass through to your partner anyway', correct: false, feedback: 'F2 is sitting in that lane — forcing it through is a turnover in the slot. That\'s the most dangerous play in hockey. Rim it out.' },
      { text: 'Go back to the goalie and reset', correct: false, feedback: 'That\'s a last resort, not a first option. You have an outlet — rim it hard around the boards to your far winger. Clean and effective.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 15, y: 58, note: 'You (D) — under pressure' },
        { type: 'opponent', x: 22, y: 55, label: 'F', note: 'F1 — on you' },
        { type: 'opponent', x: 25, y: 35, label: 'F', note: 'F2 — blocking D-to-D' },
        { type: 'teammate', x: 15, y: 25, label: 'D', note: 'Partner — cut off' },
        { type: 'teammate', x: 55, y: 18, label: 'W', note: 'Far winger' }
      ],
      puck: { x: 15, y: 58 },
      arrows: [
        { from: { x: 15, y: 58 }, to: { x: 5, y: 68 }, style: 'solid', label: 'Rim hard around boards' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 0, oppScore: 1, timeLeft: '12:40' },
    audioFolder: 'module6-first-pass',
    nextScenarioId: 'module6-scenario7'
  },
  {
    id: 'module6-scenario7',
    moduleId: 6,
    scenarioNum: 7,
    totalInModule: 7,
    title: 'Zone Coverage — Weak Side D',
    coachCue: "Weak side D owns the front of the net and the weak side. Don\'t chase the puck — your partner has that. Stay home, stay patient, be the wall.",
    introSlides: [
      { title: 'Defense Starts With Position', body: '"As a D-man, you\'re the last line before the goalie. Your job isn\'t to make highlight hits — it\'s to take away time and space, make the right first play, and keep the puck out of the net."' },
      { title: 'Gap Is Everything', body: '"Too much gap? They walk around you. Too tight? They blow by you. The right gap depends on speed, support, and where you are on the ice."' },
      { title: 'First Play, Best Play', body: '"When you get the puck, you need to know your options before it arrives. Quick, smart decisions start the breakout — hesitation leads to turnovers."' }
    ],
    situation: 'They\'re cycling down low. Your partner has the strong side. You\'re the weak side D. There\'s a forward in the high slot and one lurking on your side. What\'s your coverage responsibility?',
    question: 'As the weak side D, what\'s your primary responsibility?',
    answers: [
      { text: 'Stay in your zone — front of the net, eyes on the weak side forward and slot', correct: true, feedback: 'Weak side D owns the front of the net and the weak side. Don\'t chase the puck — your partner has that. You\'re responsible for anyone crashing the net or sneaking in from your side. Stay home, stay patient, be the wall.' },
      { text: 'Go help your partner with the puck carrier', correct: false, feedback: 'The weak side D doesn\'t chase. Your job is protecting the net front and your side of the ice. If you leave, you open up the backdoor and slot. Let your partner handle the puck battle — you handle anyone who comes near the net.' },
      { text: 'Go out and challenge the high slot forward', correct: false, feedback: 'Challenging the slot forward takes you away from the net front. If the puck comes across while you\'re out of position, it\'s an easy goal. Stay home and own your zone.' },
      { text: 'Pinch to the corner to create a 2-on-1 on the puck', correct: false, feedback: 'Pinching from the weak side leaves the entire net front and backdoor open. That\'s the most dangerous ice on the rink. Stay home.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 18, y: 35, note: 'You (D) — weak side' },
        { type: 'teammate', x: 25, y: 60, label: 'D', note: 'Partner — strong side' },
        { type: 'opponent', x: 30, y: 65, label: 'F', note: 'Cycling down low' },
        { type: 'opponent', x: 35, y: 42, label: 'F', note: 'High slot' },
        { type: 'opponent', x: 22, y: 25, label: 'F', note: 'Lurking your side' }
      ],
      puck: { x: 30, y: 65 },
      arrows: [
        { from: { x: 30, y: 65 }, to: { x: 22, y: 25 }, style: 'dashed', label: 'Cross-ice threat' }
      ],
      annotations: []
    },
    gameContext: { period: 3, teamScore: 3, oppScore: 2, timeLeft: '1:45' },
    audioFolder: 'module6-zone-coverage',
    nextScenarioId: null
  }
];
