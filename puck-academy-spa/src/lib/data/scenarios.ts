// Scenario type definitions and data

export interface Answer {
  text: string;
  correct: boolean;
  feedback: string;
}

export interface DiagramPlayer {
  type: 'you' | 'teammate' | 'opponent';
  x: number;
  y: number;
  label?: string;
}

export interface Diagram {
  viewBox?: string;
  zone: 'defensive' | 'offensive' | 'neutral';
  players: DiagramPlayer[];
  puck?: { x: number; y: number };
  arrows?: Array<{
    from: { x: number; y: number };
    to: { x: number; y: number };
    style?: 'solid' | 'dashed';
  }>;
}

export interface Scenario {
  id: string;
  moduleId: number;
  scenarioNum: number;
  totalInModule: number;
  title: string;
  situation: string;
  question: string;
  answers: Answer[];
  diagram: Diagram;
  nextScenarioId: string | null;
}

// Sample scenario data (would be migrated from existing JSON)
export const scenarios: Scenario[] = [
  {
    id: 'module1-scenario1',
    moduleId: 1,
    scenarioNum: 1,
    totalInModule: 7,
    title: 'Reading Pressure on Your D-Man',
    situation: 'Your team is defending in your own zone. The opponent has the puck behind your net and is looking to make a play. Your defenseman is battling for position. You\'re the center, positioned in the low slot.',
    question: 'What should you focus on?',
    answers: [
      {
        text: 'Chase the puck carrier behind the net',
        correct: false,
        feedback: 'Chasing behind the net leaves the slot wide open. Your D-man has the puck carrier - trust them and protect the dangerous area in front.'
      },
      {
        text: 'Stay in the slot and read the play',
        correct: true,
        feedback: 'Perfect! By staying in the slot, you\'re covering the most dangerous scoring area. You can read where the puck is going and react to support your D or pick up a free opponent.'
      },
      {
        text: 'Skate to the corner to help your D-man',
        correct: false,
        feedback: 'Going to the corner creates a 2-on-1 on the puck but leaves the middle of the ice exposed. One pass across and there\'s an open shooter.'
      },
      {
        text: 'Head to the front of the net for a rebound',
        correct: false,
        feedback: 'Getting to the net makes sense on offense, but you\'re defending! You need to cover the slot and be ready to block a pass or shot.'
      }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 35, y: 42 },
        { type: 'teammate', x: 15, y: 55, label: 'D' },
        { type: 'opponent', x: 20, y: 70 },
        { type: 'opponent', x: 45, y: 30 },
        { type: 'opponent', x: 50, y: 55 }
      ],
      puck: { x: 18, y: 68 }
    },
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
      {
        text: 'Join the corner battle to outnumber them',
        correct: false,
        feedback: 'Stacking the corner leaves the front of the net unprotected. If they win the battle, there\'s no one home to stop the play.'
      },
      {
        text: 'Position between the corner and the net',
        correct: true,
        feedback: 'Smart positioning! You\'re close enough to support if your winger wins the battle, but also cutting off the passing lane to the slot if the opponent gets the puck.'
      },
      {
        text: 'Stay at the top of the circles',
        correct: false,
        feedback: 'Too far from the action. You won\'t be able to help your winger or cut off a pass in time. Get closer to the play while staying in your lane.'
      },
      {
        text: 'Go to the front of the net',
        correct: false,
        feedback: 'Parking at the net is your goalie\'s territory. You\'re more useful cutting off passing lanes and being ready to transition if your team gets the puck.'
      }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 35, y: 35 },
        { type: 'teammate', x: 25, y: 60, label: 'LW' },
        { type: 'opponent', x: 28, y: 65 },
        { type: 'opponent', x: 45, y: 45 }
      ],
      puck: { x: 20, y: 65 }
    },
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
      {
        text: 'Pressure the puck carrier from behind',
        correct: false,
        feedback: 'Chasing the cycle is exhausting and ineffective. They\'ll just move the puck before you arrive. Let your D handle the boards.'
      },
      {
        text: 'Cover the slot and anticipate the pass to the middle',
        correct: true,
        feedback: 'Exactly right! The cycle is designed to open up a pass to the slot. By staying disciplined in the middle, you take away their best scoring opportunity.'
      },
      {
        text: 'Drop down to help your goalie',
        correct: false,
        feedback: 'You\'ll just screen your goalie and clog up their movement. Trust them to handle the shot - your job is to prevent it from getting through.'
      },
      {
        text: 'Move to the weak side to cover the far post',
        correct: false,
        feedback: 'The weak side isn\'t the threat right now. The danger is the slot - that\'s where the cycle is trying to create a scoring chance.'
      }
    ],
    diagram: {
      zone: 'defensive',
      players: [
        { type: 'you', x: 35, y: 40 },
        { type: 'teammate', x: 20, y: 50, label: 'D' },
        { type: 'teammate', x: 50, y: 50, label: 'D' },
        { type: 'opponent', x: 18, y: 65 },
        { type: 'opponent', x: 40, y: 30 },
        { type: 'opponent', x: 55, y: 60 }
      ],
      puck: { x: 16, y: 63 },
      arrows: [
        { from: { x: 16, y: 63 }, to: { x: 40, y: 30 }, style: 'dashed' }
      ]
    },
    nextScenarioId: null // End of sample scenarios
  }
];

// Get scenario by ID
export function getScenario(id: string): Scenario | undefined {
  return scenarios.find(s => s.id === id);
}

// Get scenarios for a module
export function getModuleScenarios(moduleId: number): Scenario[] {
  return scenarios.filter(s => s.moduleId === moduleId);
}

// Get first scenario of a module
export function getFirstScenario(moduleId: number): Scenario | undefined {
  return scenarios.find(s => s.moduleId === moduleId && s.scenarioNum === 1);
}
