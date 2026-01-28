#!/usr/bin/env python3
"""
Add progress indicator to all scenario files
"""
import re
import os

# Define scenario configurations
SCENARIOS = {
    # Module 1: Defensive Zone (7 scenarios)
    'hockey-iq-diagram.html': (1, 1, 7),
    'scenario-2-corner-battle.html': (1, 2, 7),
    'scenario-3-cycle.html': (1, 3, 7),
    'scenario-4-breakout.html': (1, 4, 7),
    'scenario-5-gap.html': (1, 5, 7),
    'scenario-6-winger-caught.html': (1, 6, 7),
    'scenario-7-d-partner-bites.html': (1, 7, 7),
    # Module 2: Faceoffs (7 scenarios)
    'module2-scenario1-ref-position.html': (2, 1, 7),
    'module2-scenario2-advantage.html': (2, 2, 7),
    'module2-scenario3-cheat-feet.html': (2, 3, 7),
    'module2-scenario4-tieup.html': (2, 4, 7),
    'module2-scenario5-leverage.html': (2, 5, 7),
    'module2-scenario6-forehand-backhand.html': (2, 6, 7),  # Already has it
    'module2-scenario7-post-draw.html': (2, 7, 7),
    # Module 3: Breakouts (7 scenarios)
    'module3-scenario1-high-low-route.html': (3, 1, 7),
    'module3-scenario2-reading-pressure.html': (3, 2, 7),
    'module3-scenario3-forehand-receive.html': (3, 3, 7),
    'module3-scenario4-cut-laterally.html': (3, 4, 7),
    'module3-scenario5-support-stretch.html': (3, 5, 7),
    'module3-scenario6-forecheck-pattern.html': (3, 6, 7),
    'module3-scenario7-broken-play.html': (3, 7, 7),
    # Module 4: Offensive Zone (7 scenarios)
    'module4-scenario1-net-front.html': (4, 1, 7),
    'module4-scenario2-cycle-support.html': (4, 2, 7),
    'module4-scenario3-soft-ice.html': (4, 3, 7),
    'module4-scenario4-backdoor.html': (4, 4, 7),
    'module4-scenario5-screen-tip.html': (4, 5, 7),
    'module4-scenario6-high-slot.html': (4, 6, 7),
    'module4-scenario7-ozone-turnover.html': (4, 7, 7),
    # Module 5: Forechecking (8 scenarios)
    'module5-scenario1-f1-angle.html': (5, 1, 8),
    'module5-scenario2-f1-f2-read.html': (5, 2, 8),
    'module5-scenario3-pressure-contain.html': (5, 3, 8),
    'module5-scenario4-angling.html': (5, 4, 8),
    'module5-scenario5-read-breakout.html': (5, 5, 8),
    'module5-scenario6-loose-puck.html': (5, 6, 8),
    'module5-scenario7-turnover-transition.html': (5, 7, 8),
    'module5-scenario8-f2-gassed.html': (5, 8, 8),
    # Module 6: D-Zone for Defensemen (7 scenarios)
    'module6-scenario1-gap-control.html': (6, 1, 7),
    'module6-scenario2-puck-retrieval.html': (6, 2, 7),
    'module6-scenario3-d-to-d.html': (6, 3, 7),
    'module6-scenario4-net-front-battle.html': (6, 4, 7),
    'module6-scenario5-when-to-pinch.html': (6, 5, 7),
    'module6-scenario6-first-pass.html': (6, 6, 7),
    'module6-scenario7-zone-coverage.html': (6, 7, 7),
}

# CSS to add
PROGRESS_CSS = '''
        /* Module Progress Indicator */
        .module-progress {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            margin: 15px 0 25px;
            padding: 12px 20px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 10px;
        }

        .progress-stat {
            text-align: center;
        }

        .progress-stat-value {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 1.4rem;
            color: var(--ice-blue);
        }

        .progress-stat-value.correct {
            color: var(--success-green);
        }

        .progress-stat-label {
            font-size: 0.7rem;
            color: var(--silver);
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .progress-divider {
            width: 1px;
            height: 30px;
            background: rgba(255, 255, 255, 0.2);
        }
'''

# HTML to add
PROGRESS_HTML = '''
        <!-- Module Progress Indicator -->
        <div class="module-progress" id="moduleProgress">
            <div class="progress-stat">
                <div class="progress-stat-value" id="scenarioProgress">{scenario}/{total}</div>
                <div class="progress-stat-label">Scenario</div>
            </div>
            <div class="progress-divider"></div>
            <div class="progress-stat">
                <div class="progress-stat-value correct" id="correctCount">-</div>
                <div class="progress-stat-label">Correct</div>
            </div>
        </div>

'''

# JavaScript to add
PROGRESS_JS = '''
        const SCENARIO_NUMBER = {scenario};
        const TOTAL_SCENARIOS = {total};

        // Update progress display
        function updateProgressDisplay() {{
            const scores = Storage.getModuleScores(MODULE_NUMBER);
            const currentRun = scores.currentRun || {{}};
            const answeredCount = Object.keys(currentRun).length;
            const correct = Object.values(currentRun).filter(v => v === true).length;
            
            document.getElementById('scenarioProgress').textContent = `${{SCENARIO_NUMBER}}/${{TOTAL_SCENARIOS}}`;
            document.getElementById('correctCount').textContent = answeredCount > 0 ? `${{correct}}/${{answeredCount}}` : '-';
        }}
        
        // Call on page load
        updateProgressDisplay();
'''

def add_progress_to_file(filename, module, scenario, total):
    """Add progress indicator to a scenario file"""
    filepath = os.path.join('..', filename)
    if not os.path.exists(filepath):
        filepath = filename
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Skip if already has progress indicator
    if 'module-progress' in content:
        print(f"  Skipping {filename} - already has progress indicator")
        return False
    
    # 1. Add CSS before .scenario-title { if not present
    if '.module-progress' not in content:
        css_insert_pattern = r'(\.scenario-title\s*\{)'
        if re.search(css_insert_pattern, content):
            content = re.sub(css_insert_pattern, PROGRESS_CSS + r'\n        \1', content)
    
    # 2. Add HTML after </header> and before scenario-title
    html_formatted = PROGRESS_HTML.format(scenario=scenario, total=total)
    header_pattern = r'(</header>\s*\n\s*)(<h2 class="scenario-title")'
    if re.search(header_pattern, content):
        content = re.sub(header_pattern, r'\1' + html_formatted + r'\2', content)
    
    # 3. Add JavaScript after MODULE_NUMBER declaration
    js_formatted = PROGRESS_JS.format(scenario=scenario, total=total)
    # Find MODULE_NUMBER line and add after it
    module_pattern = r'(const MODULE_NUMBER = \d+;)'
    if re.search(module_pattern, content):
        content = re.sub(module_pattern, r'\1\n' + js_formatted, content)
    
    # 4. Add updateProgressDisplay() call after saveScenarioScore
    save_pattern = r'(Storage\.saveScenarioScore\(MODULE_NUMBER,\s*\d+,\s*isCorrect\);)'
    if 'updateProgressDisplay();' not in content:
        content = re.sub(save_pattern, r'\1\n            updateProgressDisplay();', content)
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"  Updated {filename}")
    return True

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    os.chdir('..')
    
    print("Adding progress indicator to all scenario files...")
    updated = 0
    
    for filename, (module, scenario, total) in SCENARIOS.items():
        if os.path.exists(filename):
            if add_progress_to_file(filename, module, scenario, total):
                updated += 1
        else:
            print(f"  WARNING: {filename} not found")
    
    print(f"\nDone! Updated {updated} files.")

if __name__ == '__main__':
    main()
