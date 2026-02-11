#!/usr/bin/env python3
"""
Audio regeneration script for Puck Academy Hockey IQ training app.
Generates all 43 scenarios' audio MP3 files using edge-tts (Microsoft Edge Text-to-Speech).

Usage:
    pip install edge-tts
    python3 regenerate_audio.py
"""

import asyncio
import os
from pathlib import Path
import edge_tts

# Audio folder base path
AUDIO_BASE_PATH = Path(__file__).parent / "audio"

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
        "incorrect_feedback": "Not quite. Chasing behind the net leaves the slot wide open. Your D-man has the puck carrier — trust them and protect the dangerous area in front."
    },
    {
        "id": "module1-scenario2",
        "folder": "scenario-2-corner-battle",
        "situation": "A loose puck is in the corner of your defensive zone. An opponent is racing to get it. Your winger is closest but will arrive at the same time as the opponent.",
        "question": "What's your best positioning as the center?",
        "correct_feedback": "Smart positioning! You're close enough to support if your winger wins the battle, but also cutting off the passing lane to the slot if the opponent gets the puck.",
        "incorrect_feedback": "Not quite. Stacking the corner leaves the front of the net unprotected. If they win the battle, there's no one home to stop the play."
    },
    {
        "id": "module1-scenario3",
        "folder": "scenario-3-cycle",
        "situation": "The opponents are cycling the puck low in your zone. They've completed two passes around the boards. Your D-men are tracking the puck carrier.",
        "question": "What's your role in this situation?",
        "correct_feedback": "Exactly right! The cycle is designed to open up a pass to the slot. By staying disciplined in the middle, you take away their best scoring opportunity.",
        "incorrect_feedback": "Not quite. Chasing the cycle is exhausting and ineffective. They'll just move the puck before you arrive. Let your D handle the boards."
    },
    {
        "id": "module1-scenario4",
        "folder": "scenario-4-breakout",
        "situation": "Your D has recovered the puck behind the net. One forechecker is pressuring, another is high. Your winger is on the boards providing a safe option. The D is looking to start the breakout.",
        "question": "What's the best way to support the breakout as the center?",
        "correct_feedback": "That's how you support a breakout. Swing through the middle, give your D a short, safe option. You absorb the pressure, buy time, then move it up ice.",
        "incorrect_feedback": "Not quite. Your D is under pressure — he needs help, not a long pass option. Swing low through the middle, give him an easy out."
    },
    {
        "id": "module1-scenario5",
        "folder": "scenario-5-gap",
        "situation": "The opposing center has the puck in the neutral zone and is driving toward your blue line. Your D is backing up to defend. You're backchecking from the high slot area.",
        "question": "What's your best backchecking play?",
        "correct_feedback": "Perfect angle. You took away the middle, forced him wide, and closed the gap without overcommitting. That's textbook backchecking.",
        "incorrect_feedback": "Not quite. Charging straight at him is a gamble. If he makes one move, you're out of the play and it's a 2-on-1."
    },
    {
        "id": "module1-scenario6",
        "folder": "scenario-6-winger-caught",
        "situation": "Your team just turned the puck over at the offensive blue line. Your left winger got caught deep — it's a 3-on-2 against your team. You're the center tracking back.",
        "question": "What's your priority on this 3-on-2 rush?",
        "correct_feedback": "Exactly right. On a 3-on-2, the slot is the danger zone. Your two D-men can handle the wide players. Your job is to eliminate the middle option.",
        "incorrect_feedback": "Not quite. Sprint to cover the left side where your winger should be — you've left the middle wide open. On a 3-on-2, the slot is the most dangerous area."
    },
    {
        "id": "module1-scenario7",
        "folder": "scenario-7-d-partner-bites",
        "situation": "Your D partner got sucked down behind the net chasing the puck carrier. The opponent quickly moved it up to the point. You're the center and you're the only one in position to react.",
        "question": "Your D is out of position. What's your responsibility?",
        "correct_feedback": "When your D is out of position, you become the safety valve. By sitting in the high slot, you take away the most dangerous pass.",
        "incorrect_feedback": "Not quite. If you charge the point, you're leaving the high slot wide open. The point man can easily pass to the slot for a one-timer."
    },
    # Module 2: Faceoffs (7 scenarios)
    {
        "id": "module2-scenario1",
        "folder": "module2-scenario1-ref-position",
        "situation": "Defensive zone faceoff at the left dot. You're the left winger. Your center is about to take the draw. The opposing right winger is aggressive and likes to crash the net hard after every draw.",
        "question": "Where should you position yourself on this defensive zone faceoff?",
        "correct_feedback": "In a D-zone faceoff, your primary job as a winger is coverage. Shadow the opposing forward on your side. If the draw is lost, he doesn't get a free run at your net. Coverage first, breakout second.",
        "incorrect_feedback": "Not quite. If you abandon your man early, you're giving the opposing winger a free lane to the net. Coverage comes before offensive opportunities in the D-zone."
    },
    {
        "id": "module2-scenario2",
        "folder": "module2-scenario2-advantage",
        "situation": "Offensive zone faceoff at the right dot. Your left D has a bomb from the point and is set up for a one-timer. If your center wins the draw back cleanly, the scoring chance is there immediately.",
        "question": "Where should you position yourself to maximize scoring chances?",
        "correct_feedback": "Perfect. You're right where the puck is going. Receive the draw, quick relay to the point for the one-timer. You're also close to the net for a rebound.",
        "incorrect_feedback": "Not quite. Good instinct, but you're too far from the puck. If your center wins it, you need to be in the relay chain. Get to the net AFTER the shot."
    },
    {
        "id": "module2-scenario3",
        "folder": "module2-scenario3-cheat-feet",
        "situation": "Neutral zone faceoff. You're the center about to take the draw. You notice the opposing winger on your left is positioned very high — almost at the hash marks instead of staying low near the dot.",
        "question": "What does this opponent positioning tell you?",
        "correct_feedback": "Excellent read. A high winger in the neutral zone means they want speed in space for a counterattack. Stay aware of passing lanes and be ready to backcheck hard if the draw goes against you.",
        "incorrect_feedback": "Not quite. Dump-and-chase doesn't need that high positioning. A high winger indicates they want vertical speed, not horizontal pursuit."
    },
    {
        "id": "module2-scenario4",
        "folder": "module2-scenario4-tieup",
        "situation": "Your center just lost the D-zone faceoff cleanly. The puck squirted toward the boards. The opposing winger on your side is advancing on it. You're the right winger with a chance to affect the outcome before they establish possession.",
        "question": "What's your immediate priority?",
        "correct_feedback": "After a faceoff loss, your job is damage control. Immediate pressure disrupts their transition and buys time for your team to organize. Speed and physicality matter here.",
        "incorrect_feedback": "Not quite. Pressure the opposing winger hard — disrupt before they get set up."
    },
    {
        "id": "module2-scenario5",
        "folder": "module2-scenario5-leverage",
        "situation": "Offensive zone faceoff. Your center just won the draw cleanly back to the left D at the point. The defense is already pushing up. You're the left winger — time to execute.",
        "question": "What's your best next move?",
        "correct_feedback": "After winning a faceoff cleanly, transition immediately to offense. The defense is scrambling — you cutting to the net puts instant pressure and creates a high-danger chance.",
        "incorrect_feedback": "Not quite. Stay at the faceoff dot and call for the puck."
    },
    {
        "id": "module2-scenario6",
        "folder": "module2-scenario6-forehand-backhand",
        "situation": "You're a defenseman. 30 seconds left, up 2-1, D-zone faceoff. The opposing team pulled their goalie earlier. This draw could decide the game. Your forwards are asking where they should set up.",
        "question": "What's the best positioning strategy for this critical defensive faceoff?",
        "correct_feedback": "Textbook late-game defense. Low positioning means you're between the puck and your net. If they win the draw, you're already in shape. Conservative hockey is exactly what you need with seconds left.",
        "incorrect_feedback": "Not quite. Too risky with 30 seconds left. Aggressive positioning leaves your D outnumbered if the draw goes the wrong way."
    },
    {
        "id": "module2-scenario7",
        "folder": "module2-scenario7-post-draw",
        "situation": "You're the center on a 5-on-4 power play. Offensive zone faceoff at the left dot. Your team runs an umbrella formation — D-men at the points, forwards attacking the net. The PK is trying to disrupt your setup.",
        "question": "How should your team execute this power play faceoff?",
        "correct_feedback": "Perfect PP strategy. The umbrella needs all three elements: center wins the draw, forwards create immediate danger at the net, and D-men have shooting lanes from the point.",
        "incorrect_feedback": "Not quite. Spread out to control the perimeter and keep forwards back for support."
    },
    # Module 3: Breakouts (7 scenarios)
    {
        "id": "module3-scenario1",
        "folder": "module3-scenario1-high-low-route",
        "situation": "Your D retrieves the puck behind the goal line. A single forechecker is bearing down. You're the right winger up near the neutral zone. Your D needs an outlet.",
        "question": "What do you do to create a breakout passing lane?",
        "correct_feedback": "Immediately move to the wall and get low. By attacking the boards, you force the forechecker to commit one way and give your D a short, safe pass option.",
        "incorrect_feedback": "Not quite. Stay in the middle of the ice for a center option."
    },
    {
        "id": "module3-scenario2",
        "folder": "module3-scenario2-reading-pressure",
        "situation": "Your D has the puck behind the goal line but the forechecker is cutting off the strong-side wall outlet. Your D partner is on the other side of the net. You're the left winger on the weak side.",
        "question": "What's the right play here?",
        "correct_feedback": "The reverse is textbook when one wall is cut off. Puck moves behind the net to the other D, who has a fresh view and finds you on the open side. Patient, safe, effective.",
        "incorrect_feedback": "Not quite. Force a pass directly through the forechecker."
    },
    {
        "id": "module3-scenario3",
        "folder": "module3-scenario3-forehand-receive",
        "situation": "Two forecheckers are aggressively attacking your D behind the net. Both wingers are being covered on the boards. You're the center sitting near the top of the circles.",
        "question": "What should you do?",
        "correct_feedback": "When wingers are covered and forecheckers are committing hard, you fill the middle as an escape route. This breaks the forecheck and lets your team exit cleanly.",
        "incorrect_feedback": "Not quite. Attack one of the forecheckers to create a passing lane."
    },
    {
        "id": "module3-scenario4",
        "folder": "module3-scenario4-cut-laterally",
        "situation": "Your D is retrieving the puck behind the net. A forechecker is moving in. You're the right winger — your positioning on the boards will determine if the D can make a clean outlet pass.",
        "question": "Where should you position on the wall?",
        "correct_feedback": "By staying low and tight to the boards, you're a quick escape valve. The D can make a short, accurate pass even under pressure. You control the play from there.",
        "incorrect_feedback": "Not quite. High on the boards near center ice for a longer pass."
    },
    {
        "id": "module3-scenario5",
        "folder": "module3-scenario5-support-stretch",
        "situation": "Your D reads the forecheck and decides to wheel the puck up ice himself. He's skating hard from behind the net along the boards. You're the right winger and need to fill a support lane.",
        "question": "Where do you skate to support the D on the wheel play?",
        "correct_feedback": "When the D wheels it, you fill middle. Stay engaged with his pace and be ready for a quick pass or to create a 2-on-1. That's the trailer's job on a wheel play.",
        "incorrect_feedback": "Not quite. Chase behind the D on the same side."
    },
    {
        "id": "module3-scenario6",
        "folder": "module3-scenario6-forecheck-pattern",
        "situation": "Your D just got the puck behind the goal line. Both forecheckers are closing in hard from each side. Your winger is low on the wall and your center is in the middle — both within passing range.",
        "question": "What should the D prioritize?",
        "correct_feedback": "Under heavy pressure, don't be fancy. Get the puck to the winger with a safe, short pass. Escape possession cleanly, then build the breakout from there.",
        "incorrect_feedback": "Not quite. Thread a stretch pass to the center to skip the forecheckers."
    },
    {
        "id": "module3-scenario7",
        "folder": "module3-scenario7-broken-play",
        "situation": "Your D has the puck behind the goal line with time. The forechecker backed off and is playing a soft gap. Your center is at center ice with speed, and the opposing forward is way behind him. The stretch pass is there.",
        "question": "How should you capitalize on this time and space?",
        "correct_feedback": "Perfect read. When the forechecker backs off, the stretch pass is your most dangerous option. Your center gets the puck with momentum and space — that's an offensive advantage.",
        "incorrect_feedback": "Not quite. Play it safe with a short pass to the winger."
    },
    # Module 4: Offensive Zone IQ (7 scenarios)
    {
        "id": "module4-scenario1",
        "folder": "module4-scenario1-net-front",
        "situation": "Your D has the puck at the point and is about to shoot. You're planted about 15 feet in front of the goalie. A defenseman is trying to clear you out. The shot is coming.",
        "question": "What's your primary job on this net-front play?",
        "correct_feedback": "You want to be a threat, not an obstacle. Plant yourself in the hard areas — shoulders square to the point, one foot in the crease. You need to see the puck coming so you can tip it, and your body naturally screens.",
        "incorrect_feedback": "Not quite. Stand directly between the shooter and goalie to guarantee a screen."
    },
    {
        "id": "module4-scenario2",
        "folder": "module4-scenario2-cycle-support",
        "situation": "You're below the goal line on the boards with the puck. A defender is closing fast. Your linemate has inside position at the hash marks, and there's a winger high in the slot. You feel the pressure coming.",
        "question": "When is the RIGHT time to cycle the puck around the boards?",
        "correct_feedback": "Cycling only works if you have a target. Your linemate needs inside leverage, the defender needs to be overextended, and you need a passing lane. Cycling with purpose is puck control.",
        "incorrect_feedback": "Not quite. Any time you're under pressure below the goal line."
    },
    {
        "id": "module4-scenario3",
        "folder": "module4-scenario3-soft-ice",
        "situation": "You're in the left circle with the puck, 30 feet from goal. Decent angle. But a trailer is moving into the slot with a better scoring chance — there's a defender between you and him though. One second to decide.",
        "question": "What drives your shoot-or-pass decision?",
        "correct_feedback": "Shot selection is about expected goal value. If your pass gets through and he's one-timing from the slot, that's higher probability. But if the defender is in the lane, YOU take the play. Read what's open.",
        "incorrect_feedback": "Not quite. Always shoot from the circle — that's your job."
    },
    {
        "id": "module4-scenario4",
        "folder": "module4-scenario4-backdoor",
        "situation": "Your team has possession at the point. A shot is coming and you're positioned 12 feet in front of the goalie. You want to make his job harder — but the refs are watching for interference.",
        "question": "How do you screen effectively without getting called?",
        "correct_feedback": "A legal screen is presence without interference. Occupy space, be a big body, let the goalie see your number on your back — but don't hook, lean, or tie up his arms. The ref will let it go if you're playing the puck.",
        "incorrect_feedback": "Not quite. Lean on the goalie's pads to feel where he's moving."
    },
    {
        "id": "module4-scenario5",
        "folder": "module4-scenario5-screen-tip",
        "situation": "You're the winger on the weak side. Your center is driving hard toward the net, pulling the defenseman with him. The puck carrier on the perimeter is looking around. That leaves you wide open on the back door.",
        "question": "What tells you the back-door pass is coming to you?",
        "correct_feedback": "Back-door isn't a set play — it's reading movement. If the center's drive pulls the defender and the puck carrier can see you're open, that's your cue. Don't cheat early — read and react.",
        "incorrect_feedback": "Not quite. The defenseman loses sight of you."
    },
    {
        "id": "module4-scenario6",
        "folder": "module4-scenario6-high-slot",
        "situation": "You're at the point with the puck. Opposing D-men are converging to block. A forward is screening in front of the net, another is crashing for rebounds. You need to get this shot through.",
        "question": "What's your best tactic to get the puck to the net?",
        "correct_feedback": "Low shots through traffic beat defenders more than high ones. Your screener can deflect it, the goalie can't see it, and if it gets through there's a rebound. Let it rip low and hard.",
        "incorrect_feedback": "Not quite. Shoot high to beat the defenders."
    },
    {
        "id": "module4-scenario7",
        "folder": "module4-scenario7-ozone-turnover",
        "situation": "Your team dumps the puck in deep during an offensive push. It's a race for the loose puck behind the net. The opposing D is closer but has his back turned. You're coming from a different angle.",
        "question": "What's your best move to win this puck battle?",
        "correct_feedback": "You don't need to reach the puck first — you need to own the space. Get your body in his path, make him change direction, then attack the puck. Positioning and angling beats raw speed.",
        "incorrect_feedback": "Not quite. Go for the puck directly — fastest player wins."
    },
    # Module 5: Forechecking (8 scenarios)
    {
        "id": "module5-scenario1",
        "folder": "module5-scenario1-f1-angle",
        "situation": "The opposing D just picked up the puck in their zone. Your first forechecker (F1) is already pressuring high. You're coming in as the second wave. You need to pick a lane and execute.",
        "question": "As the second forward in a 1-2-2, what's your primary responsibility?",
        "correct_feedback": "In a 1-2-2, you're NOT chasing F1. You pick your lane — usually the far D — and own that space. You take away the escape pass. Simple structure, huge difference in execution.",
        "incorrect_feedback": "Not quite. Follow F1 and double-team the puck carrier."
    },
    {
        "id": "module5-scenario2",
        "folder": "module5-scenario2-f1-f2-read",
        "situation": "Puck is loose in the opposing zone after a dump-in. You sense the opposing team is tired and disorganized — slow line change, sloppy passes. Two of your forwards are already in deep.",
        "question": "When should you commit to a 2-1-2 (two forecheckers) instead of a standard 1-2-2?",
        "correct_feedback": "A 2-1-2 is higher risk — you're gambling on creating a turnover before they regroup. Use it when you have evidence: they're gassed, they're sloppy. Read the room, then attack.",
        "incorrect_feedback": "Not quite. Every time the puck is loose in their zone."
    },
    {
        "id": "module5-scenario3",
        "folder": "module5-scenario3-pressure-contain",
        "situation": "An opposing D is exiting their zone with the puck, heading toward center ice. You're the closest forechecker. He can cut to the middle or go wide. You have one job: make his decision for him.",
        "question": "How do you angle the puck carrier as the first forechecker?",
        "correct_feedback": "The middle of the ice is the most dangerous — speed, passing lanes, attack angles. You angle him to the board where ice is tight and support can converge. You're herding him into traffic.",
        "incorrect_feedback": "Not quite. Skate directly at him to force an immediate decision."
    },
    {
        "id": "module5-scenario4",
        "folder": "module5-scenario4-angling",
        "situation": "Your forechecker (F1) just engaged the puck carrier on the boards in the opposing zone. The puck is still being battled for. You're F2 — do you go high to cut off the breakout, or stay low to help?",
        "question": "How do you read where to position as the second forechecker?",
        "correct_feedback": "F1 is steering the play one direction — watch where he's pushing pressure. If F1 sends it toward the boards, you go high on that side to cut the exit. If F1 keeps it low, you support the battle. Follow the structure.",
        "incorrect_feedback": "Not quite. Always go high to cut off the outlet pass."
    },
    {
        "id": "module5-scenario5",
        "folder": "module5-scenario5-read-breakout",
        "situation": "Two of your forwards are deep in the offensive zone forechecking hard. The opposing team just cleared the puck to their point. Your forecheckers won't get there in time. Where are you?",
        "question": "What's the role of the third man high in a forecheck?",
        "correct_feedback": "The third man high is your insurance policy and breakout disruptor. You're high enough to read the play, close enough to pressure an exit. If they clear it cleanly, you're already positioned for transition.",
        "incorrect_feedback": "Not quite. Rush back to help defensively."
    },
    {
        "id": "module5-scenario6",
        "folder": "module5-scenario6-loose-puck",
        "situation": "Your team is heading into the offensive zone but the D is set up tight at the blue line. You decide to dump it in. The key: WHERE you dump it determines whether your forecheck can recover it.",
        "question": "What's the critical factor in a successful dump-and-chase?",
        "correct_feedback": "Dump location creates chase advantage. Dump it behind the net on the strong side and now THEY have to make a cross-ice play — that's when you intercept. You're dumping to create geometry, not just throwing it away.",
        "incorrect_feedback": "Not quite. Dump it in as hard as possible so they can't clear it."
    },
    {
        "id": "module5-scenario7",
        "folder": "module5-scenario7-turnover-transition",
        "situation": "You're forechecking hard in the opposing zone. The puck battle is going and then — turnover! The puck is suddenly loose, your linemate scoops it. Now it's YOUR possession in THEIR zone. The switch happens in half a second.",
        "question": "When you gain possession during a forecheck, what's your immediate read?",
        "correct_feedback": "A turnover during a forecheck is a gift. Their defense is scattered, their forwards are out of position. You don't play conservatively — you attack. One touch, eyes up, shoot or pass to the soft spot.",
        "incorrect_feedback": "Not quite. Continue pressuring defensively — don't change mindset."
    },
    {
        "id": "module5-scenario8",
        "folder": "module5-scenario8-f2-gassed",
        "situation": "You're running a standard 1-2-2 forecheck, but the opponent is handling your pressure easily. Calm D-men, clean breakouts. Your guys are chasing ghosts and burning energy.",
        "question": "How do you adjust forecheck pressure to stay effective?",
        "correct_feedback": "Forecheck isn't an on-off switch — it's a throttle. When they're playing with poise, don't waste energy chasing. When they start looking sloppy — THAT'S when you lean on them. It's chess, not anger.",
        "incorrect_feedback": "Not quite. Keep the same pressure all game — intensity is consistency."
    },
    # Module 6: D-Zone for Defensemen (7 scenarios)
    {
        "id": "module6-scenario1",
        "folder": "module6-scenario1-gap-control",
        "situation": "An opposing forward is carrying the puck up ice with speed. You're the last D back. He's on his strong side with the puck on his forehand. You need to decide how much space to surrender.",
        "question": "What determines the right gap on a 1-on-1 rush?",
        "correct_feedback": "A forward on his strong side is in his wheelhouse — tighter gap. On his weak side, he has to work harder for that shot, so you can play deeper. You're reading his advantage, not just his speed.",
        "incorrect_feedback": "Not quite. Always give space until he hits the slot."
    },
    {
        "id": "module6-scenario2",
        "folder": "module6-scenario2-puck-retrieval",
        "situation": "Your team has the puck cycling in the offensive zone. You're at the point watching the play develop. There's a loose puck along the boards — you could jump down and keep possession. But the opposing center is lurking, looking for a transition.",
        "question": "What's the key indicator that you should NOT pinch?",
        "correct_feedback": "A pinch only works if you KNOW you're covered. If you can't account for their fast guys or your partner is out of position, stay home. A turnover against a pinching D is an odd-man rush the other way.",
        "incorrect_feedback": "Not quite. If the opposing center is anywhere near your zone."
    },
    {
        "id": "module6-scenario3",
        "folder": "module6-scenario3-d-to-d",
        "situation": "Scramble in front of your net. Two opposing forwards are in tight — one has planted himself in the crease. Your goalie is fighting for sight lines. The puck is loose in the high slot.",
        "question": "What's your responsibility when an opponent is camped in your crease?",
        "correct_feedback": "You own that space. A player set up in your paint is scoring on any puck that gets through. Be physical, be direct, move him. Your goalie needs a clean office.",
        "incorrect_feedback": "Not quite. Let the goalie handle it — it's his territory."
    },
    {
        "id": "module6-scenario4",
        "folder": "module6-scenario4-net-front-battle",
        "situation": "Your team is under pressure in the D-zone. You have the puck. Your partner is on the other side, open. But there's a forward between you who could intercept a cross-ice pass. A winger is also available up the wall.",
        "question": "What's the higher-percentage outlet?",
        "correct_feedback": "It's situational. D-to-D in open ice is great. D-to-D through a forward is a turnover in the slot. Going up the wall cleanly works. Scanning in real time — that's a veteran read.",
        "incorrect_feedback": "Not quite. Always go D-to-D across the ice for security."
    },
    {
        "id": "module6-scenario5",
        "folder": "module6-scenario5-when-to-pinch",
        "situation": "The opposing team is working the puck on the perimeter in your zone. They're looking for a pass through the middle to the slot. You can see the lane opening. Your partner is already engaged. You need to collapse without leaving the weak side exposed.",
        "question": "How do you block a passing lane without getting outmaneuvered?",
        "correct_feedback": "You're reading the passer's INTENT. Watch his eyes, his shoulders — when you see the commitment, THEN you collapse. Move too early and he has an outlet. It's a timing game.",
        "incorrect_feedback": "Not quite. Skate directly into the lane and plant yourself."
    },
    {
        "id": "module6-scenario6",
        "folder": "module6-scenario6-first-pass",
        "situation": "The opposing team is transitioning through the neutral zone with possession. You're a D with the option to step up and pressure the puck carrier before he gains your zone, or hang back and let your forwards pressure him first.",
        "question": "When should you step up and attack in the neutral zone?",
        "correct_feedback": "Stepping up is aggressive, and aggression fails without the read. If you step and miss, he has a free lane into your zone. Step when you see slow hands, a committed direction, or a bad pass. Controlled aggression.",
        "incorrect_feedback": "Not quite. Always step up to keep them out of your zone."
    },
    {
        "id": "module6-scenario7",
        "folder": "module6-scenario7-zone-coverage",
        "situation": "A winger just beat you along the boards. He's got speed and possession heading toward your goal line. Your first instinct is panic — but you've got inside positioning and he hasn't shot yet.",
        "question": "What's your recovery play after getting beaten to the outside?",
        "correct_feedback": "When you're beat, recovery is about geometry, not chasing. Sprint to get between him and the scoring areas. He's got the perimeter but you own the inside. He'll have to make a difficult pass or take a low-percentage shot.",
        "incorrect_feedback": "Not quite. Chase him from behind for a poke check."
    }
]


async def generate_audio_for_scenario(scenario):
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

        # Skip if already exists
        if filepath.exists():
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
    print("=" * 70)
    print("Puck Academy Hockey IQ - Audio Regeneration")
    print("=" * 70)
    print(f"Voice: {VOICE}")
    print(f"Audio base path: {AUDIO_BASE_PATH}")
    print(f"Total scenarios: {len(SCENARIOS)}")
    print("=" * 70)
    print()

    # Process each scenario
    for i, scenario in enumerate(SCENARIOS, 1):
        print(f"[{i}/{len(SCENARIOS)}] ", end="")
        await generate_audio_for_scenario(scenario)
        print()

    print("=" * 70)
    print("Audio regeneration complete!")
    print("=" * 70)


if __name__ == "__main__":
    asyncio.run(main())
