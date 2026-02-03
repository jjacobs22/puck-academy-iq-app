<script lang="ts">
  export let diagram: {
    viewBox?: string;
    zone: 'defensive' | 'offensive' | 'neutral';
    players: Array<{
      type: 'you' | 'teammate' | 'opponent';
      x: number;
      y: number;
      label?: string;
    }>;
    puck?: { x: number; y: number };
    arrows?: Array<{
      from: { x: number; y: number };
      to: { x: number; y: number };
      style?: 'solid' | 'dashed';
    }>;
  };

  const viewBox = diagram.viewBox || '0 0 200 85';

  // Player styling
  const playerStyles = {
    you: { fill: '#FFD700', stroke: '#0A1628', radius: 10, textColor: '#0A1628' },
    teammate: { fill: '#3B82F6', stroke: '#1E40AF', radius: 8, textColor: 'white' },
    opponent: { fill: '#EF4444', stroke: '#B91C1C', radius: 8, textColor: 'white' }
  };
</script>

<svg
  class="rink-svg"
  {viewBox}
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-label="Hockey rink diagram showing player positions"
>
  <!-- Rink outline -->
  <rect
    x="2"
    y="2"
    width="196"
    height="81"
    rx="20"
    ry="20"
    fill="#E8F4F8"
    stroke="#0A1628"
    stroke-width="2"
  />

  <!-- Center line -->
  <line x1="100" y1="2" x2="100" y2="83" stroke="#C8102E" stroke-width="2" />

  <!-- Blue lines -->
  <line x1="65" y1="2" x2="65" y2="83" stroke="#3B82F6" stroke-width="3" />
  <line x1="135" y1="2" x2="135" y2="83" stroke="#3B82F6" stroke-width="3" />

  <!-- Goal creases -->
  <path d="M 10 32 Q 20 42.5 10 53" fill="none" stroke="#C8102E" stroke-width="1.5" />
  <path d="M 190 32 Q 180 42.5 190 53" fill="none" stroke="#C8102E" stroke-width="1.5" />

  <!-- Center circle -->
  <circle cx="100" cy="42.5" r="15" fill="none" stroke="#3B82F6" stroke-width="1.5" />

  <!-- Faceoff circles -->
  <circle cx="35" cy="25" r="10" fill="none" stroke="#C8102E" stroke-width="1" />
  <circle cx="35" cy="60" r="10" fill="none" stroke="#C8102E" stroke-width="1" />
  <circle cx="165" cy="25" r="10" fill="none" stroke="#C8102E" stroke-width="1" />
  <circle cx="165" cy="60" r="10" fill="none" stroke="#C8102E" stroke-width="1" />

  <!-- Zone label -->
  {#if diagram.zone === 'defensive'}
    <text x="35" y="10" font-size="6" fill="#0A1628" text-anchor="middle" font-weight="bold">
      YOUR ZONE
    </text>
  {:else if diagram.zone === 'offensive'}
    <text x="165" y="10" font-size="6" fill="#0A1628" text-anchor="middle" font-weight="bold">
      ATTACK ZONE
    </text>
  {/if}

  <!-- Arrows -->
  {#if diagram.arrows}
    {#each diagram.arrows as arrow}
      <line
        x1={arrow.from.x}
        y1={arrow.from.y}
        x2={arrow.to.x}
        y2={arrow.to.y}
        stroke="#0A1628"
        stroke-width="2"
        stroke-dasharray={arrow.style === 'dashed' ? '4,2' : 'none'}
        marker-end="url(#arrowhead)"
      />
    {/each}
  {/if}

  <!-- Arrow marker definition -->
  <defs>
    <marker
      id="arrowhead"
      markerWidth="6"
      markerHeight="6"
      refX="5"
      refY="3"
      orient="auto"
    >
      <polygon points="0 0, 6 3, 0 6" fill="#0A1628" />
    </marker>
  </defs>

  <!-- Players -->
  {#each diagram.players as player}
    {@const style = playerStyles[player.type]}
    <g class="player-marker">
      <circle
        cx={player.x}
        cy={player.y}
        r={style.radius}
        fill={style.fill}
        stroke={style.stroke}
        stroke-width="2"
      />
      {#if player.label}
        <text
          x={player.x}
          y={player.y + 3}
          font-size="7"
          fill={style.textColor}
          text-anchor="middle"
          font-weight="bold"
        >
          {player.label}
        </text>
      {:else if player.type === 'you'}
        <text
          x={player.x}
          y={player.y + 3}
          font-size="7"
          fill={style.textColor}
          text-anchor="middle"
          font-weight="bold"
        >
          YOU
        </text>
      {/if}
    </g>
  {/each}

  <!-- Puck -->
  {#if diagram.puck}
    <circle
      cx={diagram.puck.x}
      cy={diagram.puck.y}
      r="3"
      fill="#0A1628"
      class="puck"
    />
  {/if}
</svg>

<!-- Legend -->
<div class="legend">
  <div class="legend-item">
    <span class="legend-dot you"></span>
    <span>You</span>
  </div>
  <div class="legend-item">
    <span class="legend-dot teammate"></span>
    <span>Teammate</span>
  </div>
  <div class="legend-item">
    <span class="legend-dot opponent"></span>
    <span>Opponent</span>
  </div>
</div>

<style>
  .rink-svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .player-marker {
    transition: transform 0.3s ease;
  }

  .puck {
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  }

  .legend {
    display: flex;
    justify-content: center;
    gap: var(--spacing-lg);
    margin-top: var(--spacing-md);
    padding-top: var(--spacing-md);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-size: 0.75rem;
    color: var(--dark-blue);
  }

  .legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .legend-dot.you {
    background: #FFD700;
    border: 2px solid #0A1628;
  }

  .legend-dot.teammate {
    background: #3B82F6;
    border: 2px solid #1E40AF;
  }

  .legend-dot.opponent {
    background: #EF4444;
    border: 2px solid #B91C1C;
  }
</style>
