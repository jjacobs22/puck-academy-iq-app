<script lang="ts">
  import { fade, fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  export let correct: boolean;
  export let explanation: string;
  export let onContinue: () => void;
  export let onBackToHub: () => void;
  export let hasNext: boolean;
</script>

<div class="feedback-overlay" transition:fade={{ duration: 200 }}>
  <div
    class="feedback-panel"
    class:correct
    class:incorrect={!correct}
    transition:fly={{ y: 100, duration: 400, easing: quintOut }}
  >
    <!-- Result Header -->
    <div class="result-header">
      <div class="result-icon" in:scale={{ delay: 100, duration: 300 }}>
        {correct ? '✓' : '✗'}
      </div>
      <h2 class="result-title">
        {correct ? 'Correct!' : 'Not quite...'}
      </h2>
    </div>

    <!-- Explanation -->
    <div class="explanation">
      <p>{explanation}</p>
      <span class="coach-sign">— Coach</span>
    </div>

    <!-- Actions -->
    <div class="actions">
      {#if hasNext}
        <button class="btn btn-primary" on:click={onContinue}>
          Next Scenario →
        </button>
      {:else}
        <button class="btn btn-primary" on:click={onBackToHub}>
          Complete Module 🏆
        </button>
      {/if}

      <button class="btn btn-secondary" on:click={onBackToHub}>
        Back to Hub
      </button>
    </div>
  </div>
</div>

<style>
  .feedback-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 22, 40, 0.7);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 500;
    padding: var(--spacing-md);
  }

  .feedback-panel {
    background: white;
    color: var(--dark-blue);
    width: 100%;
    max-width: 500px;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    padding: var(--spacing-xl);
    padding-bottom: calc(var(--spacing-xl) + var(--footer-height));
  }

  .feedback-panel.correct {
    border-top: 4px solid var(--success-green);
  }

  .feedback-panel.incorrect {
    border-top: 4px solid var(--error-red);
  }

  .result-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
  }

  .result-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: var(--radius-full);
    font-size: 1.5rem;
    font-weight: 700;
  }

  .correct .result-icon {
    background: rgba(16, 185, 129, 0.15);
    color: var(--success-green);
  }

  .incorrect .result-icon {
    background: rgba(239, 68, 68, 0.15);
    color: var(--error-red);
  }

  .result-title {
    font-size: 1.5rem;
    margin: 0;
  }

  .explanation {
    background: #f8fafc;
    padding: var(--spacing-lg);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-lg);
  }

  .explanation p {
    margin: 0 0 var(--spacing-sm) 0;
    line-height: 1.6;
  }

  .coach-sign {
    display: block;
    font-style: italic;
    color: var(--silver);
    font-size: 0.875rem;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .actions .btn {
    width: 100%;
    padding: var(--spacing-md);
  }

  /* Desktop: side by side */
  @media (min-width: 480px) {
    .feedback-overlay {
      align-items: center;
    }

    .feedback-panel {
      border-radius: var(--radius-lg);
      padding-bottom: var(--spacing-xl);
    }

    .actions {
      flex-direction: row;
    }

    .actions .btn {
      flex: 1;
    }
  }
</style>
