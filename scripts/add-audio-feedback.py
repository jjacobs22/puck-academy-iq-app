#!/usr/bin/env python3
"""
Add playAudio calls for correct/incorrect feedback to all scenario files.
"""

import os
import re

SCENARIOS_DIR = "/Users/jasonjacobs/Desktop/puck-academy-iq-app"

SCENARIO_FILES = [
    "scenario-2-corner-battle.html",
    "scenario-3-cycle.html",
    "scenario-4-breakout.html",
    "scenario-5-gap.html",
    "module2-scenario1-ref-position.html",
    "module2-scenario2-advantage.html",
    "module2-scenario3-cheat-feet.html",
    "module2-scenario4-tieup.html",
    "module2-scenario5-leverage.html",
    "module2-scenario6-forehand-backhand.html",
    "module2-scenario7-post-draw.html",
    "module3-scenario1-high-low-route.html",
    "module3-scenario2-reading-pressure.html",
    "module3-scenario3-forehand-receive.html",
    "module3-scenario4-cut-laterally.html",
    "module3-scenario5-support-stretch.html",
    "module3-scenario6-forecheck-pattern.html",
    "module3-scenario7-broken-play.html",
    "module4-scenario1-net-front.html",
    "module4-scenario2-cycle-support.html",
    "module4-scenario3-soft-ice.html",
    "module4-scenario4-backdoor.html",
    "module4-scenario5-screen-tip.html",
    "module4-scenario6-high-slot.html",
    "module4-scenario7-ozone-turnover.html",
    "module5-scenario1-f1-angle.html",
    "module5-scenario2-f1-f2-read.html",
    "module5-scenario3-pressure-contain.html",
    "module5-scenario4-angling.html",
    "module5-scenario5-read-breakout.html",
    "module5-scenario6-loose-puck.html",
    "module5-scenario7-turnover-transition.html",
    "module6-scenario1-gap-control.html",
    "module6-scenario2-puck-retrieval.html",
    "module6-scenario3-d-to-d.html",
    "module6-scenario4-net-front-battle.html",
    "module6-scenario5-when-to-pinch.html",
    "module6-scenario6-first-pass.html",
    "module6-scenario7-zone-coverage.html",
]

def add_audio_feedback(filepath):
    """Add playAudio calls for correct/incorrect feedback."""
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Skip if already has audio feedback calls
    if 'playAudio("correct")' in content or "playAudio('correct')" in content:
        print(f"  ⏭ Already has feedback audio: {os.path.basename(filepath)}")
        return False
    
    # Pattern 1: if (isCorrect) { ... feedbackTitle
    # Replace "if (isCorrect) {" with audio call
    pattern1 = r"(if \(isCorrect\) \{)\s*\n(\s*)(feedbackTitle)"
    replacement1 = r"\1\n\2playAudio('correct');\n\2\3"
    content, count1 = re.subn(pattern1, replacement1, content)
    
    # Pattern 2: } else { ... feedbackTitle (for incorrect)
    pattern2 = r"(\} else \{)\s*\n(\s*)(feedbackTitle)"
    replacement2 = r"\1\n\2playAudio('incorrect');\n\2\3"
    content, count2 = re.subn(pattern2, replacement2, content)
    
    if count1 == 0 and count2 == 0:
        print(f"  ⚠ No pattern match: {os.path.basename(filepath)}")
        return False
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"  ✓ Added feedback audio: {os.path.basename(filepath)} (correct: {count1}, incorrect: {count2})")
    return True

def main():
    print("Adding audio feedback calls to scenario files...")
    print("=" * 50)
    
    updated = 0
    skipped = 0
    
    for filename in SCENARIO_FILES:
        filepath = os.path.join(SCENARIOS_DIR, filename)
        if os.path.exists(filepath):
            if add_audio_feedback(filepath):
                updated += 1
            else:
                skipped += 1
        else:
            print(f"  ✗ Not found: {filename}")
    
    print("=" * 50)
    print(f"Complete! Updated: {updated}, Skipped/No match: {skipped}")

if __name__ == "__main__":
    main()
