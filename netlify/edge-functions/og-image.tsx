// @ts-ignore - Deno imports
import satori from "https://esm.sh/satori@0.10.11";
// @ts-ignore - Deno imports  
import { Resvg } from "https://esm.sh/@resvg/resvg-wasm@2.4.0";
// @ts-ignore - Deno imports
import { initWasm } from "https://esm.sh/@resvg/resvg-wasm@2.4.0";

let wasmInitialized = false;

// Load font from Google Fonts
async function loadFont(fontFamily: string, weight: number): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}:wght@${weight}&display=swap`;
  const css = await fetch(url).then(res => res.text());
  const fontUrl = css.match(/src: url\(([^)]+)\)/)?.[1];
  if (!fontUrl) throw new Error('Font URL not found');
  return fetch(fontUrl).then(res => res.arrayBuffer());
}

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

  try {
    // Load fonts
    const [bebasNeue, workSans] = await Promise.all([
      loadFont('Bebas Neue', 400),
      loadFont('Work Sans', 700),
    ]);

    // Generate SVG using Satori
    const svg = await satori(
      {
        type: 'div',
        props: {
          style: {
            width: '1200px',
            height: '630px',
            background: 'linear-gradient(135deg, #0A1628 0%, #1a2940 50%, #0A1628 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Work Sans',
            position: 'relative',
          },
          children: [
            // Red accent line at top
            {
              type: 'div',
              props: {
                style: {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '8px',
                  background: 'linear-gradient(90deg, #C8102E 0%, #ff4d6a 50%, #C8102E 100%)',
                },
              },
            },
            // Logo
            {
              type: 'div',
              props: {
                style: {
                  fontFamily: 'Bebas Neue',
                  fontSize: '72px',
                  letterSpacing: '6px',
                  color: '#FFFFFF',
                  marginBottom: '10px',
                  display: 'flex',
                },
                children: [
                  { type: 'span', props: { children: 'PUCK ' } },
                  { type: 'span', props: { style: { color: '#C8102E' }, children: 'ACADEMY' } },
                ],
              },
            },
            // Tagline
            {
              type: 'div',
              props: {
                style: {
                  fontSize: '28px',
                  color: '#A8B2BE',
                  marginBottom: '40px',
                  letterSpacing: '3px',
                },
                children: 'HOCKEY IQ TRAINING',
              },
            },
            // Challenge box
            {
              type: 'div',
              props: {
                style: {
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(200, 16, 46, 0.5)',
                  borderRadius: '20px',
                  padding: '40px 80px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                },
                children: [
                  // Emoji
                  {
                    type: 'div',
                    props: {
                      style: { fontSize: '60px', marginBottom: '15px' },
                      children: emoji,
                    },
                  },
                  // Main message
                  {
                    type: 'div',
                    props: {
                      style: {
                        fontSize: '42px',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        marginBottom: '10px',
                      },
                      children: message,
                    },
                  },
                  // Subtext
                  {
                    type: 'div',
                    props: {
                      style: {
                        fontSize: '26px',
                        color: '#A8B2BE',
                      },
                      children: subtext,
                    },
                  },
                ],
              },
            },
            // Footer
            {
              type: 'div',
              props: {
                style: {
                  position: 'absolute',
                  bottom: '40px',
                  fontSize: '22px',
                  color: '#A8B2BE',
                  letterSpacing: '1px',
                },
                children: 'hockeyiq.netlify.app',
              },
            },
          ],
        },
      },
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Bebas Neue',
            data: bebasNeue,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Work Sans',
            data: workSans,
            weight: 700,
            style: 'normal',
          },
        ],
      }
    );

    // Initialize WASM if needed
    if (!wasmInitialized) {
      await initWasm(fetch('https://unpkg.com/@aspect-dev/resvg-wasm/resvg.wasm'));
      wasmInitialized = true;
    }

    // Convert SVG to PNG
    const resvg = new Resvg(svg, {
      fitTo: {
        mode: 'width',
        value: 1200,
      },
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    return new Response(pngBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error generating OG image:', error);
    
    // Fallback: Return a simple SVG as PNG placeholder
    const fallbackSvg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#0A1628"/>
        <rect width="100%" height="8" fill="#C8102E"/>
        <text x="600" y="280" text-anchor="middle" fill="white" font-size="72" font-family="sans-serif">PUCK ACADEMY</text>
        <text x="600" y="380" text-anchor="middle" fill="#A8B2BE" font-size="36" font-family="sans-serif">${message}</text>
        <text x="600" y="590" text-anchor="middle" fill="#A8B2BE" font-size="22" font-family="sans-serif">hockeyiq.netlify.app</text>
      </svg>
    `;
    
    return new Response(fallbackSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
}

export const config = { path: "/og-image" };
