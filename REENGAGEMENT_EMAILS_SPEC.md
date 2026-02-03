# Re-engagement Emails Spec

**Goal:** Bring back users who've dropped off at key moments.
**Stack:** Netlify Scheduled Functions + Supabase + Resend

---

## Email #1: Day 2 Nudge

**Purpose:** Catch users who signed up but didn't return the next day. This is the biggest drop-off point.

### Function: `netlify/functions/day2-nudge.js`

```javascript
const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  console.log('Running Day 2 Nudge job...');

  try {
    // Get yesterday's date range (UTC)
    const now = new Date();
    const yesterdayStart = new Date(now);
    yesterdayStart.setUTCDate(yesterdayStart.getUTCDate() - 1);
    yesterdayStart.setUTCHours(0, 0, 0, 0);

    const yesterdayEnd = new Date(yesterdayStart);
    yesterdayEnd.setUTCHours(23, 59, 59, 999);

    // Find users who signed up yesterday
    const { data: newUsers, error: usersError } = await supabase
      .from('profiles')
      .select('id, email, name')
      .gte('created_at', yesterdayStart.toISOString())
      .lte('created_at', yesterdayEnd.toISOString());

    if (usersError) throw usersError;

    console.log(`Found ${newUsers?.length || 0} users who signed up yesterday`);

    if (!newUsers || newUsers.length === 0) {
      return { statusCode: 200, body: 'No users to nudge' };
    }

    // Get today's date range
    const todayStart = new Date(now);
    todayStart.setUTCHours(0, 0, 0, 0);

    let emailsSent = 0;

    for (const user of newUsers) {
      // Check if they've been active today
      const { data: todayProgress, error: progressError } = await supabase
        .from('progress')
        .select('id')
        .eq('user_id', user.id)
        .gte('completed_at', todayStart.toISOString())
        .limit(1);

      if (progressError) {
        console.error(`Error checking progress for ${user.email}:`, progressError);
        continue;
      }

      // If they haven't done anything today, send nudge
      if (!todayProgress || todayProgress.length === 0) {
        const firstName = user.name?.split(' ')[0] || 'there';

        try {
          await resend.emails.send({
            from: 'Coach <coach@puckacademy.com>',
            to: user.email,
            subject: 'Ready for your next scenario?',
            html: `
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
            `
          });

          emailsSent++;
          console.log(`Sent Day 2 nudge to ${user.email}`);
        } catch (emailError) {
          console.error(`Failed to send to ${user.email}:`, emailError);
        }
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Day 2 nudge complete`,
        checked: newUsers.length,
        emailsSent
      })
    };

  } catch (error) {
    console.error('Day 2 Nudge error:', error);
    return { statusCode: 500, body: error.message };
  }
};
```

### Schedule

Add to `netlify.toml`:

```toml
[functions."day2-nudge"]
schedule = "0 23 * * *"  # 6pm ET (11pm UTC)
```

---

## Email #2: Win-back (7-Day Inactive)

**Purpose:** Re-engage users who were active but haven't returned in 7+ days.

### Function: `netlify/functions/winback.js`

```javascript
const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  console.log('Running Win-back job...');

  try {
    const now = new Date();

    // 7 days ago
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setUTCDate(sevenDaysAgo.getUTCDate() - 7);
    sevenDaysAgo.setUTCHours(0, 0, 0, 0);

    // 8 days ago (so we only catch users at exactly 7 days, not repeatedly)
    const eightDaysAgo = new Date(now);
    eightDaysAgo.setUTCDate(eightDaysAgo.getUTCDate() - 8);
    eightDaysAgo.setUTCHours(0, 0, 0, 0);

    // Find users whose last activity was exactly 7 days ago
    // First, get all users with their most recent progress
    const { data: allProgress, error: progressError } = await supabase
      .from('progress')
      .select('user_id, completed_at')
      .order('completed_at', { ascending: false });

    if (progressError) throw progressError;

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
      return { statusCode: 200, body: 'No users to win back' };
    }

    // Get user details
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('id, email, name, streak')
      .in('id', usersToWinback);

    if (usersError) throw usersError;

    let emailsSent = 0;

    for (const user of users) {
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

      try {
        await resend.emails.send({
          from: 'Coach <coach@puckacademy.com>',
          to: user.email,
          subject: hadStreak
            ? `Your ${streakCount}-day streak is waiting`
            : 'We saved your spot',
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
              <p style="font-size: 16px; color: #333;">Hey ${firstName},</p>

              <p style="font-size: 16px; color: #333;">It's been a week since you trained. Life happens — but your hockey IQ won't build itself.</p>

              ${hadStreak ? `
                <p style="font-size: 16px; color: #333;">You built a <strong>${streakCount}-day streak</strong> before. You can do it again.</p>
              ` : `
                <p style="font-size: 16px; color: #333;">Your progress is still saved. Jump back in — it only takes 2 minutes.</p>
              `}

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
          `
        });

        emailsSent++;
        console.log(`Sent win-back to ${user.email}`);
      } catch (emailError) {
        console.error(`Failed to send to ${user.email}:`, emailError);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Win-back complete`,
        checked: usersToWinback.length,
        emailsSent
      })
    };

  } catch (error) {
    console.error('Win-back error:', error);
    return { statusCode: 500, body: error.message };
  }
};
```

### Schedule

Add to `netlify.toml`:

```toml
[functions."winback"]
schedule = "0 18 * * *"  # 1pm ET (6pm UTC) - different time than other emails
```

---

## Summary: Email Cadence

| Email | Trigger | Time | Subject |
|-------|---------|------|---------|
| **Streak-at-Risk** | Has 2+ streak, didn't train today | 10am ET | "🔥 Your X-day streak is at risk!" |
| **Day 2 Nudge** | Signed up yesterday, no activity today | 6pm ET | "Ready for your next scenario?" |
| **Win-back** | Last active exactly 7 days ago | 1pm ET | "We saved your spot" / "Your X-day streak is waiting" |

---

## Testing

1. Create test user in Supabase with `created_at` set to yesterday
2. Run function locally: `netlify functions:invoke day2-nudge`
3. Check Resend dashboard for sent email
4. Repeat for win-back with user whose last progress was 7 days ago

---

## Optional: Unsubscribe Page

The emails link to `/unsubscribe?email=X`. You'll need a simple page that:
1. Shows "You've been unsubscribed" message
2. Adds `email_unsubscribed: true` to their Supabase profile
3. All email functions check this flag before sending

Can add this later — for now, emails will just go out.
