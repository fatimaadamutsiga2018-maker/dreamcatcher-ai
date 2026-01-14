import { NextRequest, NextResponse } from 'next/server';
import { generateNSDRScript } from '@/lib/nsdr-generator';
import { textToSpeech } from '@/lib/tts-service';
import { sendNSDREmail } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // TODO: Save user to database

    // Trigger workflow (async execution, non-blocking)
    processNSDRWorkflow(email).catch(error => {
      console.error('NSDR workflow execution failed:', error);
      // TODO: Log error to monitoring system or send alert
    });

    // Return success response immediately (better UX)
    return NextResponse.json(
      { 
        success: true,
        message: 'Registration successful. We are generating your personalized NSDR session and will send it to your email within 3 minutes.',
        email 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Server error, please try again later' },
      { status: 500 }
    );
  }
}

/**
 * NSDR Workflow Processing Function
 * 1. Generate NSDR script
 * 2. Convert to speech
 * 3. Send email
 */
async function processNSDRWorkflow(email: string): Promise<void> {
  try {
    // Step 1: Generate NSDR script
    const script = await generateNSDRScript({ email });

    // Step 2: Convert to speech (TTS)
    // Note: Should save audio to cloud storage and get URL
    const audioUrl = await textToSpeech(script) || '/demo-audio.mp3'; // Temporary use demo audio

    // Step 3: Send email
    const emailSent = await sendNSDREmail({
      to: email,
      audioUrl,
      scriptText: script,
    });

    if (emailSent) {
      console.log(`NSDR session successfully sent to ${email}`);
    } else {
      console.warn(`NSDR session send failed: ${email}`);
    }
  } catch (error) {
    console.error(`Error processing NSDR workflow (${email}):`, error);
    throw error;
  }
}
