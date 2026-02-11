<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { playTick } from '$lib/services/soundEffects';

  export let duration = 10; // seconds
  export let running = false;

  const dispatch = createEventDispatcher();

  let timeLeft = duration;
  let elapsed = 0;
  let intervalId: ReturnType<typeof setInterval> | null = null;
  let startTime: number;

  // SVG ring dimensions
  const size = 64;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  $: progress = timeLeft / duration;
  $: dashOffset = circumference * (1 - progress);
  $: color = timeLeft <= 3 ? '#EF4444' : timeLeft <= 5 ? '#F59E0B' : '#3B82F6';

  function tick() {
    const now = performance.now();
    elapsed = (now - startTime) / 1000;
    timeLeft = Math.max(0, duration - elapsed);

    // Play tick sound in last 3 seconds
    if (timeLeft <= 3 && timeLeft > 0 && Math.ceil(timeLeft) !== Math.ceil(timeLeft + 0.1)) {
      playTick();
    }

    if (timeLeft <= 0) {
      stop();
      dispatch('timeout', { elapsed: duration });
    }
  }

  export function start() {
    reset();
    startTime = performance.now();
    running = true;
    intervalId = setInterval(tick, 50); // 50ms updates for smooth ring
  }

  export function stop(): number {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    running = false;
    return elapsed;
  }

  export function reset() {
    stop();
    timeLeft = duration;
    elapsed = 0;
  }

  export function getElapsed(): number {
    return elapsed;
  }

  onMount(() => {
    // Start is called externally
  });

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
  });
</script>

<div class="decision-clock" class:urgent={timeLeft <= 3} class:warning={timeLeft <= 5 && timeLeft > 3}>
  <svg width={size} height={size} class="clock-ring">
    <!-- Background ring -->
    <circle
      cx={size / 2}
      cy={size / 2}
      r={radius}
      fill="none"
      stroke="rgba(255,255,255,0.1)"
      stroke-width={strokeWidth}
    />
    <!-- Progress ring -->
    <circle
      cx={size / 2}
      cy={size / 2}
      r={radius}
      fill="none"
      stroke={color}
      stroke-width={strokeWidth}
      stroke-linecap="round"
      stroke-dasharray={circumference}
      stroke-dashoffset={dashOffset}
      transform="rotate(-90 {size / 2} {size / 2})"
      class="progress-ring"
    />
  </svg>
  <span class="clock-text" style="color: {color}">
    {Math.ceil(timeLeft)}
  </span>
</div>

<style>
  .decision-clock {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
  }

  .clock-ring {
    position: absolute;
    top: 0;
    left: 0;
  }

  .progress-ring {
    transition: stroke 0.3s ease;
  }

  .clock-text {
    font-size: 1.5rem;
    font-weight: 700;
    font-family: var(--font-header);
    z-index: 1;
  }

  .urgent .clock-text {
    animation: pulse-text 0.5s ease-in-out infinite;
  }

  @keyframes pulse-text {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.15); }
  }

  @media (prefers-reduced-motion: reduce) {
    .urgent .clock-text {
      animation: none;
    }
  }
</style>
