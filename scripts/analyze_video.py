#!/usr/bin/env python3
"""
Hockey IQ Video Assessment Tool
Extracts frames from game footage and runs AI analysis using Claude.

Usage:
    python analyze_video.py path/to/video.mp4 --player "Tyler" --number 87 --position center --level "Youth AAA"

Requirements:
    pip install anthropic pillow
    ffmpeg must be installed (brew install ffmpeg / apt install ffmpeg)

Environment:
    ANTHROPIC_API_KEY=your_api_key
"""

import argparse
import base64
import json
import os
import subprocess
import sys
from datetime import datetime
from pathlib import Path

try:
    import anthropic
except ImportError:
    print("Please install anthropic: pip install anthropic")
    sys.exit(1)

# =============================================================================
# Configuration
# =============================================================================

FRAME_INTERVAL_OVERVIEW = 30  # Extract 1 frame every 30 seconds for overview
FRAME_INTERVAL_DETAIL = 10   # Extract 1 frame every 10 seconds for detailed analysis
MAX_FRAMES = 60              # Maximum frames to send to Claude (cost control)

SYSTEM_PROMPT = """You are an expert hockey development coach analyzing game footage to assess a youth player's hockey IQ. You have deep knowledge of positional play, systems, and decision-making at all levels of hockey.

Your role is to:
1. Observe the tracked player's positioning and movement patterns across multiple frames
2. Identify strengths and areas for improvement in their hockey IQ
3. Connect observations to specific, trainable skills
4. Provide actionable feedback in an encouraging, coach-like tone

You are analyzing footage for a parent who wants to help their child improve. Be honest but constructive. Focus on hockey IQ (reading the play, positioning, decisions) rather than skating speed or physical skills.

IMPORTANT CONTEXT:
- You are viewing frames extracted from game video at regular intervals
- The player being analyzed may be marked with a tracking overlay (number highlighted)
- You cannot see the full motion between frames — make observations based on positioning patterns
- Youth players are still learning — frame feedback developmentally

PUCK ACADEMY CURRICULUM MODULES (reference these in recommendations):
- Module 1: Defensive Zone (7 scenarios) — D-zone positioning, coverage, supporting D
- Module 2: Faceoffs (7 scenarios) — Reading refs, stance, post-draw responsibility
- Module 3: Breakouts (7 scenarios) — Route selection, timing, reading pressure
- Module 4: Offensive Zone (7 scenarios) — Net front, cycle support, soft ice
- Module 5: Forechecking (8 scenarios) — F1/F2 reads, angling, pressure vs contain
- Module 6: D-Zone for Defensemen (7 scenarios) — Gap control, retrievals, first pass

Provide your analysis in JSON format with the following structure:
{
  "overallScore": 0-100,
  "summary": "2-3 sentence overview",
  "strengths": [
    {
      "area": "Area name",
      "observation": "What you observed",
      "evidenceFrames": ["frame numbers"],
      "relatedModule": module number,
      "coachNote": "Encouraging note"
    }
  ],
  "areasToImprove": [
    {
      "area": "Area name",
      "observation": "What you observed",
      "severity": "primary or secondary",
      "whatToWorkOn": "Specific advice",
      "relatedModule": module number,
      "recommendedScenarios": [scenario numbers],
      "coachNote": "Encouraging note"
    }
  ],
  "trainingPlan": {
    "week1": {"module": number, "moduleName": "name", "focus": "description"},
    "week2": {"module": number, "moduleName": "name", "focus": "description"},
    "week3": {"module": number, "moduleName": "name", "focus": "description"}
  }
}"""

LEVEL_CALIBRATION = {
    "youth-aa": {
        "description": "Youth A/AA (Ages 10-13, Recreational/Competitive)",
        "expectations": "Basic understanding of position, general puck awareness, effort on backchecks",
        "scoring_note": "Score 60-70 for doing basics right, 80+ only for advanced reads"
    },
    "youth-aaa": {
        "description": "Youth AAA (Ages 10-14, Elite)",
        "expectations": "Correct zone positioning, understanding basic systems, reading pressure",
        "scoring_note": "Score 70-80 for solid positioning, 85+ for anticipation"
    },
    "high-school": {
        "description": "High School / Prep (Ages 14-18)",
        "expectations": "Consistent system execution, adjusting to opponents, communication",
        "scoring_note": "Higher bar - positioning should be mostly automatic"
    },
    "juniors": {
        "description": "Juniors / College",
        "expectations": "Professional-level positioning, quick reads, playmaking under pressure",
        "scoring_note": "Very high bar - competing for next level"
    },
    "adult-rec": {
        "description": "Adult Recreational",
        "expectations": "Varies widely - focus on fundamentals and enjoyment",
        "scoring_note": "Calibrate to what they're trying to achieve"
    }
}

POSITION_FOCUS = {
    "center": [
        "D-zone high slot coverage",
        "Faceoff positioning (if visible)",
        "Breakout middle lane support",
        "O-zone net front presence",
        "Backcheck through the middle"
    ],
    "wing": [
        "D-zone wall/corner coverage",
        "Breakout route selection",
        "O-zone cycle positioning",
        "Forecheck role (F1/F2)",
        "Weak-side awareness"
    ],
    "defense": [
        "Gap control",
        "D-zone net front battles",
        "Puck retrieval decisions",
        "First pass under pressure",
        "Pinch timing"
    ],
    "goalie": [
        "Positioning and angles",
        "Rebound control awareness",
        "Puck handling decisions",
        "Communication with D"
    ]
}


# =============================================================================
# Video Processing
# =============================================================================

def extract_frames(video_path: str, output_dir: str, interval: int = 30) -> list:
    """Extract frames from video at specified interval using ffmpeg."""
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    # Get video duration
    duration_cmd = [
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", video_path
    ]
    try:
        duration = float(subprocess.check_output(duration_cmd).decode().strip())
    except Exception as e:
        print(f"Warning: Could not get video duration: {e}")
        duration = 3600  # Default to 1 hour

    print(f"Video duration: {duration:.0f} seconds ({duration/60:.1f} minutes)")

    # Extract frames
    output_pattern = str(output_dir / "frame_%04d.jpg")
    extract_cmd = [
        "ffmpeg", "-i", video_path,
        "-vf", f"fps=1/{interval}",
        "-q:v", "2",
        output_pattern,
        "-y"  # Overwrite existing
    ]

    print(f"Extracting frames every {interval} seconds...")
    subprocess.run(extract_cmd, capture_output=True)

    # Get list of extracted frames
    frames = sorted(output_dir.glob("frame_*.jpg"))
    print(f"Extracted {len(frames)} frames")

    return [str(f) for f in frames]


def encode_image(image_path: str) -> str:
    """Encode image to base64 for API."""
    with open(image_path, "rb") as f:
        return base64.standard_b64encode(f.read()).decode("utf-8")


# =============================================================================
# AI Analysis
# =============================================================================

def analyze_frames(
    frames: list,
    player_name: str,
    jersey_number: str,
    position: str,
    level: str,
    focus_areas: list = None,
    notes: str = None
) -> dict:
    """Send frames to Claude for analysis."""

    client = anthropic.Anthropic()

    # Limit frames for cost control
    if len(frames) > MAX_FRAMES:
        step = len(frames) // MAX_FRAMES
        frames = frames[::step][:MAX_FRAMES]
        print(f"Limited to {len(frames)} frames for analysis")

    # Build the message content
    content = []

    # Add context
    level_info = LEVEL_CALIBRATION.get(level, LEVEL_CALIBRATION["youth-aaa"])
    position_focus = POSITION_FOCUS.get(position, POSITION_FOCUS["center"])

    context_text = f"""I'm showing you {len(frames)} frames from a youth hockey game.

PLAYER BEING ANALYZED:
- Name: {player_name}
- Jersey Number: #{jersey_number}
- Position: {position.capitalize()}
- Level: {level_info['description']}

LEVEL EXPECTATIONS:
{level_info['expectations']}
Scoring calibration: {level_info['scoring_note']}

POSITION-SPECIFIC FOCUS AREAS:
{chr(10).join('- ' + f for f in position_focus)}
"""

    if focus_areas:
        context_text += f"\nPARENT'S SPECIFIC QUESTIONS:\n{chr(10).join('- ' + f for f in focus_areas)}\n"

    if notes:
        context_text += f"\nADDITIONAL NOTES FROM PARENT:\n{notes}\n"

    context_text += """
ANALYSIS INSTRUCTIONS:
1. Look for the player with jersey #{jersey_number} in each frame
2. Note their positioning relative to puck, net, teammates, opponents
3. Identify patterns across multiple frames (consistent strengths or issues)
4. Focus on hockey IQ elements: reads, positioning, decisions
5. Connect observations to specific Puck Academy training modules
6. Calibrate scoring to the player's level

Provide your analysis in the JSON format specified in the system prompt.
""".replace("{jersey_number}", jersey_number)

    content.append({"type": "text", "text": context_text})

    # Add frames
    for i, frame_path in enumerate(frames):
        timestamp = i * FRAME_INTERVAL_OVERVIEW  # Approximate timestamp
        minutes = timestamp // 60
        seconds = timestamp % 60

        content.append({
            "type": "text",
            "text": f"\n--- Frame {i+1} (approximately {minutes}:{seconds:02d}) ---"
        })
        content.append({
            "type": "image",
            "source": {
                "type": "base64",
                "media_type": "image/jpeg",
                "data": encode_image(frame_path)
            }
        })

    content.append({
        "type": "text",
        "text": "\nBased on these frames, provide your Hockey IQ assessment in the JSON format specified."
    })

    print(f"Sending {len(frames)} frames to Claude for analysis...")
    print("This may take 1-2 minutes...")

    # Call Claude
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=4096,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": content}]
    )

    # Extract JSON from response
    response_text = response.content[0].text

    # Try to parse JSON from response
    try:
        # Look for JSON in the response
        if "```json" in response_text:
            json_str = response_text.split("```json")[1].split("```")[0]
        elif "```" in response_text:
            json_str = response_text.split("```")[1].split("```")[0]
        else:
            json_str = response_text

        analysis = json.loads(json_str)
    except json.JSONDecodeError:
        print("Warning: Could not parse JSON response, returning raw text")
        analysis = {"raw_response": response_text}

    return analysis


# =============================================================================
# Report Generation
# =============================================================================

def generate_report(analysis: dict, player_name: str, output_path: str):
    """Generate a formatted markdown report from the analysis."""

    report = f"""# Hockey IQ Assessment: {player_name}

**Generated:** {datetime.now().strftime("%B %d, %Y")}
**Powered by:** Puck Academy

---

## Overall Assessment

**Hockey IQ Score: {analysis.get('overallScore', 'N/A')}/100**

{analysis.get('summary', 'No summary available.')}

---

## Strengths Observed

"""

    for strength in analysis.get('strengths', []):
        report += f"""### {strength.get('area', 'Unnamed')}

{strength.get('observation', '')}

> **Coach's Note:** {strength.get('coachNote', '')}

*Related Training: Module {strength.get('relatedModule', '?')}*

"""

    report += """---

## Areas to Develop

"""

    for area in analysis.get('areasToImprove', []):
        severity = "**PRIMARY FOCUS**" if area.get('severity') == 'primary' else "Secondary focus"
        report += f"""### {area.get('area', 'Unnamed')} ({severity})

{area.get('observation', '')}

**What to work on:** {area.get('whatToWorkOn', '')}

> **Coach's Note:** {area.get('coachNote', '')}

*Train this: Module {area.get('relatedModule', '?')}, Scenarios {area.get('recommendedScenarios', [])}*

"""

    report += """---

## Your Training Plan

Based on this assessment, here's your recommended training sequence:

"""

    plan = analysis.get('trainingPlan', {})
    for week, details in plan.items():
        if isinstance(details, dict):
            report += f"""**{week.replace('week', 'Week ').title()}:** Module {details.get('module', '?')} - {details.get('moduleName', '')}
- Focus: {details.get('focus', '')}

"""

    report += """---

## Next Steps

1. **Start training** at [hockeyiq.netlify.app](https://hockeyiq.netlify.app)
2. Complete the recommended modules in order
3. Re-assess in 4-6 weeks to track improvement

---

*This assessment was generated by Puck Academy's AI analysis system.
For questions, contact support@puckacademy.com*
"""

    # Save report
    with open(output_path, 'w') as f:
        f.write(report)

    print(f"\nReport saved to: {output_path}")
    return report


# =============================================================================
# Main
# =============================================================================

def main():
    parser = argparse.ArgumentParser(description="Analyze hockey game footage for Hockey IQ assessment")
    parser.add_argument("video", help="Path to video file")
    parser.add_argument("--player", required=True, help="Player's first name")
    parser.add_argument("--number", required=True, help="Jersey number")
    parser.add_argument("--position", required=True, choices=["center", "wing", "defense", "goalie"])
    parser.add_argument("--level", required=True, choices=list(LEVEL_CALIBRATION.keys()))
    parser.add_argument("--focus", nargs="*", help="Focus areas (optional)")
    parser.add_argument("--notes", help="Additional notes from parent (optional)")
    parser.add_argument("--output", default="assessment_report.md", help="Output report path")
    parser.add_argument("--frames-dir", default="./extracted_frames", help="Directory for extracted frames")
    parser.add_argument("--interval", type=int, default=30, help="Frame extraction interval in seconds")

    args = parser.parse_args()

    # Check for API key
    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("Error: ANTHROPIC_API_KEY environment variable not set")
        print("Export your API key: export ANTHROPIC_API_KEY=your_key_here")
        sys.exit(1)

    # Check video exists
    if not os.path.exists(args.video):
        print(f"Error: Video file not found: {args.video}")
        sys.exit(1)

    print(f"\n{'='*60}")
    print(f"HOCKEY IQ ASSESSMENT")
    print(f"{'='*60}")
    print(f"Player: {args.player} #{args.number}")
    print(f"Position: {args.position.capitalize()}")
    print(f"Level: {args.level}")
    print(f"Video: {args.video}")
    print(f"{'='*60}\n")

    # Extract frames
    frames = extract_frames(args.video, args.frames_dir, args.interval)

    if not frames:
        print("Error: No frames extracted from video")
        sys.exit(1)

    # Run analysis
    analysis = analyze_frames(
        frames=frames,
        player_name=args.player,
        jersey_number=args.number,
        position=args.position,
        level=args.level,
        focus_areas=args.focus,
        notes=args.notes
    )

    # Save raw analysis
    analysis_path = args.output.replace('.md', '_raw.json')
    with open(analysis_path, 'w') as f:
        json.dump(analysis, f, indent=2)
    print(f"Raw analysis saved to: {analysis_path}")

    # Generate report
    generate_report(analysis, args.player, args.output)

    print(f"\n{'='*60}")
    print("ASSESSMENT COMPLETE!")
    print(f"{'='*60}")
    print(f"Report: {args.output}")
    print(f"Raw JSON: {analysis_path}")
    print(f"\nScore: {analysis.get('overallScore', 'N/A')}/100")
    print(f"\n{analysis.get('summary', '')}")


if __name__ == "__main__":
    main()
