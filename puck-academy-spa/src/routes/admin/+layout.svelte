<script lang="ts">
  import '../../app.css';
  import { goto } from '$app/navigation';
</script>

<div class="admin-shell">
  <header class="admin-header">
    <h1 class="admin-logo">Puck <span>Academy</span> Admin</h1>
    <a href="/hub" class="back-link">← Back to App</a>
  </header>
  <main class="admin-main">
    <slot />
  </main>
</div>

<style>
  .admin-shell {
    min-height: 100vh;
    background: linear-gradient(135deg, var(--dark-blue, #0A1628) 0%, #1a2940 100%);
    color: var(--ice-blue, #E8F4F8);
  }

  .admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md) var(--spacing-lg);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.2);
  }

  .admin-logo {
    font-family: var(--font-header, 'Bebas Neue', sans-serif);
    font-size: 1.5rem;
    letter-spacing: 2px;
    margin: 0;
  }

  .admin-logo span {
    color: var(--accent-red, #C8102E);
  }

  .back-link {
    color: var(--silver, #A8B2BE);
    text-decoration: none;
    font-size: 0.9rem;
  }

  .back-link:hover {
    color: white;
  }

  .admin-main {
    padding: var(--spacing-lg);
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
