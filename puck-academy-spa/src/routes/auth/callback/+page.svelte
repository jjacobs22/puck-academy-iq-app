<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { supabase } from '$lib/services/supabase';
  import { toasts } from '$lib/stores/ui';

  onMount(async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    const redirectTo =
      $page.url.searchParams.get('redirect') ||
      (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('auth_redirect') : null) ||
      '/hub';
    if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem('auth_redirect');

    if (error) {
      toasts.show('Sign in failed. Please try again.', 'error');
      goto('/');
      return;
    }

    if (session) {
      toasts.show('Welcome back! Your progress is synced.', 'success');
      goto(redirectTo.startsWith('/') ? redirectTo : '/' + redirectTo);
    } else {
      goto('/');
    }
  });
</script>

<div class="callback-container">
  <div class="loading-spinner"></div>
  <p>Signing you in...</p>
</div>

<style>
  .callback-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    gap: var(--spacing-md);
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.1);
    border-top-color: var(--accent-red);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  p {
    color: var(--silver);
  }
</style>
