<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { user, isAuthenticated } from '$lib/stores/auth';
  import { streakCount, progress, MODULE_CONFIG } from '$lib/stores/progress';
  import { showAuthModal, navigateWithTransition } from '$lib/stores/ui';

  // Helper to get module config safely
  function getModuleConfig(id: number) {
    return MODULE_CONFIG[id] || null;
  }

  // Derive current module from route or progress
  $: currentModuleId = $page.params.id
    ? parseInt($page.params.id.split('-')[0].replace('module', ''))
    : $progress.currentModule;

  $: currentModule = getModuleConfig(currentModuleId);
  $: isHub = $page.url.pathname === '/hub' || $page.url.pathname === '/';

  function goToHub() {
    navigateWithTransition('back');
    goto('/hub');
  }

  function openAuth() {
    showAuthModal.set(true);
  }

  async function handleSignOut() {
    await user.signOut();
  }
</script>

<header class="shell-header glass">
  <div class="header-left">
    {#if !isHub}
      <button class="back-btn" on:click={goToHub} aria-label="Back to Hub">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Hub</span>
      </button>
    {:else}
      <div class="logo">
        <span class="logo-icon">🏒</span>
        <span class="logo-text">Puck Academy</span>
      </div>
    {/if}
  </div>

  <div class="header-center">
    {#if !isHub && currentModule}
      <span class="module-label">
        {currentModule.icon} {currentModule.name}
      </span>
    {/if}
  </div>

  <div class="header-right">
    {#if $streakCount > 0}
      <div class="streak-badge">
        <span class="streak-flame">🔥</span>
        <span class="streak-count">{$streakCount}</span>
      </div>
    {/if}

    {#if $isAuthenticated}
      <button class="auth-btn" on:click={handleSignOut}>
        Sign Out
      </button>
    {:else}
      <button class="auth-btn" on:click={openAuth}>
        Sign In
      </button>
    {/if}
  </div>
</header>

<style>
  .shell-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--header-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--spacing-lg);
    z-index: 100;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .header-left,
  .header-center,
  .header-right {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .header-left {
    flex: 1;
  }

  .header-center {
    flex: 2;
    justify-content: center;
  }

  .header-right {
    flex: 1;
    justify-content: flex-end;
  }

  /* Logo */
  .logo {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .logo-icon {
    font-size: 1.5rem;
  }

  .logo-text {
    font-family: var(--font-header);
    font-size: 1.25rem;
    letter-spacing: 0.02em;
  }

  /* Back button */
  .back-btn {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    background: transparent;
    border: none;
    color: var(--ice-blue);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
  }

  .back-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  /* Module label */
  .module-label {
    font-size: 0.875rem;
    font-weight: 500;
    opacity: 0.9;
  }

  /* Streak badge */
  .streak-badge {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: var(--spacing-xs) var(--spacing-sm);
    background: linear-gradient(135deg, #f97316, #ea580c);
    border-radius: var(--radius-full);
    font-weight: 600;
    font-size: 0.875rem;
  }

  .streak-flame {
    font-size: 0.875rem;
  }

  .streak-count {
    color: white;
  }

  /* Auth button */
  .auth-btn {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--ice-blue);
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .auth-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }

  /* Mobile adjustments */
  @media (max-width: 480px) {
    .logo-text {
      display: none;
    }

    .module-label {
      font-size: 0.75rem;
    }
  }
</style>
