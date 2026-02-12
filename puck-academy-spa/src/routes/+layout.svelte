<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import Header from '$lib/components/Shell/Header.svelte';
  import Footer from '$lib/components/Shell/Footer.svelte';
  import Toast from '$lib/components/Shell/Toast.svelte';
  import AuthModal from '$lib/components/Overlays/AuthModal.svelte';
  import { showAuthModal } from '$lib/stores/ui';
  import { user } from '$lib/stores/auth';
  import { syncLocalScoresToServer } from '$lib/services/storage';

  $: isAdmin = $page.url.pathname.startsWith('/admin');

  onMount(() => {
    if (browser && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister();
          console.log('Unregistered legacy service worker');
        });
      });
    }
  });

  // Once per session: backfill localStorage scenario scores to progress table (only mark done when no error so failed syncs retry)
  $: if (browser && $user?.id && typeof sessionStorage !== 'undefined') {
    const key = 'progress_backfilled';
    if (sessionStorage.getItem(key) !== $user.id) {
      syncLocalScoresToServer($user.id)
        .then(({ error }) => { if (!error) sessionStorage.setItem(key, $user.id); })
        .catch(() => {});
    }
  }
</script>

{#if isAdmin}
  <slot />
{:else}
  <div class="app-shell">
    <Header />

    <main class="main-content">
      <slot />
    </main>

    <Footer />

    <Toast />

    {#if $showAuthModal}
      <AuthModal />
    {/if}
  </div>
{/if}

<style>
  .app-shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    flex: 1;
    margin-top: var(--header-height);
    margin-bottom: var(--footer-height);
    padding: var(--spacing-lg);
    max-width: 800px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  /* Page transition styles */
  :global(.page-transition-enter) {
    opacity: 0;
    transform: translateX(20px);
  }

  :global(.page-transition-enter-active) {
    opacity: 1;
    transform: translateX(0);
    transition: all 300ms ease-out;
  }

  :global(.page-transition-exit) {
    opacity: 1;
    transform: translateX(0);
  }

  :global(.page-transition-exit-active) {
    opacity: 0;
    transform: translateX(-20px);
    transition: all 300ms ease-out;
  }
</style>
