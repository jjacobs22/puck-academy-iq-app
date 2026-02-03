<script lang="ts">
  import { goto } from '$app/navigation';
  import { fade, fly } from 'svelte/transition';
  import { navigateWithTransition } from '$lib/stores/ui';

  function startTraining() {
    navigateWithTransition('forward');
    goto('/hub');
  }
</script>

<svelte:head>
  <title>Puck Academy - Hockey IQ Training</title>
  <meta name="description" content="Train your hockey IQ with scenario-based learning. Duolingo for hockey decision-making." />
</svelte:head>

<div class="landing-container">
  <div class="hero" in:fade={{ duration: 400 }}>
    <div class="hero-badge" in:fly={{ y: -10, delay: 100, duration: 300 }}>
      🏒 Hockey IQ Training
    </div>

    <h1 class="hero-title" in:fly={{ y: 20, delay: 150, duration: 400 }}>
      Think Like a <span class="highlight">Pro</span>
    </h1>

    <p class="hero-subtitle" in:fly={{ y: 20, delay: 200, duration: 400 }}>
      Master hockey decision-making through scenario-based training.
      No ice time required.
    </p>

    <button
      class="btn btn-primary start-btn"
      on:click={startTraining}
      in:fly={{ y: 20, delay: 250, duration: 400 }}
    >
      Start Training →
    </button>
  </div>

  <!-- Features -->
  <div class="features" in:fly={{ y: 30, delay: 300, duration: 400 }}>
    <div class="feature-card">
      <span class="feature-icon">🎯</span>
      <h3>43 Scenarios</h3>
      <p>Real game situations across 6 modules</p>
    </div>

    <div class="feature-card">
      <span class="feature-icon">🧠</span>
      <h3>Learn the Why</h3>
      <p>Coach explanations for every decision</p>
    </div>

    <div class="feature-card">
      <span class="feature-icon">🔥</span>
      <h3>Build Streaks</h3>
      <p>Daily practice builds lasting habits</p>
    </div>
  </div>

  <!-- Social Proof -->
  <div class="social-proof" in:fly={{ y: 30, delay: 350, duration: 400 }}>
    <p>"Finally, a way to train hockey IQ off the ice."</p>
    <span class="proof-source">— Youth Hockey Coach</span>
  </div>
</div>

<style>
  .landing-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--spacing-xl) 0;
    gap: var(--spacing-2xl);
  }

  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
    max-width: 600px;
  }

  .hero-badge {
    background: rgba(200, 16, 46, 0.15);
    border: 1px solid rgba(200, 16, 46, 0.3);
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--radius-full);
    font-size: 0.875rem;
    font-weight: 500;
  }

  .hero-title {
    font-size: 3rem;
    line-height: 1.1;
    margin: 0;
  }

  .hero-title .highlight {
    color: var(--accent-red);
  }

  .hero-subtitle {
    font-size: 1.125rem;
    color: var(--silver);
    line-height: 1.6;
    max-width: 450px;
  }

  .start-btn {
    padding: var(--spacing-md) var(--spacing-2xl);
    font-size: 1.125rem;
    margin-top: var(--spacing-md);
  }

  /* Features */
  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-md);
    width: 100%;
    max-width: 700px;
  }

  .feature-card {
    background: rgba(232, 244, 248, 0.05);
    border: 1px solid rgba(232, 244, 248, 0.1);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    text-align: center;
  }

  .feature-icon {
    font-size: 2rem;
    display: block;
    margin-bottom: var(--spacing-sm);
  }

  .feature-card h3 {
    font-size: 1rem;
    font-family: var(--font-body);
    margin-bottom: var(--spacing-xs);
  }

  .feature-card p {
    font-size: 0.875rem;
    color: var(--silver);
    margin: 0;
  }

  /* Social Proof */
  .social-proof {
    max-width: 400px;
    padding: var(--spacing-lg);
    background: rgba(255, 255, 255, 0.03);
    border-radius: var(--radius-lg);
  }

  .social-proof p {
    font-style: italic;
    font-size: 1rem;
    margin-bottom: var(--spacing-sm);
  }

  .proof-source {
    font-size: 0.875rem;
    color: var(--silver);
  }

  /* Mobile */
  @media (max-width: 480px) {
    .hero-title {
      font-size: 2.25rem;
    }

    .features {
      grid-template-columns: 1fr;
    }
  }
</style>
