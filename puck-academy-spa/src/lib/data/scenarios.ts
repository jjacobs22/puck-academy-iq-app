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
  faded?: boolean;
  targetX?: number;
  targetY?: number;
  note?: string;
}

/** Optional ref/linesman position (e.g. for faceoff scenarios where audio mentions "watch the ref") */
export interface DiagramRef {
  x: number;
  y: number;
  label?: string;
}

export interface Diagram {
  viewBox?: string;
  zone: 'defensive' | 'offensive' | 'neutral';
  players: DiagramPlayer[];
  puck?: { x: number; y: number };
  ref?: DiagramRef;
  arrows?: Array<{
    from: { x: number; y: number };
    to: { x: number; y: number };
    style?: 'solid' | 'dashed';
    label?: string;
  }>;
  annotations?: Array<{
    x: number;
    y: number;
    text: string;
  }>;
}

export interface GameContext {
  period: number;
  teamScore: number;
  oppScore: number;
  timeLeft: string;
}

/** Optional intro slides (theory) — shown via "Learn the Basics" link instead of blocking the scenario */
export interface IntroSlide {
  title: string;
  body: string;
}

/** Timing cue for syncing a player's movement arrow with setup audio */
export interface MovementCue {
  playerIndex: number;      // index in diagram.players[]
  triggerAtSecond: number;  // seconds into setup audio when this movement should appear
}

/** One step of the correct-play animation (one player moving along a path) */
export interface CorrectPlayStep {
  playerIndex: number;   // which player in diagram.players[]
  path: string;          // SVG path string (M/C/Q) describing the movement curve
  durationMs: number;    // how long this player's movement takes
  delayMs: number;       // delay before starting (for sequencing multiple players)
}

/** Correct-play animation shown on the diagram during the feedback phase */
export interface CorrectPlay {
  steps: CorrectPlayStep[];
  puckPath?: string;         // optional SVG path for puck movement
  puckDelayMs?: number;      // delay before puck starts moving
  puckDurationMs?: number;   // duration of puck movement
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
  gameContext: GameContext;
  audioFolder: string;
  nextScenarioId: string | null;
  /** Short coach framing cue shown inline before the situation (replaces 3-slide intro) */
  coachCue?: string;
  /** Optional 3-slide theory intro; linked as "Learn the Basics" instead of blocking */
  introSlides?: IntroSlide[];
  /** Optional timing cues to sync player movement arrows with setup audio narration */
  movementCues?: MovementCue[];
  /** Optional animation of the correct play, shown on the diagram during feedback */
  correctPlay?: CorrectPlay;
}

// ── RINK COORDINATE REFERENCE (viewBox 0 0 200 85) ──
// End boards:    x=4 (left), x=196 (right)
// Goal lines:   x=10 (left), x=190 (right)
// Blue lines:   x=65 (left), x=135 (right)
// Center line:  x=100
// Net center:   (10, 42.5) left, (190, 42.5) right
// Goal crease:  curves (10,32) → peak ~(22,42.5) → (10,53)
// "Behind net":  x=5–8, y≈35–50  (between boards and goal line)
// "Net front":   x=12–22, y≈35–50
// "Low slot":    x=25–40, y≈35–50
// "High slot":   x=40–55, y≈30–55
// "Point":       x=55–65
// "Corner" (bot): ~(10–15, 70–75)
// "Corner" (top): ~(10–15, 10–15)
// Faceoff dots:  (35,25), (35,60), (165,25), (165,60)

// Import all module scenarios
import { module1Scenarios } from './modules/module1';
import { module2Scenarios } from './modules/module2';
import { module3Scenarios } from './modules/module3';
import { module4Scenarios } from './modules/module4';
import { module5Scenarios } from './modules/module5';
import { module6Scenarios } from './modules/module6';

// Combined scenario list — all 43 scenarios across 6 modules
export const scenarios: Scenario[] = [
  ...module1Scenarios,
  ...module2Scenarios,
  ...module3Scenarios,
  ...module4Scenarios,
  ...module5Scenarios,
  ...module6Scenarios,
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
