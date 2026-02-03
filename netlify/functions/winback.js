const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * Win-back - Re-engage users who were active but haven't returned in 7+ days
 * Runs daily at 1pm ET (6pm UTC) - different time than other emails
 */
exports.handler = async (event) => {
  // Check for required environment variables
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Email service not configured' })
    };
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Supabase credentials not configured');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Database not configured' })
    };
  }

  console.log('Running Win-back job...');

  try {
    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    const now = new Date();

    // 7 days ago
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setUTCDate(sevenDaysAgo.getUTCDate() - 7);
    sevenDaysAgo.setUTCHours(0, 0, 0, 0);

    // 8 days ago (so we only catch users at exactly 7 days, not repeatedly)
    const eightDaysAgo = new Date(now);
    eightDaysAgo.setUTCDate(eightDaysAgo.getUTCDate() - 8);
    eightDaysAgo.setUTCHours(0, 0, 0, 0);

    console.log(`Looking for users whose last activity was between ${eightDaysAgo.toISOString()} and ${sevenDaysAgo.toISOString()}`);

    // Find users whose last activity was exactly 7 days ago
    // First, get all users with their most recent progress
    const { data: allProgress, error: progressError } = await supabase
      .from('progress')
      .select('user_id, completed_at')
      .order('completed_at', { ascending: false });

    if (progressError) {
      console.error('Error querying progress:', progressError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to query progress', details: progressError })
      };
    }

    // Group by user and find their last activity
    const userLastActivity = {};
    allProgress?.forEach(p => {
      if (!userLastActivity[p.user_id]) {
        userLastActivity[p.user_id] = new Date(p.completed_at);
      }
    });

    // Find users whose last activity was between 7-8 days ago
    const usersToWinback = Object.entries(userLastActivity)
      .filter(([userId, lastDate]) => {
        return lastDate >= eightDaysAgo && lastDate < sevenDaysAgo;
      })
      .map(([userId]) => userId);

    console.log(`Found ${usersToWinback.length} users inactive for 7 days`);

    if (usersToWinback.length === 0) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: true,
          message: 'No users to win back',
          checked: 0,
          emailsSent: 0
        })
      };
    }

    // Get user details
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('id, email, name, streak')
      .in('id', usersToWinback);

    if (usersError) {
      console.error('Error querying profiles:', usersError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to query profiles', details: usersError })
      };
    }

    const results = [];
    let emailsSent = 0;

    for (const user of users) {
      if (!user.email) {
        console.log(`Skipping user ${user.id}: no email found`);
        continue;
      }

      const firstName = user.name?.split(' ')[0] || 'there';

      // Check if they had a streak (adds urgency)
      let streakCount = 0;
      try {
        const streakData = typeof user.streak === 'string'
          ? JSON.parse(user.streak)
          : user.streak;
        streakCount = streakData?.bestStreak || 0;
      } catch {}

      const hadStreak = streakCount >= 3;
      const subject = hadStreak
        ? `Your ${streakCount}-day streak is waiting`
        : 'We saved your spot';

      const streakMessage = hadStreak
        ? `<p style="font-size: 16px; color: #333;">You built a <strong>${streakCount}-day streak</strong> before. You can do it again.</p>`
        : `<p style="font-size: 16px; color: #333;">Your progress is still saved. Jump back in — it only takes 2 minutes.</p>`;

      const emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          <p style="font-size: 16px; color: #333;">Hey ${firstName},</p>

          <p style="font-size: 16px; color: #333;">It's been a week since you trained. Life happens — but your hockey IQ won't build itself.</p>

          ${streakMessage}

          <a href="https://hockeyiq.netlify.app/training.html?utm_source=email&utm_campaign=winback_7day"
             style="display: inline-block; background: #C8102E; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0;">
            Get Back on the Ice →
          </a>

          <p style="font-size: 14px; color: #666; margin-top: 30px;">
            — Coach<br>
            <span style="color: #999;">Puck Academy</span>
          </p>

          <p style="font-size: 12px; color: #999; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
            Don't want training reminders? <a href="https://hockeyiq.netlify.app/unsubscribe?email=${encodeURIComponent(user.email)}" style="color: #999;">Unsubscribe</a>
          </p>
        </div>
      `;

      const streakTextMessage = hadStreak
        ? `You built a ${streakCount}-day streak before. You can do it again.`
        : `Your progress is still saved. Jump back in — it only takes 2 minutes.`;

      const emailText = `
Hey ${firstName},

It's been a week since you trained. Life happens — but your hockey IQ won't build itself.

${streakTextMessage}

Get Back on the Ice: https://hockeyiq.netlify.app/training.html?utm_source=email&utm_campaign=winback_7day

— Coach
Puck Academy
      `.trim();

      try {
        const { data, error } = await resend.emails.send({
          from: 'Coach <coach@puckacademy.com>',
          to: user.email,
          subject,
          html: emailHtml,
          text: emailText
        });

        if (error) {
          console.error(`Failed to send email to ${user.email}:`, error);
          results.push({ email: user.email, success: false, error: error.message });
        } else {
          emailsSent++;
          console.log(`Sent win-back to ${user.email} (hadStreak: ${hadStreak})`);
          results.push({ email: user.email, success: true, emailId: data.id, hadStreak });
        }
      } catch (sendError) {
        console.error(`Error sending to ${user.email}:`, sendError);
        results.push({ email: user.email, success: false, error: sendError.message });
      }
    }

    console.log(`Win-back complete: sent ${emailsSent}/${usersToWinback.length} emails`);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: `Win-back complete`,
        checked: usersToWinback.length,
        emailsSent,
        results
      })
    };

  } catch (error) {
    console.error('Win-back error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to process win-back',
        details: error.message
      })
    };
  }
};
