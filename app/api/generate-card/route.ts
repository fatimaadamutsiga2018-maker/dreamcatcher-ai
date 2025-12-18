export const runtime = "nodejs"

interface GenerateCardRequest {
  occasion: string
  recipientName: string
  relationship: string
  tone: string
  additionalContext?: string
}

function getStatusCode(error: unknown): number | undefined {
  if (typeof error !== "object" || error === null) return undefined
  const anyError = error as any
  const status = anyError.status ?? anyError.statusCode ?? anyError.response?.status
  return typeof status === "number" ? status : undefined
}

function isRetryableError(error: unknown) {
  const status = getStatusCode(error)
  if (status === 408 || status === 409 || status === 425 || status === 429) return true
  if (typeof status === "number" && status >= 500) return true

  const message = error instanceof Error ? error.message : String(error)
  return (
    /timeout/i.test(message) ||
    /ECONNRESET/i.test(message) ||
    /ETIMEDOUT/i.test(message) ||
    /EAI_AGAIN/i.test(message) ||
    /fetch failed/i.test(message)
  )
}

async function sleep(ms: number) {
  await new Promise<void>((resolve) => setTimeout(resolve, ms))
}

async function callGenerateTextWithOneRetry(options: Parameters<typeof import("ai").generateText>[0]) {
  const { generateText } = await import("ai")

  try {
    return await generateText({ ...options, maxRetries: 0 })
  } catch (error) {
    if (!isRetryableError(error)) throw error
    await sleep(300)
    return await generateText({ ...options, maxRetries: 0 })
  }
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

    const {
      fallbackTextModel,
      fallbackTextModelId,
      primaryTextModel,
      primaryTextModelId,
    } = await import("@/lib/ai/openrouter")

    const abortSignal = AbortSignal.timeout(12_000)

    // 1) Try primary model (one quick retry on retryable errors)
    let usedModelId = primaryTextModelId
    let textResult: { text: string }
    try {
      textResult = await callGenerateTextWithOneRetry({
        model: primaryTextModel,
        prompt,
        temperature: 0.8,
        maxOutputTokens: 500,
        abortSignal,
      })
    } catch (primaryError) {
      // 2) Fallback to backup model (also one quick retry)
      usedModelId = fallbackTextModelId
      textResult = await callGenerateTextWithOneRetry({
        model: fallbackTextModel,
        prompt,
        temperature: 0.8,
        maxOutputTokens: 500,
        abortSignal,
      })
    }

    // Generate a title based on the occasion
    const titlePrompt = `Create a short, warm greeting card title for a ${occasion} card for ${recipientName}. 
Examples: "Happy Birthday!", "Congratulations!", "With Love and Thanks"
Generate ONLY the title, nothing else.`

    const titleModel = usedModelId === primaryTextModelId ? primaryTextModel : fallbackTextModel
    const titleResult = await callGenerateTextWithOneRetry({
      model: titleModel,
      prompt: titlePrompt,
      temperature: 0.7,
      maxOutputTokens: 40,
      abortSignal,
    })

    return Response.json({
      title: titleResult.text.trim(),
      message: textResult.text.trim(),
      design: "gradient-purple",
      model: usedModelId,
    })
  } catch (error) {
    console.error("[v0] Error generating card:", error)
    return Response.json({ error: "Failed to generate card content" }, { status: 500 })
  }
}
