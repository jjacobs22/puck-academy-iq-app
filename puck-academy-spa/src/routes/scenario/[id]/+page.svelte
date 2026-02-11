<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import ScenarioContainer from '$lib/components/Scenarios/ScenarioContainer.svelte';
  import { getScenario } from '$lib/data/scenarios';

  $: scenarioId = $page.params.id;
  $: scenario = getScenario(scenarioId);

  onMount(() => {
    if (!scenario) {
      // Scenario not found, redirect to hub
      goto('/hub');
    }
  });
</script>

<svelte:head>
  <title>{scenario?.title || 'Scenario'} - Puck Academy</title>
</svelte:head>

{#if scenario}
  {#key scenarioId}
    <ScenarioContainer {scenario} />
  {/key}
{:else}
  <div class="loading">
    <p>Loading scenario...</p>
  </div>
{/if}

<style>
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    color: var(--silver);
  }
</style>
