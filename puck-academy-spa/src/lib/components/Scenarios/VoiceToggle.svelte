<script lang="ts">
  import { voiceEnabled, currentlyPlaying, audioManager } from '$lib/services/audio';

  function toggle() {
    voiceEnabled.update(v => {
      if (v) {
        audioManager.stop();
      }
      return !v;
    });
  }
</script>

<button
  class="voice-toggle"
  class:active={$voiceEnabled}
  class:playing={$currentlyPlaying}
  on:click={toggle}
  aria-label={$voiceEnabled ? 'Mute voice' : 'Enable voice'}
  title={$voiceEnabled ? 'Voice on' : 'Voice off'}
>
  {#if $voiceEnabled}
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  {:else}
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  {/if}
</button>

<style>
  .voice-toggle {
    position: fixed;
    bottom: calc(var(--footer-height) + var(--spacing-md));
    right: var(--spacing-md);
    width: 48px;
    height: 48px;
    border-radius: var(--radius-full);
    background: var(--dark-blue);
    border: 2px solid rgba(255, 255, 255, 0.2);
    color: var(--ice-blue);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-base);
    z-index: 50;
  }

  .voice-toggle:hover {
    background: #1a2940;
    border-color: rgba(255, 255, 255, 0.4);
    transform: scale(1.05);
  }

  .voice-toggle.active {
    border-color: var(--accent-red);
  }

  .voice-toggle.playing {
    animation: pulse 1s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(200, 16, 46, 0.4); }
    50% { box-shadow: 0 0 0 8px rgba(200, 16, 46, 0); }
  }
</style>
