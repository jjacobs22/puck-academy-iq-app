const { Resend } = require('resend');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role for server-side queries
);

/**
 * Get yesterday's date in ISO format (YYYY-MM-DD)
 */
function getYesterdayISO() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
}

/**
 * Scheduled function to send streak-at-risk reminder emails
 * Runs daily via Netlify scheduled functions
 * 
 * Queries users where:
 * - streak.count >= 2
 * - streak.lastTrainingDate = yesterday
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

    try {
        const yesterday = getYesterdayISO();
        console.log(`Checking for at-risk streaks (lastTrainingDate = ${yesterday})`);

        // Query profiles table for users with at-risk streaks
        // Streak data is synced to profiles.streak JSONB column
        const { data: atRiskUsers, error: profileError } = await supabase
            .from('profiles')
            .select('id, email, name, streak')
            .gte('streak->>count', '2') // streak.count >= 2
            .eq('streak->>lastTrainingDate', yesterday); // streak.lastTrainingDate = yesterday

        if (profileError) {
            console.error('Error querying profiles:', profileError);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Failed to query profiles', details: profileError })
            };
        }

        if (!atRiskUsers || atRiskUsers.length === 0) {
            console.log('No at-risk streaks found');
            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    message: 'No at-risk streaks found',
                    checked: yesterday
                })
            };
        }

        console.log(`Found ${atRiskUsers.length} users with at-risk streaks`);

        // Initialize Resend
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Send reminder emails
        const results = [];
        for (const profile of atRiskUsers) {
            if (!profile.email) {
                console.log(`Skipping user ${profile.id}: no email found`);
                continue;
            }

            const streakData = typeof profile.streak === 'string' ? JSON.parse(profile.streak) : profile.streak;
            const streakCount = streakData?.count || 0;
            const firstName = profile.name?.split(' ')[0] || 'Player';

            const emailHtml = `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #C8102E; margin-bottom: 10px;">🔥 Your ${streakCount}-day streak is at risk!</h2>
                    
                    <p style="color: #0A1628; font-size: 16px; line-height: 1.6;">
                        Hey ${firstName},
                    </p>
                    
                    <p style="color: #0A1628; font-size: 16px; line-height: 1.6;">
                        You've been on fire with <strong>${streakCount} consecutive days</strong> of hockey IQ training. Don't let that streak slip away!
                    </p>
                    
                    <p style="color: #0A1628; font-size: 16px; line-height: 1.6;">
                        Complete just <strong>one scenario today</strong> to keep your streak alive. It only takes a minute.
                    </p>
                    
                    <div style="margin: 30px 0;">
                        <a href="https://hockeyiq.netlify.app/training.html" 
                           style="background: #C8102E; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
                            Keep My Streak Alive →
                        </a>
                    </div>
                    
                    <p style="color: #666; font-size: 14px; margin-top: 30px;">
                        See the ice before everyone else.<br>
                        <strong>— Coach, Puck Academy</strong>
                    </p>
                    
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                    
                    <p style="color: #999; font-size: 12px;">
                        You're receiving this because you have an active training streak on Puck Academy.
                        <a href="https://hockeyiq.netlify.app/" style="color: #999;">Unsubscribe</a>
                    </p>
                </div>
            `;

            const emailText = `
🔥 Your ${streakCount}-day streak is at risk!

Hey ${firstName},

You've been on fire with ${streakCount} consecutive days of hockey IQ training. Don't let that streak slip away!

Complete just one scenario today to keep your streak alive. It only takes a minute.

Keep My Streak Alive: https://hockeyiq.netlify.app/training.html

See the ice before everyone else.
— Coach, Puck Academy
            `.trim();

            try {
                const { data, error } = await resend.emails.send({
                    from: 'Coach <coach@puckacademy.com>',
                    to: profile.email,
                    subject: `🔥 Your ${streakCount}-day streak is at risk!`,
                    html: emailHtml,
                    text: emailText
                });

                if (error) {
                    console.error(`Failed to send email to ${profile.email}:`, error);
                    results.push({ email: profile.email, success: false, error: error.message });
                } else {
                    console.log(`Sent streak reminder to ${profile.email} (streak: ${streakCount})`);
                    results.push({ email: profile.email, success: true, emailId: data.id });
                }
            } catch (sendError) {
                console.error(`Error sending to ${profile.email}:`, sendError);
                results.push({ email: profile.email, success: false, error: sendError.message });
            }
        }

        const successCount = results.filter(r => r.success).length;
        console.log(`Sent ${successCount}/${results.length} streak reminder emails`);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                success: true,
                message: `Sent ${successCount} streak reminder emails`,
                checked: yesterday,
                atRiskUsers: atRiskUsers.length,
                results
            })
        };

    } catch (error) {
        console.error('Streak reminder error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to process streak reminders',
                details: error.message
            })
        };
    }
};
