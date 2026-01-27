#!/usr/bin/env python3
"""
Generate ElevenLabs audio files for Puck Academy scenarios.
Uses Josh voice (TxGEqnHWrfWFTfGW9XjX) with eleven_multilingual_v2 model.
"""

import os
import requests
import json
import time

API_KEY = "sk_ad76b4422e5aa8d34a1fed5aa98c335903aa6266eb58fce2"
VOICE_ID = "TxGEqnHWrfWFTfGW9XjX"  # Josh
MODEL_ID = "eleven_multilingual_v2"
OUTPUT_DIR = "/Users/jasonjacobs/Desktop/puck-academy-iq-app/audio"

# Narration data for each scenario
# Format: scenario_id -> { setup, prompt, correct, incorrect }
SCENARIOS = {
    # Module 1: Defensive Zone
    "m1-s1": {
        "name": "hockey-iq-diagram",
        "setup": "Opposing winger has the puck along the boards. Your D-man is moving to pressure. Watch the opponent center. He's sliding into the high slot. The slot is dangerous.",
        "prompt": "What do you do? Make your decision.",
        "correct": "Good read. You cover the center in the slot. Pass denied. Your D wins the puck back and you're already in position for the breakout. That's two-way hockey.",
        "incorrect": "Goal against. You left the middle open. The center was wide open in the slot. That's what happens when you don't take away the dangerous ice."
    },
    "m1-s2": {
        "name": "scenario-2-corner-battle",
        "setup": "Puck is in the corner. Your winger is battling. You're the center providing support. The opposing D is joining the battle. Where do you position yourself?",
        "prompt": "Make your read. Where should you be?",
        "correct": "Perfect. You stay in the middle of the ice, ready to support either way. You can help on the boards or take away the slot. Smart positioning.",
        "incorrect": "Not quite. You committed too early. Stay patient in the middle where you can read and react. Don't chase the puck."
    },
    "m1-s3": {
        "name": "scenario-3-cycle",
        "setup": "Opponents are cycling the puck down low. The puck is behind your net. Your D is tracking the carrier. Where should you be as the center?",
        "prompt": "The cycle is happening. What's your responsibility?",
        "correct": "That's right. You take the front of the net. Your job is to box out and take away the easy pass to the slot. Let your D handle the puck carrier.",
        "incorrect": "Wrong spot. You left the front of the net open. That's prime real estate for the offense. The center owns the middle, especially on the cycle."
    },
    "m1-s4": {
        "name": "scenario-4-breakout",
        "setup": "Your D has recovered the puck behind the net. One forechecker is pressuring hard. Another is high. You're swinging back to support the breakout.",
        "prompt": "What route do you take? High or low?",
        "correct": "Good choice. You took the right route based on the pressure. You gave your D a safe outlet and created time and space for the breakout.",
        "incorrect": "That route got cut off. Read the pressure first. If they're taking away high, go low. If they're taking away low, go high. Always have an escape route."
    },
    "m1-s5": {
        "name": "scenario-5-gap",
        "setup": "You're backchecking. The opponent has the puck entering your zone. Your D is closing the gap. What's your job as the back-pressure?",
        "prompt": "You're the backchecker. What do you do?",
        "correct": "Exactly. You take away the passing lane and let your D play the man. Two on one the puck carrier. That's team defense.",
        "incorrect": "You overcommitted. Let the D handle the carrier. Your job is to take away options. Don't bunch up with your D."
    },
    "m1-s6": {
        "name": "scenario-6-winger-caught",
        "setup": "Your team just turned it over at the offensive blue line. The opponent's D moved it up quick. Your left winger got caught deep — it's a 3-on-2 against your team. You're the center tracking back.",
        "prompt": "Your winger is caught up ice. What's your priority?",
        "correct": "That's discipline. On a 3-on-2, the slot is the danger zone. Your two D-men can handle the wide players. Your job is to eliminate the middle option. Trust your structure, even short a man.",
        "incorrect": "You left the middle open. On an odd-man rush, the slot is the most dangerous area. Stay central and take away the pass to the middle. Your D can handle the wide lanes."
    },
    "m1-s7": {
        "name": "scenario-7-d-partner-bites",
        "setup": "Puck is cycling low in your zone. Your D partner got sucked behind the net chasing the carrier. Now the puck goes to the point. You're the center and you're the only one in position to react.",
        "prompt": "Your D is stuck behind the net. The puck just went to the point. What do you do?",
        "correct": "Smart read. By sitting in the high slot, you take away the most dangerous pass — point to slot. Let the shot come from outside. Your D partner will recover.",
        "incorrect": "You left the high slot exposed. That's where the point man wants to pass. Stay high, stay central, and take away the middle. Trust your D partner to get back into the play."
    },
    
    # Module 2: Faceoffs
    "m2-s1": {
        "name": "module2-scenario1-ref-position",
        "setup": "You're taking a defensive zone faceoff. Watch the referee's positioning. He's setting up on your backhand side. This tells you something about where the puck might go.",
        "prompt": "Based on the ref's position, what's your play?",
        "correct": "Smart read. The ref's position gave you a clue about the puck drop angle. You adjusted your approach and won the draw clean.",
        "incorrect": "Missed the tell. Always read the ref before the drop. Their positioning affects how the puck comes down."
    },
    "m2-s2": {
        "name": "module2-scenario2-advantage",
        "setup": "Offensive zone faceoff. You're stronger on your forehand. But their center looks like he's cheating. Who has the advantage here?",
        "prompt": "Who has the edge on this draw?",
        "correct": "You read it right. Recognizing the advantage helps you decide whether to go for the clean win or tie up. Knowledge is power in the circle.",
        "incorrect": "You misread the situation. Look at stance, hand position, and body lean. These tell you who has the advantage before the puck drops."
    },
    "m2-s3": {
        "name": "module2-scenario3-cheat-feet",
        "setup": "Neutral zone faceoff. This is a fifty-fifty draw. But you notice their center's feet are cheating forward. He's going for a quick forward win.",
        "prompt": "He's cheating his feet. What's your counter?",
        "correct": "Perfect adjustment. You recognized his cheat and countered. In the circle, it's chess not checkers.",
        "incorrect": "He beat you because you didn't adjust. When they cheat forward, you have options. Read and react."
    },
    "m2-s4": {
        "name": "module2-scenario4-tieup",
        "setup": "Defensive zone draw. Their center is stronger than you. You probably won't win it clean. But your winger is ready on the boards.",
        "prompt": "You can't win it clean. What do you do?",
        "correct": "Smart play. The tie-up gives your team time and takes away their quick strike. Sometimes not losing is winning.",
        "incorrect": "You got beat clean and they scored off the draw. When you can't win it, at least tie it up. Give your team a chance to recover."
    },
    "m2-s5": {
        "name": "module2-scenario5-leverage",
        "setup": "You're setting up for an important draw. Before the puck drops, think about your body position. Where should your weight be? How low should you get?",
        "prompt": "Check your stance. What gives you the best leverage?",
        "correct": "That's the stance. Low center of gravity, weight balanced, ready to drive. Leverage wins draws.",
        "incorrect": "You were off balance when the puck dropped. Get lower and center your weight. You can't win from a weak base."
    },
    "m2-s6": {
        "name": "module2-scenario6-forehand-backhand",
        "setup": "Offensive zone draw to your left. You need to decide forehand or backhand grip. Each has advantages depending on where you want to send the puck.",
        "prompt": "Forehand or backhand? What's the situation call for?",
        "correct": "Good choice. You matched your grip to your intended play. The puck went exactly where your winger expected it.",
        "incorrect": "Your grip didn't match your plan. Think about where you want the puck before you decide forehand or backhand."
    },
    "m2-s7": {
        "name": "module2-scenario7-post-draw",
        "setup": "You won the draw back to your D. But the faceoff isn't over. What you do in the next two seconds matters. Do you clear out? Engage their center? Set a pick?",
        "prompt": "You won the draw. Now what?",
        "correct": "Perfect follow-through. You won the draw AND did your job after. That's complete faceoff execution.",
        "incorrect": "You won the draw but lost the possession because you didn't finish the play. Post-draw responsibility is just as important as winning the puck."
    },
    
    # Module 3: Breakouts
    "m3-s1": {
        "name": "module3-scenario1-high-low-route",
        "setup": "Your D has the puck behind the net. Forechecker is pressuring hard. You're swinging back from the far side. Do you take the high route near the circles or the low route along the boards?",
        "prompt": "High route or low route? Read the pressure.",
        "correct": "Good read. You took the route that was open and gave your D a clear outlet. That's how you support a breakout.",
        "incorrect": "That route was covered. Always read the pressure first. Take what the forecheck gives you."
    },
    "m3-s2": {
        "name": "module3-scenario2-reading-pressure",
        "setup": "Your D has the puck behind the net. Two forecheckers coming. One to the puck, one cutting off the strong side. The weak side is open.",
        "prompt": "Heavy pressure. Where do you go?",
        "correct": "You found the soft ice. When they overload one side, the weak side opens up. That's reading pressure.",
        "incorrect": "You went right into the pressure. Read the forecheck pattern. Find the open ice, not the traffic."
    },
    "m3-s3": {
        "name": "module3-scenario3-forehand-receive",
        "setup": "Breakout developing. Your D is about to make the pass. You have a choice. Receive on your forehand or backhand. Which side do you present?",
        "prompt": "Which way do you take the pass?",
        "correct": "Smart. You gave your D an easy target and you're already facing up ice. Smooth transition.",
        "incorrect": "That reception slowed you down. Think about your next move before you receive the puck."
    },
    "m3-s4": {
        "name": "module3-scenario4-cut-laterally",
        "setup": "You received the breakout pass. But there's a forechecker closing on you. Do you go north? Or cut laterally to create space?",
        "prompt": "Pressure on your back. What's your move?",
        "correct": "Good lateral move. You created time and space by changing the angle. That's poise with the puck.",
        "incorrect": "You skated right into the check. When pressure closes, change direction. East-west creates north-south."
    },
    "m3-s5": {
        "name": "module3-scenario5-support-stretch",
        "setup": "Breakout in progress. Your winger is stretching the ice, open for a long pass. But you're also open for a shorter support pass. What does your D need?",
        "prompt": "Support or stretch? What's the right call?",
        "correct": "Right read. You gave your D the option that fit the situation. Sometimes short is safer, sometimes long is open.",
        "incorrect": "That wasn't the right option for this situation. Read your D's body language. Are they looking long or short?"
    },
    "m3-s6": {
        "name": "module3-scenario6-forecheck-pattern",
        "setup": "Opponents are forechecking hard. Two guys deep, one guy high. That's a 2-1-2 look. How does that change your breakout route?",
        "prompt": "You recognize the forecheck. How do you adjust?",
        "correct": "Good adjustment. You identified the system and found the weakness. Every forecheck has a hole.",
        "incorrect": "You didn't adjust to the pressure. Different forechecks require different solutions. Read the pattern."
    },
    "m3-s7": {
        "name": "module3-scenario7-broken-play",
        "setup": "Breakout went wrong. Puck got turned over at your blue line. Now you're scrambling. What's the priority when the play breaks down?",
        "prompt": "Broken play. What do you do first?",
        "correct": "Right instinct. Get back, take away the middle, and recover. Broken plays happen. Recovery is what matters.",
        "incorrect": "You gambled and it cost you. When plays break down, get safe first. Then look to counter."
    },
    
    # Module 4: Offensive Zone
    "m4-s1": {
        "name": "module4-scenario1-net-front",
        "setup": "Offensive zone entry. Your team has possession. The puck is going to the corner. As the center, where's your first responsibility?",
        "prompt": "Puck going to the corner. Where do you go?",
        "correct": "Perfect. You went to the net front. That's the most dangerous ice. Be a presence there and good things happen.",
        "incorrect": "You drifted away from the net. The net front is your office in the O-zone. Get there and stay there."
    },
    "m4-s2": {
        "name": "module4-scenario2-cycle-support",
        "setup": "Your winger is cycling behind the net with the puck. Your other winger is at the far post. Where do you position yourself as the center?",
        "prompt": "Cycle is going. Where do you need to be?",
        "correct": "That's the spot. You're available for the pass and you're a threat. Good offensive awareness.",
        "incorrect": "You were too far from the play. Get to the soft ice in the slot. That's where goals are scored."
    },
    "m4-s3": {
        "name": "module4-scenario3-soft-ice",
        "setup": "Puck is moving around the zone. Defenders are chasing it. Watch for the soft ice. The open space where no one is looking.",
        "prompt": "Find the soft ice. Where is it?",
        "correct": "Good vision. You found the open space and got there. That's offensive IQ.",
        "incorrect": "You went to where the puck was, not where it was going. Think one pass ahead."
    },
    "m4-s4": {
        "name": "module4-scenario4-backdoor",
        "setup": "Puck is on the half wall. You're on the weak side. Their D is focused on the puck. There might be a backdoor play developing.",
        "prompt": "Do you stay patient or crash the net?",
        "correct": "Perfect timing. You read the play and made your move at the right moment. That's how you get backdoor goals.",
        "incorrect": "You showed your hand too early. Stay patient on the weak side. Move when they commit to the puck."
    },
    "m4-s5": {
        "name": "module4-scenario5-screen-tip",
        "setup": "Your D has the puck at the point. Shot is coming. You're in front of the net. Do you screen the goalie or look for a tip?",
        "prompt": "Shot coming. Screen or tip?",
        "correct": "Right choice for this situation. You made the goalie's job harder. That's net front presence.",
        "incorrect": "You couldn't decide and did neither well. Commit to one or the other based on the shot trajectory."
    },
    "m4-s6": {
        "name": "module4-scenario6-high-slot",
        "setup": "You pop out to the high slot. Puck is coming to you. You have a shooting lane but also passing options.",
        "prompt": "Puck on your stick in the high slot. What's the play?",
        "correct": "Good decision. You took what the defense gave you. That's composure in the offensive zone.",
        "incorrect": "You forced it. In the high slot, read your options. Take what's there."
    },
    "m4-s7": {
        "name": "module4-scenario7-ozone-turnover",
        "setup": "Your team turns it over in the offensive zone. Now they're coming the other way. What's your first responsibility?",
        "prompt": "Turnover. Now what?",
        "correct": "Right mindset. Get back, take away the middle, and be the first backchecker. That's two-way play.",
        "incorrect": "You were too slow to react. O-zone turnovers are dangerous. Sprint back and take away the middle."
    },
    
    # Module 5: Forechecking
    "m5-s1": {
        "name": "module5-scenario1-f1-angle",
        "setup": "You're F1 on the forecheck. Their D just picked up the puck behind the net. What angle do you take?",
        "prompt": "F1 pressure. What's your angle?",
        "correct": "Good angle. You took away an option and forced them where you wanted. That's smart forechecking.",
        "incorrect": "You came in too straight. Angle your approach to eliminate options, not just skate at the puck."
    },
    "m5-s2": {
        "name": "module5-scenario2-f1-f2-read",
        "setup": "You're F2 on the forecheck. F1 is pressuring. The D is looking to pass. Where do you need to be?",
        "prompt": "You're F2. What's your read?",
        "correct": "Perfect support. You cut off the outlet and worked with F1. That's coordinated forechecking.",
        "incorrect": "You weren't in sync with F1. Read what your partner is doing and fill the right lane."
    },
    "m5-s3": {
        "name": "module5-scenario3-pressure-contain",
        "setup": "They're trying to break out. Your team is forechecking. But do you pressure hard or contain?",
        "prompt": "Pressure or contain? What does the situation call for?",
        "correct": "Right call. You matched the strategy to the situation. Sometimes pressure, sometimes patience.",
        "incorrect": "Wrong approach for this situation. Read the game state. When to pressure and when to contain matters."
    },
    "m5-s4": {
        "name": "module5-scenario4-angling",
        "setup": "Their D is skating the puck up the wall. You're closing on them. How do you angle your approach?",
        "prompt": "They're skating. How do you angle?",
        "correct": "Good angle. You took away their time and space without overcommitting. That's smart pursuit.",
        "incorrect": "You gave them too much space or chased too hard. Use your angle to limit their options."
    },
    "m5-s5": {
        "name": "module5-scenario5-read-breakout",
        "setup": "They're setting up their breakout. F1 is pressuring. Watch their formation. What are they trying to do?",
        "prompt": "Read the breakout. What's coming?",
        "correct": "You read it. Recognizing their plan helps you counter it. That's hockey IQ.",
        "incorrect": "You guessed wrong. Watch their positioning before they move. It tells you what's coming."
    },
    "m5-s6": {
        "name": "module5-scenario6-loose-puck",
        "setup": "Forecheck caused a turnover. Loose puck in the zone. Multiple players converging. What's your priority?",
        "prompt": "Loose puck. What do you do?",
        "correct": "Good instinct. You got there first or covered the right option. That's puck possession awareness.",
        "incorrect": "You lost the race or left something open. On loose pucks, want it more and be smart about coverage."
    },
    "m5-s7": {
        "name": "module5-scenario7-turnover-transition",
        "setup": "Your forecheck forced a turnover. Now you have the puck in their zone. Transition time.",
        "prompt": "You got the puck. Now what?",
        "correct": "Quick transition. You turned defense into offense in a hurry. That's capitalizing on the forecheck.",
        "incorrect": "You were slow to switch gears. When the forecheck works, attack immediately."
    },
    "m5-s8": {
        "name": "module5-scenario8-f2-gassed",
        "setup": "Your team just dumped the puck in. You're F1 on the forecheck. You glance back — your F2 is gassed, coasting way behind. Their D has the puck behind the net.",
        "prompt": "Your F2 is gassed and late. How do you approach this forecheck?",
        "correct": "Smart pressure. Take a good angle, eliminate one option, and funnel the puck somewhere predictable. You're not trying to win it — you're slowing them down until help arrives.",
        "incorrect": "You gambled without support. If they make one good pass, you're out of the play and F2 can't bail you out. Angle and contain when you're short support."
    },
    
    # Module 6: D-Zone for Defensemen
    "m6-s1": {
        "name": "module6-scenario1-gap-control",
        "setup": "Attacker entering your zone with speed. You're the last man back. How much gap do you give them?",
        "prompt": "They're coming. What's your gap?",
        "correct": "Good gap. Not too tight, not too loose. You made them make a move first. That's gap control.",
        "incorrect": "Your gap was off. Too much space gives them options. Too little and they beat you wide."
    },
    "m6-s2": {
        "name": "module6-scenario2-puck-retrieval",
        "setup": "Puck is dumped in. You're going back to get it. But their forechecker is coming. How do you handle the retrieval?",
        "prompt": "Puck behind you, pressure on your back. What do you do?",
        "correct": "Smooth retrieval. You got there, assessed the pressure, and made a good decision. That's poise.",
        "incorrect": "You panicked or took too long. Shoulder check, know your options, and move the puck quickly."
    },
    "m6-s3": {
        "name": "module6-scenario3-d-to-d",
        "setup": "You have the puck. Pressure coming. Your partner is open on the other side. Is the D-to-D pass the right call?",
        "prompt": "D-to-D or another option?",
        "correct": "Right read. You used your partner to move the puck away from pressure. That's heads-up play.",
        "incorrect": "That wasn't the right call. D-to-D is great when it's there, but don't force it."
    },
    "m6-s4": {
        "name": "module6-scenario4-net-front-battle",
        "setup": "They have a guy camped in front of your net. Puck is in the corner. How do you handle the net front?",
        "prompt": "Guy in your crease. What do you do?",
        "correct": "Strong net front. You boxed out and took away their screen. Your goalie can see everything.",
        "incorrect": "You let them establish position. Own the front of your net. Be physical and take their eyes away."
    },
    "m6-s5": {
        "name": "module6-scenario5-when-to-pinch",
        "setup": "Puck is along the wall in the offensive zone. You're the D. Do you pinch to keep it in or stay home?",
        "prompt": "Pinch or stay? What's the read?",
        "correct": "Right decision. You read the situation and made the smart play. Good defensive instincts.",
        "incorrect": "That was the wrong read. Pinching is high risk high reward. Make sure the situation calls for it."
    },
    "m6-s6": {
        "name": "module6-scenario6-first-pass",
        "setup": "You've got the puck behind your net. Forecheck is coming. You need to make the first pass of the breakout.",
        "prompt": "First pass. Where's it going?",
        "correct": "Clean first pass. You found the open man and started the breakout right. That's how it's done.",
        "incorrect": "That pass didn't connect. Read your options, move your feet if needed, and make a tape-to-tape pass."
    },
    "m6-s7": {
        "name": "module6-scenario7-zone-coverage",
        "setup": "Five-on-five in your zone. Puck is moving. Know your coverage. Where's your responsibility?",
        "prompt": "Zone coverage. Who do you have?",
        "correct": "Good coverage. You knew your assignment and stuck with it. That's defensive structure.",
        "incorrect": "You lost your man or your zone. In coverage, know your responsibility first. Then help when you can."
    }
}

def generate_audio(text, output_path):
    """Generate audio from text using ElevenLabs API."""
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"
    headers = {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json"
    }
    data = {
        "text": text,
        "model_id": MODEL_ID
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        if response.status_code == 200:
            with open(output_path, 'wb') as f:
                f.write(response.content)
            print(f"  ✓ Generated: {os.path.basename(output_path)}")
            return True
        else:
            print(f"  ✗ Error: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"  ✗ Exception: {e}")
        return False

def main():
    """Generate all audio files."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    total = len(SCENARIOS) * 4  # 4 clips per scenario
    generated = 0
    failed = 0
    
    print(f"Generating {total} audio files for {len(SCENARIOS)} scenarios...")
    print("=" * 50)
    
    for scenario_id, data in SCENARIOS.items():
        scenario_dir = os.path.join(OUTPUT_DIR, data['name'])
        os.makedirs(scenario_dir, exist_ok=True)
        
        print(f"\n{scenario_id}: {data['name']}")
        
        for audio_type in ['setup', 'prompt', 'correct', 'incorrect']:
            output_path = os.path.join(scenario_dir, f"{audio_type}.mp3")
            text = data[audio_type]
            
            if generate_audio(text, output_path):
                generated += 1
            else:
                failed += 1
            
            # Rate limiting - ElevenLabs allows ~10 req/sec
            time.sleep(0.5)
    
    print("\n" + "=" * 50)
    print(f"Complete! Generated: {generated}, Failed: {failed}")
    print(f"Files saved to: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
