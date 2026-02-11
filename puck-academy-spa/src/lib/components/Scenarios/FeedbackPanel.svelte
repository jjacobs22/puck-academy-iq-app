<script lang="ts">
  import { fade, fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { hockeyIQRating, currentTier } from '$lib/stores/gameSession';

  export let correct: boolean;
  export let explanation: string;
  export let onContinue: () => void;
  export let onBackToHub: () => void;
  export let hasNext: boolean;
  export let xpGain: { base: number; speed: number; combo: number; total: number } | null = null;
  export let comboCount: number = 0;
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

    <!-- XP Breakdown (only on correct answers) -->
    {#if correct && xpGain && xpGain.total > 0}
      <div class="xp-breakdown">
        <div class="xp-row">
          <span>Base</span>
          <span class="xp-amount">+{xpGain.base}</span>
        </div>
        {#if xpGain.speed > 0}
          <div class="xp-row speed">
            <span>Speed Bonus</span>
            <span class="xp-amount">+{xpGain.speed}</span>
          </div>
        {/if}
        {#if xpGain.combo > 0}
          <div class="xp-row combo">
            <span>Combo ({Math.min(1 + comboCount * 0.5, 3)}x)</span>
            <span class="xp-amount">+{xpGain.combo}</span>
          </div>
        {/if}
        <div class="xp-row total">
          <span>Total</span>
          <span class="xp-amount">+{xpGain.total} XP</span>
        </div>
      </div>
    {/if}

    <!-- Explanation -->
    <div class="explanation">
      <p>{explanation}</p>
      <span class="coach-sign">— Coach</span>
    </div>

    <!-- Mini Hockey IQ indicator -->
    <div class="iq-mini">
      <span class="iq-mini-label">Hockey IQ</span>
      <div class="iq-mini-bar">
        <div class="iq-mini-fill" style="width: {$hockeyIQRating}%; background: {$currentTier.color}"></div>
      </div>
      <span class="iq-mini-value" style="color: {$currentTier.color}">{$hockeyIQRating}</span>
    </div>

    <!-- Actions -->
    <div class="actions">
      {#if hasNext}
        <button class="btn btn-primary" on:click={onContinue}>
          Next Scenario
        </button>
      {:else}
        <button class="btn btn-primary" on:click={onContinue}>
          See Results
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
    margin-bottom: var(--spacing-md);
  }

  .result-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
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

  /* XP Breakdown */
  .xp-breakdown {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.08), rgba(255, 215, 0, 0.03));
    border: 1px solid rgba(255, 215, 0, 0.2);
    border-radius: var(--radius-md);
    padding: var(--spacing-sm) var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }

  .xp-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px 0;
    font-size: 0.85rem;
    color: #666;
  }

  .xp-row.speed { color: #3B82F6; }
  .xp-row.combo { color: #8B5CF6; }

  .xp-row.total {
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    margin-top: 4px;
    padding-top: 6px;
    font-weight: 700;
    color: #DAA520;
    font-size: 0.95rem;
  }

  .xp-amount {
    font-weight: 600;
    font-family: var(--font-header);
  }

  .explanation {
    background: #f8fafc;
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-md);
  }

  .explanation p {
    margin: 0 0 var(--spacing-xs) 0;
    line-height: 1.6;
    font-size: 0.95rem;
  }

  .coach-sign {
    display: block;
    font-style: italic;
    color: var(--silver);
    font-size: 0.8rem;
  }

  /* Mini IQ bar */
  .iq-mini {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
    padding: var(--spacing-xs) 0;
  }

  .iq-mini-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--silver);
    white-space: nowrap;
  }

  .iq-mini-bar {
    flex: 1;
    height: 5px;
    background: rgba(0, 0, 0, 0.06);
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .iq-mini-fill {
    height: 100%;
    border-radius: var(--radius-full);
    transition: width 0.5s ease-out;
  }

  .iq-mini-value {
    font-weight: 700;
    font-size: 0.85rem;
    font-family: var(--font-header);
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
