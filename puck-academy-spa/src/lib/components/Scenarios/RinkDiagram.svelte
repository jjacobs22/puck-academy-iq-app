<script lang="ts">
  import { onMount } from 'svelte';

  export let diagram: {
    viewBox?: string;
    zone: 'defensive' | 'offensive' | 'neutral';
    players: Array<{
      type: 'you' | 'teammate' | 'opponent';
      x: number;
      y: number;
      label?: string;
      faded?: boolean;
      targetX?: number;
      targetY?: number;
      note?: string;
    }>;
    puck?: { x: number; y: number };
    ref?: { x: number; y: number; label?: string };
    arrows?: Array<{
      from: { x: number; y: number };
      to: { x: number; y: number };
      style?: 'solid' | 'dashed';
      label?: string;
    }>;
    annotations?: Array<{
      x: number;
      y: number;
      text: string;
    }>;
  };

  /** When true, elements appear with staggered animation */
  export let animated = true;

  // --- Auto-zoom: compute viewBox from active player positions ---
  function computeViewBox(): string {
    if (diagram.viewBox) return diagram.viewBox;

    // Use non-faded players + puck to determine the focal area
    const active = diagram.players.filter(p => !p.faded);
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    for (const p of active) {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y);
      maxY = Math.max(maxY, p.y);
    }
    if (diagram.puck) {
      minX = Math.min(minX, diagram.puck.x);
      maxX = Math.max(maxX, diagram.puck.x);
      minY = Math.min(minY, diagram.puck.y);
      maxY = Math.max(maxY, diagram.puck.y);
    }
    if (diagram.ref) {
      minX = Math.min(minX, diagram.ref.x);
      maxX = Math.max(maxX, diagram.ref.x);
      minY = Math.min(minY, diagram.ref.y);
      maxY = Math.max(maxY, diagram.ref.y);
    }

    const padX = 22;
    const padY = 14;
    let x = Math.max(0, minX - padX);
    let right = Math.min(200, maxX + padX);
    let w = Math.max(80, right - x);
    const y = Math.max(0, minY - padY);
    const bottom = Math.min(85, maxY + padY);
    const h = Math.max(50, bottom - y);

    // Enforce landscape aspect ratio (≥ 2:1) so the SVG stays rink-shaped
    const minAspect = 2;
    if (w / h < minAspect) {
      const targetW = h * minAspect;
      const extra = targetW - w;
      x = Math.max(0, x - extra / 2);
      w = Math.min(200, targetW);
      // If we hit the left wall, extend right instead
      if (x === 0 && w < targetW) w = Math.min(200, targetW);
    }

    return `${x} ${y} ${w} ${h}`;
  }

  const viewBox = computeViewBox();

  // Animation state
  let showIce = false;
  let showArrows = false;
  let revealedPlayers: Set<number> = new Set();

  onMount(() => {
    if (!animated) {
      showIce = true;
      showArrows = true;
      diagram.players.forEach((_, i) => revealedPlayers.add(i));
      revealedPlayers = revealedPlayers;
      return;
    }

    showIce = true;

    // Reveal players one by one
    const playerDelay = 250;
    const baseDelay = 300;

    diagram.players.forEach((_, i) => {
      setTimeout(() => {
        revealedPlayers.add(i);
        revealedPlayers = revealedPlayers;
      }, baseDelay + i * playerDelay);
    });

    setTimeout(() => {
      showArrows = true;
    }, baseDelay + diagram.players.length * playerDelay + 150);
  });

  // Shorten arrow so it doesn't overlap player circles
  function shortenArrow(fromX: number, fromY: number, toX: number, toY: number, shrink: number = 8) {
    const dx = toX - fromX;
    const dy = toY - fromY;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < shrink * 2) return { x1: fromX, y1: fromY, x2: toX, y2: toY };
    const ratio = shrink / len;
    return {
      x1: fromX + dx * ratio,
      y1: fromY + dy * ratio,
      x2: toX - dx * ratio,
      y2: toY - dy * ratio
    };
  }

  // Build play breakdown data for the panel below
  type BreakdownItem = {
    team: 'you' | 'teammate' | 'opponent';
    label: string;
    note: string;
    faded: boolean;
  };

  function buildBreakdown(): BreakdownItem[] {
    const items: BreakdownItem[] = [];
    for (const p of diagram.players) {
      if (!p.note) continue;
      items.push({
        team: p.type,
        label: p.type === 'you' ? 'YOU' : (p.label || (p.type === 'teammate' ? 'Teammate' : 'Opponent')),
        note: p.note,
        faded: !!p.faded,
      });
    }
    return items;
  }

  const breakdown = buildBreakdown();

  // Collect arrow labels for the breakdown
  const arrowNotes: string[] = (diagram.arrows || [])
    .filter(a => a.label)
    .map(a => a.label!);
</script>

<div class="rink-wrapper">
  <!-- SVG Rink — clean, no text clutter -->
  <svg
    class="rink-svg"
    {viewBox}
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Hockey rink diagram showing player positions and movement"
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      <radialGradient id="iceGradient" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="50%" stop-color="#F0F8FF" />
        <stop offset="100%" stop-color="#D6EBF2" />
      </radialGradient>

      <filter id="iceNoise" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.8" xChannelSelector="R" yChannelSelector="G" />
      </filter>

      <radialGradient id="youJersey" cx="40%" cy="35%">
        <stop offset="0%" stop-color="#FFE44D" />
        <stop offset="100%" stop-color="#DAA520" />
      </radialGradient>
      <radialGradient id="teamJersey" cx="40%" cy="35%">
        <stop offset="0%" stop-color="#5B9FE6" />
        <stop offset="100%" stop-color="#1E40AF" />
      </radialGradient>
      <radialGradient id="oppJersey" cx="40%" cy="35%">
        <stop offset="0%" stop-color="#F87171" />
        <stop offset="100%" stop-color="#B91C1C" />
      </radialGradient>
      <radialGradient id="puckGrad" cx="35%" cy="30%">
        <stop offset="0%" stop-color="#444" />
        <stop offset="100%" stop-color="#0A0A0A" />
      </radialGradient>
      <radialGradient id="refJersey" cx="40%" cy="35%">
        <stop offset="0%" stop-color="#FB923C" />
        <stop offset="100%" stop-color="#EA580C" />
      </radialGradient>

      <marker id="arrowDark" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#1E293B" opacity="0.7" />
      </marker>
      <marker id="arrowRed" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#DC2626" opacity="0.8" />
      </marker>
      <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#2563EB" opacity="0.7" />
      </marker>

      <filter id="youGlow">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- Boards + ice -->
    <rect x="0" y="0" width="200" height="85" rx="18" ry="18"
      fill="#2C1810" stroke="#1A0E08" stroke-width="2" />
    <rect x="4" y="4" width="192" height="77" rx="15" ry="15"
      fill="url(#iceGradient)" filter="url(#iceNoise)" />

    <!-- Lines -->
    <line x1="100" y1="4" x2="100" y2="81" stroke="#C8102E" stroke-width="2" opacity="0.7" />
    <line x1="65" y1="4" x2="65" y2="81" stroke="#1E40AF" stroke-width="2.5" opacity="0.65" />
    <line x1="135" y1="4" x2="135" y2="81" stroke="#1E40AF" stroke-width="2.5" opacity="0.65" />

    <!-- Center -->
    <circle cx="100" cy="42.5" r="2" fill="#C8102E" />
    <circle cx="100" cy="42.5" r="15" fill="none" stroke="#C8102E" stroke-width="1" opacity="0.5" />

    <!-- Goal creases -->
    <path d="M 10 32 Q 22 42.5 10 53" fill="rgba(135,206,250,0.3)" stroke="#C8102E" stroke-width="1.2" />
    <path d="M 190 32 Q 178 42.5 190 53" fill="rgba(135,206,250,0.3)" stroke="#C8102E" stroke-width="1.2" />
    <line x1="10" y1="15" x2="10" y2="70" stroke="#C8102E" stroke-width="1" opacity="0.4" />
    <line x1="190" y1="15" x2="190" y2="70" stroke="#C8102E" stroke-width="1" opacity="0.4" />

    <!-- Faceoff circles & dots -->
    {#each [[35, 25], [35, 60], [165, 25], [165, 60]] as [cx, cy]}
      <circle {cx} {cy} r="10" fill="none" stroke="#C8102E" stroke-width="0.8" opacity="0.4" />
      <circle {cx} {cy} r="1.5" fill="#C8102E" opacity="0.5" />
    {/each}
    {#each [[80, 25], [80, 60], [120, 25], [120, 60]] as [cx, cy]}
      <circle {cx} {cy} r="1.2" fill="#C8102E" opacity="0.3" />
    {/each}

    <!-- Trapezoids -->
    <path d="M 4 28 L 10 32 L 10 53 L 4 57" fill="none" stroke="#C8102E" stroke-width="0.5" opacity="0.25" />
    <path d="M 196 28 L 190 32 L 190 53 L 196 57" fill="none" stroke="#C8102E" stroke-width="0.5" opacity="0.25" />

    <!-- Tactical arrows (subtle visual lines only) -->
    {#if diagram.arrows && showArrows}
      {#each diagram.arrows as arrow, i}
        {@const s = shortenArrow(arrow.from.x, arrow.from.y, arrow.to.x, arrow.to.y, 8)}
        <line
          x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
          stroke={arrow.style === 'dashed' ? '#DC2626' : '#475569'}
          stroke-width="0.8"
          stroke-dasharray={arrow.style === 'dashed' ? '3,2' : 'none'}
          opacity="0.4"
          marker-end={arrow.style === 'dashed' ? 'url(#arrowRed)' : 'url(#arrowDark)'}
          class="tactical-arrow"
          class:anim-draw={animated}
          style="--delay: {i * 120}ms"
        />
      {/each}
    {/if}

    <!-- Player movement trails -->
    {#each diagram.players as player, i}
      {#if player.targetX !== undefined && player.targetY !== undefined && revealedPlayers.has(i) && !player.faded}
        {@const s = shortenArrow(player.x, player.y, player.targetX, player.targetY, 9)}
        <line
          x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
          stroke={player.type === 'opponent' ? '#DC2626' : '#2563EB'}
          stroke-width="0.6"
          stroke-dasharray="2,1.5"
          opacity="0.3"
          marker-end={player.type === 'opponent' ? 'url(#arrowRed)' : 'url(#arrowBlue)'}
          class="movement-trail"
        />
      {/if}
    {/each}

    <!-- Puck -->
    {#if diagram.puck}
      <circle
        cx={diagram.puck.x} cy={diagram.puck.y}
        r="2.5" fill="url(#puckGrad)"
        stroke="#555" stroke-width="0.5"
        class="puck"
      />
    {/if}

    <!-- Players — circles with position labels only, no role notes -->
    {#each diagram.players as player, i}
      {#if revealedPlayers.has(i)}
        <g class="player-group" class:faded={player.faded} class:anim-pop={animated}>
          {#if player.type === 'you'}
            <circle cx={player.x} cy={player.y} r="6"
              fill="url(#youJersey)" stroke="#8B6914" stroke-width="1.2"
              filter="url(#youGlow)" class="you-pulse" />
            <text x={player.x} y={player.y + 2} font-size="4.5" fill="#4A3000"
              text-anchor="middle" font-weight="bold">YOU</text>
          {:else if player.type === 'teammate'}
            <circle cx={player.x} cy={player.y} r="5.5"
              fill="url(#teamJersey)" stroke="#1E3A6E" stroke-width="1.2" />
            {#if player.label}
              <text x={player.x} y={player.y + 2} font-size="4.5" fill="white"
                text-anchor="middle" font-weight="bold">{player.label}</text>
            {/if}
          {:else}
            <circle cx={player.x} cy={player.y} r="5.5"
              fill="url(#oppJersey)" stroke="#8B1A1A" stroke-width="1.2" />
            {#if player.label}
              <text x={player.x} y={player.y + 2} font-size="4.5" fill="white"
                text-anchor="middle" font-weight="bold">{player.label}</text>
            {/if}
          {/if}
        </g>
      {/if}
    {/each}

    <!-- Ref / Linesman — rendered AFTER players so it's visible on top -->
    {#if diagram.ref && showIce}
      <g class="player-group ref-marker" class:anim-pop={animated}>
        <circle cx={diagram.ref.x} cy={diagram.ref.y} r="5.5"
          fill="url(#refJersey)" stroke="white" stroke-width="1.2" />
        <text x={diagram.ref.x} y={diagram.ref.y + 1.8} font-size="3.5" fill="white"
          text-anchor="middle" font-weight="bold">{diagram.ref.label || 'REF'}</text>
      </g>
    {/if}
  </svg>

  <!-- === PLAY BREAKDOWN panel — clean text outside the SVG === -->
  <div class="play-breakdown">
    <div class="breakdown-grid">
      {#each breakdown as item}
        <div class="breakdown-item" class:faded-item={item.faded}>
          <span class="dot dot-{item.team}"></span>
          <span class="breakdown-label">{item.label}</span>
          <span class="breakdown-note">{item.note}{#if item.faded} — out of play{/if}</span>
        </div>
      {/each}
    </div>

    {#if arrowNotes.length > 0}
      <div class="arrow-notes">
        {#each arrowNotes as note}
          <span class="arrow-tag">{note}</span>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Mini legend -->
  <div class="legend">
    <span class="legend-item"><span class="ldot you"></span> You</span>
    <span class="legend-item"><span class="ldot team"></span> Team</span>
    <span class="legend-item"><span class="ldot opp"></span> Opp</span>
    {#if diagram.ref}
      <span class="legend-item"><span class="ldot ref"></span> Ref</span>
    {/if}
    <span class="legend-item"><span class="lline red"></span> Threat</span>
    <span class="legend-item"><span class="lline dark"></span> Move</span>
  </div>
</div>

<style>
  .rink-wrapper { width: 100%; }

  .rink-svg {
    width: 100%;
    height: auto;
    max-height: 40vh;
    display: block;
    border-radius: 8px;
    overflow: hidden;
  }

  /* Animations */
  .anim-pop { animation: pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  .anim-fade-in { animation: fade-in 0.4s ease-out both; }
  .anim-draw {
    animation: draw-in 0.35s ease-out both;
    animation-delay: var(--delay, 0ms);
  }

  @keyframes pop-in {
    from { opacity: 0; transform: scale(0.4); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes draw-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .movement-trail { animation: dash-flow 1.5s linear infinite; }
  @keyframes dash-flow { to { stroke-dashoffset: -8; } }

  .player-group { transition: opacity 0.3s ease; }
  .player-group.faded { opacity: 0.35; }

  .you-pulse { animation: pulse-ring 2s ease-in-out infinite; }
  @keyframes pulse-ring {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; filter: drop-shadow(0 0 3px rgba(255, 215, 0, 0.6)); }
  }

  .puck { filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.4)); }

  /* === Play Breakdown Panel === */
  .play-breakdown {
    margin-top: 10px;
    padding: 10px 12px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .breakdown-grid {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .breakdown-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8rem;
    line-height: 1.3;
  }

  .breakdown-item.faded-item {
    opacity: 0.5;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .dot-you { background: linear-gradient(135deg, #FFE44D, #DAA520); border: 1.5px solid #8B6914; }
  .dot-teammate { background: linear-gradient(135deg, #5B9FE6, #1E40AF); border: 1.5px solid #1E3A6E; }
  .dot-opponent { background: linear-gradient(135deg, #F87171, #B91C1C); border: 1.5px solid #8B1A1A; }

  .breakdown-label {
    font-weight: 700;
    color: var(--text-primary, #E2E8F0);
    min-width: 32px;
  }

  .breakdown-note {
    color: var(--silver, #94a3b8);
    font-size: 0.75rem;
  }

  .arrow-notes {
    display: flex;
    gap: 6px;
    margin-top: 8px;
    flex-wrap: wrap;
  }

  .arrow-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.65rem;
    font-weight: 600;
    color: #DC2626;
    background: rgba(220, 38, 38, 0.1);
    border: 1px solid rgba(220, 38, 38, 0.25);
    padding: 2px 8px;
    border-radius: 10px;
  }

  .arrow-tag::before {
    content: '⚠';
    font-size: 0.6rem;
  }

  /* Mini legend */
  .legend {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 6px;
    flex-wrap: wrap;
  }
  .legend-item {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 0.6rem;
    color: var(--silver, #94a3b8);
  }
  .ldot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .ldot.you { background: linear-gradient(135deg, #FFE44D, #DAA520); }
  .ldot.team { background: linear-gradient(135deg, #5B9FE6, #1E40AF); }
  .ldot.opp { background: linear-gradient(135deg, #F87171, #B91C1C); }
  .ldot.ref { background: linear-gradient(135deg, #FB923C, #EA580C); }
  .ref-marker { opacity: 0.95; }
  .lline {
    width: 14px;
    height: 0;
  }
  .lline.red { border-top: 1.5px dashed #DC2626; }
  .lline.dark { background: #1E293B; height: 1.5px; }

  @media (prefers-reduced-motion: reduce) {
    .you-pulse, .anim-pop, .anim-fade-in, .anim-draw, .movement-trail {
      animation: none !important;
    }
  }
</style>
