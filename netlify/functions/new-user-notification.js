const { Resend } = require('resend');

exports.handler = async (event) => {
    // Only allow POST (webhook calls)
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    // Check for API key
    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY not configured');
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Email service not configured' })
        };
    }

    // Optional: Verify webhook secret to prevent unauthorized calls
    const webhookSecret = process.env.SUPABASE_WEBHOOK_SECRET;
    if (webhookSecret) {
        const providedSecret = event.headers['x-webhook-secret'] || event.headers['X-Webhook-Secret'];
        if (providedSecret !== webhookSecret) {
            console.error('Invalid webhook secret');
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Unauthorized' })
            };
        }
    }

    try {
        const payload = JSON.parse(event.body);

        // Supabase webhooks send: { type, table, record, schema, old_record }
        const { type, record } = payload;

        // Only process INSERT events
        if (type !== 'INSERT') {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Ignored non-INSERT event' })
            };
        }

        // Extract user info from the profile record
        const {
            email,
            first_name,
            position,
            level,
            birth_year,
            created_at
        } = record;

        // Calculate age if birth_year exists
        const age = birth_year ? new Date().getFullYear() - birth_year : null;

        // Format the signup time
        const signupTime = created_at
            ? new Date(created_at).toLocaleString('en-US', {
                timeZone: 'America/New_York',
                dateStyle: 'medium',
                timeStyle: 'short'
              })
            : 'Unknown';

        // Build email content
        const resend = new Resend(process.env.RESEND_API_KEY);

        const emailHtml = `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #0A1628; margin-bottom: 20px;">🏒 New Puck Academy Signup!</h2>

                <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #666; width: 100px;">Email:</td>
                            <td style="padding: 8px 0; font-weight: 600;">${email || 'Not provided'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #666;">Name:</td>
                            <td style="padding: 8px 0; font-weight: 600;">${first_name || 'Not provided'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #666;">Position:</td>
                            <td style="padding: 8px 0; font-weight: 600;">${position || 'Not selected'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #666;">Level:</td>
                            <td style="padding: 8px 0; font-weight: 600;">${level || 'Not selected'}</td>
                        </tr>
                        ${age ? `
                        <tr>
                            <td style="padding: 8px 0; color: #666;">Age:</td>
                            <td style="padding: 8px 0; font-weight: 600;">${age} years old</td>
                        </tr>
                        ` : ''}
                        <tr>
                            <td style="padding: 8px 0; color: #666;">Signed up:</td>
                            <td style="padding: 8px 0; font-weight: 600;">${signupTime}</td>
                        </tr>
                    </table>
                </div>

                <p style="color: #666; font-size: 14px; margin-top: 20px;">
                    <a href="https://hockeyiq.netlify.app/admin.html" style="color: #C8102E;">View Admin Dashboard →</a>
                </p>
            </div>
        `;

        const emailText = `
New Puck Academy Signup!

Email: ${email || 'Not provided'}
Name: ${first_name || 'Not provided'}
Position: ${position || 'Not selected'}
Level: ${level || 'Not selected'}
${age ? `Age: ${age} years old` : ''}
Signed up: ${signupTime}

View dashboard: https://hockeyiq.netlify.app/admin.html
        `.trim();

        // Send the email
        const { data, error } = await resend.emails.send({
            from: 'Puck Academy <notifications@resend.dev>', // Use your verified domain later
            to: process.env.NOTIFICATION_EMAIL || 'jjacobs22@gmail.com',
            subject: `🏒 New signup: ${first_name || email || 'Unknown user'}`,
            html: emailHtml,
            text: emailText
        });

        if (error) {
            console.error('Resend error:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Failed to send email', details: error })
            };
        }

        console.log('Notification sent:', data);
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                success: true,
                message: 'Notification sent',
                emailId: data.id
            })
        };

    } catch (error) {
        console.error('Notification error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to process webhook',
                details: error.message
            })
        };
    }
};
