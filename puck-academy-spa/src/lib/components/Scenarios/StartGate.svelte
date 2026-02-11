<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { unlockAudio } from '$lib/services/soundEffects';
  import { audioUnlocked } from '$lib/stores/gameSession';

  export let moduleName: string = 'DEFENSIVE ZONE';
  export let totalScenarios: number = 7;

  const dispatch = createEventDispatcher();

  function handleStart() {
    unlockAudio();
    audioUnlocked.set(true);
    dispatch('start');
  }
</script>

<div class="start-gate" transition:fade={{ duration: 300 }}>
  <div class="gate-content" transition:scale={{ duration: 400, start: 0.8 }}>
    <div class="puck-icon">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <defs>
          <radialGradient id="gatePuckGrad" cx="35%" cy="30%">
            <stop offset="0%" stop-color="#555" />
            <stop offset="100%" stop-color="#111" />
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="35" fill="url(#gatePuckGrad)" stroke="#333" stroke-width="3" />
        <circle cx="40" cy="40" r="28" fill="none" stroke="#444" stroke-width="1" opacity="0.5" />
      </svg>
    </div>

    <h2 class="gate-title">{moduleName.toUpperCase()}</h2>
    <p class="gate-subtitle">{totalScenarios} Scenarios</p>

    <button class="drop-puck-btn" on:click={handleStart}>
      DROP THE PUCK
    </button>

    <p class="gate-hint">Tap to enable sound and start</p>
  </div>
</div>

<style>
  .start-gate {
    position: fixed;
    inset: 0;
    background: rgba(10, 22, 40, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .gate-content {
    text-align: center;
    padding: var(--spacing-2xl);
  }

  .puck-icon {
    margin-bottom: var(--spacing-lg);
    animation: puck-bounce 2s ease-in-out infinite;
  }

  .gate-title {
    font-family: var(--font-header);
    font-size: 2.5rem;
    color: var(--ice-blue);
    letter-spacing: 0.05em;
    margin-bottom: var(--spacing-xs);
  }

  .gate-subtitle {
    color: var(--silver);
    font-size: 1rem;
    margin-bottom: var(--spacing-2xl);
  }

  .drop-puck-btn {
    display: inline-block;
    padding: var(--spacing-md) var(--spacing-2xl);
    background: var(--accent-red);
    color: white;
    border: none;
    border-radius: var(--radius-full);
    font-family: var(--font-header);
    font-size: 1.5rem;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(200, 16, 46, 0.4);
  }

  .drop-puck-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 25px rgba(200, 16, 46, 0.6);
    background: #a00d24;
  }

  .drop-puck-btn:active {
    transform: translateY(0);
  }

  .gate-hint {
    margin-top: var(--spacing-lg);
    color: var(--silver);
    font-size: 0.75rem;
    opacity: 0.6;
  }

  @keyframes puck-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @media (prefers-reduced-motion: reduce) {
    .puck-icon {
      animation: none;
    }
  }
</style>
