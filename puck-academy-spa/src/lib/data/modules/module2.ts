import type { Scenario } from '../scenarios';

// Module 2: Faceoffs — 7 scenarios
// RESTORED from original HTML scenarios. These teach faceoff TECHNIQUE for centers:
// reading the ref, leverage, forehand/backhand decisions, competitive edges, adaptation.
// Faceoff dots: D-zone (35,25)/(35,60), O-zone (165,25)/(165,60), NZ (80,25)/(80,60)/(120,25)/(120,60), Center (100,42.5)
export const module2Scenarios: Scenario[] = [
  {
    id: 'module2-scenario1',
    moduleId: 2,
    scenarioNum: 1,
    totalInModule: 7,
    title: 'Reading the Ref Position',
    coachCue: "Before every draw, look at the linesman. The way they lean tells you where the puck is going. Use that to decide forehand or backhand.",
    introSlides: [
      { title: 'Faceoffs Are Chess, Not Checkers', body: '"Winning the draw is about preparation, reads, and leverage \u2014 not just quick hands."' },
      { title: 'Read Before You React', body: '"Watch the linesman\'s body position. If they\'re leaning toward your side, they\'ll likely drop the puck closer to you \u2014 so attack with your forehand. Your forehand = the side where your stick blade naturally faces when you hold it."' },
      { title: 'Win the Possession, Not Just the Draw', body: '"A \u201Cwon\u201D faceoff that goes to the other team isn\'t a win. Know where you\'re putting it."' }
    ],
    situation: 'Defensive zone faceoff to the goalie\'s left. You\'re a left-handed shot (your forehand is to your right as you face the opponent). Notice how the linesman (LM) is positioned \u2014 their body is angled slightly toward YOUR side. When a linesman leans this way, they tend to drop the puck more toward that side, giving you a cleaner angle to attack with your forehand. The opposing center is a righty, set up low with a strong backhand grip.',
    question: 'How should you approach this faceoff?',
    answers: [
      { text: 'Go backhand \u2014 it\'s your stronger move', correct: false, feedback: 'The ref position matters more than you think. When the ref is on your forehand side, that\'s your advantage \u2014 going forehand gives you a cleaner line to the puck. Don\'t fight your natural preference for no reason, but when the situation favors a different approach, adapt. That\'s smart hockey.' },
      { text: 'Tie up the opposing center and let your winger retrieve', correct: false, feedback: 'The ref position matters more than you think. When the ref is on your forehand side, that\'s your advantage \u2014 going forehand gives you a cleaner line to the puck. Don\'t fight your natural preference for no reason, but when the situation favors a different approach, adapt. That\'s smart hockey.' },
      { text: 'Go forehand \u2014 the ref position gives you the angle advantage', correct: true, feedback: 'When the ref is on your forehand side, going forehand gives you a cleaner line to the puck. Fighting your natural preference based on the situation is what separates good faceoff guys from great ones. You read the ref, adjusted your approach, and put yourself in the best position to win.' },
      { text: 'Cheat forward to win it clean to the corner', correct: false, feedback: 'The ref position matters more than you think. When the ref is on your forehand side, that\'s your advantage \u2014 going forehand gives you a cleaner line to the puck. Don\'t fight your natural preference for no reason, but when the situation favors a different approach, adapt. That\'s smart hockey.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 30, y: 25, note: 'You (C) \u2014 left shot' },
        { type: 'opponent', x: 40, y: 25, label: 'C', note: 'Opposing center \u2014 right shot' },
        { type: 'teammate', x: 25, y: 15, label: 'W', note: 'Winger support' },
        { type: 'teammate', x: 25, y: 38, label: 'D', note: 'D-man' },
      ],
      puck: { x: 35, y: 25 },
      ref: { x: 32, y: 17, label: 'LM' },
      arrows: [
        { from: { x: 32, y: 19 }, to: { x: 28, y: 23 }, style: 'dashed', label: 'LM leaning your way' }
      ],
      annotations: [
        { x: 44, y: 18, text: 'YOUR FOREHAND SIDE \u2192' }
      ]
    },
    gameContext: { period: 2, teamScore: 1, oppScore: 1, timeLeft: '15:30' },
    audioFolder: 'module2-scenario1-ref-position',
    nextScenarioId: 'module2-scenario2'
  },
  {
    id: 'module2-scenario2',
    moduleId: 2,
    scenarioNum: 2,
    totalInModule: 7,
    title: 'Recognizing Who Has the Advantage',
    coachCue: "Same-handed matchups come down to one thing: linesman position. If the ref is on your backhand, you\'re fighting uphill. Know it before the puck drops.",
    introSlides: [
      { title: 'Faceoffs Are Chess, Not Checkers', body: '"Winning the draw is about preparation, reads, and leverage \u2014 not just quick hands."' },
      { title: 'Read Before You React', body: '"Watch the linesman\'s body position. If they\'re leaning toward your side, they\'ll likely drop the puck closer to you \u2014 so attack with your forehand."' },
      { title: 'Win the Possession, Not Just the Draw', body: '"A \u201Cwon\u201D faceoff that goes to the other team isn\'t a win. Know where you\'re putting it."' }
    ],
    situation: 'Neutral zone faceoff. You\'re a left-shot center. The opposing center is also left-shot. The linesman\'s body angle is leaning toward you, giving your opponent a cleaner line to the puck on his forehand.',
    question: 'Who has the advantage here?',
    answers: [
      { text: 'You do \u2014 home team always has advantage', correct: false, feedback: 'When both centers are the same handedness, it\'s all about linesman position. The linesman is on your backhand side, which means his forehand has a cleaner angle. That\'s his advantage. Knowing this before the puck drops lets you adjust \u2014 tie-up, counter move, or positioning change. Awareness is everything.' },
      { text: 'The other center \u2014 linesman position favors his forehand', correct: true, feedback: 'Same-handed matchups come down to linesman position. If the linesman is on your backhand, you\'re fighting uphill. Recognize this early and adjust your approach \u2014 go for a tie-up, cheat your positioning, or try a quick forehand counter. Knowing you\'re at a disadvantage is the first step to overcoming it.' },
      { text: 'It\'s even \u2014 both left-shots cancel out', correct: false, feedback: 'When both centers are the same handedness, it\'s all about linesman position. The linesman is on your backhand side, which means his forehand has a cleaner angle. That\'s his advantage. Knowing this before the puck drops lets you adjust \u2014 tie-up, counter move, or positioning change. Awareness is everything.' },
      { text: 'You do \u2014 you can read his stick better', correct: false, feedback: 'When both centers are the same handedness, it\'s all about linesman position. The linesman is on your backhand side, which means his forehand has a cleaner angle. That\'s his advantage. Knowing this before the puck drops lets you adjust \u2014 tie-up, counter move, or positioning change. Awareness is everything.' }
    ],
    diagram: {
      zone: 'neutral',
      players: [
        { type: 'you', x: 96, y: 42, note: 'You (C) \u2014 left shot' },
        { type: 'opponent', x: 104, y: 42, label: 'C', note: 'Opposing center \u2014 also left shot' },
      ],
      puck: { x: 100, y: 42.5 },
      ref: { x: 97, y: 35, label: 'LM' },
      arrows: [
        { from: { x: 97, y: 37 }, to: { x: 94, y: 40 }, style: 'dashed', label: 'LM leaning your way' }
      ],
      annotations: [
        { x: 85, y: 52, text: 'Both centers LEFT shot' }
      ]
    },
    gameContext: { period: 1, teamScore: 0, oppScore: 0, timeLeft: '12:00' },
    audioFolder: 'module2-scenario2-advantage',
    nextScenarioId: 'module2-scenario3'
  },
  {
    id: 'module2-scenario3',
    moduleId: 2,
    scenarioNum: 3,
    totalInModule: 7,
    title: 'When to Cheat Your Feet',
    coachCue: "Tied game, two minutes left, your team has a set play. The other center is relaxed. This is when you push the limits.",
    introSlides: [
      { title: 'Faceoffs Are Chess, Not Checkers', body: '"Winning the draw is about preparation, reads, and leverage \u2014 not just quick hands."' },
      { title: 'Read Before You React', body: '"Watch the linesman\'s body position. If they\'re leaning toward your side, they\'ll likely drop the puck closer to you \u2014 so attack with your forehand."' },
      { title: 'Win the Possession, Not Just the Draw', body: '"A \u201Cwon\u201D faceoff that goes to the other team isn\'t a win. Know where you\'re putting it."' }
    ],
    situation: 'Offensive zone faceoff, tied game, 2 minutes left. Your team runs a set play where the winger crashes the net on the draw. The opposing center looks relaxed and is setting up late.',
    question: 'What\'s your best approach?',
    answers: [
      { text: 'Stay square and go for a clean win \u2014 no risks', correct: false, feedback: 'You have a set play, the game\'s on the line, and the other guy isn\'t focused. This is when you push the limits. Cheat your feet forward \u2014 just enough to get a quicker jump. If the ref sees it, he\'ll tell you. But if you play it safe when you have an advantage, you\'re leaving points on the ice.' },
      { text: 'Tell the ref the other center isn\'t ready', correct: false, feedback: 'You have a set play, the game\'s on the line, and the other guy isn\'t focused. This is when you push the limits. Cheat your feet forward \u2014 just enough to get a quicker jump. If the ref sees it, he\'ll tell you. But if you play it safe when you have an advantage, you\'re leaving points on the ice.' },
      { text: 'Change your grip to throw off the opponent', correct: false, feedback: 'You have a set play, the game\'s on the line, and the other guy isn\'t focused. This is when you push the limits. Cheat your feet forward \u2014 just enough to get a quicker jump. If the ref sees it, he\'ll tell you. But if you play it safe when you have an advantage, you\'re leaving points on the ice.' },
      { text: 'Cheat your feet forward slightly to get a quicker jump on the puck', correct: true, feedback: 'In high-leverage situations where you have a set play, cheating your feet (without getting kicked out) gives you a split-second advantage. If the opposing center is relaxed, make him pay for it. Push the limits until the ref corrects you. That\'s competing. That\'s playing to win.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'you', x: 162, y: 25, note: 'You (C) \u2014 at dot' },
        { type: 'opponent', x: 168, y: 25, label: 'C', note: 'Relaxed, setting up late' },
        { type: 'teammate', x: 155, y: 18, label: 'W', note: 'Set play: crash net' },
        { type: 'teammate', x: 145, y: 15, label: 'D', note: 'D at point' },
      ],
      puck: { x: 165, y: 25 },
      ref: { x: 165, y: 19, label: 'LM' },
      arrows: [
        { from: { x: 155, y: 18 }, to: { x: 185, y: 42 }, style: 'dashed', label: 'Set play: crash net' }
      ],
      annotations: [
        { x: 150, y: 68, text: '2:00 LEFT \u2014 TIED GAME' }
      ]
    },
    gameContext: { period: 3, teamScore: 2, oppScore: 2, timeLeft: '2:00' },
    audioFolder: 'module2-scenario3-cheat-feet',
    nextScenarioId: 'module2-scenario4'
  },
  {
    id: 'module2-scenario4',
    moduleId: 2,
    scenarioNum: 4,
    totalInModule: 7,
    title: 'The Tie-Up Decision',
    coachCue: "He\'s been beating you clean all game. Doing the same thing harder won\'t change that. When you\'re outmatched, change the approach.",
    introSlides: [
      { title: 'Faceoffs Are Chess, Not Checkers', body: '"Winning the draw is about preparation, reads, and leverage \u2014 not just quick hands."' },
      { title: 'Read Before You React', body: '"Watch the linesman\'s body position. If they\'re leaning toward your side, they\'ll likely drop the puck closer to you \u2014 so attack with your forehand."' },
      { title: 'Win the Possession, Not Just the Draw', body: '"A \u201Cwon\u201D faceoff that goes to the other team isn\'t a win. Know where you\'re putting it."' }
    ],
    situation: 'Defensive zone faceoff. The opposing center is significantly stronger than you and has been winning draws clean all game. Your D-man is shaded toward the boards.',
    question: 'How do you handle this matchup?',
    answers: [
      { text: 'Go for a tie-up and let your winger retrieve', correct: true, feedback: 'When you\'re outmatched physically, winning the faceoff doesn\'t mean winning the puck clean. Tying up the opposing center and letting your support retrieve is a legitimate win. Know your role and set up your teammates. That\'s not giving up \u2014 that\'s playing smart.' },
      { text: 'Try harder to win it clean \u2014 adjust your grip', correct: false, feedback: 'He\'s been beating you clean all game \u2014 doing the same thing harder won\'t change that. When you\'re outmatched, change the approach. Tie him up, neutralize his strength, and let your winger retrieve. Getting your team the puck is what matters, not how you do it.' },
      { text: 'Cheat back to recover a lost draw faster', correct: false, feedback: 'He\'s been beating you clean all game \u2014 doing the same thing harder won\'t change that. When you\'re outmatched, change the approach. Tie him up, neutralize his strength, and let your winger retrieve. Getting your team the puck is what matters, not how you do it.' },
      { text: 'Call for a different centerman to take the draw', correct: false, feedback: 'He\'s been beating you clean all game \u2014 doing the same thing harder won\'t change that. When you\'re outmatched, change the approach. Tie him up, neutralize his strength, and let your winger retrieve. Getting your team the puck is what matters, not how you do it.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 31, y: 25, note: 'You (C) \u2014 outmatched' },
        { type: 'opponent', x: 39, y: 25, label: 'C', note: 'Stronger \u2014 winning draws clean' },
        { type: 'teammate', x: 25, y: 18, label: 'W', note: 'Winger \u2014 ready to retrieve' },
        { type: 'teammate', x: 22, y: 30, label: 'D', note: 'D-man shaded to boards' },
      ],
      puck: { x: 35, y: 25 },
      ref: { x: 35, y: 18, label: 'LM' },
      arrows: [],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 1, oppScore: 2, timeLeft: '8:45' },
    audioFolder: 'module2-scenario4-tieup',
    nextScenarioId: 'module2-scenario5'
  },
  {
    id: 'module2-scenario5',
    moduleId: 2,
    scenarioNum: 5,
    totalInModule: 7,
    title: 'Leverage and Body Position',
    coachCue: "Faceoff power comes from your legs, not your arms. If you\'re standing upright with weight on your heels, you\'ve already lost.",
    introSlides: [
      { title: 'Faceoffs Are Chess, Not Checkers', body: '"Winning the draw is about preparation, reads, and leverage \u2014 not just quick hands."' },
      { title: 'Read Before You React', body: '"Watch the linesman\'s body position. If they\'re leaning toward your side, they\'ll likely drop the puck closer to you \u2014 so attack with your forehand."' },
      { title: 'Win the Possession, Not Just the Draw', body: '"A \u201Cwon\u201D faceoff that goes to the other team isn\'t a win. Know where you\'re putting it."' }
    ],
    situation: 'You\'re about to take a critical defensive zone draw. You notice you\'re standing fairly upright with your weight on your heels.',
    question: 'What adjustment gives you the best chance?',
    answers: [
      { text: 'Grip higher on your stick for more reach', correct: false, feedback: 'Faceoff power comes from your legs, not your arms or grip. Standing upright with weight on your heels means you\'re pushing with just your upper body. Get low \u2014 bend at the hips and knees, shift your weight to the balls of your feet. Now you can explode into the draw. That\'s leverage.' },
      { text: 'Widen your stance as much as possible', correct: false, feedback: 'Faceoff power comes from your legs, not your arms or grip. Standing upright with weight on your heels means you\'re pushing with just your upper body. Get low \u2014 bend at the hips and knees, shift your weight to the balls of your feet. Now you can explode into the draw. That\'s leverage.' },
      { text: 'Get lower through hips and knees, weight forward on balls of feet', correct: true, feedback: 'Leverage comes from your lower body. Straight legs = no power. Getting low through hips and knees, with weight forward on the balls of your feet, lets you explode into the draw. It\'s not about being big \u2014 it\'s about being loaded and ready. You\'ll feel the difference immediately.' },
      { text: 'Focus only on watching the ref\'s hand', correct: false, feedback: 'Faceoff power comes from your legs, not your arms or grip. Standing upright with weight on your heels means you\'re pushing with just your upper body. Get low \u2014 bend at the hips and knees, shift your weight to the balls of your feet. Now you can explode into the draw. That\'s leverage.' }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 31, y: 25, note: 'You (C) \u2014 check your stance' },
        { type: 'opponent', x: 39, y: 25, label: 'C', note: 'Opposing center' },
      ],
      puck: { x: 35, y: 25 },
      ref: { x: 35, y: 18, label: 'LM' },
      arrows: [],
      annotations: [
        { x: 15, y: 35, text: 'STANCE CHECK: Hips low, weight forward' }
      ]
    },
    gameContext: { period: 3, teamScore: 2, oppScore: 3, timeLeft: '4:30' },
    audioFolder: 'module2-scenario5-leverage',
    nextScenarioId: 'module2-scenario6'
  },
  {
    id: 'module2-scenario6',
    moduleId: 2,
    scenarioNum: 6,
    totalInModule: 7,
    title: 'Forehand vs. Backhand Read',
    coachCue: "He\'s beaten you twice with the same approach. Doing it harder won\'t change the outcome. But look at the linesman \u2014 you have the angle on your forehand. Give him something different.",
    introSlides: [
      { title: 'Faceoffs Are Chess, Not Checkers', body: '"Winning the draw is about preparation, reads, and leverage \u2014 not just quick hands."' },
      { title: 'Read Before You React', body: '"Watch the linesman\'s body position. If they\'re leaning toward your side, they\'ll likely drop the puck closer to you \u2014 so attack with your forehand."' },
      { title: 'Win the Possession, Not Just the Draw', body: '"A \u201Cwon\u201D faceoff that goes to the other team isn\'t a win. Know where you\'re putting it."' }
    ],
    situation: 'Neutral zone faceoff. You\'re a right-shot center. The opposing center is a left-shot who has beaten you backhand twice already. The linesman is on your forehand side.',
    question: 'How do you adjust?',
    answers: [
      { text: 'Go backhand harder \u2014 overpower him this time', correct: false, feedback: 'He\'s beaten you twice with the same approach \u2014 doing it harder won\'t change the outcome. But look at the linesman position: you have the angle on your forehand. Switch your approach. He expects backhand, you go forehand, and now he\'s the one adjusting. That\'s how you win the mental game.' },
      { text: 'Switch to forehand \u2014 you have the angle and he won\'t expect it', correct: true, feedback: 'If the same move isn\'t working AND you have a positional advantage (ref on your forehand), adapt. Going forehand when he expects backhand, especially with the angle in your favor, changes the matchup entirely. He\'s prepared for what you\'ve been doing \u2014 give him something different.' },
      { text: 'Go for a quick stick lift before the drop', correct: false, feedback: 'He\'s beaten you twice with the same approach \u2014 doing it harder won\'t change the outcome. But look at the linesman position: you have the angle on your forehand. Switch your approach. He expects backhand, you go forehand, and now he\'s the one adjusting. That\'s how you win the mental game.' },
      { text: 'Just tie him up \u2014 stop trying to win clean', correct: false, feedback: 'He\'s beaten you twice with the same approach \u2014 doing it harder won\'t change the outcome. But look at the linesman position: you have the angle on your forehand. Switch your approach. He expects backhand, you go forehand, and now he\'s the one adjusting. That\'s how you win the mental game.' }
    ],
    diagram: {
      zone: 'neutral',
      players: [
        { type: 'you', x: 96, y: 25, note: 'You (C) \u2014 right shot' },
        { type: 'opponent', x: 104, y: 25, label: 'C', note: 'Left shot \u2014 beat you twice' },
      ],
      puck: { x: 100, y: 25 },
      ref: { x: 97, y: 18, label: 'LM' },
      arrows: [
        { from: { x: 97, y: 20 }, to: { x: 93, y: 23 }, style: 'dashed', label: 'LM on your forehand' }
      ],
      annotations: [
        { x: 108, y: 18, text: 'Lost backhand: \u2717 \u2717' }
      ]
    },
    gameContext: { period: 2, teamScore: 1, oppScore: 1, timeLeft: '10:15' },
    audioFolder: 'module2-scenario6-forehand-backhand',
    nextScenarioId: 'module2-scenario7'
  },
  {
    id: 'module2-scenario7',
    moduleId: 2,
    scenarioNum: 7,
    totalInModule: 7,
    title: 'Post-Draw Responsibility',
    coachCue: "The draw is over. You lost it. Your job now isn\'t to chase the puck \u2014 it\'s to prevent the counter. Get to the high slot, find the late man.",
    introSlides: [
      { title: 'Faceoffs Are Chess, Not Checkers', body: '"Winning the draw is about preparation, reads, and leverage \u2014 not just quick hands."' },
      { title: 'Read Before You React', body: '"Watch the linesman\'s body position. If they\'re leaning toward your side, they\'ll likely drop the puck closer to you \u2014 so attack with your forehand."' },
      { title: 'Win the Possession, Not Just the Draw', body: '"A \u201Cwon\u201D faceoff that goes to the other team isn\'t a win. Know where you\'re putting it."' }
    ],
    situation: 'You lose the offensive zone faceoff. The puck goes back to the opposing D-man. Your wingers are already in motion expecting a won draw.',
    question: 'What\'s your immediate responsibility?',
    answers: [
      { text: 'Chase the puck to the D-man', correct: false, feedback: 'You lost the draw \u2014 the play has changed. Chasing the D-man won\'t get it back, and your wingers are out of position. Your job now is to prevent the counter-attack. Get to the high slot, find the late man, and take away the middle of the ice. That\'s how you limit damage from a lost draw.' },
      { text: 'Call for a line change since the play is broken', correct: false, feedback: 'You lost the draw \u2014 the play has changed. Chasing the D-man won\'t get it back, and your wingers are out of position. Your job now is to prevent the counter-attack. Get to the high slot, find the late man, and take away the middle of the ice. That\'s how you limit damage from a lost draw.' },
      { text: 'Crash the net anyway \u2014 maybe there\'s a rebound', correct: false, feedback: 'You lost the draw \u2014 the play has changed. Chasing the D-man won\'t get it back, and your wingers are out of position. Your job now is to prevent the counter-attack. Get to the high slot, find the late man, and take away the middle of the ice. That\'s how you limit damage from a lost draw.' },
      { text: 'Recover to the high slot and pick up the late man', correct: true, feedback: 'The draw is over. Your job now is defensive structure. Get to the high slot, identify the most dangerous threat (usually the late forward), and take away the middle. Don\'t compound a lost draw with a bad recovery. Smart centers know the faceoff is just one play \u2014 what you do next matters just as much.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'you', x: 165, y: 25, note: 'You (C) \u2014 just lost draw' },
        { type: 'teammate', x: 172, y: 18, label: 'W', note: 'Winger in motion' },
        { type: 'teammate', x: 172, y: 35, label: 'W', note: 'Winger in motion' },
        { type: 'opponent', x: 180, y: 50, label: 'D', note: 'Has puck \u2014 looking to break out' },
        { type: 'opponent', x: 155, y: 35, label: 'F', note: 'Late man \u2014 dangerous' },
      ],
      puck: { x: 180, y: 50 },
      ref: { x: 165, y: 19, label: 'LM' },
      arrows: [
        { from: { x: 165, y: 25 }, to: { x: 155, y: 32 }, style: 'dashed', label: 'Recover to high slot' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 0, oppScore: 0, timeLeft: '6:30' },
    audioFolder: 'module2-scenario7-post-draw',
    nextScenarioId: null
  }
];
