<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { toasts } from '$lib/stores/ui';
</script>

<div class="toast-container">
  {#each $toasts as toast (toast.id)}
    <div
      class="toast toast-{toast.type}"
      in:fly={{ y: 50, duration: 300 }}
      out:fade={{ duration: 200 }}
    >
      <span class="toast-icon">
        {#if toast.type === 'success'}✓{:else if toast.type === 'error'}✗{:else}ℹ{/if}
      </span>
      <span class="toast-message">{toast.message}</span>
      <button
        class="toast-dismiss"
        on:click={() => toasts.dismiss(toast.id)}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  {/each}
</div>

<style>
  .toast-container {
    position: fixed;
    bottom: calc(var(--footer-height) + var(--spacing-md));
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    z-index: 200;
    pointer-events: none;
  }

  .toast {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--dark-blue);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    pointer-events: auto;
    min-width: 250px;
  }

  .toast-success {
    border-left: 3px solid var(--success-green);
  }

  .toast-error {
    border-left: 3px solid var(--error-red);
  }

  .toast-info {
    border-left: 3px solid var(--info-blue);
  }

  .toast-icon {
    font-size: 1rem;
  }

  .toast-success .toast-icon { color: var(--success-green); }
  .toast-error .toast-icon { color: var(--error-red); }
  .toast-info .toast-icon { color: var(--info-blue); }

  .toast-message {
    flex: 1;
    font-size: 0.875rem;
  }

  .toast-dismiss {
    background: transparent;
    border: none;
    color: var(--silver);
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0;
    line-height: 1;
  }

  .toast-dismiss:hover {
    color: var(--ice-blue);
  }
</style>
