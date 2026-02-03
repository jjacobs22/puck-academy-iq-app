<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { showAuthModal, toasts } from '$lib/stores/ui';
  import { user } from '$lib/stores/auth';

  let email = '';
  let isLoading = false;
  let emailSent = false;

  async function handleSubmit() {
    if (!email) return;

    isLoading = true;
    const { error } = await user.signIn(email);
    isLoading = false;

    if (error) {
      toasts.show(error.message, 'error');
    } else {
      emailSent = true;
    }
  }

  function close() {
    showAuthModal.set(false);
    email = '';
    emailSent = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      close();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="modal-overlay" transition:fade={{ duration: 200 }} on:click={close} role="dialog" aria-modal="true">
  <div
    class="modal-content"
    transition:scale={{ duration: 300, start: 0.95 }}
    on:click|stopPropagation
  >
    <button class="close-btn" on:click={close} aria-label="Close">×</button>

    {#if emailSent}
      <div class="success-state">
        <div class="success-icon">📧</div>
        <h2>Check your email!</h2>
        <p>
          We sent a magic link to <strong>{email}</strong>.
          Click the link to sign in — no password needed.
        </p>
        <button class="btn btn-secondary" on:click={close}>
          Got it
        </button>
      </div>
    {:else}
      <div class="auth-form">
        <h2>Sign in to save progress</h2>
        <p class="subtitle">
          Your training syncs across devices when you're signed in.
        </p>

        <form on:submit|preventDefault={handleSubmit}>
          <label class="input-label" for="email">Email address</label>
          <input
            id="email"
            type="email"
            bind:value={email}
            placeholder="player@example.com"
            required
            autocomplete="email"
            class="input"
          />

          <button
            type="submit"
            class="btn btn-primary submit-btn"
            disabled={isLoading || !email}
          >
            {#if isLoading}
              Sending...
            {:else}
              Continue with Email
            {/if}
          </button>
        </form>

        <p class="note">
          No password needed — just click the link in your email.
        </p>
      </div>
    {/if}
  </div>
</div>

<style>
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 22, 40, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: var(--spacing-md);
  }

  .modal-content {
    background: white;
    color: var(--dark-blue);
    padding: var(--spacing-2xl);
    border-radius: var(--radius-lg);
    max-width: 400px;
    width: 100%;
    position: relative;
  }

  .close-btn {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    background: transparent;
    border: none;
    font-size: 1.5rem;
    color: var(--silver);
    cursor: pointer;
    line-height: 1;
  }

  .close-btn:hover {
    color: var(--dark-blue);
  }

  h2 {
    margin-bottom: var(--spacing-sm);
    font-size: 1.5rem;
  }

  .subtitle {
    color: var(--silver);
    margin-bottom: var(--spacing-lg);
  }

  .input-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: var(--spacing-xs);
  }

  .input {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-md);
    border: 2px solid #e5e7eb;
    border-radius: var(--radius-md);
    font-size: 1rem;
    margin-bottom: var(--spacing-md);
    transition: border-color var(--transition-fast);
  }

  .input:focus {
    outline: none;
    border-color: var(--accent-red);
  }

  .submit-btn {
    width: 100%;
    padding: var(--spacing-md);
  }

  .note {
    margin-top: var(--spacing-md);
    font-size: 0.75rem;
    color: var(--silver);
    text-align: center;
  }

  /* Success state */
  .success-state {
    text-align: center;
  }

  .success-icon {
    font-size: 3rem;
    margin-bottom: var(--spacing-md);
  }

  .success-state p {
    color: var(--silver);
    margin-bottom: var(--spacing-lg);
  }

  .success-state strong {
    color: var(--dark-blue);
  }
</style>
