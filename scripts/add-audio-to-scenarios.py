#!/usr/bin/env python3
"""
Add ElevenLabs audio playback to all scenario files.
This adds voice narration without modifying the existing animation/diagram logic.
"""

import os
import re

SCENARIOS_DIR = "/Users/jasonjacobs/Desktop/puck-academy-iq-app"

# Map of scenario files to their audio folder names
SCENARIO_FILES = [
    # Module 1
    ("scenario-2-corner-battle.html", "scenario-2-corner-battle"),
    ("scenario-3-cycle.html", "scenario-3-cycle"),
    ("scenario-4-breakout.html", "scenario-4-breakout"),
    ("scenario-5-gap.html", "scenario-5-gap"),
    # Module 2
    ("module2-scenario1-ref-position.html", "module2-scenario1-ref-position"),
    ("module2-scenario2-advantage.html", "module2-scenario2-advantage"),
    ("module2-scenario3-cheat-feet.html", "module2-scenario3-cheat-feet"),
    ("module2-scenario4-tieup.html", "module2-scenario4-tieup"),
    ("module2-scenario5-leverage.html", "module2-scenario5-leverage"),
    ("module2-scenario6-forehand-backhand.html", "module2-scenario6-forehand-backhand"),
    ("module2-scenario7-post-draw.html", "module2-scenario7-post-draw"),
    # Module 3
    ("module3-scenario1-high-low-route.html", "module3-scenario1-high-low-route"),
    ("module3-scenario2-reading-pressure.html", "module3-scenario2-reading-pressure"),
    ("module3-scenario3-forehand-receive.html", "module3-scenario3-forehand-receive"),
    ("module3-scenario4-cut-laterally.html", "module3-scenario4-cut-laterally"),
    ("module3-scenario5-support-stretch.html", "module3-scenario5-support-stretch"),
    ("module3-scenario6-forecheck-pattern.html", "module3-scenario6-forecheck-pattern"),
    ("module3-scenario7-broken-play.html", "module3-scenario7-broken-play"),
    # Module 4
    ("module4-scenario1-net-front.html", "module4-scenario1-net-front"),
    ("module4-scenario2-cycle-support.html", "module4-scenario2-cycle-support"),
    ("module4-scenario3-soft-ice.html", "module4-scenario3-soft-ice"),
    ("module4-scenario4-backdoor.html", "module4-scenario4-backdoor"),
    ("module4-scenario5-screen-tip.html", "module4-scenario5-screen-tip"),
    ("module4-scenario6-high-slot.html", "module4-scenario6-high-slot"),
    ("module4-scenario7-ozone-turnover.html", "module4-scenario7-ozone-turnover"),
    # Module 5
    ("module5-scenario1-f1-angle.html", "module5-scenario1-f1-angle"),
    ("module5-scenario2-f1-f2-read.html", "module5-scenario2-f1-f2-read"),
    ("module5-scenario3-pressure-contain.html", "module5-scenario3-pressure-contain"),
    ("module5-scenario4-angling.html", "module5-scenario4-angling"),
    ("module5-scenario5-read-breakout.html", "module5-scenario5-read-breakout"),
    ("module5-scenario6-loose-puck.html", "module5-scenario6-loose-puck"),
    ("module5-scenario7-turnover-transition.html", "module5-scenario7-turnover-transition"),
    # Module 6
    ("module6-scenario1-gap-control.html", "module6-scenario1-gap-control"),
    ("module6-scenario2-puck-retrieval.html", "module6-scenario2-puck-retrieval"),
    ("module6-scenario3-d-to-d.html", "module6-scenario3-d-to-d"),
    ("module6-scenario4-net-front-battle.html", "module6-scenario4-net-front-battle"),
    ("module6-scenario5-when-to-pinch.html", "module6-scenario5-when-to-pinch"),
    ("module6-scenario6-first-pass.html", "module6-scenario6-first-pass"),
    ("module6-scenario7-zone-coverage.html", "module6-scenario7-zone-coverage"),
]

AUDIO_CODE_TEMPLATE = '''
        // ====== ELEVENLABS VOICE AUDIO ======
        let voiceEnabled = true;
        let currentAudio = null;
        const AUDIO_PATH = '/audio/{audio_folder}/';
        
        const audioFiles = {{
            setup: new Audio(AUDIO_PATH + 'setup.mp3'),
            prompt: new Audio(AUDIO_PATH + 'prompt.mp3'),
            correct: new Audio(AUDIO_PATH + 'correct.mp3'),
            incorrect: new Audio(AUDIO_PATH + 'incorrect.mp3')
        }};
        
        function playAudio(type) {{
            if (!voiceEnabled) return;
            stopAudio();
            currentAudio = audioFiles[type];
            if (currentAudio) {{
                currentAudio.currentTime = 0;
                currentAudio.play().catch(e => console.log('Audio play failed:', e));
            }}
        }}
        
        function stopAudio() {{
            if (currentAudio) {{
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }}
        }}
        
        // Auto-play setup narration when page loads
        window.addEventListener('load', () => {{
            setTimeout(() => playAudio('setup'), 500);
        }});
'''

VOICE_TOGGLE_BUTTON = '''
    <!-- Voice Toggle Button -->
    <button id="voiceToggleBtn" onclick="toggleVoice()" style="position: fixed; bottom: 20px; right: 20px; background: #0A1628; color: #E8F4F8; border: 2px solid #E8F4F8; padding: 10px 15px; border-radius: 8px; cursor: pointer; font-weight: 600; z-index: 1000;">🔊 Voice</button>
    
    <script>
        function toggleVoice() {
            voiceEnabled = !voiceEnabled;
            const btn = document.getElementById('voiceToggleBtn');
            btn.textContent = voiceEnabled ? '🔊 Voice' : '🔇 Voice';
            if (!voiceEnabled && typeof stopAudio === 'function') stopAudio();
        }
    </script>
'''

def add_audio_to_file(filepath, audio_folder):
    """Add audio playback code to a scenario file."""
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Skip if already has ElevenLabs audio
    if 'ELEVENLABS VOICE AUDIO' in content:
        print(f"  ⏭ Already has audio: {os.path.basename(filepath)}")
        return False
    
    # Add audio code after the module imports
    audio_code = AUDIO_CODE_TEMPLATE.format(audio_folder=audio_folder)
    
    # Find the script module section and add audio code after imports
    import_pattern = r"(import \{ Analytics \} from './js/analytics\.js';)"
    if re.search(import_pattern, content):
        content = re.sub(
            import_pattern,
            r"\1" + audio_code,
            content
        )
    else:
        # Fallback: add after <script type="module">
        content = content.replace(
            '<script type="module">',
            '<script type="module">' + audio_code
        )
    
    # Add playAudio calls to selectAnswer function
    # For correct answer
    content = re.sub(
        r'(if \(isCorrect\) \{[^}]*feedbackTitle\.textContent = [\'"]CORRECT)',
        r'playAudio("correct");\n            \1',
        content
    )
    
    # For incorrect answer - find the else block
    content = re.sub(
        r'(\} else \{[^}]*feedbackTitle\.textContent = [\'"]NOT QUITE)',
        r'} else {\n                playAudio("incorrect");\n                feedbackTitle.textContent = "NOT QUITE',
        content
    )
    
    # Alternative patterns for feedback
    if 'playAudio("correct")' not in content:
        # Try alternative pattern
        content = re.sub(
            r"(feedbackTitle\.textContent = 'CORRECT!';)",
            r'playAudio("correct");\n            \1',
            content
        )
    
    if 'playAudio("incorrect")' not in content:
        content = re.sub(
            r"(feedbackTitle\.textContent = 'NOT QUITE\.\.\.';)",
            r'playAudio("incorrect");\n            \1',
            content
        )
    
    # Add voice toggle button before </body>
    if 'voiceToggleBtn' not in content:
        content = content.replace('</body>', VOICE_TOGGLE_BUTTON + '</body>')
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"  ✓ Updated: {os.path.basename(filepath)}")
    return True

def main():
    print("Adding ElevenLabs audio to scenario files...")
    print("=" * 50)
    
    updated = 0
    skipped = 0
    
    for filename, audio_folder in SCENARIO_FILES:
        filepath = os.path.join(SCENARIOS_DIR, filename)
        if os.path.exists(filepath):
            if add_audio_to_file(filepath, audio_folder):
                updated += 1
            else:
                skipped += 1
        else:
            print(f"  ✗ Not found: {filename}")
    
    print("=" * 50)
    print(f"Complete! Updated: {updated}, Skipped: {skipped}")

if __name__ == "__main__":
    main()
