<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  import { slide } from 'svelte/transition';
  import { navigateWithTransition } from '$lib/stores/ui';
  import { getModuleScenarios } from '$lib/data/scenarios';
  import { progress } from '$lib/stores/progress';

  interface ModuleProgress {
    moduleId: number;
    name: string;
    icon: string;
    completed: number;
    total: number;
    percentage: number;
    isComplete: boolean;
  }

  export let module: ModuleProgress;
  export let expanded = false;

  const dispatch = createEventDispatcher();

  $: scenarios = getModuleScenarios(module.moduleId);

  function toggle() {
    dispatch('toggle');
  }

  function goToScenario(scenarioId: string) {
    navigateWithTransition('forward');
    goto(`/scenario/${scenarioId}`);
  }

  function isScenarioComplete(scenarioKey: string): boolean {
    return $progress.completedScenarios.includes(scenarioKey);
  }
</script>

<div class="module-card" class:expanded class:complete={module.isComplete}>
  <!-- Header (always visible) -->
  <button class="module-header" on:click={toggle}>
    <div class="module-info">
      <span class="module-icon">{module.icon}</span>
      <div class="module-text">
        <h3 class="module-name">Module {module.moduleId}: {module.name}</h3>
        <span class="module-count">{module.completed}/{module.total} scenarios</span>
      </div>
    </div>

    <div class="module-status">
      {#if module.isComplete}
        <span class="complete-badge">✓ Complete</span>
      {:else}
        <div class="progress-ring">
          <svg viewBox="0 0 36 36">
            <path
              class="progress-bg"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              class="progress-fill"
              stroke-dasharray="{module.percentage}, 100"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span class="progress-text">{module.percentage}%</span>
        </div>
      {/if}

      <span class="chevron" class:rotated={expanded}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </span>
    </div>
  </button>

  <!-- Expanded Content -->
  {#if expanded}
    <div class="module-content" transition:slide={{ duration: 300 }}>
      <div class="scenario-list">
        {#each scenarios as scenario, i}
          {@const scenarioKey = `module${module.moduleId}-scenario${scenario.scenarioNum}`}
          {@const complete = isScenarioComplete(scenarioKey)}
          <button
            class="scenario-item"
            class:complete
            on:click={() => goToScenario(scenario.id)}
          >
            <span class="scenario-num">{i + 1}</span>
            <span class="scenario-title">{scenario.title}</span>
            {#if complete}
              <span class="scenario-check">✓</span>
            {/if}
          </button>
        {/each}

        {#if scenarios.length === 0}
          <p class="no-scenarios">Scenarios coming soon...</p>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .module-card {
    background: rgba(232, 244, 248, 0.05);
    border: 1px solid rgba(232, 244, 248, 0.1);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: all var(--transition-base);
  }

  .module-card:hover {
    border-color: rgba(232, 244, 248, 0.2);
  }

  .module-card.complete {
    border-color: rgba(16, 185, 129, 0.3);
  }

  .module-card.expanded {
    border-color: var(--accent-red);
  }

  /* Header */
  .module-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-md) var(--spacing-lg);
    background: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    text-align: left;
  }

  .module-info {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .module-icon {
    font-size: 1.5rem;
  }

  .module-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .module-name {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
    font-family: var(--font-body);
  }

  .module-count {
    font-size: 0.75rem;
    color: var(--silver);
  }

  .module-status {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .complete-badge {
    background: var(--success-green);
    color: white;
    padding: 2px 8px;
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 600;
  }

  /* Progress Ring */
  .progress-ring {
    position: relative;
    width: 36px;
    height: 36px;
  }

  .progress-ring svg {
    transform: rotate(-90deg);
  }

  .progress-bg {
    fill: none;
    stroke: rgba(255, 255, 255, 0.1);
    stroke-width: 3;
  }

  .progress-fill {
    fill: none;
    stroke: var(--accent-red);
    stroke-width: 3;
    stroke-linecap: round;
    transition: stroke-dasharray 0.5s ease;
  }

  .progress-text {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.5rem;
    font-weight: 600;
  }

  /* Chevron */
  .chevron {
    transition: transform var(--transition-base);
    color: var(--silver);
  }

  .chevron.rotated {
    transform: rotate(180deg);
  }

  /* Content */
  .module-content {
    border-top: 1px solid rgba(232, 244, 248, 0.1);
    padding: var(--spacing-md);
  }

  .scenario-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .scenario-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    color: inherit;
    cursor: pointer;
    transition: all var(--transition-fast);
    text-align: left;
  }

  .scenario-item:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .scenario-item.complete {
    opacity: 0.7;
  }

  .scenario-num {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: var(--dark-blue);
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 600;
    flex-shrink: 0;
  }

  .scenario-item.complete .scenario-num {
    background: var(--success-green);
  }

  .scenario-title {
    flex: 1;
    font-size: 0.875rem;
  }

  .scenario-check {
    color: var(--success-green);
    font-weight: 600;
  }

  .no-scenarios {
    text-align: center;
    color: var(--silver);
    font-size: 0.875rem;
    padding: var(--spacing-md);
  }
</style>
