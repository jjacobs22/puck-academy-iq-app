<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { fade, fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import RinkDiagram from './RinkDiagram.svelte';
  import AnswerButtons from './AnswerButtons.svelte';
  import FeedbackPanel from './FeedbackPanel.svelte';
  import VoiceToggle from './VoiceToggle.svelte';
  import GameContext from './GameContext.svelte';
  import DecisionClock from './DecisionClock.svelte';
  import CelebrationOverlay from './CelebrationOverlay.svelte';
  import StartGate from './StartGate.svelte';
  import ModuleResults from './ModuleResults.svelte';
  import IntroSlidesModal from './IntroSlidesModal.svelte';
  import { moduleScores, recordActivity, MODULE_CONFIG } from '$lib/stores/progress';
  import { showFeedback, feedbackData, showAnswerFeedback, hideFeedback, navigateWithTransition, toasts } from '$lib/stores/ui';
  import { audioManager, voiceEnabled } from '$lib/services/audio';
  import { playCorrect, playIncorrect, playCombo as playComboSFX, playTimeout } from '$lib/services/soundEffects';
  import {
    sessionXP,
    combo,
    lastXPGain,
    awardXP,
    incrementCombo,
    resetCombo,
    resetSession,
    audioUnlocked,
    recordScenarioResult,
    scenarioResults
  } from '$lib/stores/gameSession';
  import type { Scenario } from '$lib/data/scenarios';

  export let scenario: Scenario;

  // State
  let selectedAnswer: number | null = null;
  let answersDisabled = false;
  let showStartGate = false;
  let showCelebration = false;
  let showResults = false;
  let clockRunning = false;
  let diagramAnimated = true;
  let showIntroSlides = false;

  // Phases: gate → study → question → feedback → results
  let scenarioPhase: 'gate' | 'study' | 'question' | 'feedback' | 'results' = 'gate';

  // Refs
  let clockComponent: DecisionClock;
  let rinkDiagram: RinkDiagram;

  // Audio-synced movement state
  let hasMovementCues = false;
  let revealedCues: Set<number> = new Set();
  $: hasMovementCues = !!(scenario.movementCues && scenario.movementCues.length > 0);

  // Check if this is the first scenario in session
  $: isFirstScenario = scenario.scenarioNum === 1;

  onMount(() => {
    // Preload audio for this scenario
    audioManager.preload(scenario.id);

    // Show start gate on first scenario if audio not yet unlocked
    if (isFirstScenario && !$audioUnlocked) {
      showStartGate = true;
      scenarioPhase = 'gate';
    } else {
      enterStudyPhase();
    }

    return () => {
      audioManager.clearTimeCallbacks();
      audioManager.stop();
    };
  });

  function handleGateStart() {
    showStartGate = false;
    enterStudyPhase();
  }

  /** Study phase: show diagram + situation, let user absorb at their own pace */
  function enterStudyPhase() {
    scenarioPhase = 'study';
    diagramAnimated = true;
    revealedCues = new Set();

    // Clean up any previous time callbacks
    audioManager.clearTimeCallbacks();

    // Play setup narration
    if ($voiceEnabled) {
      audioManager.play(scenario.id, 'setup');

      // Register movement cue callbacks if scenario has them
      if (hasMovementCues && scenario.movementCues) {
        const cues = scenario.movementCues;
        audioManager.onTimeUpdate((currentTime: number) => {
          for (const cue of cues) {
            if (currentTime >= cue.triggerAtSecond && !revealedCues.has(cue.playerIndex)) {
              revealedCues.add(cue.playerIndex);
              revealedCues = revealedCues;
              if (rinkDiagram) {
                rinkDiagram.revealMovement(cue.playerIndex);
              }
            }
          }
        });
      }
    } else if (hasMovementCues) {
      // Audio off: reveal movements with staggered CSS timing as fallback
      const cues = scenario.movementCues!;
      cues.forEach((cue, i) => {
        setTimeout(() => {
          if (rinkDiagram) {
            rinkDiagram.revealMovement(cue.playerIndex);
          }
        }, 800 + i * 600); // 0.8s base + 0.6s between each
      });
    }
  }

  /** User clicked "I'm Ready" — transition to the timed question */
  function handleReady() {
    scenarioPhase = 'question';
    diagramAnimated = false; // no re-animation on diagram

    // Stop movement tracking and reveal all remaining movements
    audioManager.clearTimeCallbacks();
    if (rinkDiagram && hasMovementCues) {
      rinkDiagram.revealAllMovements();
    }

    // Play prompt narration
    if ($voiceEnabled) {
      audioManager.play(scenario.id, 'prompt');
    }

    // Start the decision clock after a brief beat
    setTimeout(() => {
      clockRunning = true;
      if (clockComponent) clockComponent.start();
    }, 400);
  }

  function handleAnswer(event: CustomEvent<{ index: number }>) {
    if (answersDisabled) return;

    const { index } = event.detail;
    const elapsed = clockComponent ? clockComponent.stop() : 15;

    processAnswer(index, elapsed);
  }

  function handleTimeout() {
    // Pick a random wrong answer
    const wrongIndices = scenario.answers
      .map((a, i) => ({ correct: a.correct, index: i }))
      .filter(a => !a.correct)
      .map(a => a.index);

    const randomWrong = wrongIndices[Math.floor(Math.random() * wrongIndices.length)];

    playTimeout();
    processAnswer(randomWrong, 15, true);
  }

  function processAnswer(index: number, timeSeconds: number, wasTimeout: boolean = false) {
    selectedAnswer = index;
    answersDisabled = true;
    clockRunning = false;

    const answer = scenario.answers[index];
    const isCorrect = answer.correct;

    // Save score
    moduleScores.saveScore(scenario.moduleId, scenario.scenarioNum, isCorrect);

    // Update streak
    const streakResult = recordActivity();
    if (streakResult.milestone) {
      toasts.show(`${streakResult.milestone} day streak!`, 'success');
    }

    // XP and combo
    let xpGain = { base: 0, speed: 0, combo: 0, total: 0 };
    if (isCorrect) {
      incrementCombo();
      xpGain = awardXP(timeSeconds);

      // SFX
      playCorrect();
      if ($combo >= 2) {
        setTimeout(() => playComboSFX($combo), 200);
      }

      // Show celebration
      showCelebration = true;
      setTimeout(() => {
        showCelebration = false;
      }, 2000);
    } else {
      resetCombo();
      playIncorrect();
    }

    // Record result for module summary
    recordScenarioResult({
      scenarioId: scenario.id,
      correct: isCorrect,
      timeSeconds,
      xpEarned: xpGain.total
    });

    // Play feedback voice
    if ($voiceEnabled) {
      setTimeout(() => {
        audioManager.play(scenario.id, isCorrect ? 'correct' : 'incorrect');
      }, 400);
    }

    // Show feedback
    const feedbackText = wasTimeout
      ? `Too slow! ${answer.feedback}`
      : answer.feedback;

    scenarioPhase = 'feedback';
    showAnswerFeedback(isCorrect, feedbackText, index);
  }

  function handleContinue() {
    hideFeedback();
    navigateWithTransition('forward');

    if (scenario.nextScenarioId) {
      goto(`/scenario/${scenario.nextScenarioId}`);
    } else {
      // Last scenario — show results
      scenarioPhase = 'results';
      showResults = true;
    }
  }

  function handleBackToHub() {
    hideFeedback();
    navigateWithTransition('back');
    goto('/hub');
  }
</script>

<!-- Start Gate -->
{#if showStartGate}
  <StartGate
    moduleName={MODULE_CONFIG[scenario.moduleId]?.name || 'Hockey IQ'}
    totalScenarios={scenario.totalInModule}
    on:start={handleGateStart}
  />
{/if}

<!-- Module Results -->
{#if showResults}
  <ModuleResults
    moduleId={scenario.moduleId}
    moduleName={MODULE_CONFIG[scenario.moduleId]?.name || 'Module'}
  />
{/if}

<!-- Main Scenario Flow -->
{#if !showStartGate && !showResults}
  <div class="scenario-container" in:fly={{ y: 30, duration: 400, easing: quintOut }}>
    <!-- Top HUD: XP + Clock -->
    <div class="top-hud" in:fade={{ delay: 50, duration: 300 }}>
      <div class="xp-display">
        <span class="xp-icon">XP</span>
        <span class="xp-value">{$sessionXP}</span>
        {#if $combo >= 2}
          <span class="combo-indicator">
            {Math.min(1 + $combo * 0.5, 3)}x
          </span>
        {/if}
      </div>

      {#if scenarioPhase === 'question' || scenarioPhase === 'feedback'}
        <DecisionClock
          bind:this={clockComponent}
          duration={15}
          running={clockRunning}
          on:timeout={handleTimeout}
        />
      {/if}
    </div>

    <!-- Scenario Header -->
    <div class="scenario-header" in:fade={{ delay: 100, duration: 300 }}>
      <span class="scenario-badge">
        Scenario {scenario.scenarioNum} of {scenario.totalInModule}
      </span>
      <h1 class="scenario-title">{scenario.title}</h1>
    </div>

    <!-- Game Context Banner -->
    <div in:fade={{ delay: 120, duration: 300 }}>
      <GameContext context={scenario.gameContext} />
    </div>

    <!-- Rink Diagram -->
    <div class="diagram-wrapper" in:scale={{ delay: 150, duration: 400, start: 0.95 }}>
      <RinkDiagram
        bind:this={rinkDiagram}
        diagram={scenario.diagram}
        animated={diagramAnimated}
        externalMovementControl={hasMovementCues}
      />
    </div>

    <!-- Inline coach cue (replaces blocking 3-slide intro) -->
    {#if scenario.coachCue}
      <div class="coach-cue" in:fly={{ y: 20, delay: 180, duration: 300 }}>
        <div class="coach-cue-avatar" aria-hidden="true">🏒</div>
        <p class="coach-cue-text">{scenario.coachCue}</p>
      </div>
    {/if}

    <!-- Situation Text (does more work — label + copy) -->
    <div class="situation-box" in:fly={{ y: 20, delay: 200, duration: 300 }}>
      <p class="situation-label">Situation</p>
      <p class="situation-text">{scenario.situation}</p>
    </div>

    <!-- Optional "Learn the Basics" → 3-slide intro (no longer blocking) -->
    {#if scenario.introSlides?.length && scenarioPhase === 'study'}
      <div class="learn-basics-wrap" in:fly={{ y: 20, delay: 220, duration: 300 }}>
        <button type="button" class="learn-basics-link" on:click={() => (showIntroSlides = true)}>
          Learn the Basics
        </button>
      </div>
    {/if}

    <!-- === STUDY PHASE: "I'm Ready" button === -->
    {#if scenarioPhase === 'study'}
      <div class="study-phase" in:fly={{ y: 20, delay: 400, duration: 400 }}>
        <p class="study-hint">Study the diagram above. When you understand the situation...</p>
        <button class="ready-button" on:click={handleReady}>
          I'm Ready
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    {/if}

    <!-- === QUESTION PHASE: Question + Answers === -->
    {#if scenarioPhase === 'question' || scenarioPhase === 'feedback'}
      <div class="question-section" in:fly={{ y: 20, delay: 100, duration: 300 }}>
        <h2 class="question-text">{scenario.question}</h2>
      </div>

      <div class="answers-section" in:fly={{ y: 20, delay: 150, duration: 300 }}>
        <AnswerButtons
          answers={scenario.answers}
          disabled={answersDisabled}
          {selectedAnswer}
          on:answer={handleAnswer}
        />
      </div>
    {/if}

    <!-- Voice Toggle -->
    <VoiceToggle />
  </div>
{/if}

<!-- Celebration Overlay -->
{#if showCelebration && $lastXPGain}
  <CelebrationOverlay
    xpGain={$lastXPGain}
    comboCount={$combo}
  />
{/if}

<!-- Optional intro slides modal (Learn the Basics) -->
<IntroSlidesModal
  slides={scenario.introSlides || []}
  open={showIntroSlides}
  on:close={() => (showIntroSlides = false)}
/>

<!-- Feedback Panel (overlay) -->
{#if $showFeedback && $feedbackData}
  <FeedbackPanel
    correct={$feedbackData.correct}
    explanation={$feedbackData.explanation}
    onContinue={handleContinue}
    onBackToHub={handleBackToHub}
    hasNext={!!scenario.nextScenarioId}
    xpGain={$lastXPGain}
    comboCount={$combo}
  />
{/if}

<style>
  .scenario-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    padding-bottom: var(--spacing-xl);
  }

  .top-hud {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-xs) 0;
  }

  .xp-display {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .xp-icon {
    background: linear-gradient(135deg, #FFD700, #DAA520);
    color: #4A3000;
    font-size: 0.65rem;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: var(--radius-sm);
  }

  .xp-value {
    font-family: var(--font-header);
    font-size: 1.25rem;
    color: #FFD700;
  }

  .combo-indicator {
    background: linear-gradient(135deg, #8B5CF6, #6D28D9);
    color: white;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: var(--radius-full);
    animation: combo-pulse 1s ease-in-out infinite;
  }

  @keyframes combo-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  .scenario-header {
    text-align: center;
  }

  .scenario-badge {
    display: inline-block;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--silver);
    margin-bottom: var(--spacing-xs);
  }

  .scenario-title {
    font-size: 1.5rem;
    line-height: 1.2;
  }

  .diagram-wrapper {
    background: rgba(255, 255, 255, 0.03);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  /* Inline coach cue (mockup: red left border, avatar, italic) */
  .coach-cue {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px 18px;
    background: rgba(200, 16, 46, 0.12);
    border-left: 3px solid var(--accent-red);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
  }

  .coach-cue-avatar {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, var(--accent-red), #8B0000);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    flex-shrink: 0;
  }

  .coach-cue-text {
    font-size: 0.95rem;
    line-height: 1.5;
    font-style: italic;
    color: var(--ice-blue);
    margin: 0;
  }

  .situation-box {
    background: rgba(232, 244, 248, 0.08);
    border-left: 3px solid var(--ice-blue);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
  }

  .situation-label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent-red);
    font-weight: 600;
    margin: 0 0 6px;
  }

  .situation-text {
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
    color: var(--ice-blue);
  }

  .learn-basics-wrap {
    padding: 0 0 var(--spacing-xs);
  }

  .learn-basics-link {
    background: none;
    border: none;
    color: var(--silver);
    font-size: 0.85rem;
    text-decoration: underline;
    cursor: pointer;
    padding: 0;
  }

  .learn-basics-link:hover {
    color: var(--ice-blue);
  }

  /* === Study Phase === */
  .study-phase {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md) 0;
  }

  .study-hint {
    font-size: 0.85rem;
    color: var(--silver);
    text-align: center;
    margin: 0;
  }

  .ready-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #10B981, #059669);
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
    font-family: var(--font-header);
    padding: 14px 36px;
    border: none;
    border-radius: var(--radius-full);
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .ready-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
  }

  .ready-button:active {
    transform: translateY(0);
  }

  /* === Question phase === */
  .question-section {
    text-align: center;
  }

  .question-text {
    font-size: 1.15rem;
    font-family: var(--font-body);
    font-weight: 600;
  }

  .answers-section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  @media (prefers-reduced-motion: reduce) {
    .combo-indicator {
      animation: none;
    }
  }
</style>
