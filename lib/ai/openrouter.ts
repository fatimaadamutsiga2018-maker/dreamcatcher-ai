import { createOpenAI } from "@ai-sdk/openai"

function buildOpenRouterHeaders(): Record<string, string> | undefined {
  const headers: Record<string, string> = {}

  const referer = process.env.OPENROUTER_SITE_URL
  const title = process.env.OPENROUTER_APP_NAME

  if (referer) headers["HTTP-Referer"] = referer
  if (title) headers["X-Title"] = title

  return Object.keys(headers).length > 0 ? headers : undefined
}

export const openrouter = createOpenAI({
  name: "openrouter",
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL ?? "https://openrouter.ai/api/v1",
  headers: buildOpenRouterHeaders(),
})

export const primaryTextModelId =
  process.env.AI_TEXT_MODEL_PRIMARY ?? "google/gemini-2.0-flash-lite"

export const fallbackTextModelId =
  process.env.AI_TEXT_MODEL_FALLBACK ?? "openai/gpt-4o-mini"

export const primaryTextModel = openrouter.chat(primaryTextModelId as any)
export const fallbackTextModel = openrouter.chat(fallbackTextModelId as any)
