<script lang="ts">
  import { currentModuleProgress } from '$lib/stores/progress';
</script>

<footer class="shell-footer glass">
  <div class="progress-container">
    <div class="progress-info">
      <span class="progress-label">Module Progress</span>
      <span class="progress-count">
        {$currentModuleProgress.completed}/{$currentModuleProgress.total} scenarios
      </span>
    </div>

    <div class="progress-bar">
      <div
        class="progress-fill"
        style="width: {$currentModuleProgress.percentage}%"
        role="progressbar"
        aria-valuenow={$currentModuleProgress.completed}
        aria-valuemin={0}
        aria-valuemax={$currentModuleProgress.total}
      />
    </div>
  </div>
</footer>

<style>
  .shell-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--footer-height);
    display: flex;
    align-items: center;
    padding: 0 var(--spacing-lg);
    z-index: 100;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .progress-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .progress-label {
    font-size: 0.75rem;
    opacity: 0.7;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .progress-count {
    font-size: 0.875rem;
    font-weight: 600;
  }

  .progress-bar {
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent-red), #ff4d6d);
    border-radius: var(--radius-full);
    transition: width var(--transition-slow) ease-out;
  }
</style>
