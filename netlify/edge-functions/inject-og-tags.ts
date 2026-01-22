import type { Context } from "https://edge.netlify.com";

export default async function handler(request: Request, context: Context): Promise<Response> {
  try {
    const url = new URL(request.url);
    const score = url.searchParams.get("score");
    
    // If no score parameter, just pass through the original response
    if (score === null) {
      return context.next();
    }

    const scoreNum = Math.min(5, Math.max(0, parseInt(score) || 0));
    
    // Generate dynamic OG content based on score
    let title = "🏒 Hockey IQ Challenge - Can You Beat My Score?";
    let description = "I'm training my Hockey IQ with Puck Academy. Think you can score higher? Test your defensive zone reads now.";
    
    if (scoreNum === 5) {
      title = "🏆 I Got a Perfect Score on Hockey IQ!";
      description = "I scored 5/5 on the Puck Academy Hockey IQ test. Think you can match my perfect score? Take the challenge!";
    } else if (scoreNum >= 4) {
      title = `🔥 I Scored ${scoreNum}/5 on Hockey IQ!`;
      description = `I got ${scoreNum}/5 on the Puck Academy Hockey IQ test. Can you beat my score? Take the challenge!`;
    } else if (scoreNum >= 2) {
      title = `🏒 I Scored ${scoreNum}/5 on Hockey IQ`;
      description = `I got ${scoreNum}/5 on the Puck Academy Hockey IQ test. Think you can do better? Take the challenge!`;
    } else {
      title = `😬 Can You Beat ${scoreNum}/5 on Hockey IQ?`;
      description = `I got ${scoreNum}/5 on the Puck Academy Hockey IQ test. Should be easy to beat, right? Take the challenge!`;
    }

    // Get the original response
    const response = await context.next();
    const html = await response.text();
    
    // Build the dynamic OG image URL
    const ogImageUrl = `https://hockeyiq.netlify.app/og-image?score=${scoreNum}`;
    const pageUrl = `https://hockeyiq.netlify.app/?score=${scoreNum}`;
    
    // Escape special characters for HTML attributes
    const escapeHtml = (str: string) => str.replace(/"/g, '&quot;');
    
    // Replace the OG meta tags in the HTML
    let modifiedHtml = html;
    
    // Replace og:title
    modifiedHtml = modifiedHtml.replace(
      /<meta property="og:title" content="[^"]*">/,
      `<meta property="og:title" content="${escapeHtml(title)}">`
    );
    
    // Replace og:description
    modifiedHtml = modifiedHtml.replace(
      /<meta property="og:description" content="[^"]*">/,
      `<meta property="og:description" content="${escapeHtml(description)}">`
    );
    
    // Replace og:url
    modifiedHtml = modifiedHtml.replace(
      /<meta property="og:url" content="[^"]*">/,
      `<meta property="og:url" content="${pageUrl}">`
    );
    
    // Replace og:image
    modifiedHtml = modifiedHtml.replace(
      /<meta property="og:image" content="[^"]*">/,
      `<meta property="og:image" content="${ogImageUrl}">`
    );
    
    // Replace twitter:title
    modifiedHtml = modifiedHtml.replace(
      /<meta name="twitter:title" content="[^"]*">/,
      `<meta name="twitter:title" content="${escapeHtml(title)}">`
    );
    
    // Replace twitter:description
    modifiedHtml = modifiedHtml.replace(
      /<meta name="twitter:description" content="[^"]*">/,
      `<meta name="twitter:description" content="${escapeHtml(description)}">`
    );
    
    // Replace twitter:image
    modifiedHtml = modifiedHtml.replace(
      /<meta name="twitter:image" content="[^"]*">/,
      `<meta name="twitter:image" content="${ogImageUrl}">`
    );

    return new Response(modifiedHtml, {
      status: response.status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    // If anything fails, just pass through the original response
    console.error("Error in inject-og-tags:", error);
    return context.next();
  }
}

export const config = { path: "/" };
