const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * Day 2 Nudge - Catch users who signed up but didn't return the next day
 * This is the biggest drop-off point for new users
 * Runs daily at 6pm ET (11pm UTC)
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

  console.log('Running Day 2 Nudge job...');

  try {
    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Get yesterday's date range (UTC)
    const now = new Date();
    const yesterdayStart = new Date(now);
    yesterdayStart.setUTCDate(yesterdayStart.getUTCDate() - 1);
    yesterdayStart.setUTCHours(0, 0, 0, 0);

    const yesterdayEnd = new Date(yesterdayStart);
    yesterdayEnd.setUTCHours(23, 59, 59, 999);

    console.log(`Looking for users who signed up between ${yesterdayStart.toISOString()} and ${yesterdayEnd.toISOString()}`);

    // Find users who signed up yesterday
    const { data: newUsers, error: usersError } = await supabase
      .from('profiles')
      .select('id, email, name')
      .gte('created_at', yesterdayStart.toISOString())
      .lte('created_at', yesterdayEnd.toISOString());

    if (usersError) {
      console.error('Error querying profiles:', usersError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to query profiles', details: usersError })
      };
    }

    console.log(`Found ${newUsers?.length || 0} users who signed up yesterday`);

    if (!newUsers || newUsers.length === 0) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: true,
          message: 'No users to nudge',
          checked: 0,
          emailsSent: 0
        })
      };
    }

    // Get today's date range
    const todayStart = new Date(now);
    todayStart.setUTCHours(0, 0, 0, 0);

    const results = [];
    let emailsSent = 0;

    for (const user of newUsers) {
      if (!user.email) {
        console.log(`Skipping user ${user.id}: no email found`);
        continue;
      }

      // Check if they've been active today
      const { data: todayProgress, error: progressError } = await supabase
        .from('progress')
        .select('id')
        .eq('user_id', user.id)
        .gte('completed_at', todayStart.toISOString())
        .limit(1);

      if (progressError) {
        console.error(`Error checking progress for ${user.email}:`, progressError);
        results.push({ email: user.email, success: false, error: progressError.message });
        continue;
      }

      // If they haven't done anything today, send nudge
      if (!todayProgress || todayProgress.length === 0) {
        const firstName = user.name?.split(' ')[0] || 'there';

        const emailHtml = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
            <p style="font-size: 16px; color: #333;">Hey ${firstName},</p>

            <p style="font-size: 16px; color: #333;">You started your hockey IQ training yesterday. Nice.</p>

            <p style="font-size: 16px; color: #333;">Got 2 minutes? Pick up where you left off:</p>

            <a href="https://hockeyiq.netlify.app/training.html?utm_source=email&utm_campaign=day2_nudge"
               style="display: inline-block; background: #C8102E; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0;">
              Continue Training →
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

        const emailText = `
Hey ${firstName},

You started your hockey IQ training yesterday. Nice.

Got 2 minutes? Pick up where you left off:

Continue Training: https://hockeyiq.netlify.app/training.html?utm_source=email&utm_campaign=day2_nudge

— Coach
Puck Academy
        `.trim();

        try {
          const { data, error } = await resend.emails.send({
            from: 'Coach <coach@puckacademy.com>',
            to: user.email,
            subject: 'Ready for your next scenario?',
            html: emailHtml,
            text: emailText
          });

          if (error) {
            console.error(`Failed to send email to ${user.email}:`, error);
            results.push({ email: user.email, success: false, error: error.message });
          } else {
            emailsSent++;
            console.log(`Sent Day 2 nudge to ${user.email}`);
            results.push({ email: user.email, success: true, emailId: data.id });
          }
        } catch (sendError) {
          console.error(`Error sending to ${user.email}:`, sendError);
          results.push({ email: user.email, success: false, error: sendError.message });
        }
      } else {
        console.log(`Skipping ${user.email}: already active today`);
      }
    }

    console.log(`Day 2 nudge complete: sent ${emailsSent}/${newUsers.length} emails`);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: `Day 2 nudge complete`,
        checked: newUsers.length,
        emailsSent,
        results
      })
    };

  } catch (error) {
    console.error('Day 2 Nudge error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to process day 2 nudge',
        details: error.message
      })
    };
  }
};
