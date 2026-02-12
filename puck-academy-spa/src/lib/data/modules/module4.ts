import type { Scenario } from '../scenarios';

// Module 4: Offensive Zone IQ — 7 scenarios
// Offensive end: goal at x=190, crease curves (190,32)→(178,42.5)→(190,53)
export const module4Scenarios: Scenario[] = [
  {
    id: 'module4-scenario1',
    moduleId: 4,
    scenarioNum: 1,
    totalInModule: 7,
    title: 'Net Front Presence',
    coachCue: "When the puck is down low, the net front is where you need to be. You take away the goalie\'s eyes, you\'re first to rebounds, and you create tip opportunities. Get to the hard area.",
    introSlides: [
      { title: 'Offense Is About Options', body: '"In the O-zone, your job isn\'t just to score — it\'s to create problems for the defense. Be in a spot where they have to make a choice."' },
      { title: 'Hard Areas vs. Soft Areas', body: '"The net front and slot are \'hard areas\' — high traffic, high reward. The perimeter is \'soft\' — safe but less dangerous. Know when to be where."' },
      { title: 'Think One Pass Ahead', body: '"Great offensive players don\'t just react — they anticipate. Where\'s the puck going next? Be there before the defense figures it out."' }
    ],
    situation: 'Your winger has the puck on the half wall below the circle. Your D-man is at the point. The opposing D is in the slot area. You\'re currently positioned at the high slot. Where should you go?',
    question: 'What\'s your best move to create a scoring chance?',
    answers: [
      { text: 'Drive to the net front to screen the goalie and create a tip/rebound opportunity', correct: true, feedback: 'When the puck is below the goal line or on the half wall, the net front is where you need to be. You take away the goalie\'s eyes, you\'re first to rebounds, and you create tip opportunities. The high slot can wait — get to the hard area when the puck is down low.' },
      { text: 'Stay high in the slot for a one-timer if the puck comes to the point', correct: false, feedback: 'Get to the hard area. When the puck is down low, the net front becomes the most dangerous place on the ice. Staying high doesn\'t put pressure on the D or the goalie. Drive the net — screen, tip, rebound. That\'s how centers score greasy goals.' },
      { text: 'Drop back to support the D-man at the point', correct: false, feedback: 'The D-man at the point has the puck — he doesn\'t need support. The net front does. Drive the net and be a threat where it counts.' },
      { text: 'Skate toward your winger to give a short passing option', correct: false, feedback: 'Crowding the puck carrier doesn\'t help. Spread the ice by going to the net front where you\'re a screen, tip, and rebound threat all at once.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'teammate', x: 185, y: 62, label: 'W', note: 'Puck on half wall' },
        { type: 'teammate', x: 140, y: 42, label: 'D', note: 'At the point' },
        { type: 'you', x: 160, y: 42, note: 'You — high slot', targetX: 178, targetY: 42 },
        { type: 'opponent', x: 168, y: 40, label: 'D', note: 'In slot area' },
        { type: 'opponent', x: 180, y: 55, label: 'D', note: 'On winger' }
      ],
      puck: { x: 185, y: 62 },
      arrows: [
        { from: { x: 160, y: 42 }, to: { x: 178, y: 42 }, style: 'solid', label: 'Drive the net' }
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
    title: 'Cycle Support — The Bumper Position',
    coachCue: "During a cycle, the \'bumper\' or high slot position is gold. You\'re open for one-timers, you can distribute to the point, and you keep the D honest in the middle. Hold your water in the slot.",
    introSlides: [
      { title: 'Offense Is About Options', body: '"In the O-zone, your job isn\'t just to score — it\'s to create problems for the defense. Be in a spot where they have to make a choice."' },
      { title: 'Hard Areas vs. Soft Areas', body: '"The net front and slot are \'hard areas\' — high traffic, high reward. The perimeter is \'soft\' — safe but less dangerous. Know when to be where."' },
      { title: 'Think One Pass Ahead', body: '"Great offensive players don\'t just react — they anticipate. Where\'s the puck going next? Be there before the defense figures it out."' }
    ],
    situation: 'Your winger is cycling behind the net with the puck. Your other winger is at the far post. D-man is at the point. The opposing D is tracking the cycle. Where should you position yourself?',
    question: 'What\'s the best spot for you as the cycle develops?',
    answers: [
      { text: 'Hold the "bumper" position in the high slot — between the circles', correct: true, feedback: 'The \'bumper\' or high slot position is gold during a cycle. You\'re open for one-timers, you can distribute to the point, and you keep the D honest in the middle. Too many players crowd the net or go low — hold your water in the slot.' },
      { text: 'Go to the net front to look for a pass from behind the net', correct: false, feedback: 'Find the soft ice. During a cycle, the bumper position (high slot between the circles) is where you belong. You\'ve got net front covered by your other winger — they need someone in the middle. That\'s you.' },
      { text: 'Skate down to help with the cycle behind the goal line', correct: false, feedback: 'Crowding the cycle doesn\'t help. You\'re needed in the slot where you can shoot, pass, or redistribute. Stay in the soft ice.' },
      { text: 'Move to the half wall to create a quick up option', correct: false, feedback: 'The half wall is perimeter — low danger. The slot is the highest-value real estate on the ice during a cycle. Stay there.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'teammate', x: 193, y: 48, label: 'W', note: 'Cycling behind net' },
        { type: 'teammate', x: 185, y: 30, label: 'W', note: 'Far post' },
        { type: 'teammate', x: 140, y: 42, label: 'D', note: 'At the point' },
        { type: 'you', x: 162, y: 42, note: 'You — bumper position' },
        { type: 'opponent', x: 175, y: 50, label: 'D', note: 'Tracking cycle' },
        { type: 'opponent', x: 170, y: 35, label: 'D', note: 'In lane' }
      ],
      puck: { x: 193, y: 48 },
      arrows: [
        { from: { x: 193, y: 48 }, to: { x: 162, y: 42 }, style: 'dashed', label: 'Pass to bumper' }
      ],
      annotations: []
    },
    gameContext: { period: 1, teamScore: 0, oppScore: 0, timeLeft: '8:15' },
    audioFolder: 'module4-cycle-support',
    nextScenarioId: 'module4-scenario3'
  },
  {
    id: 'module4-scenario3',
    moduleId: 4,
    scenarioNum: 3,
    totalInModule: 7,
    title: 'Finding Soft Ice',
    coachCue: "When you\'re covered, don\'t stand still — find the soft ice. Slide to the open space and suddenly you\'re a threat for a one-timer. Great offensive players don\'t stand in crowds.",
    introSlides: [
      { title: 'Offense Is About Options', body: '"In the O-zone, your job isn\'t just to score — it\'s to create problems for the defense. Be in a spot where they have to make a choice."' },
      { title: 'Hard Areas vs. Soft Areas', body: '"The net front and slot are \'hard areas\' — high traffic, high reward. The perimeter is \'soft\' — safe but less dangerous. Know when to be where."' },
      { title: 'Think One Pass Ahead', body: '"Great offensive players don\'t just react — they anticipate. Where\'s the puck going next? Be there before the defense figures it out."' }
    ],
    situation: 'Your D has the puck at the point. There\'s traffic in the middle of the ice — you\'re currently sandwiched between two defenders. The far side high slot is open. What should you do?',
    question: 'How do you get yourself open for a scoring chance?',
    answers: [
      { text: 'Slide to the open space on the far side for a one-timer opportunity', correct: true, feedback: 'When you\'re covered, don\'t stand still — find the soft ice. Sliding to the open space gives your D-man a shooting lane and puts you in one-timer position. Fighting through traffic just makes their job easier. Move to where the defense isn\'t.' },
      { text: 'Fight through the traffic to get to the net front', correct: false, feedback: 'Find the open ice. You\'re in traffic — nobody can get you the puck there. The far side high slot is wide open. Slide over there and suddenly you\'re a threat for a one-timer. Great offensive players don\'t stand in crowds. They find soft ice.' },
      { text: 'Stay where you are and call for the puck', correct: false, feedback: 'You\'re sandwiched between two defenders — no one can get the puck to you. Move to open ice where you\'re actually a threat.' },
      { text: 'Drop back to give the D another passing option at the point', correct: false, feedback: 'Dropping back takes you away from scoring areas. The open slot on the far side is a much more dangerous spot. Go there.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'teammate', x: 140, y: 42, label: 'D', note: 'Puck at point' },
        { type: 'you', x: 165, y: 42, note: 'You — in traffic', targetX: 165, targetY: 25 },
        { type: 'opponent', x: 162, y: 38, label: 'D', note: 'Covering you' },
        { type: 'opponent', x: 168, y: 48, label: 'D', note: 'Also covering you' },
        { type: 'teammate', x: 180, y: 60, label: 'W', note: 'Low support' }
      ],
      puck: { x: 140, y: 42 },
      arrows: [
        { from: { x: 165, y: 42 }, to: { x: 165, y: 25 }, style: 'solid', label: 'Slide to soft ice' },
        { from: { x: 140, y: 42 }, to: { x: 165, y: 25 }, style: 'dashed', label: 'One-timer lane' }
      ],
      annotations: []
    },
    gameContext: { period: 3, teamScore: 2, oppScore: 2, timeLeft: '3:45' },
    audioFolder: 'module4-soft-ice',
    nextScenarioId: 'module4-scenario4'
  },
  {
    id: 'module4-scenario4',
    moduleId: 4,
    scenarioNum: 4,
    totalInModule: 7,
    title: 'Backdoor Read',
    coachCue: "When the D overcommits to the puck side, the backdoor opens up. That\'s an easy goal if you time it right — sneak to the far post. Read the defense, not just the puck.",
    introSlides: [
      { title: 'Offense Is About Options', body: '"In the O-zone, your job isn\'t just to score — it\'s to create problems for the defense. Be in a spot where they have to make a choice."' },
      { title: 'Hard Areas vs. Soft Areas', body: '"The net front and slot are \'hard areas\' — high traffic, high reward. The perimeter is \'soft\' — safe but less dangerous. Know when to be where."' },
      { title: 'Think One Pass Ahead', body: '"Great offensive players don\'t just react — they anticipate. Where\'s the puck going next? Be there before the defense figures it out."' }
    ],
    situation: 'Your winger has the puck on the strong side half wall. Both opposing D have cheated toward the puck. The far post/backdoor is wide open. You\'re currently in the middle of the slot. What\'s your move?',
    question: 'How do you capitalize on the defensive overcommit?',
    answers: [
      { text: 'Sneak to the far post for a backdoor tap-in', correct: true, feedback: 'Great anticipation. When the D overcommits to the puck side, the backdoor opens up. That\'s an easy goal if you time it right — sneak to the far post and you\'ll get a tap-in. This is about reading the defense, not just the puck.' },
      { text: 'Move to the near side for a quick pass and shot', correct: false, feedback: 'Read the defense. Both D cheated to the strong side — the backdoor is wide open. Don\'t go where the defense already is. Sneak to the far post and your winger can slide it across for an easy finish.' },
      { text: 'Stay in the slot and wait for a centering pass', correct: false, feedback: 'The slot has coverage drifting back. The far post is wide open RIGHT NOW. Don\'t wait — read the overcommit and go backdoor.' },
      { text: 'Go to the point to give your winger an outlet', correct: false, feedback: 'You have a scoring opportunity. The backdoor is wide open because the D overcommitted. Going to the point is the safe play, not the smart play.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'teammate', x: 175, y: 60, label: 'W', note: 'Puck on strong side' },
        { type: 'you', x: 168, y: 42, note: 'You — reading defense', targetX: 182, targetY: 28 },
        { type: 'opponent', x: 172, y: 52, label: 'D', note: 'Cheated to puck' },
        { type: 'opponent', x: 170, y: 48, label: 'D', note: 'Also cheated strong side' },
        { type: 'teammate', x: 140, y: 42, label: 'D', note: 'At point' }
      ],
      puck: { x: 175, y: 60 },
      arrows: [
        { from: { x: 168, y: 42 }, to: { x: 182, y: 28 }, style: 'solid', label: 'Sneak backdoor' },
        { from: { x: 175, y: 60 }, to: { x: 182, y: 28 }, style: 'dashed', label: 'Cross-ice pass' }
      ],
      annotations: []
    },
    gameContext: { period: 2, teamScore: 0, oppScore: 1, timeLeft: '14:20' },
    audioFolder: 'module4-backdoor',
    nextScenarioId: 'module4-scenario5'
  },
  {
    id: 'module4-scenario5',
    moduleId: 4,
    scenarioNum: 5,
    totalInModule: 7,
    title: 'Screen vs. Deflection',
    coachCue: "A tip changes everything. The goalie is set for a shot from the point — a deflection changes the angle and speed completely. Get in the lane, stick on the ice, and redirect it.",
    introSlides: [
      { title: 'Offense Is About Options', body: '"In the O-zone, your job isn\'t just to score — it\'s to create problems for the defense. Be in a spot where they have to make a choice."' },
      { title: 'Hard Areas vs. Soft Areas', body: '"The net front and slot are \'hard areas\' — high traffic, high reward. The perimeter is \'soft\' — safe but less dangerous. Know when to be where."' },
      { title: 'Think One Pass Ahead', body: '"Great offensive players don\'t just react — they anticipate. Where\'s the puck going next? Be there before the defense figures it out."' }
    ],
    situation: 'Your D is winding up for a point shot. Your winger is fighting at the net front. There\'s a clear shooting lane. You\'re positioned below the shot line. What should you do?',
    question: 'How do you maximize the scoring chance on this point shot?',
    answers: [
      { text: 'Move into the shooting lane with stick on the ice for a tip', correct: true, feedback: 'That\'s high-IQ offense. A tip changes everything. The goalie is set for a shot from the point — a deflection changes the angle and speed completely. Get in the lane, stick on the ice, and redirect it. Your winger\'s already screening. You tip.' },
      { text: 'Get directly in front of the goalie to screen him', correct: false, feedback: 'Your winger already has the screen covered. What the goalie can\'t handle is a tip that changes the angle. Get into the shooting lane with your stick on the ice. A good tip is almost impossible to save.' },
      { text: 'Stay low for a rebound off the far pad', correct: false, feedback: 'Rebounds are plan B. Plan A is tipping the shot and changing the angle entirely. Get into the lane with your stick down.' },
      { text: 'Clear out to give the shooter a better lane', correct: false, feedback: 'The lane is already clear enough. Your job is to be IN the lane to redirect the shot, not out of it. A deflection is the highest-danger play here.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'teammate', x: 140, y: 42, label: 'D', note: 'Winding up for shot' },
        { type: 'teammate', x: 180, y: 45, label: 'W', note: 'Screening at net' },
        { type: 'you', x: 165, y: 48, note: 'You — below shot line', targetX: 165, targetY: 42 },
        { type: 'opponent', x: 170, y: 35, label: 'D', note: 'In front' },
        { type: 'opponent', x: 175, y: 55, label: 'D', note: 'Net front battle' }
      ],
      puck: { x: 140, y: 42 },
      arrows: [
        { from: { x: 140, y: 42 }, to: { x: 190, y: 42 }, style: 'dashed', label: 'Shot from point' },
        { from: { x: 165, y: 48 }, to: { x: 165, y: 42 }, style: 'solid', label: 'Get in lane for tip' }
      ],
      annotations: []
    },
    gameContext: { period: 3, teamScore: 1, oppScore: 1, timeLeft: '6:10' },
    audioFolder: 'module4-screen-tip',
    nextScenarioId: 'module4-scenario6'
  },
  {
    id: 'module4-scenario6',
    moduleId: 4,
    scenarioNum: 6,
    totalInModule: 7,
    title: 'High Slot Threat',
    coachCue: "When you have time in the slot, the answer is almost always shoot. High slot shots with traffic in front are how you score. The defense gave you that lane — don\'t give it back by over-passing.",
    introSlides: [
      { title: 'Offense Is About Options', body: '"In the O-zone, your job isn\'t just to score — it\'s to create problems for the defense. Be in a spot where they have to make a choice."' },
      { title: 'Hard Areas vs. Soft Areas', body: '"The net front and slot are \'hard areas\' — high traffic, high reward. The perimeter is \'soft\' — safe but less dangerous. Know when to be where."' },
      { title: 'Think One Pass Ahead', body: '"Great offensive players don\'t just react — they anticipate. Where\'s the puck going next? Be there before the defense figures it out."' }
    ],
    situation: 'Your winger is down low and spots you open in the high slot. He\'s about to pass it to you. The defense has collapsed low. You\'ll have time and space. What\'s your play when you receive the puck?',
    question: 'You receive the pass in the high slot with time. What do you do?',
    answers: [
      { text: 'Shoot immediately — you have a clear lane to the net', correct: true, feedback: 'Shooters shoot. When you have time in the slot, the answer is almost always shoot. High slot shots with traffic in front are how you score. The defense collapsed low — they gave you that lane. Don\'t give it back by over-passing.' },
      { text: 'Look to pass to your D-man at the point for a one-timer', correct: false, feedback: 'Take the shot. You\'ve got time and a lane in the high slot — that\'s a prime scoring area. Over-passing from here is a common mistake. The defense gave you space. Use it. Put it on net.' },
      { text: 'Carry it toward the net for a better angle', correct: false, feedback: 'Walking in closes lanes as defenders recover. You have a lane NOW from the slot. Shoot it before the window closes.' },
      { text: 'Pass back down low to keep the cycle going', correct: false, feedback: 'You have a shooting lane in the highest-danger area on the ice and you\'re passing it BACK? Shoot. Good things happen from slot shots.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'teammate', x: 190, y: 60, label: 'W', note: 'Down low — passing' },
        { type: 'you', x: 160, y: 42, note: 'You — high slot, open!' },
        { type: 'teammate', x: 140, y: 30, label: 'D', note: 'At point' },
        { type: 'opponent', x: 175, y: 55, label: 'D', note: 'Collapsed low' },
        { type: 'opponent', x: 178, y: 38, label: 'D', note: 'Collapsed low' }
      ],
      puck: { x: 190, y: 60 },
      arrows: [
        { from: { x: 190, y: 60 }, to: { x: 160, y: 42 }, style: 'dashed', label: 'Pass to slot' },
        { from: { x: 160, y: 42 }, to: { x: 190, y: 42 }, style: 'solid', label: 'SHOOT' }
      ],
      annotations: []
    },
    gameContext: { period: 1, teamScore: 0, oppScore: 0, timeLeft: '4:50' },
    audioFolder: 'module4-high-slot',
    nextScenarioId: 'module4-scenario7'
  },
  {
    id: 'module4-scenario7',
    moduleId: 4,
    scenarioNum: 7,
    totalInModule: 7,
    title: 'O-Zone Turnover Recovery',
    coachCue: "When the puck turns over in the O-zone, your first job is to sprint back through the middle. The center takes the most dangerous ice. Get back, protect the slot, then sort out assignments.",
    introSlides: [
      { title: 'Offense Is About Options', body: '"In the O-zone, your job isn\'t just to score — it\'s to create problems for the defense. Be in a spot where they have to make a choice."' },
      { title: 'Hard Areas vs. Soft Areas', body: '"The net front and slot are \'hard areas\' — high traffic, high reward. The perimeter is \'soft\' — safe but less dangerous. Know when to be where."' },
      { title: 'Think One Pass Ahead', body: '"Great offensive players don\'t just react — they anticipate. Where\'s the puck going next? Be there before the defense figures it out."' }
    ],
    situation: 'Your team just turned the puck over in the offensive zone. The opposing D has it behind their net and their forward is already breaking out. Your D got caught up ice. What\'s your immediate responsibility?',
    question: 'The puck is turned over. What do you do first?',
    answers: [
      { text: 'Sprint back through the middle to cover the most dangerous ice', correct: true, feedback: 'Two-way hockey. When the puck turns over, your first job is to get back through the middle. The center takes the most dangerous ice. Your D got caught up — you need to be the first man back. Backcheck hard through the middle, then pick up responsibility. That\'s how you prevent odd-man rushes.' },
      { text: 'Forecheck hard to try to force another turnover', correct: false, feedback: 'Get back first. On turnovers, the center\'s first job is to sprint back through the middle. Forechecking after a turnover usually just takes you out of the play. Get back, protect the slot, then sort out assignments.' },
      { text: 'Pick up the closest opponent and stay with him', correct: false, feedback: 'Don\'t pick up a man yet — get to the middle first. If you chase a man along the boards while the slot is open, you\'re leaving the most dangerous ice unprotected.' },
      { text: 'Go to the boards to cut off the breakout pass', correct: false, feedback: 'The middle is more dangerous than the boards. Get back through the center lane, protect the slot, then worry about the breakout. Your D is caught — you\'re the safety net.' }
    ],
    diagram: {
      zone: 'offensive',
      players: [
        { type: 'opponent', x: 193, y: 42, label: 'D', note: 'Has puck — breaking out' },
        { type: 'opponent', x: 165, y: 30, label: 'F', note: 'Already breaking out' },
        { type: 'you', x: 170, y: 55, note: 'You — turnover! Get back', targetX: 100, targetY: 42 },
        { type: 'teammate', x: 155, y: 25, label: 'D', note: 'Caught up ice' },
        { type: 'teammate', x: 160, y: 65, label: 'W', note: 'Also transitioning' }
      ],
      puck: { x: 193, y: 42 },
      arrows: [
        { from: { x: 170, y: 55 }, to: { x: 100, y: 42 }, style: 'solid', label: 'Sprint through middle' }
      ],
      annotations: []
    },
    gameContext: { period: 3, teamScore: 2, oppScore: 3, timeLeft: '2:15' },
    audioFolder: 'module4-ozone-turnover',
    nextScenarioId: null
  }
];
