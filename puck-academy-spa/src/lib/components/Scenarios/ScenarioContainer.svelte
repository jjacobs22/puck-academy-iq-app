<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { fade, fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import RinkDiagram from './RinkDiagram.svelte';
  import AnswerButtons from './AnswerButtons.svelte';
  import FeedbackPanel from './FeedbackPanel.svelte';
  import VoiceToggle from './VoiceToggle.svelte';
  import { moduleScores, recordActivity } from '$lib/stores/progress';
  import { showFeedback, feedbackData, showAnswerFeedback, hideFeedback, navigateWithTransition, toasts } from '$lib/stores/ui';
  import { audioManager, voiceEnabled } from '$lib/services/audio';
  import type { Scenario } from '$lib/data/scenarios';

  export let scenario: Scenario;

  let selectedAnswer: number | null = null;
  let answersDisabled = false;

  onMount(() => {
    // Preload audio for this scenario
    audioManager.preload(scenario.id);

    // Auto-play setup narration after short delay
    setTimeout(() => {
      if ($voiceEnabled) {
        audioManager.play(scenario.id, 'setup');
      }
    }, 500);

    return () => {
      audioManager.stop();
    };
  });

  function handleAnswer(event: CustomEvent<{ index: number }>) {
    const { index } = event.detail;
    selectedAnswer = index;
    answersDisabled = true;

    const answer = scenario.answers[index];
    const isCorrect = answer.correct;

    // Save score
    moduleScores.saveScore(scenario.moduleId, scenario.scenarioNum, isCorrect);

    // Update streak
    const streakResult = recordActivity();
    if (streakResult.milestone) {
      toasts.show(`🔥 ${streakResult.milestone} day streak!`, 'success');
    }

    // Play feedback audio
    if ($voiceEnabled) {
      audioManager.play(scenario.id, isCorrect ? 'correct' : 'incorrect');
    }

    // Show feedback panel
    showAnswerFeedback(isCorrect, answer.feedback, index);
  }

  function handleContinue() {
    hideFeedback();
    navigateWithTransition('forward');

    // Navigate to next scenario or back to hub
    if (scenario.nextScenarioId) {
      goto(`/scenario/${scenario.nextScenarioId}`);
    } else {
      goto('/hub');
    }
  }

  function handleBackToHub() {
    hideFeedback();
    navigateWithTransition('back');
    goto('/hub');
  }
</script>

<div class="scenario-container" in:fly={{ y: 30, duration: 400, easing: quintOut }}>
  <!-- Scenario Header -->
  <div class="scenario-header" in:fade={{ delay: 100, duration: 300 }}>
    <span class="scenario-badge">
      Scenario {scenario.scenarioNum} of {scenario.totalInModule}
    </span>
    <h1 class="scenario-title">{scenario.title}</h1>
  </div>

  <!-- Rink Diagram -->
  <div class="diagram-wrapper" in:scale={{ delay: 150, duration: 400, start: 0.95 }}>
    <RinkDiagram diagram={scenario.diagram} />
  </div>

  <!-- Situation Text -->
  <div class="situation-box" in:fly={{ y: 20, delay: 200, duration: 300 }}>
    <p class="situation-text">{scenario.situation}</p>
  </div>

  <!-- Question -->
  <div class="question-section" in:fly={{ y: 20, delay: 250, duration: 300 }}>
    <h2 class="question-text">{scenario.question}</h2>
  </div>

  <!-- Answer Buttons -->
  <div class="answers-section" in:fly={{ y: 20, delay: 300, duration: 300 }}>
    <AnswerButtons
      answers={scenario.answers}
      disabled={answersDisabled}
      {selectedAnswer}
      on:answer={handleAnswer}
    />
  </div>

  <!-- Voice Toggle -->
  <VoiceToggle />
</div>

<!-- Feedback Panel (overlay) -->
{#if $showFeedback && $feedbackData}
  <FeedbackPanel
    correct={$feedbackData.correct}
    explanation={$feedbackData.explanation}
    onContinue={handleContinue}
    onBackToHub={handleBackToHub}
    hasNext={!!scenario.nextScenarioId}
  />
{/if}

<style>
  .scenario-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    padding-bottom: var(--spacing-xl);
  }

  .scenario-header {
    text-align: center;
  }

  .scenario-badge {
    display: inline-block;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--silver);
    margin-bottom: var(--spacing-xs);
  }

  .scenario-title {
    font-size: 1.75rem;
    line-height: 1.2;
  }

  .diagram-wrapper {
    background: white;
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-md);
  }

  .situation-box {
    background: rgba(232, 244, 248, 0.1);
    border-left: 4px solid var(--ice-blue);
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
  }

  .situation-text {
    font-size: 1rem;
    line-height: 1.6;
    margin: 0;
  }

  .question-section {
    text-align: center;
  }

  .question-text {
    font-size: 1.25rem;
    font-family: var(--font-body);
    font-weight: 600;
  }

  .answers-section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
</style>
