<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import type { IntroSlide } from '$lib/data/scenarios';

  export let slides: IntroSlide[] = [];
  export let open = false;

  const dispatch = createEventDispatcher();

  let currentIndex = 0;

  $: total = slides.length;
  $: current = slides[currentIndex];

  function next() {
    if (currentIndex < total - 1) {
      currentIndex += 1;
    } else {
      close();
    }
  }

  function prev() {
    if (currentIndex > 0) currentIndex -= 1;
  }

  function close() {
    currentIndex = 0;
    dispatch('close');
  }

  function handleBackdropClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('intro-modal-backdrop')) close();
  }
</script>

{#if open}
  <div
    class="intro-modal-backdrop"
    transition:fade={{ duration: 200 }}
    on:click={handleBackdropClick}
    role="dialog"
    aria-label="Learn the Basics"
  >
    <div class="intro-modal" on:click|stopPropagation>
      <div class="intro-modal-header">
        <span class="intro-modal-title">Learn the Basics</span>
        <button type="button" class="intro-modal-close" on:click={close} aria-label="Close">×</button>
      </div>

      {#if current}
        <div class="intro-slide">
          <span class="slide-number">{currentIndex + 1} of {total}</span>
          <h3 class="slide-title">{current.title}</h3>
          <p class="slide-body">{current.body}</p>
        </div>
      {/if}

      <div class="intro-modal-actions">
        <button
          type="button"
            class="btn-secondary"
          disabled={currentIndex === 0}
          on:click={prev}
        >
          Back
        </button>
        <button type="button" class="btn-primary" on:click={next}>
          {currentIndex < total - 1 ? 'Next' : 'Done'}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .intro-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(10, 22, 40, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: var(--spacing-lg);
  }

  .intro-modal {
    background: rgba(20, 35, 55, 0.98);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-lg);
    max-width: 420px;
    width: 100%;
    padding: var(--spacing-xl);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }

  .intro-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
  }

  .intro-modal-title {
    font-family: var(--font-header);
    font-size: 1.25rem;
    letter-spacing: 0.05em;
    color: var(--ice-blue);
  }

  .intro-modal-close {
    background: none;
    border: none;
    color: var(--silver);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0 4px;
    line-height: 1;
  }

  .intro-modal-close:hover {
    color: var(--ice-blue);
  }

  .intro-slide {
    margin-bottom: var(--spacing-xl);
  }

  .slide-number {
    display: inline-block;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--silver);
    margin-bottom: var(--spacing-sm);
  }

  .slide-title {
    font-family: var(--font-header);
    font-size: 1.35rem;
    letter-spacing: 0.02em;
    color: var(--ice-blue);
    margin: 0 0 var(--spacing-md);
  }

  .slide-body {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--silver);
    margin: 0;
  }

  .intro-modal-actions {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-md);
  }

  .btn-primary,
  .btn-secondary {
    padding: var(--spacing-sm) var(--spacing-lg);
    border-radius: var(--radius-md);
    font-weight: 600;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .btn-primary {
    background: var(--accent-red);
    color: white;
    border: none;
  }

  .btn-primary:hover:not(:disabled) {
    filter: brightness(1.1);
  }

  .btn-secondary {
    background: transparent;
    color: var(--silver);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .btn-secondary:hover:not(:disabled) {
    border-color: var(--silver);
    color: var(--ice-blue);
  }

  .btn-secondary:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
</style>
