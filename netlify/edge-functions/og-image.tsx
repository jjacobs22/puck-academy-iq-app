import React from "https://esm.sh/react@18.2.0";
import { ImageResponse } from "https://deno.land/x/og_edge/mod.ts";

export default async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const score = parseInt(url.searchParams.get("score") || "0");
  const validScore = Math.min(5, Math.max(0, score));

  // Determine emoji and message based on score
  let emoji = "🏒";
  let message = "Test Your Hockey IQ!";
  let subtext = "Can you make the right calls?";
  
  if (validScore === 5) {
    emoji = "🏆";
    message = "I Got a Perfect Score!";
    subtext = "Think you can beat 5/5?";
  } else if (validScore >= 4) {
    emoji = "🔥";
    message = `I Scored ${validScore}/5!`;
    subtext = "Can you beat my score?";
  } else if (validScore >= 2) {
    emoji = "🏒";
    message = `I Scored ${validScore}/5`;
    subtext = "Think you can do better?";
  } else if (validScore >= 1) {
    emoji = "😬";
    message = `I Got ${validScore}/5...`;
    subtext = "Easy to beat, right?";
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0A1628 0%, #1a2940 50%, #0A1628 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Red accent line at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "linear-gradient(90deg, #C8102E 0%, #ff4d6a 50%, #C8102E 100%)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            letterSpacing: "6px",
            marginBottom: "10px",
            display: "flex",
          }}
        >
          <span style={{ color: "#FFFFFF" }}>PUCK </span>
          <span style={{ color: "#C8102E" }}>ACADEMY</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "24px",
            color: "#A8B2BE",
            marginBottom: "40px",
            letterSpacing: "3px",
          }}
        >
          HOCKEY IQ TRAINING
        </div>

        {/* Challenge box */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(200, 16, 46, 0.5)",
            borderRadius: "20px",
            padding: "40px 80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Emoji */}
          <div style={{ fontSize: "60px", marginBottom: "15px" }}>{emoji}</div>

          {/* Main message */}
          <div
            style={{
              fontSize: "42px",
              fontWeight: "bold",
              color: "#FFFFFF",
              marginBottom: "10px",
            }}
          >
            {message}
          </div>

          {/* Subtext */}
          <div style={{ fontSize: "24px", color: "#A8B2BE" }}>{subtext}</div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "20px",
            color: "#A8B2BE",
            letterSpacing: "1px",
          }}
        >
          hockeyiq.netlify.app
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

export const config = { path: "/og-image" };
