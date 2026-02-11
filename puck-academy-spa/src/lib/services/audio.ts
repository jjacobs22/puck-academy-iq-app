// Audio playback manager for voice narration
import { writable } from 'svelte/store';

export type AudioClip = 'setup' | 'prompt' | 'correct' | 'incorrect';

// Reactive state for audio
export const voiceEnabled = writable(true);
export const currentlyPlaying = writable<AudioClip | null>(null);

// Map scenario IDs to audio folder names
const audioFolderMap: Record<string, string> = {
  'module1-scenario1': 'hockey-iq-diagram',
  'module1-scenario2': 'scenario-2-corner-battle',
  'module1-scenario3': 'scenario-3-cycle',
  'module1-scenario4': 'scenario-4-breakout',
  'module1-scenario5': 'scenario-5-gap',
  'module1-scenario6': 'scenario-6-winger-caught',
  'module1-scenario7': 'scenario-7-d-partner-bites',
  'module2-scenario1': 'module2-scenario1-ref-position',
  'module2-scenario2': 'module2-scenario2-advantage',
  'module2-scenario3': 'module2-scenario3-cheat-feet',
  'module2-scenario4': 'module2-scenario4-tieup',
  'module2-scenario5': 'module2-scenario5-leverage',
  'module2-scenario6': 'module2-scenario6-forehand-backhand',
  'module2-scenario7': 'module2-scenario7-post-draw',
  'module3-scenario1': 'module3-scenario1-high-low-route',
  'module3-scenario2': 'module3-scenario2-reading-pressure',
  'module3-scenario3': 'module3-scenario3-forehand-receive',
  'module3-scenario4': 'module3-scenario4-cut-laterally',
  'module3-scenario5': 'module3-scenario5-support-stretch',
  'module3-scenario6': 'module3-scenario6-forecheck-pattern',
  'module3-scenario7': 'module3-scenario7-broken-play',
  'module4-scenario1': 'module4-scenario1-net-front',
  'module4-scenario2': 'module4-scenario2-cycle-support',
  'module4-scenario3': 'module4-scenario3-soft-ice',
  'module4-scenario4': 'module4-scenario4-backdoor',
  'module4-scenario5': 'module4-scenario5-screen-tip',
  'module4-scenario6': 'module4-scenario6-high-slot',
  'module4-scenario7': 'module4-scenario7-ozone-turnover',
  'module5-scenario1': 'module5-scenario1-f1-angle',
  'module5-scenario2': 'module5-scenario2-f1-f2-read',
  'module5-scenario3': 'module5-scenario3-pressure-contain',
  'module5-scenario4': 'module5-scenario4-angling',
  'module5-scenario5': 'module5-scenario5-read-breakout',
  'module5-scenario6': 'module5-scenario6-loose-puck',
  'module5-scenario7': 'module5-scenario7-turnover-transition',
  'module5-scenario8': 'module5-scenario8-f2-gassed',
  'module6-scenario1': 'module6-scenario1-gap-control',
  'module6-scenario2': 'module6-scenario2-puck-retrieval',
  'module6-scenario3': 'module6-scenario3-d-to-d',
  'module6-scenario4': 'module6-scenario4-net-front-battle',
  'module6-scenario5': 'module6-scenario5-when-to-pinch',
  'module6-scenario6': 'module6-scenario6-first-pass',
  'module6-scenario7': 'module6-scenario7-zone-coverage'
};

class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private preloadedAudio: Map<string, HTMLAudioElement> = new Map();

  constructor() {
    // Initialize on first interaction (browser autoplay policy)
  }

  /**
   * Play an audio clip for a scenario
   */
  async play(scenarioId: string, clip: AudioClip): Promise<void> {
    // Stop any currently playing audio
    this.stop();

    const folder = audioFolderMap[scenarioId] || scenarioId;
    const path = `/audio/${folder}/${clip}.mp3`;

    // Check if preloaded
    let audio = this.preloadedAudio.get(path);
    if (!audio) {
      audio = new Audio(path);
    }

    this.audio = audio;
    currentlyPlaying.set(clip);

    try {
      // Set up event handlers before playing
      audio.onended = () => {
        currentlyPlaying.set(null);
      };
      audio.onerror = () => {
        // Silently handle missing audio files — voice is optional
        currentlyPlaying.set(null);
      };

      await audio.play();
    } catch (err) {
      // Audio blocked by browser policy or file not found — not critical
      currentlyPlaying.set(null);
    }
  }

  /**
   * Preload audio clips for a scenario (call on route enter)
   */
  preload(scenarioId: string): void {
    const clips: AudioClip[] = ['setup', 'prompt', 'correct', 'incorrect'];
    const folder = audioFolderMap[scenarioId] || scenarioId;

    for (const clip of clips) {
      const path = `/audio/${folder}/${clip}.mp3`;
      if (!this.preloadedAudio.has(path)) {
        const audio = new Audio();
        audio.preload = 'auto';
        // Silently handle missing audio files
        audio.onerror = () => {};
        audio.src = path;
        this.preloadedAudio.set(path, audio);
      }
    }
  }

  /**
   * Stop currently playing audio
   */
  stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
    currentlyPlaying.set(null);
  }

  /**
   * Pause currently playing audio
   */
  pause(): void {
    if (this.audio) {
      this.audio.pause();
    }
  }

  /**
   * Resume paused audio
   */
  resume(): void {
    if (this.audio) {
      this.audio.play().catch(() => {});
    }
  }

  /**
   * Clear preloaded audio to free memory
   */
  clearPreloaded(): void {
    this.preloadedAudio.clear();
  }
}

export const audioManager = new AudioManager();
