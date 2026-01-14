/**
 * Email Service
 * Uses SendGrid to send emails containing NSDR audio links
 */

interface SendNSDREmailParams {
  to: string;
  audioUrl: string;
  scriptText?: string;
}

export async function sendNSDREmail(params: SendNSDREmailParams): Promise<boolean> {
  const { to, audioUrl, scriptText } = params;

  // TODO: Use SendGrid API to send email
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SendGrid API Key not configured, skipping email send');
    return false;
  }

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: to }],
            subject: 'Your Personalized NSDR Recovery Session is Ready',
          },
        ],
        from: {
          email: process.env.SENDGRID_FROM_EMAIL || 'noreply@airest.com',
          name: 'AI Rest',
        },
        content: [
          {
            type: 'text/html',
            value: generateEmailTemplate(audioUrl, scriptText),
          },
        ],
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

function generateEmailTemplate(audioUrl: string, scriptText?: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0;">AI Rest</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Your Personalized NSDR Session is Ready</p>
      </div>
      
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <p>Hello,</p>
        <p>Thank you for registering with AI Rest! Your personalized NSDR (Non-Sleep Deep Rest) session has been generated.</p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h2 style="color: #667eea; margin-top: 0;">🎧 Start Your 12-Minute Recovery Journey</h2>
          <p>Please find a quiet and comfortable place, and get ready to begin your deep recovery experience.</p>
          <a href="${audioUrl}" style="display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold;">
            Play NSDR Session
          </a>
        </div>
        
        ${scriptText ? `
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #667eea; margin-top: 0;">📝 Session Script</h3>
          <p style="white-space: pre-wrap; color: #666;">${scriptText}</p>
        </div>
        ` : ''}
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="margin: 0;"><strong>After your experience, please remember:</strong></p>
          <ul style="margin: 10px 0;">
            <li>Fill out the feedback form to help us improve the service</li>
            <li>If you're willing, you can schedule a deep interview</li>
            <li>Upgrade to the paid version to unlock more personalized features</li>
          </ul>
          <p style="text-align: center; margin-top: 20px;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://airest.com'}/feedback" style="color: #667eea; text-decoration: none;">Fill Out Feedback →</a>
          </p>
        </div>
        
        <p style="margin-top: 30px; color: #999; font-size: 12px;">
          Wishing you a peaceful recovery!<br>
          The AI Rest Team
        </p>
      </div>
    </body>
    </html>
  `;
}
