<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';

  export let xpGain: { base: number; speed: number; combo: number; total: number };
  export let comboCount: number = 0;
  export let isPerfect: boolean = false;

  let canvas: HTMLCanvasElement;
  let animationId: number;
  let particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    rotation: number;
    rotationSpeed: number;
  }> = [];

  const colors = ['#FFD700', '#3B82F6', '#C8102E', '#10B981', '#F59E0B'];

  function createParticles() {
    const count = isPerfect ? 80 : 40;
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 100,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 8,
        vy: -Math.random() * 10 - 3,
        size: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
      });
    }
  }

  function animate() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let alive = false;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2; // gravity
      p.alpha -= 0.012;
      p.rotation += p.rotationSpeed;

      if (p.alpha <= 0) continue;
      alive = true;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    }

    if (alive) {
      animationId = requestAnimationFrame(animate);
    }
  }

  onMount(() => {
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Check reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        createParticles();
        animate();
      }
    }
  });

  onDestroy(() => {
    if (animationId) cancelAnimationFrame(animationId);
  });
</script>

<div class="celebration-overlay" transition:fade={{ duration: 300 }}>
  <canvas bind:this={canvas} class="confetti-canvas"></canvas>

  <div class="xp-popup" class:perfect={isPerfect}>
    {#if isPerfect}
      <div class="perfect-badge">PERFECT!</div>
    {/if}

    <div class="xp-amount">+{xpGain.total} XP</div>

    {#if xpGain.speed > 0}
      <div class="xp-detail speed">Quick! +{xpGain.speed}</div>
    {/if}

    {#if xpGain.combo > 0}
      <div class="xp-detail combo">Combo +{xpGain.combo}</div>
    {/if}

    {#if comboCount >= 2}
      <div class="combo-badge">
        COMBO x{Math.min(1 + comboCount * 0.5, 3)}!
      </div>
    {/if}
  </div>
</div>

<style>
  .celebration-overlay {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 600;
  }

  .confetti-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .xp-popup {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    animation: float-up 2s ease-out forwards;
  }

  .xp-amount {
    font-size: 2.5rem;
    font-family: var(--font-header);
    font-weight: 700;
    color: #FFD700;
    text-shadow:
      0 2px 4px rgba(0, 0, 0, 0.5),
      0 0 20px rgba(255, 215, 0, 0.3);
  }

  .xp-detail {
    font-size: 0.9rem;
    font-weight: 600;
    margin-top: 4px;
  }

  .xp-detail.speed {
    color: #3B82F6;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  .xp-detail.combo {
    color: #8B5CF6;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  .combo-badge {
    display: inline-block;
    margin-top: 8px;
    padding: 4px 16px;
    background: linear-gradient(135deg, #8B5CF6, #6D28D9);
    border-radius: 20px;
    color: white;
    font-weight: 700;
    font-size: 1rem;
    animation: combo-pop 0.3s ease-out;
  }

  .perfect-badge {
    font-size: 1.5rem;
    font-family: var(--font-header);
    color: #FFD700;
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
    margin-bottom: 8px;
    animation: perfect-flash 0.5s ease-out;
  }

  @keyframes float-up {
    0% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateX(-50%) translateY(-60px);
    }
  }

  @keyframes combo-pop {
    0% { transform: scale(0.5); }
    60% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }

  @keyframes perfect-flash {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); opacity: 1; }
  }

  @media (prefers-reduced-motion: reduce) {
    .xp-popup {
      animation: none;
      opacity: 1;
    }
    .combo-badge, .perfect-badge {
      animation: none;
    }
  }
</style>
