<script lang="ts">
  import type { GameContext } from '$lib/data/scenarios';

  export let context: GameContext;

  function ordinal(n: number): string {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }
</script>

<div class="game-context">
  <div class="context-item period">
    <span class="context-label">Period</span>
    <span class="context-value">{ordinal(context.period)}</span>
  </div>

  <div class="context-item score">
    <span class="team-score">{context.teamScore}</span>
    <span class="score-divider">-</span>
    <span class="opp-score">{context.oppScore}</span>
  </div>

  <div class="context-item time">
    <span class="context-label">Time</span>
    <span class="context-value">{context.timeLeft}</span>
  </div>
</div>

<style>
  .game-context {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(10, 22, 40, 0.8);
    border: 1px solid rgba(232, 244, 248, 0.15);
    border-radius: var(--radius-md);
    padding: var(--spacing-sm) var(--spacing-lg);
    font-family: var(--font-body);
  }

  .context-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .context-label {
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--silver);
  }

  .context-value {
    font-size: 1rem;
    font-weight: 700;
    color: var(--ice-blue);
  }

  .score {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .team-score {
    font-size: 1.5rem;
    font-weight: 700;
    color: #3B82F6;
    font-family: var(--font-header);
  }

  .score-divider {
    font-size: 1.2rem;
    color: var(--silver);
  }

  .opp-score {
    font-size: 1.5rem;
    font-weight: 700;
    color: #EF4444;
    font-family: var(--font-header);
  }
</style>
