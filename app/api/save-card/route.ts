import { sql } from "@/lib/db"

export const runtime = "nodejs"

interface SaveCardRequest {
  userId: string
  contactId?: string
  title: string
  message: string
  occasion: string
  tone: string
  design: string
  status: "draft" | "sent"
}

export async function POST(request: Request) {
  try {
    const body: SaveCardRequest = await request.json()
    const { userId, contactId, title, message, occasion, tone, design, status } = body

    // Validate required fields
    if (!userId || !title || !message || !occasion) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Insert card into database
    const result = await sql`
      INSERT INTO cards (user_id, contact_id, title, message, occasion, tone, design, status, sent_at)
      VALUES (
        ${userId},
        ${contactId || null},
        ${title},
        ${message},
        ${occasion},
        ${tone},
        ${design},
        ${status},
        ${status === "sent" ? new Date().toISOString() : null}
      )
      RETURNING *
    `

    // If card is sent, create an activity record
    if (status === "sent" && result[0]) {
      await sql`
        INSERT INTO activities (user_id, contact_id, card_id, activity_type, activity_date)
        VALUES (
          ${userId},
          ${contactId || null},
          ${result[0].id},
          'card_sent',
          ${new Date().toISOString().split("T")[0]}
        )
      `
    }

    return Response.json({ success: true, card: result[0] })
  } catch (error) {
    console.error("[v0] Error saving card:", error)
    return Response.json({ error: "Failed to save card" }, { status: 500 })
  }
}
