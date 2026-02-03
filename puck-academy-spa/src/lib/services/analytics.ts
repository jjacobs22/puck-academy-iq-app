// Google Analytics 4 event tracking
import { browser } from '$app/environment';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GA_MEASUREMENT_ID = 'G-0N3XTSRTM2';

/**
 * Track a custom event
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (!browser || typeof window.gtag === 'undefined') return;
  
  window.gtag('event', eventName, params);
}

/**
 * Track scenario answer
 */
export function trackScenarioAnswer(
  moduleId: number,
  scenarioId: number,
  correct: boolean
): void {
  trackEvent('scenario_answer', {
    module: moduleId,
    scenario: scenarioId,
    correct: correct
  });
}

/**
 * Track module completion
 */
export function trackModuleComplete(
  moduleId: number,
  score: number,
  total: number
): void {
  trackEvent('module_complete', {
    module: moduleId,
    score: score,
    total: total,
    percentage: Math.round((score / total) * 100)
  });
}

/**
 * Track share action
 */
export function trackShare(moduleId: number, score: number): void {
  trackEvent('share_score', {
    module: moduleId,
    score: score
  });
}

/**
 * Track page view (for SPA navigation)
 */
export function trackPageView(path: string): void {
  if (!browser || typeof window.gtag === 'undefined') return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path
  });
}
