<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';

  interface Answer {
    text: string;
    correct: boolean;
    feedback: string;
  }

  export let answers: Answer[];
  export let disabled = false;
  export let selectedAnswer: number | null = null;

  const dispatch = createEventDispatcher();

  function handleClick(index: number) {
    if (disabled) return;
    dispatch('answer', { index });
  }

  function getButtonClass(index: number): string {
    if (selectedAnswer === null) return '';
    if (index === selectedAnswer) {
      return answers[index].correct ? 'correct' : 'incorrect';
    }
    if (answers[index].correct && selectedAnswer !== null) {
      return 'correct'; // Show correct answer after selection
    }
    return '';
  }
</script>

<div class="answers-grid">
  {#each answers as answer, i}
    <button
      class="answer-btn {getButtonClass(i)}"
      class:selected={selectedAnswer === i}
      disabled={disabled}
      on:click={() => handleClick(i)}
      in:fly={{ y: 10, delay: 50 * i, duration: 200 }}
    >
      <span class="answer-letter">{String.fromCharCode(65 + i)}</span>
      <span class="answer-text">{answer.text}</span>
      {#if selectedAnswer !== null}
        <span class="answer-indicator">
          {#if i === selectedAnswer}
            {answer.correct ? '✓' : '✗'}
          {:else if answer.correct}
            ✓
          {/if}
        </span>
      {/if}
    </button>
  {/each}
</div>

<style>
  .answers-grid {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .answer-btn {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    width: 100%;
    padding: var(--spacing-md) var(--spacing-lg);
    background: white;
    color: var(--dark-blue);
    border: 3px solid transparent;
    border-radius: var(--radius-md);
    text-align: left;
    font-size: 1rem;
    cursor: pointer;
    transition: all var(--transition-base);
    position: relative;
  }

  .answer-btn:hover:not(:disabled) {
    border-color: var(--accent-red);
    transform: translateX(8px);
    box-shadow: var(--shadow-md);
  }

  .answer-btn:disabled {
    cursor: default;
  }

  .answer-btn:disabled:not(.correct):not(.incorrect) {
    opacity: 0.6;
  }

  .answer-btn.correct {
    border-color: var(--success-green);
    background: rgba(16, 185, 129, 0.1);
  }

  .answer-btn.incorrect {
    border-color: var(--error-red);
    background: rgba(239, 68, 68, 0.1);
  }

  .answer-btn.selected {
    transform: translateX(8px);
  }

  .answer-letter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: var(--dark-blue);
    color: white;
    border-radius: var(--radius-full);
    font-weight: 600;
    font-size: 0.875rem;
    flex-shrink: 0;
  }

  .answer-btn.correct .answer-letter {
    background: var(--success-green);
  }

  .answer-btn.incorrect .answer-letter {
    background: var(--error-red);
  }

  .answer-text {
    flex: 1;
    line-height: 1.4;
  }

  .answer-indicator {
    font-size: 1.25rem;
    font-weight: 600;
  }

  .answer-btn.correct .answer-indicator {
    color: var(--success-green);
  }

  .answer-btn.incorrect .answer-indicator {
    color: var(--error-red);
  }
</style>
