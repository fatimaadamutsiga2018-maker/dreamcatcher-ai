/**
 * NSDR Script Generator
 * Uses GPT-4 or other LLM to generate personalized NSDR guidance scripts
 */

interface GenerateNSDRScriptParams {
  email: string;
  userContext?: {
    fatigueLevel?: number;
    focusLevel?: number;
    preferences?: string[];
  };
}

export async function generateNSDRScript(params: GenerateNSDRScriptParams): Promise<string> {
  const { email, userContext } = params;

  // TODO: Call OpenAI GPT-4 API
  // If API Key is not configured, return fixed script (free experience)
  if (!process.env.OPENAI_API_KEY) {
    return getDefaultNSDRScript();
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a professional NSDR (Non-Sleep Deep Rest) guidance expert. Generate a 10-12 minute personalized guidance script to help users:
1. Slow down their thinking
2. Deeply relax their body
3. Restore mental state

The script should:
- Have a gentle, calm tone
- Include specific body scan guidance
- Guide deep breathing and relaxation
- Use specific scene imagery
- Be suitable for mentally exhausted people who can't stop thinking`,
          },
          {
            role: 'user',
            content: `Please generate a personalized NSDR guidance script for the following user:
User email: ${email}
${userContext?.fatigueLevel ? `Fatigue level: ${userContext.fatigueLevel}/10` : ''}
${userContext?.focusLevel ? `Focus level: ${userContext.focusLevel}/10` : ''}
${userContext?.preferences ? `Preferences: ${userContext.preferences.join(', ')}` : ''}

Please generate a complete guidance script (approximately 800-1000 words).`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    const data = await response.json();
    return data.choices[0]?.message?.content || getDefaultNSDRScript();
  } catch (error) {
    console.error('Failed to generate NSDR script:', error);
    return getDefaultNSDRScript();
  }
}

function getDefaultNSDRScript(): string {
  return `Welcome to AI Rest NSDR session. Please find a quiet and comfortable place, sit or lie down.

Close your eyes and begin to breathe deeply. Inhale... Exhale... Let each breath become deeper and more relaxed.

Now, bring your attention to your body. Starting from the top of your head, slowly scan down through your body. Feel each part relaxing.

Imagine you are lying on a peaceful meadow, the sky is clear blue, and a gentle breeze is blowing. Your thoughts gradually slow down, like clouds drifting slowly across the sky.

Continue to breathe deeply, letting your body completely relax. Every muscle is releasing tension, every nerve is calming down.

You don't need to do anything. Just follow this voice and let yourself fully immerse in a state of deep relaxation.

Feel this sense of peace and recovery. This is your moment, completely your time for recovery.

Continue to relax until you hear the closing prompt.`;
}
