import type { Context } from "https://edge.netlify.com";

export default async function handler(request: Request, context: Context): Promise<Response> {
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
  
  // Replace the OG meta tags in the HTML
  let modifiedHtml = html;
  
  // Replace og:title
  modifiedHtml = modifiedHtml.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${title}">`
  );
  
  // Replace og:description
  modifiedHtml = modifiedHtml.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${description}">`
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
    `<meta name="twitter:title" content="${title}">`
  );
  
  // Replace twitter:description
  modifiedHtml = modifiedHtml.replace(
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${description}">`
  );
  
  // Replace twitter:image
  modifiedHtml = modifiedHtml.replace(
    /<meta name="twitter:image" content="[^"]*">/,
    `<meta name="twitter:image" content="${ogImageUrl}">`
  );

  return new Response(modifiedHtml, {
    headers: {
      ...Object.fromEntries(response.headers),
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

export const config = { path: "/" };
