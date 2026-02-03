// UI state store - manages modals, transitions, and visual state
import { writable, derived } from 'svelte/store';

// ============ Modal Visibility ============

export const showAuthModal = writable(false);
export const showResultsModal = writable(false);
export const showTheoryIntro = writable(false);
export const showMilestoneModal = writable(false);

// Modal data
export const resultsModalData = writable<{
  moduleId: number;
  score: number;
  total: number;
} | null>(null);

export const milestoneModalData = writable<{
  streakCount: number;
} | null>(null);

// ============ Transition State ============

export type TransitionDirection = 'forward' | 'back' | 'up' | 'down';
export type TransitionState = 'idle' | 'entering' | 'exiting';

export const transitionDirection = writable<TransitionDirection>('forward');
export const transitionState = writable<TransitionState>('idle');

// Helper to set transition before navigation
export function navigateWithTransition(direction: TransitionDirection) {
  transitionDirection.set(direction);
  transitionState.set('exiting');

  // Reset after transition completes
  setTimeout(() => {
    transitionState.set('idle');
  }, 400);
}

// ============ Toast Notifications ============

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

function createToastStore() {
  const { subscribe, update } = writable<Toast[]>([]);

  return {
    subscribe,
    show: (message: string, type: Toast['type'] = 'info') => {
      const id = Math.random().toString(36).substring(7);
      update(toasts => [...toasts, { id, message, type }]);

      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        update(toasts => toasts.filter(t => t.id !== id));
      }, 3000);

      return id;
    },
    dismiss: (id: string) => {
      update(toasts => toasts.filter(t => t.id !== id));
    }
  };
}

export const toasts = createToastStore();

// ============ Loading State ============

export const isLoading = writable(false);
export const loadingMessage = writable('');

export function setLoading(loading: boolean, message = '') {
  isLoading.set(loading);
  loadingMessage.set(message);
}

// ============ Scenario Feedback State ============

export const showFeedback = writable(false);
export const feedbackData = writable<{
  correct: boolean;
  explanation: string;
  selectedAnswer: number;
} | null>(null);

export function showAnswerFeedback(correct: boolean, explanation: string, selectedAnswer: number) {
  feedbackData.set({ correct, explanation, selectedAnswer });
  showFeedback.set(true);
}

export function hideFeedback() {
  showFeedback.set(false);
  feedbackData.set(null);
}

// ============ Any Modal Open ============

export const anyModalOpen = derived(
  [showAuthModal, showResultsModal, showTheoryIntro, showMilestoneModal],
  ([$auth, $results, $theory, $milestone]) =>
    $auth || $results || $theory || $milestone
);
