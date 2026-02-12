import type { Scenario } from '../scenarios';

// Module 3: Breakouts — 7 scenarios
// RESTORED from original HTML scenarios. These teach specific breakout READS for centers:
// route choice (high vs low), receiving on forehand, cutting laterally, reading pressure,
// support vs stretch timing, recognizing forecheck patterns, broken play recovery.
export const module3Scenarios: Scenario[] = [
  {
    id: 'module3-scenario1',
    moduleId: 3,
    scenarioNum: 1,
    totalInModule: 7,
    title: 'High Route vs. Low Route',
    coachCue: "How you swing back for the puck changes everything. Come low \u2014 underneath the puck, below the hash marks \u2014 and you get it on your forehand with vision up ice.",
    introSlides: [
      { title: 'Speed Kills \u2014 But Patience Scores', body: '"A breakout isn\'t a race. It\'s about finding the right route and reading the pressure."' },
      { title: 'Routes Have Names for a Reason', body: '"High, low, wheel, reverse \u2014 know your options so you can make the right call under pressure."' },
      { title: 'Support Your D', body: '"Give your defenseman options. If you\'re not open, you\'re not helping."' }
    ],
    situation: 'Your D-man retrieves the puck behind the net. One forechecker is pressuring hard. You\'re swinging back from the far side to support. What route should you take?',
    question: 'Which route gives you the best breakout option?',
    answers: [
      { text: 'Swing high near the blue line to stretch the ice', correct: false, feedback: 'Think about how you receive it. Coming low \u2014 below the hash marks \u2014 changes everything. You get the puck on your forehand, you can see up ice immediately, and you have time to make the next play. High routes mean receiving on your backhand with pressure closing. Go low, come underneath, and you\'ll have options.' },
      { text: 'Come low, underneath the puck, below the hash marks', correct: true, feedback: 'Coming underneath the puck (low route) gives you the puck on your forehand with vision up ice, time to make a decision, and space to cut laterally. A high route often means receiving on your backhand with pressure already on you. The extra two seconds to get low is worth it.' },
      { text: 'Stop at the net front and call for it', correct: false, feedback: 'Think about how you receive it. Coming low \u2014 below the hash marks \u2014 changes everything. You get the puck on your forehand, you can see up ice immediately, and you have time to make the next play. High routes mean receiving on your backhand with pressure closing. Go low, come underneath, and you\'ll have options.' },
      { text: 'Skate directly at the D-man to give a short option', correct: false, feedback: 'Think about how you receive it. Coming low \u2014 below the hash marks \u2014 changes everything. You get the puck on your forehand, you can see up ice immediately, and you have time to make the next play. High routes mean receiving on your backhand with pressure closing. Go low, come underneath, and you\'ll have options.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'teammate', x: 7, y: 42, label: 'D', note: 'Has puck behind net' },
        { type: 'you', x: 50, y: 20, note: 'You (C) \u2014 swinging back', targetX: 25, targetY: 60 },
        { type: 'opponent', x: 25, y: 38, label: 'F', note: 'Forechecker pressuring' },
      ],
      puck: { x: 6, y: 42 },
      arrows: [
        { from: { x: 50, y: 20 }, to: { x: 25, y: 60 }, style: 'dashed', label: 'Low route \u2014 forehand receive' }
      ],
      annotations: []
    },
    gameContext: { period: 1, teamScore: 0, oppScore: 0, timeLeft: '16:30' },
    audioFolder: 'module3-scenario1-high-low-route',
    nextScenarioId: 'module3-scenario2'
  },
  {
    id: 'module3-scenario2',
    moduleId: 3,
    scenarioNum: 2,
    totalInModule: 7,
    title: 'Reading Pressure \u2014 When to Go Quick',
    coachCue: "Two guys collapsing on the strong side \u2014 that option is gone. Don\'t fight the forecheck. Go where they\'re not.",
    situation: 'Your D-man has the puck behind the net. Two forecheckers are coming hard \u2014 one to the puck, one cutting off the strong side. The weak side is open. Where should you position yourself?',
    question: 'What\'s your best support position?',
    answers: [
      { text: 'Stay strong side and call louder for the puck', correct: false, feedback: 'Two guys are collapsing on the strong side \u2014 that option is gone. When pressure dictates the play, you need to adjust. Flash to the weak side, get low, give your D a quick outlet where the pressure isn\'t. Don\'t fight the forecheck \u2014 go where they\'re not.' },
      { text: 'Go to the net front as a screen', correct: false, feedback: 'Two guys are collapsing on the strong side \u2014 that option is gone. When pressure dictates the play, you need to adjust. Flash to the weak side, get low, give your D a quick outlet where the pressure isn\'t. Don\'t fight the forecheck \u2014 go where they\'re not.' },
      { text: 'Flash to the weak side low \u2014 give a quick outlet', correct: true, feedback: 'When heavy pressure is coming, the breakout needs to go quick and often weak side. Get yourself into the outlet position where the pressure isn\'t. Don\'t wait for the puck to come to where you want to be \u2014 go to where you can actually receive it. That\'s reading the play.' },
      { text: 'Head up ice and stretch \u2014 they\'ll figure it out', correct: false, feedback: 'Two guys are collapsing on the strong side \u2014 that option is gone. When pressure dictates the play, you need to adjust. Flash to the weak side, get low, give your D a quick outlet where the pressure isn\'t. Don\'t fight the forecheck \u2014 go where they\'re not.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'teammate', x: 7, y: 42, label: 'D', note: 'Has puck \u2014 under pressure' },
        { type: 'you', x: 40, y: 55, note: 'You (C)', targetX: 25, targetY: 20 },
        { type: 'opponent', x: 20, y: 50, label: 'F', note: 'F1 \u2014 to puck' },
        { type: 'opponent', x: 25, y: 60, label: 'F', note: 'F2 \u2014 cutting off strong side' },
      ],
      puck: { x: 6, y: 42 },
      arrows: [
        { from: { x: 40, y: 55 }, to: { x: 25, y: 20 }, style: 'dashed', label: 'Flash to weak side' }
      ],
      annotations: [
        { x: 30, y: 68, text: 'STRONG SIDE BLOCKED' }
      ]
    },
    gameContext: { period: 2, teamScore: 1, oppScore: 1, timeLeft: '11:00' },
    audioFolder: 'module3-scenario2-reading-pressure',
    nextScenarioId: 'module3-scenario3'
  },
  {
    id: 'module3-scenario3',
    moduleId: 3,
    scenarioNum: 3,
    totalInModule: 7,
    title: 'Receiving on Forehand vs. Backhand',
    coachCue: "A small adjustment to your route changes everything. Receive on your forehand and you have immediate vision up ice. Receive on your backhand and you\'re fighting the puck.",
    situation: 'You\'re a left-shot center swinging through the middle of the ice for a breakout pass. You have a choice: continue your current path (receive on backhand) or adjust your route to receive on forehand.',
    question: 'How should you adjust your route?',
    answers: [
      { text: 'Keep your route \u2014 backhand is fine, don\'t overthink it', correct: false, feedback: 'Think about what happens after. Receiving on your backhand sounds fine until you get the puck. Now you\'re spinning, you can\'t see up ice, and the forechecker is closing. Arc your route wider \u2014 a small adjustment puts the puck on your forehand with vision. You can make plays immediately. That\'s the difference.' },
      { text: 'Stop and wait for the puck to come to you', correct: false, feedback: 'Think about what happens after. Receiving on your backhand sounds fine until you get the puck. Now you\'re spinning, you can\'t see up ice, and the forechecker is closing. Arc your route wider \u2014 a small adjustment puts the puck on your forehand with vision. You can make plays immediately. That\'s the difference.' },
      { text: 'Go faster on the same route \u2014 speed solves everything', correct: false, feedback: 'Think about what happens after. Receiving on your backhand sounds fine until you get the puck. Now you\'re spinning, you can\'t see up ice, and the forechecker is closing. Arc your route wider \u2014 a small adjustment puts the puck on your forehand with vision. You can make plays immediately. That\'s the difference.' },
      { text: 'Arc your route wider to receive on forehand with vision', correct: true, feedback: 'A small adjustment to receive on your forehand changes everything: better puck control, immediate vision up ice, ability to make plays in stride. The extra two seconds to adjust your route is worth it. Receiving on your backhand means you\'re fighting the puck before you can do anything with it.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'teammate', x: 10, y: 42, label: 'D', note: 'Making breakout pass' },
        { type: 'you', x: 45, y: 25, note: 'You (C) \u2014 left shot', targetX: 35, targetY: 55 },
      ],
      puck: { x: 10, y: 42 },
      arrows: [
        { from: { x: 10, y: 42 }, to: { x: 35, y: 50 }, style: 'dashed', label: 'Pass' },
        { from: { x: 45, y: 25 }, to: { x: 35, y: 55 }, style: 'solid', label: 'Wider arc = forehand receive' }
      ],
      annotations: []
    },
    gameContext: { period: 1, teamScore: 0, oppScore: 1, timeLeft: '8:45' },
    audioFolder: 'module3-scenario3-forehand-receive',
    nextScenarioId: 'module3-scenario4'
  },
  {
    id: 'module3-scenario4',
    moduleId: 3,
    scenarioNum: 4,
    totalInModule: 7,
    title: 'When to Cut Laterally',
    coachCue: "You received the puck low with control. Don\'t panic. The forechecker is coming straight at you \u2014 a lateral cut makes him miss and opens the whole rink.",
    situation: 'You receive the breakout pass below the hash marks. A forechecker is coming straight at you. Your winger is open on the boards but there\'s also a soft area in the middle of the ice.',
    question: 'What\'s your best play with the puck?',
    answers: [
      { text: 'Dump it off to the winger immediately \u2014 he\'s open', correct: false, feedback: 'Use the time you have. You received the puck low with control \u2014 don\'t panic and get rid of it. The forechecker is coming straight at you, but that means cutting laterally makes him miss. Find the soft ice, create time, and now you\'re making plays with vision instead of just reacting. That\'s the difference.' },
      { text: 'Absorb the check and try to protect the puck', correct: false, feedback: 'Use the time you have. You received the puck low with control \u2014 don\'t panic and get rid of it. The forechecker is coming straight at you, but that means cutting laterally makes him miss. Find the soft ice, create time, and now you\'re making plays with vision instead of just reacting. That\'s the difference.' },
      { text: 'Cut laterally into the soft area, creating time and a better passing lane', correct: true, feedback: 'When you\'re low and under control, cutting laterally into soft ice buys time, opens up the whole rink, and often pulls the forechecker out of position. This is where having good routes pays off \u2014 you have options. Now you can hit the winger with a better pass, or carry it if the lane opens.' },
      { text: 'Reverse it back to the D-man', correct: false, feedback: 'Use the time you have. You received the puck low with control \u2014 don\'t panic and get rid of it. The forechecker is coming straight at you, but that means cutting laterally makes him miss. Find the soft ice, create time, and now you\'re making plays with vision instead of just reacting. That\'s the difference.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 35, y: 55, note: 'You (C) \u2014 has puck', targetX: 45, targetY: 35 },
        { type: 'opponent', x: 48, y: 48, label: 'F', note: 'Forechecker \u2014 closing straight' },
        { type: 'teammate', x: 35, y: 15, label: 'W', note: 'Winger open on boards' },
        { type: 'teammate', x: 18, y: 55, label: 'D', note: 'D trailing' },
      ],
      puck: { x: 35, y: 55 },
      arrows: [
        { from: { x: 35, y: 55 }, to: { x: 45, y: 35 }, style: 'dashed', label: 'Cut into soft ice' }
      ],
      annotations: [
        { x: 48, y: 32, text: 'SOFT ICE' }
      ]
    },
    gameContext: { period: 2, teamScore: 0, oppScore: 0, timeLeft: '14:20' },
    audioFolder: 'module3-scenario4-cut-lateral',
    nextScenarioId: 'module3-scenario5'
  },
  {
    id: 'module3-scenario5',
    moduleId: 3,
    scenarioNum: 5,
    totalInModule: 7,
    title: 'Support vs. Stretch',
    coachCue: "The first pass is made, but the breakout isn\'t done yet. Don\'t abandon your D before the puck is safely through the zone. Stay close as support.",
    situation: 'Your team is breaking out. The D-man makes a good first pass to the winger on the wall. You\'re the center trailing the play. What\'s your responsibility here?',
    question: 'What should you do now?',
    answers: [
      { text: 'Stay as a close support option in case the winger gets pressured', correct: true, feedback: 'The first pass is made, but the play isn\'t safe yet. Stay in a close support position so if the winger gets pressured, you\'re the outlet. Once the puck crosses the red line cleanly, then you can push to create offense. Don\'t abandon the breakout before it\'s complete.' },
      { text: 'Get up ice fast \u2014 be the stretch option in the neutral zone', correct: false, feedback: 'Don\'t leave too early. The first pass is just the first pass \u2014 the breakout isn\'t done yet. Look at the forechecker closing on your winger. If you\'re stretching to the neutral zone and he gets pressured, who does he pass to? Stay close as support until the puck is safely through the zone. Then you can push.' },
      { text: 'Follow the puck \u2014 go to the wall with the winger', correct: false, feedback: 'Don\'t leave too early. The first pass is just the first pass \u2014 the breakout isn\'t done yet. Look at the forechecker closing on your winger. If you\'re stretching to the neutral zone and he gets pressured, who does he pass to? Stay close as support until the puck is safely through the zone. Then you can push.' },
      { text: 'Stop at the defensive blue line and wait', correct: false, feedback: 'Don\'t leave too early. The first pass is just the first pass \u2014 the breakout isn\'t done yet. Look at the forechecker closing on your winger. If you\'re stretching to the neutral zone and he gets pressured, who does he pass to? Stay close as support until the puck is safely through the zone. Then you can push.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'teammate', x: 15, y: 55, label: 'D', note: 'Made first pass' },
        { type: 'teammate', x: 35, y: 15, label: 'W', note: 'Winger \u2014 has puck on wall' },
        { type: 'you', x: 40, y: 42, note: 'You (C) \u2014 trailing', targetX: 35, targetY: 30 },
        { type: 'opponent', x: 45, y: 20, label: 'F', note: 'Forechecker approaching winger' },
      ],
      puck: { x: 35, y: 15 },
      arrows: [
        { from: { x: 15, y: 55 }, to: { x: 35, y: 15 }, style: 'dashed', label: '1st pass \u2713' },
        { from: { x: 40, y: 42 }, to: { x: 35, y: 30 }, style: 'solid', label: 'Stay close as support' }
      ],
      annotations: []
    },
    gameContext: { period: 1, teamScore: 1, oppScore: 0, timeLeft: '5:00' },
    audioFolder: 'module3-scenario5-support-stretch',
    nextScenarioId: 'module3-scenario6'
  },
  {
    id: 'module3-scenario6',
    moduleId: 3,
    scenarioNum: 6,
    totalInModule: 7,
    title: 'Recognizing the Forecheck Pattern',
    coachCue: "They\'re running a 1-2-2. Only one guy pressuring, but the neutral zone is clogged. They want you to dump it. Don\'t. Possess through it.",
    situation: 'The other team is running a 1-2-2 forecheck. One forward pressures the puck softly, two more clog the neutral zone. Your D-man has time.',
    question: 'How should your team attack this?',
    answers: [
      { text: 'Go D-to-D and skate it out \u2014 they only have one guy coming', correct: true, feedback: 'With only one forechecker pressuring and time available, D-to-D or using the middle opens up the ice. The 1-2-2 gives up the blue line \u2014 make them pay by possessing through it, not dumping into their structure. They want you to rim it or dump it. Skate through their trap instead.' },
      { text: 'Quick up to the center in the middle', correct: false, feedback: 'Read what they\'re giving up. The 1-2-2 clogs the neutral zone but only sends one guy. That means your D has time, and D-to-D or skating it up creates advantages they can\'t recover from. Dumping or rimming plays right into what they want. When they give you time, use it to beat them with possession.' },
      { text: 'Rim it around the boards and race to it', correct: false, feedback: 'Read what they\'re giving up. The 1-2-2 clogs the neutral zone but only sends one guy. That means your D has time, and D-to-D or skating it up creates advantages they can\'t recover from. Dumping or rimming plays right into what they want. When they give you time, use it to beat them with possession.' },
      { text: 'Dump it out and change lines', correct: false, feedback: 'Read what they\'re giving up. The 1-2-2 clogs the neutral zone but only sends one guy. That means your D has time, and D-to-D or skating it up creates advantages they can\'t recover from. Dumping or rimming plays right into what they want. When they give you time, use it to beat them with possession.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'teammate', x: 15, y: 55, label: 'D', note: 'Has puck \u2014 has time' },
        { type: 'teammate', x: 15, y: 30, label: 'D', note: 'D partner' },
        { type: 'you', x: 40, y: 42, note: 'You (C)' },
        { type: 'opponent', x: 35, y: 42, label: 'F', note: 'F1 \u2014 soft pressure' },
        { type: 'opponent', x: 78, y: 25, label: 'F', note: 'Clogging NZ' },
        { type: 'opponent', x: 78, y: 60, label: 'F', note: 'Clogging NZ' },
      ],
      puck: { x: 15, y: 55 },
      arrows: [
        { from: { x: 15, y: 55 }, to: { x: 15, y: 30 }, style: 'dashed', label: 'D-to-D' }
      ],
      annotations: [
        { x: 72, y: 42, text: '1-2-2 TRAP' }
      ]
    },
    gameContext: { period: 2, teamScore: 1, oppScore: 1, timeLeft: '9:30' },
    audioFolder: 'module3-scenario6-forecheck-pattern',
    nextScenarioId: 'module3-scenario7'
  },
  {
    id: 'module3-scenario7',
    moduleId: 3,
    scenarioNum: 7,
    totalInModule: 7,
    title: 'The Broken Play Recovery',
    coachCue: "The breakout pass went off your stick. The puck is loose and the forechecker is closer to it than you. The play has changed \u2014 you\'re defending now.",
    situation: 'The breakout pass goes off your stick and the puck is loose in the neutral zone. A forechecker is closer to the puck than you are.',
    question: 'What do you do now?',
    answers: [
      { text: 'Race for the puck \u2014 you can get there first', correct: false, feedback: 'He\'s closer \u2014 you\'re not winning that race. When the breakout fails, everything changes. You\'re now defending. Get inside, find the most dangerous threat, and take him away. Chasing a loose puck you can\'t get just leaves your team exposed. Transition mentally, then transition physically.' },
      { text: 'Transition to defense \u2014 get inside position and pick up the most dangerous man', correct: true, feedback: 'When a breakout fails, you\'re now in a defensive situation. Don\'t chase a puck you can\'t get to. Your job is to recognize the play is broken and get inside position to defend. Inside-out, protect the house. The turnover happened \u2014 now limit the damage by picking up the dangerous man.' },
      { text: 'Call for offside to stop play', correct: false, feedback: 'He\'s closer \u2014 you\'re not winning that race. When the breakout fails, everything changes. You\'re now defending. Get inside, find the most dangerous threat, and take him away. Chasing a loose puck you can\'t get just leaves your team exposed. Transition mentally, then transition physically.' },
      { text: 'Finish your route and hope a winger gets it', correct: false, feedback: 'He\'s closer \u2014 you\'re not winning that race. When the breakout fails, everything changes. You\'re now defending. Get inside, find the most dangerous threat, and take him away. Chasing a loose puck you can\'t get just leaves your team exposed. Transition mentally, then transition physically.' }
    ],
    diagram: {
      zone: 'neutral',
      players: [
        { type: 'you', x: 80, y: 42, note: 'You (C) \u2014 turnover', targetX: 60, targetY: 42 },
        { type: 'opponent', x: 88, y: 35, label: 'F', note: 'Closer to puck' },
        { type: 'opponent', x: 75, y: 25, label: 'F', note: 'Dangerous \u2014 late man' },
        { type: 'teammate', x: 55, y: 55, label: 'D', note: 'D recovering' },
      ],
      puck: { x: 85, y: 38 },
      arrows: [
        { from: { x: 80, y: 42 }, to: { x: 60, y: 42 }, style: 'dashed', label: 'Get inside \u2014 pick up threat' }
      ],
      annotations: [
        { x: 82, y: 48, text: 'LOOSE PUCK' }
      ]
    },
    gameContext: { period: 3, teamScore: 2, oppScore: 2, timeLeft: '3:15' },
    audioFolder: 'module3-scenario7-broken-play',
    nextScenarioId: null
  }
];
