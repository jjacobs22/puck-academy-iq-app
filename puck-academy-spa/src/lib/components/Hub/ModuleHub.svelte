<script lang="ts">
  import { goto } from '$app/navigation';
  import { fly, fade } from 'svelte/transition';
  import ModuleCard from './ModuleCard.svelte';
  import { allModulesProgress, nextScenario, streakCount, progress } from '$lib/stores/progress';
  import { isStreakAtRisk } from '$lib/services/storage';
  import { navigateWithTransition } from '$lib/stores/ui';

  let expandedModule: number | null = null;

  // Auto-expand first incomplete module
  $: if ($allModulesProgress) {
    const firstIncomplete = $allModulesProgress.find(m => !m.isComplete);
    if (firstIncomplete && expandedModule === null) {
      expandedModule = firstIncomplete.moduleId;
    }
  }

  function toggleModule(moduleId: number) {
    expandedModule = expandedModule === moduleId ? null : moduleId;
  }

  function handleContinue() {
    if ($nextScenario) {
      navigateWithTransition('forward');
      goto(`/scenario/${$nextScenario.key}`);
    }
  }

  $: streakAtRisk = isStreakAtRisk();
  $: allComplete = $nextScenario === null;
</script>

<div class="hub-container">
  <!-- Continue Button -->
  <div class="continue-section" in:fly={{ y: -20, duration: 400 }}>
    {#if allComplete}
      <button class="continue-btn complete" disabled>
        <span class="continue-icon">🏆</span>
        <span>All Scenarios Complete!</span>
      </button>
    {:else if $nextScenario}
      <button class="continue-btn" on:click={handleContinue}>
        <span class="continue-icon">▶</span>
        <span>Continue: M{$nextScenario.moduleId} Scenario {$nextScenario.scenarioId}</span>
      </button>
    {/if}
  </div>

  <!-- Streak Alert -->
  {#if streakAtRisk && $streakCount > 0}
    <div class="streak-alert" in:fly={{ y: -10, duration: 300 }}>
      <span class="alert-icon">⚠️</span>
      <span>Your {$streakCount}-day streak is at risk! Complete a scenario today.</span>
    </div>
  {/if}

  <!-- Welcome Section -->
  <div class="welcome-section" in:fade={{ delay: 100, duration: 300 }}>
    <h1>Hockey IQ Training</h1>
    <p class="welcome-subtitle">
      {#if $streakCount > 0}
        🔥 {$streakCount} day streak — keep it going!
      {:else}
        Master the mental game, one scenario at a time.
      {/if}
    </p>
  </div>

  <!-- Modules -->
  <div class="modules-grid">
    {#each $allModulesProgress as module, i (module.moduleId)}
      <div in:fly={{ y: 20, delay: 150 + (i * 50), duration: 300 }}>
        <ModuleCard
          {module}
          expanded={expandedModule === module.moduleId}
          on:toggle={() => toggleModule(module.moduleId)}
        />
      </div>
    {/each}
  </div>
</div>

<style>
  .hub-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  /* Continue Section */
  .continue-section {
    margin-bottom: var(--spacing-sm);
  }

  .continue-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md) var(--spacing-lg);
    background: var(--accent-red);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-base);
  }

  .continue-btn:hover:not(:disabled) {
    background: #a00d24;
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .continue-btn.complete {
    background: var(--success-green);
    cursor: default;
  }

  .continue-icon {
    font-size: 1.25rem;
  }

  /* Streak Alert */
  .streak-alert {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1));
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: var(--radius-md);
    font-size: 0.875rem;
  }

  .alert-icon {
    font-size: 1rem;
  }

  /* Welcome */
  .welcome-section {
    text-align: center;
    margin-bottom: var(--spacing-md);
  }

  .welcome-section h1 {
    margin-bottom: var(--spacing-xs);
  }

  .welcome-subtitle {
    color: var(--silver);
    font-size: 1rem;
  }

  /* Modules Grid */
  .modules-grid {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
</style>
