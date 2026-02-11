<script lang="ts">
  import { fade, fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import {
    getSessionStats,
    hockeyIQRating,
    currentTier,
    updateHockeyIQ,
    resetSession,
    HOCKEY_IQ_TIERS,
    getTier
  } from '$lib/stores/gameSession';
  import { playGoalHorn } from '$lib/services/soundEffects';

  export let moduleId: number;
  export let moduleName: string = 'Defensive Zone';

  let stats = getSessionStats();
  let iqChange = { oldRating: 0, newRating: 0 };
  let showIQAnimation = false;
  let displayedRating = 0;

  onMount(() => {
    // Calculate IQ change
    iqChange = updateHockeyIQ(stats.correct, stats.total);
    displayedRating = iqChange.oldRating;

    // Play goal horn if perfect
    if (stats.correct === stats.total) {
      playGoalHorn();
    }

    // Animate IQ rating
    setTimeout(() => {
      showIQAnimation = true;
      animateRating(iqChange.oldRating, iqChange.newRating);
    }, 800);
  });

  function animateRating(from: number, to: number) {
    const duration = 1500;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      displayedRating = Math.round(from + (to - from) * eased);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);
  }

  function handleReplay() {
    resetSession();
    goto(`/scenario/module${moduleId}-scenario1`);
  }

  function handleHub() {
    goto('/hub');
  }

  $: isPerfect = stats.correct === stats.total;
  $: displayTier = getTier(displayedRating);
</script>

<div class="results-overlay" transition:fade={{ duration: 300 }}>
  <div class="results-panel" transition:fly={{ y: 50, duration: 500, easing: quintOut }}>
    <!-- Header -->
    <div class="results-header" class:perfect={isPerfect}>
      {#if isPerfect}
        <div class="perfect-star" in:scale={{ delay: 200, duration: 400 }}>
          <span>PERFECT</span>
        </div>
      {/if}
      <h2 class="results-title">Module Complete!</h2>
      <p class="results-subtitle">{moduleName}</p>
    </div>

    <!-- Score -->
    <div class="score-row">
      <div class="score-item">
        <span class="score-value">{stats.correct}/{stats.total}</span>
        <span class="score-label">Correct</span>
      </div>
      <div class="score-item">
        <span class="score-value xp">{stats.totalXP}</span>
        <span class="score-label">Total XP</span>
      </div>
      <div class="score-item">
        <span class="score-value streak">{stats.bestStreak}</span>
        <span class="score-label">Best Streak</span>
      </div>
    </div>

    <!-- Hockey IQ Rating -->
    <div class="iq-section">
      <h3 class="iq-title">Hockey IQ Rating</h3>

      <div class="iq-display">
        <div class="iq-number" style="color: {displayTier.color}">
          {displayedRating}
        </div>
        <div class="iq-tier" style="color: {displayTier.color}">
          {displayTier.name}
        </div>
      </div>

      <!-- IQ Bar -->
      <div class="iq-bar">
        <div class="iq-bar-fill" style="width: {displayedRating}%; background: {displayTier.color}"></div>
      </div>

      <!-- Tier markers -->
      <div class="tier-markers">
        {#each HOCKEY_IQ_TIERS as tier}
          <div class="tier-mark" style="left: {tier.min}%">
            <div class="tier-tick" style="background: {tier.color}"></div>
          </div>
        {/each}
      </div>

      {#if iqChange.newRating > iqChange.oldRating}
        <div class="iq-change positive">
          +{iqChange.newRating - iqChange.oldRating} from this module
        </div>
      {:else if iqChange.newRating < iqChange.oldRating}
        <div class="iq-change negative">
          {iqChange.newRating - iqChange.oldRating} from this module
        </div>
      {/if}
    </div>

    <!-- Actions -->
    <div class="actions">
      <button class="btn btn-primary" on:click={handleReplay}>
        Replay Module
      </button>
      <button class="btn btn-secondary" on:click={handleHub}>
        Back to Hub
      </button>
    </div>
  </div>
</div>

<style>
  .results-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 22, 40, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 800;
    padding: var(--spacing-md);
    overflow-y: auto;
  }

  .results-panel {
    background: white;
    color: var(--dark-blue);
    width: 100%;
    max-width: 440px;
    border-radius: var(--radius-lg);
    padding: var(--spacing-xl);
    box-shadow: var(--shadow-xl);
  }

  .results-header {
    text-align: center;
    margin-bottom: var(--spacing-lg);
  }

  .results-header.perfect {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05));
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    margin: calc(-1 * var(--spacing-md));
    margin-bottom: var(--spacing-lg);
  }

  .perfect-star {
    font-family: var(--font-header);
    font-size: 1.5rem;
    color: #FFD700;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
    margin-bottom: var(--spacing-xs);
  }

  .results-title {
    font-size: 1.75rem;
    margin: 0;
  }

  .results-subtitle {
    color: var(--silver);
    font-size: 0.9rem;
    margin-top: 4px;
  }

  .score-row {
    display: flex;
    justify-content: space-around;
    padding: var(--spacing-lg) 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .score-item {
    text-align: center;
  }

  .score-value {
    display: block;
    font-size: 1.75rem;
    font-family: var(--font-header);
    font-weight: 700;
  }

  .score-value.xp {
    color: #DAA520;
  }

  .score-value.streak {
    color: #EF4444;
  }

  .score-label {
    font-size: 0.75rem;
    color: var(--silver);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .iq-section {
    padding: var(--spacing-lg) 0;
    text-align: center;
  }

  .iq-title {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--silver);
    margin-bottom: var(--spacing-md);
  }

  .iq-display {
    margin-bottom: var(--spacing-md);
  }

  .iq-number {
    font-size: 3rem;
    font-family: var(--font-header);
    font-weight: 700;
    line-height: 1;
  }

  .iq-tier {
    font-size: 1rem;
    font-weight: 600;
    margin-top: 4px;
  }

  .iq-bar {
    height: 8px;
    background: rgba(0, 0, 0, 0.08);
    border-radius: var(--radius-full);
    overflow: hidden;
    position: relative;
  }

  .iq-bar-fill {
    height: 100%;
    border-radius: var(--radius-full);
    transition: width 1.5s ease-out, background 0.3s ease;
  }

  .tier-markers {
    position: relative;
    height: 12px;
    margin-top: 4px;
  }

  .tier-mark {
    position: absolute;
    transform: translateX(-50%);
  }

  .tier-tick {
    width: 2px;
    height: 8px;
    border-radius: 1px;
    opacity: 0.4;
  }

  .iq-change {
    font-size: 0.85rem;
    font-weight: 600;
    margin-top: var(--spacing-sm);
  }

  .iq-change.positive {
    color: #10B981;
  }

  .iq-change.negative {
    color: #EF4444;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    padding-top: var(--spacing-lg);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .actions .btn {
    width: 100%;
    padding: var(--spacing-md);
  }

  @media (min-width: 480px) {
    .actions {
      flex-direction: row;
    }
    .actions .btn {
      flex: 1;
    }
  }
</style>
