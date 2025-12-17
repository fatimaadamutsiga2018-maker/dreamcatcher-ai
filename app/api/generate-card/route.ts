import { generateText } from "ai"

export const runtime = "nodejs"

interface GenerateCardRequest {
  occasion: string
  recipientName: string
  relationship: string
  tone: string
  additionalContext?: string
}

export async function POST(request: Request) {
  try {
    const body: GenerateCardRequest = await request.json()
    const { occasion, recipientName, relationship, tone, additionalContext } = body

    // Validate required fields
    if (!occasion || !recipientName || !relationship || !tone) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Build the prompt for AI generation
    const prompt = `You are a professional greeting card writer. Create a heartfelt and personalized greeting card message.

Card Details:
- Occasion: ${occasion}
- Recipient: ${recipientName}
- Relationship: ${relationship}
- Tone: ${tone}
${additionalContext ? `- Additional Context: ${additionalContext}` : ""}

Instructions:
1. Create a warm, personalized greeting card message
2. Match the specified tone (${tone})
3. Make it appropriate for the relationship (${relationship})
4. Keep it authentic and meaningful, not generic
5. Structure: Opening, main message (2-3 paragraphs), closing
6. Length: 150-250 words
7. Use proper formatting with line breaks between paragraphs

Generate ONLY the card message text, starting with the greeting.`

    // Generate the card content using AI
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
      temperature: 0.8,
      maxTokens: 500,
    })

    // Generate a title based on the occasion
    const titlePrompt = `Create a short, warm greeting card title for a ${occasion} card for ${recipientName}. 
Examples: "Happy Birthday!", "Congratulations!", "With Love and Thanks"
Generate ONLY the title, nothing else.`

    const { text: title } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt: titlePrompt,
      temperature: 0.7,
      maxTokens: 20,
    })

    return Response.json({
      title: title.trim(),
      message: text.trim(),
      design: "gradient-purple",
    })
  } catch (error) {
    console.error("[v0] Error generating card:", error)
    return Response.json({ error: "Failed to generate card content" }, { status: 500 })
  }
}
