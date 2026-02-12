#!/usr/bin/env python3
"""
Audio regeneration script for Puck Academy Hockey IQ training app.
Generates all 43 scenarios' audio MP3 files using edge-tts (Microsoft Edge Text-to-Speech).

Usage:
    pip install edge-tts
    python3 regenerate_audio.py          # Skip existing files
    python3 regenerate_audio.py --force  # Regenerate all files
"""

import asyncio
import os
import sys
from pathlib import Path
import edge_tts

# Audio folder base path - where static audio files live for deployment
AUDIO_BASE_PATH = Path(__file__).parent / "puck-academy-spa" / "static" / "audio"

# Male voice for narration
VOICE = "en-US-GuyNeural"

# Scenario text data - extracted from module files
SCENARIOS = [
    # Module 1: Defensive Zone Awareness (7 scenarios)
    {
        "id": "module1-scenario1",
        "folder": "hockey-iq-diagram",
        "situation": "Your team is defending in your own zone. The opponent has the puck behind your net and is looking to make a play. Your defenseman is battling for position. You're the center, positioned in the low slot.",
        "question": "What should you focus on?",
        "correct_feedback": "Perfect! By staying in the slot, you're covering the most dangerous scoring area. You can read where the puck is going and react to support your D or pick up a free opponent.",
        "incorrect_feedback": "Chasing behind the net leaves the slot wide open. Your D-man has the puck carrier — trust them and protect the dangerous area in front."
    },
    {
        "id": "module1-scenario2",
        "folder": "scenario-2-corner-battle",
        "situation": "A loose puck is in the corner of your defensive zone. An opponent is racing to get it. Your winger is closest but will arrive at the same time as the opponent.",
        "question": "What's your best positioning as the center?",
        "correct_feedback": "Smart positioning! You're close enough to support if your winger wins the battle, but also cutting off the passing lane to the slot if the opponent gets the puck.",
        "incorrect_feedback": "Stacking the corner leaves the front of the net unprotected. If they win the battle, there's no one home to stop the play."
    },
    {
        "id": "module1-scenario3",
        "folder": "scenario-3-cycle",
        "situation": "The opponents are cycling the puck low in your zone. They've completed two passes around the boards. Your D-men are tracking the puck carrier.",
        "question": "What's your role in this situation?",
        "correct_feedback": "Exactly right! The cycle is designed to open up a pass to the slot. By staying disciplined in the middle, you take away their best scoring opportunity.",
        "incorrect_feedback": "Chasing the cycle is exhausting and ineffective. They'll just move the puck before you arrive. Let your D handle the boards."
    },
    {
        "id": "module1-scenario4",
        "folder": "scenario-4-breakout",
        "situation": "Your D has recovered the puck behind the net. One forechecker is pressuring, another is high. Your winger is on the boards providing a safe option. The D is looking to start the breakout.",
        "question": "What's the best way to support the breakout as the center?",
        "correct_feedback": "That's how you support a breakout. Swing through the middle, give your D a short, safe option. You absorb the pressure, buy time, then move it up ice.",
        "incorrect_feedback": "Your D is under pressure — he needs help, not a long pass option. Swing low through the middle, give him an easy out."
    },
    {
        "id": "module1-scenario5",
        "folder": "scenario-5-gap",
        "situation": "The opposing center has the puck in the neutral zone and is driving toward your blue line. Your D is backing up to defend. You're backchecking from the high slot area.",
        "question": "What's your best backchecking play?",
        "correct_feedback": "Perfect angle. You took away the middle, forced him wide, and closed the gap without overcommitting. That's textbook backchecking.",
        "incorrect_feedback": "Charging straight at him is a gamble. If he makes one move, you're out of the play and it's a 2-on-1."
    },
    {
        "id": "module1-scenario6",
        "folder": "scenario-6-winger-caught",
        "situation": "Your team just turned the puck over at the offensive blue line. Your left winger got caught deep — it's a 3-on-2 against your team. You're the center tracking back.",
        "question": "What's your priority on this 3-on-2 rush?",
        "correct_feedback": "Exactly right. On a 3-on-2, the slot is the danger zone. Your two D-men can handle the wide players. Your job is to eliminate the middle option.",
        "incorrect_feedback": "Now you've left the middle wide open. On a 3-on-2, the slot is the most dangerous area."
    },
    {
        "id": "module1-scenario7",
        "folder": "scenario-7-d-partner-bites",
        "situation": "Your D partner got sucked down behind the net chasing the puck carrier. The opponent quickly moved it up to the point. You're the center and you're the only one in position to react.",
        "question": "Your D is out of position. What's your responsibility?",
        "correct_feedback": "When your D is out of position, you become the safety valve. By sitting in the high slot, you take away the most dangerous pass.",
        "incorrect_feedback": "If you charge the point, you're leaving the high slot wide open. The point man can easily pass to the slot for a one-timer."
    },
    # Module 2: Faceoffs (7 scenarios)
    {
        "id": "module2-scenario1",
        "folder": "module2-scenario1-ref-position",
        "situation": "Defensive zone faceoff to the goalie's left. You're a left-handed shot (your forehand is to your right as you face the opponent). Notice how the linesman (LM) is positioned — their body is angled slightly toward YOUR side. When a linesman leans this way, they tend to drop the puck more toward that side, giving you a cleaner angle to attack with your forehand. The opposing center is a righty, set up low with a strong backhand grip.",
        "question": "How should you approach this faceoff?",
        "correct_feedback": "When the ref is on your forehand side, going forehand gives you a cleaner line to the puck. Fighting your natural preference based on the situation is what separates good faceoff guys from great ones. You read the ref, adjusted your approach, and put yourself in the best position to win.",
        "incorrect_feedback": "The ref position matters more than you think. When the ref is on your forehand side, that's your advantage — going forehand gives you a cleaner line to the puck. Don't fight your natural preference for no reason, but when the situation favors a different approach, adapt. That's smart hockey."
    },
    {
        "id": "module2-scenario2",
        "folder": "module2-scenario2-advantage",
        "situation": "Neutral zone faceoff. You're a left-shot center. The opposing center is also left-shot. The linesman's body angle is leaning toward you, giving your opponent a cleaner line to the puck on his forehand.",
        "question": "Who has the advantage here?",
        "correct_feedback": "Same-handed matchups come down to linesman position. If the linesman is on your backhand, you're fighting uphill. Recognize this early and adjust your approach — go for a tie-up, cheat your positioning, or try a quick forehand counter. Knowing you're at a disadvantage is the first step to overcoming it.",
        "incorrect_feedback": "When both centers are the same handedness, it's all about linesman position. The linesman is on your backhand side, which means his forehand has a cleaner angle. That's his advantage. Knowing this before the puck drops lets you adjust — tie-up, counter move, or positioning change. Awareness is everything."
    },
    {
        "id": "module2-scenario3",
        "folder": "module2-scenario3-cheat-feet",
        "situation": "Offensive zone faceoff, tied game, 2 minutes left. Your team runs a set play where the winger crashes the net on the draw. The opposing center looks relaxed and is setting up late.",
        "question": "What's your best approach?",
        "correct_feedback": "In high-leverage situations where you have a set play, cheating your feet (without getting kicked out) gives you a split-second advantage. If the opposing center is relaxed, make him pay for it. Push the limits until the ref corrects you. That's competing. That's playing to win.",
        "incorrect_feedback": "You have a set play, the game's on the line, and the other guy isn't focused. This is when you push the limits. Cheat your feet forward — just enough to get a quicker jump. If the ref sees it, he'll tell you. But if you play it safe when you have an advantage, you're leaving points on the ice."
    },
    {
        "id": "module2-scenario4",
        "folder": "module2-scenario4-tieup",
        "situation": "Defensive zone faceoff. The opposing center is significantly stronger than you and has been winning draws clean all game. Your D-man is shaded toward the boards.",
        "question": "How do you handle this matchup?",
        "correct_feedback": "When you're outmatched physically, winning the faceoff doesn't mean winning the puck clean. Tying up the opposing center and letting your support retrieve is a legitimate win. Know your role and set up your teammates. That's not giving up — that's playing smart.",
        "incorrect_feedback": "He's been beating you clean all game — doing the same thing harder won't change that. When you're outmatched, change the approach. Tie him up, neutralize his strength, and let your winger retrieve. Getting your team the puck is what matters, not how you do it."
    },
    {
        "id": "module2-scenario5",
        "folder": "module2-scenario5-leverage",
        "situation": "You're about to take a critical defensive zone draw. You notice you're standing fairly upright with your weight on your heels.",
        "question": "What adjustment gives you the best chance?",
        "correct_feedback": "Leverage comes from your lower body. Straight legs = no power. Getting low through hips and knees, with weight forward on the balls of your feet, lets you explode into the draw. It's not about being big — it's about being loaded and ready. You'll feel the difference immediately.",
        "incorrect_feedback": "Faceoff power comes from your legs, not your arms or grip. Standing upright with weight on your heels means you're pushing with just your upper body. Get low — bend at the hips and knees, shift your weight to the balls of your feet. Now you can explode into the draw. That's leverage."
    },
    {
        "id": "module2-scenario6",
        "folder": "module2-scenario6-forehand-backhand",
        "situation": "Neutral zone faceoff. You're a right-shot center. The opposing center is a left-shot who has beaten you backhand twice already. The linesman is on your forehand side.",
        "question": "How do you adjust?",
        "correct_feedback": "If the same move isn't working AND you have a positional advantage (ref on your forehand), adapt. Going forehand when he expects backhand, especially with the angle in your favor, changes the matchup entirely. He's prepared for what you've been doing — give him something different.",
        "incorrect_feedback": "He's beaten you twice with the same approach — doing it harder won't change the outcome. But look at the linesman position: you have the angle on your forehand. Switch your approach. He expects backhand, you go forehand, and now he's the one adjusting. That's how you win the mental game."
    },
    {
        "id": "module2-scenario7",
        "folder": "module2-scenario7-post-draw",
        "situation": "You lose the offensive zone faceoff. The puck goes back to the opposing D-man. Your wingers are already in motion expecting a won draw.",
        "question": "What's your immediate responsibility?",
        "correct_feedback": "The draw is over. Your job now is defensive structure. Get to the high slot, identify the most dangerous threat (usually the late forward), and take away the middle. Don't compound a lost draw with a bad recovery. Smart centers know the faceoff is just one play — what you do next matters just as much.",
        "incorrect_feedback": "You lost the draw — the play has changed. Chasing the D-man won't get it back, and your wingers are out of position. Your job now is to prevent the counter-attack. Get to the high slot, find the late man, and take away the middle of the ice. That's how you limit damage from a lost draw."
    },
    # Module 3: Breakouts (7 scenarios)
    {
        "id": "module3-scenario1",
        "folder": "module3-scenario1-high-low-route",
        "situation": "Your D-man retrieves the puck behind the net. One forechecker is pressuring hard. You're swinging back from the far side to support. What route should you take?",
        "question": "Which route gives you the best breakout option?",
        "correct_feedback": "Coming underneath the puck (low route) gives you the puck on your forehand with vision up ice, time to make a decision, and space to cut laterally. A high route often means receiving on your backhand with pressure already on you. The extra two seconds to get low is worth it.",
        "incorrect_feedback": "Think about how you receive it. Coming low — below the hash marks — changes everything. You get the puck on your forehand, you can see up ice immediately, and you have time to make the next play. High routes mean receiving on your backhand with pressure closing. Go low, come underneath, and you'll have options."
    },
    {
        "id": "module3-scenario2",
        "folder": "module3-scenario2-reading-pressure",
        "situation": "Your D-man has the puck behind the net. Two forecheckers are coming hard — one to the puck, one cutting off the strong side. The weak side is open. Where should you position yourself?",
        "question": "What's your best support position?",
        "correct_feedback": "When heavy pressure is coming, the breakout needs to go quick and often weak side. Get yourself into the outlet position where the pressure isn't. Don't wait for the puck to come to where you want to be — go to where you can actually receive it. That's reading the play.",
        "incorrect_feedback": "Two guys are collapsing on the strong side — that option is gone. When pressure dictates the play, you need to adjust. Flash to the weak side, get low, give your D a quick outlet where the pressure isn't. Don't fight the forecheck — go where they're not."
    },
    {
        "id": "module3-scenario3",
        "folder": "module3-scenario3-forehand-receive",
        "situation": "You're a left-shot center swinging through the middle of the ice for a breakout pass. You have a choice: continue your current path (receive on backhand) or adjust your route to receive on forehand.",
        "question": "How should you adjust your route?",
        "correct_feedback": "A small adjustment to receive on your forehand changes everything: better puck control, immediate vision up ice, ability to make plays in stride. The extra two seconds to adjust your route is worth it. Receiving on your backhand means you're fighting the puck before you can do anything with it.",
        "incorrect_feedback": "Think about what happens after. Receiving on your backhand sounds fine until you get the puck. Now you're spinning, you can't see up ice, and the forechecker is closing. Arc your route wider — a small adjustment puts the puck on your forehand with vision. You can make plays immediately. That's the difference."
    },
    {
        "id": "module3-scenario4",
        "folder": "module3-scenario4-cut-lateral",
        "situation": "You receive the breakout pass below the hash marks. A forechecker is coming straight at you. Your winger is open on the boards but there's also a soft area in the middle of the ice.",
        "question": "What's your best play with the puck?",
        "correct_feedback": "When you're low and under control, cutting laterally into soft ice buys time, opens up the whole rink, and often pulls the forechecker out of position. This is where having good routes pays off — you have options. Now you can hit the winger with a better pass, or carry it if the lane opens.",
        "incorrect_feedback": "Use the time you have. You received the puck low with control — don't panic and get rid of it. The forechecker is coming straight at you, but that means cutting laterally makes him miss. Find the soft ice, create time, and now you're making plays with vision instead of just reacting. That's the difference."
    },
    {
        "id": "module3-scenario5",
        "folder": "module3-scenario5-support-stretch",
        "situation": "Your team is breaking out. The D-man makes a good first pass to the winger on the wall. You're the center trailing the play. What's your responsibility here?",
        "question": "What should you do now?",
        "correct_feedback": "The first pass is made, but the play isn't safe yet. Stay in a close support position so if the winger gets pressured, you're the outlet. Once the puck crosses the red line cleanly, then you can push to create offense. Don't abandon the breakout before it's complete.",
        "incorrect_feedback": "Don't leave too early. The first pass is just the first pass — the breakout isn't done yet. Look at the forechecker closing on your winger. If you're stretching to the neutral zone and he gets pressured, who does he pass to? Stay close as support until the puck is safely through the zone. Then you can push."
    },
    {
        "id": "module3-scenario6",
        "folder": "module3-scenario6-forecheck-pattern",
        "situation": "The other team is running a 1-2-2 forecheck. One forward pressures the puck softly, two more clog the neutral zone. Your D-man has time.",
        "question": "How should your team attack this?",
        "correct_feedback": "With only one forechecker pressuring and time available, D-to-D or using the middle opens up the ice. The 1-2-2 gives up the blue line — make them pay by possessing through it, not dumping into their structure. They want you to rim it or dump it. Skate through their trap instead.",
        "incorrect_feedback": "Read what they're giving up. The 1-2-2 clogs the neutral zone but only sends one guy. That means your D has time, and D-to-D or skating it up creates advantages they can't recover from. Dumping or rimming plays right into what they want. When they give you time, use it to beat them with possession."
    },
    {
        "id": "module3-scenario7",
        "folder": "module3-scenario7-broken-play",
        "situation": "The breakout pass goes off your stick and the puck is loose in the neutral zone. A forechecker is closer to the puck than you are.",
        "question": "What do you do now?",
        "correct_feedback": "When a breakout fails, you're now in a defensive situation. Don't chase a puck you can't get to. Your job is to recognize the play is broken and get inside position to defend. Inside-out, protect the house. The turnover happened — now limit the damage by picking up the dangerous man.",
        "incorrect_feedback": "He's closer — you're not winning that race. When the breakout fails, everything changes. You're now defending. Get inside, find the most dangerous threat, and take him away. Chasing a loose puck you can't get just leaves your team exposed. Transition mentally, then transition physically."
    },
    # Module 4: Offensive Zone IQ (7 scenarios)
    {
        "id": "module4-scenario1",
        "folder": "module4-net-front",
        "situation": "Your winger has the puck on the half wall below the circle. Your D-man is at the point. The opposing D is in the slot area. You're currently positioned at the high slot. Where should you go?",
        "question": "What's your best move to create a scoring chance?",
        "correct_feedback": "When the puck is below the goal line or on the half wall, the net front is where you need to be. You take away the goalie's eyes, you're first to rebounds, and you create tip opportunities. The high slot can wait — get to the hard area when the puck is down low.",
        "incorrect_feedback": "Get to the hard area. When the puck is down low, the net front becomes the most dangerous place on the ice. Staying high doesn't put pressure on the D or the goalie. Drive the net — screen, tip, rebound. That's how centers score greasy goals."
    },
    {
        "id": "module4-scenario2",
        "folder": "module4-cycle-support",
        "situation": "Your winger is cycling behind the net with the puck. Your other winger is at the far post. D-man is at the point. The opposing D is tracking the cycle. Where should you position yourself?",
        "question": "What's the best spot for you as the cycle develops?",
        "correct_feedback": "The 'bumper' or high slot position is gold during a cycle. You're open for one-timers, you can distribute to the point, and you keep the D honest in the middle. Too many players crowd the net or go low — hold your water in the slot.",
        "incorrect_feedback": "Find the soft ice. During a cycle, the bumper position (high slot between the circles) is where you belong. You've got net front covered by your other winger — they need someone in the middle. That's you."
    },
    {
        "id": "module4-scenario3",
        "folder": "module4-soft-ice",
        "situation": "Your D has the puck at the point. There's traffic in the middle of the ice — you're currently sandwiched between two defenders. The far side high slot is open. What should you do?",
        "question": "How do you get yourself open for a scoring chance?",
        "correct_feedback": "When you're covered, don't stand still — find the soft ice. Sliding to the open space gives your D-man a shooting lane and puts you in one-timer position. Fighting through traffic just makes their job easier. Move to where the defense isn't.",
        "incorrect_feedback": "Find the open ice. You're in traffic — nobody can get you the puck there. The far side high slot is wide open. Slide over there and suddenly you're a threat for a one-timer. Great offensive players don't stand in crowds. They find soft ice."
    },
    {
        "id": "module4-scenario4",
        "folder": "module4-backdoor",
        "situation": "Your winger has the puck on the strong side half wall. Both opposing D have cheated toward the puck. The far post/backdoor is wide open. You're currently in the middle of the slot. What's your move?",
        "question": "How do you capitalize on the defensive overcommit?",
        "correct_feedback": "Great anticipation. When the D overcommits to the puck side, the backdoor opens up. That's an easy goal if you time it right — sneak to the far post and you'll get a tap-in. This is about reading the defense, not just the puck.",
        "incorrect_feedback": "Read the defense. Both D cheated to the strong side — the backdoor is wide open. Don't go where the defense already is. Sneak to the far post and your winger can slide it across for an easy finish."
    },
    {
        "id": "module4-scenario5",
        "folder": "module4-screen-tip",
        "situation": "Your D is winding up for a point shot. Your winger is fighting at the net front. There's a clear shooting lane. You're positioned below the shot line. What should you do?",
        "question": "How do you maximize the scoring chance on this point shot?",
        "correct_feedback": "That's high-IQ offense. A tip changes everything. The goalie is set for a shot from the point — a deflection changes the angle and speed completely. Get in the lane, stick on the ice, and redirect it. Your winger's already screening. You tip.",
        "incorrect_feedback": "Your winger already has the screen covered. What the goalie can't handle is a tip that changes the angle. Get into the shooting lane with your stick on the ice. A good tip is almost impossible to save."
    },
    {
        "id": "module4-scenario6",
        "folder": "module4-high-slot",
        "situation": "Your winger is down low and spots you open in the high slot. He's about to pass it to you. The defense has collapsed low. You'll have time and space. What's your play when you receive the puck?",
        "question": "You receive the pass in the high slot with time. What do you do?",
        "correct_feedback": "Shooters shoot. When you have time in the slot, the answer is almost always shoot. High slot shots with traffic in front are how you score. The defense collapsed low — they gave you that lane. Don't give it back by over-passing.",
        "incorrect_feedback": "Take the shot. You've got time and a lane in the high slot — that's a prime scoring area. Over-passing from here is a common mistake. The defense gave you space. Use it. Put it on net."
    },
    {
        "id": "module4-scenario7",
        "folder": "module4-ozone-turnover",
        "situation": "Your team just turned the puck over in the offensive zone. The opposing D has it behind their net and their forward is already breaking out. Your D got caught up ice. What's your immediate responsibility?",
        "question": "The puck is turned over. What do you do first?",
        "correct_feedback": "Two-way hockey. When the puck turns over, your first job is to get back through the middle. The center takes the most dangerous ice. Your D got caught — you need to be the first man back. Backcheck hard through the middle, then pick up responsibility. That's how you prevent odd-man rushes.",
        "incorrect_feedback": "Get back first. On turnovers, the center's first job is to sprint back through the middle. Forechecking after a turnover usually just takes you out of the play. Get back, protect the slot, then sort out assignments."
    },
    # Module 5: Forechecking (8 scenarios)
    {
        "id": "module5-scenario1",
        "folder": "module5-f1-angle",
        "situation": "You're F1 entering the zone on the forecheck. The D has the puck behind their net. Their other D is on the far side. F2 is trailing you on the weak side. What angle do you take?",
        "question": "How do you approach the puck carrier?",
        "correct_feedback": "Take away their best option — the D-to-D pass. By arcing toward his strong side, you force him to go the other way where F2 is waiting. That's how you dictate the play instead of just chasing.",
        "incorrect_feedback": "Don't just skate at the puck — skate to take away options. If you arc toward his strong side, you take away the D-to-D pass and force him toward F2. Forechecking is about angles, not straight lines."
    },
    {
        "id": "module5-scenario2",
        "folder": "module5-f1-f2-read",
        "situation": "Your winger entered the zone first and is forechecking hard on the D. You're the second forward in. The D still has the puck but F1 is closing fast. What's your role?",
        "question": "As the second forward in, what's your job?",
        "correct_feedback": "F2 supports the forecheck by taking away outlets. Your job isn't to join the puck battle — it's to cut off passing lanes. F1 pressures, you take the high lane. If they're forced into a bad play, you're there to intercept.",
        "incorrect_feedback": "When someone else is F1, you're F2 — your job is different. Take the high lane, cut off the D-to-D or the outlet pass. If you double team, the whole weak side opens up. F2 supports by taking away options, not chasing the puck."
    },
    {
        "id": "module5-scenario3",
        "folder": "module5-pressure-contain",
        "situation": "You're F1 and got deep fast, but your teammates are still coming through the neutral zone. The D has the puck and is looking to move it. No F2 support yet. Do you attack or contain?",
        "question": "What's the right play without support?",
        "correct_feedback": "Without support, you contain — not attack. Take away time and space while your teammates catch up. If you commit and miss, they're gone the other way 3-on-2. Contain, angle, and wait for F2. Then you can attack together.",
        "incorrect_feedback": "Don't overcommit. When you don't have support, contain is the play. Attacking 1-on-1 without backup is how you give up odd-man rushes. Buy time, and once F2 is in position, then you can pressure."
    },
    {
        "id": "module5-scenario4",
        "folder": "module5-angling",
        "situation": "The opposing D is trying to skate the puck through the neutral zone. F2 is positioned along the boards. You're tracking the puck carrier. How do you steer him?",
        "question": "What's the best angle to take on the puck carrier?",
        "correct_feedback": "Angling is about steering them where you want — not just chasing. By coming from outside to inside, you force him to the boards where F2 is waiting. Now it's 2-on-1 instead of a foot race.",
        "incorrect_feedback": "Don't just skate at him — steer him. Arc from outside to inside so you take away the middle and force him to the boards. F2 is waiting there. Angling makes forechecking a team play, not a solo mission."
    },
    {
        "id": "module5-scenario5",
        "folder": "module5-read-breakout",
        "situation": "F1 is pressuring the D who has the puck behind the net. The D's head is up and he's looking to hit their forward on the weak side wall. You see the pass coming. What do you do?",
        "question": "You've read the breakout pass. How do you respond?",
        "correct_feedback": "When you read the pass, jump the lane. Either you intercept it or you're first on the receiver. That's how you turn their breakout into a turnover. Trust your read — if you see it, attack it.",
        "incorrect_feedback": "You saw the pass coming — that's the read. Now act on it. Cheat toward that lane — if you intercept, you're in alone. If you don't, you're still first to the receiver. Great forecheckers anticipate."
    },
    {
        "id": "module5-scenario6",
        "folder": "module5-loose-puck",
        "situation": "A pass got broken up and there's a loose puck along the boards. Both you and the opposing D are racing for it — it's a true 50/50. F2 is behind you as support. How do you approach this battle?",
        "question": "What's the best way to win this 50/50 puck battle?",
        "correct_feedback": "Puck battles are won with body position, not just sticks. Get inside, seal him off with your body, then collect the puck. Skating in to scoop it usually means you get hit and lose it. Body first, puck second.",
        "incorrect_feedback": "50/50 battles are about positioning. Get your body between him and the puck first. Seal him off, then work the puck. If you try to scoop it without establishing position, he'll just take your body and the puck."
    },
    {
        "id": "module5-scenario7",
        "folder": "module5-turnover-transition",
        "situation": "Your forecheck just won the puck! F2 stripped the D and fed it to you in the slot area. The opposing D are scrambling and their goalie just got a new angle on you. What do you do with the puck?",
        "question": "The forecheck created a turnover. What's the play?",
        "correct_feedback": "When the forecheck creates a turnover, ATTACK. The D are scrambling, the goalie's not set — this is exactly when you shoot. Waiting lets them recover. Quick shot, get it to the net, good things happen in chaos.",
        "incorrect_feedback": "Don't let them reset. Turnovers are dangerous because of the chaos — don't give them time to recover. Quick shot when the goalie and D are scrambling. Over-passing lets them get back in position."
    },
    {
        "id": "module5-scenario8",
        "folder": "module5-f2-gassed",
        "situation": "Your team just dumped the puck in and you're the first forward (F1) arriving on the forecheck. You glance back and see your F2 is clearly gassed — they're coasting and way behind the play. Your F3 is covering high. Their D has the puck behind the net and is looking to make a play. Your F2 is gassed and late. How do you approach this forecheck?",
        "question": "F2 is late. How do you forecheck?",
        "correct_feedback": "This is the smart play when you're short support. Take a good angle, eliminate the strong-side option, and funnel the puck somewhere predictable. You're not trying to win the puck — you're trying to slow them down until F2 recovers or F3 can help. Make them earn their breakout instead of giving them a free odd-man rush.",
        "incorrect_feedback": "I love the compete, but you're gambling. If you go all-in and the D makes one good pass, you're completely out of the play and your tired F2 can't bail you out. You've just turned a manageable situation into a 2-on-1 the other way. Controlled pressure is the play here."
    },
    # Module 6: D-Zone for Defensemen (7 scenarios)
    {
        "id": "module6-scenario1",
        "folder": "module6-gap-control",
        "situation": "2-on-2 rush coming at you. The forward has the puck in the neutral zone with speed. Your partner is covering the trailer. You're currently at your own blue line. What do you do with your gap?",
        "question": "How do you manage your gap on this rush?",
        "correct_feedback": "Close gap in the NZ, then match speed backward. You want to take away his time and space without overcommitting. Skating up to close gap, then pivoting and skating backward with him keeps you in control.",
        "incorrect_feedback": "Waiting at the blue line gives him too much ice. The right play is to skate forward and close that gap around the red line, then match his speed skating backward. You dictate the terms, not him."
    },
    {
        "id": "module6-scenario2",
        "folder": "module6-puck-retrieval",
        "situation": "They dumped it into your corner. You're going back to retrieve it but F1 is forechecking hard on your tail. Your winger is on the wall as an outlet, D partner at the far post. What's your play?",
        "question": "You get to the puck first with pressure coming. What do you do?",
        "correct_feedback": "Shoulder check, then quick up the wall. Your winger is the outlet — use him. Don't give the forechecker time to pin you. Check your shoulder so you know what's coming, then get it up quick and clean.",
        "incorrect_feedback": "With pressure on your back, you need to get it out fast. Your winger is open on the wall. Going behind the net gives the forechecker time to close and set up their forecheck. Quick up to your winger."
    },
    {
        "id": "module6-scenario3",
        "folder": "module6-d-to-d",
        "situation": "You have the puck behind your net. F1 is coming but not on you yet. Your D partner is open on the far post, but F2 is sitting in the high slot watching that passing lane. Do you go D-to-D?",
        "question": "Your partner looks open. What's the read?",
        "correct_feedback": "F2 is sitting in that D-to-D lane — that pass gets picked off. Just because your partner looks open doesn't mean the pass is there. Go up the wall to the winger instead. Live to fight another day.",
        "incorrect_feedback": "Your partner might look open, but F2 is reading that pass. A picked-off D-to-D in your own zone is a Grade A chance against. Don't force it — go up the wall to the winger. Safe and effective."
    },
    {
        "id": "module6-scenario4",
        "folder": "module6-net-front-battle",
        "situation": "They're cycling in your zone. Their D has the puck at the point and is looking to shoot. Their forward is parked at your net front, trying to screen and get position for tips/rebounds. How do you handle him?",
        "question": "Shot is coming from the point. What's your priority?",
        "correct_feedback": "Inside position is everything. Get your body between him and the net, stick on his stick so he can't tip it. Your goalie needs to see the shot — that's his job. Your job is making sure their guy can't touch it.",
        "incorrect_feedback": "Net front battles are won with position. Get inside — body between him and the net, stick on his stick. Don't try to block the shot yourself. Own that crease with your positioning."
    },
    {
        "id": "module6-scenario5",
        "folder": "module6-when-to-pinch",
        "situation": "You're at the point in the O-zone. A pass just bounced off the boards and there's a loose puck. Their winger is going for it, but you're closer. Your center is reading the play and can cover if needed. Do you pinch?",
        "question": "50/50 puck on the wall — pinch or stay home?",
        "correct_feedback": "This is when you pinch — you have a good angle, you're closer, and your center is reading the play. If you win it, you keep possession. If you lose it, your center covers. That's smart, supported aggression.",
        "incorrect_feedback": "This is a good time to pinch. You have support from your center, you're closer to the puck, and the risk is low. Staying home when you have support is leaving offense on the table. Pinch with purpose when you have a safety net."
    },
    {
        "id": "module6-scenario6",
        "folder": "module6-first-pass",
        "situation": "Heavy forecheck. F1 is on you, F2 is taking away the pass to your partner. You have the puck but no time and no clean pass up the middle. What's your play?",
        "question": "Under pressure with no clean pass. What do you do?",
        "correct_feedback": "When there's no play, get it out. A hard rim around the boards gets it to your winger and gets you out of trouble. No turnovers in your own zone. Rim it hard and clean — let them chase it.",
        "incorrect_feedback": "Don't force it. Under pressure with no play? Get it out. Trying to make something happen is how turnovers in your own zone happen. Rim it hard around the boards to the far side. Live to fight another day."
    },
    {
        "id": "module6-scenario7",
        "folder": "module6-zone-coverage",
        "situation": "They're cycling down low. Your partner has the strong side. You're the weak side D. There's a forward in the high slot and one lurking on your side. What's your coverage responsibility?",
        "question": "As the weak side D, what's your primary responsibility?",
        "correct_feedback": "Weak side D owns the front of the net and the weak side. Don't chase the puck — your partner has that. You're responsible for anyone crashing the net or sneaking in from your side. Stay home, stay patient, be the wall.",
        "incorrect_feedback": "The weak side D doesn't chase. Your job is protecting the net front and your side of the ice. If you leave, you open up the backdoor and slot. Let your partner handle the puck battle — you handle anyone who comes near the net."
    },
]


async def generate_audio_for_scenario(scenario, force=False):
    """Generate audio files for a single scenario."""
    scenario_id = scenario["id"]
    folder = scenario["folder"]

    # Create audio folder if it doesn't exist
    scenario_path = AUDIO_BASE_PATH / folder
    scenario_path.mkdir(parents=True, exist_ok=True)

    # Audio clips to generate
    clips = {
        "setup.mp3": scenario["situation"],
        "prompt.mp3": scenario["question"],
        "correct.mp3": scenario["correct_feedback"],
        "incorrect.mp3": scenario["incorrect_feedback"]
    }

    print(f"Generating audio for {scenario_id} ({folder})...")

    for filename, text in clips.items():
        filepath = scenario_path / filename

        # Skip if already exists (unless --force)
        if filepath.exists() and not force:
            print(f"  ✓ {filename} (already exists)")
            continue

        try:
            # Create TTS object
            communicate = edge_tts.Communicate(text, VOICE)

            # Save to file
            await communicate.save(str(filepath))
            print(f"  ✓ {filename}")
        except Exception as e:
            print(f"  ✗ {filename} - Error: {e}")


async def main():
    """Generate all audio files."""
    # Check for --force flag
    force = "--force" in sys.argv

    print("=" * 70)
    print("Puck Academy Hockey IQ - Audio Regeneration")
    print("=" * 70)
    print(f"Voice: {VOICE}")
    print(f"Audio base path: {AUDIO_BASE_PATH}")
    print(f"Total scenarios: {len(SCENARIOS)}")
    if force:
        print("Mode: FORCE REGENERATE (all files will be overwritten)")
    else:
        print("Mode: SKIP EXISTING (use --force to regenerate all)")
    print("=" * 70)
    print()

    # Process each scenario
    for i, scenario in enumerate(SCENARIOS, 1):
        print(f"[{i}/{len(SCENARIOS)}] ", end="")
        await generate_audio_for_scenario(scenario, force=force)
        print()

    print("=" * 70)
    print("Audio regeneration complete!")
    print("=" * 70)


if __name__ == "__main__":
    asyncio.run(main())
