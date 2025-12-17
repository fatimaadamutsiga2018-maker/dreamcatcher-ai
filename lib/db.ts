import { neon } from "@neondatabase/serverless"

// Create a SQL client using the DATABASE_URL or POSTGRES_URL environment variable
export const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL || "")

// Type definitions for database tables
export interface User {
  id: string
  email: string
  name: string
  created_at: Date
  updated_at: Date
}

export interface Contact {
  id: string
  user_id: string
  name: string
  relationship: string
  birthday: Date | null
  anniversary: Date | null
  notes: string | null
  created_at: Date
  updated_at: Date
}

export interface Card {
  id: string
  user_id: string
  contact_id: string | null
  title: string
  message: string
  occasion: string
  tone: string | null
  design: string
  status: "draft" | "sent" | "archived"
  sent_at: Date | null
  created_at: Date
  updated_at: Date
}

export interface Reminder {
  id: string
  user_id: string
  contact_id: string
  occasion: string
  reminder_date: Date
  reminder_sent: boolean
  priority: "low" | "medium" | "high"
  notes: string | null
  created_at: Date
  updated_at: Date
}

export interface Activity {
  id: string
  user_id: string
  contact_id: string | null
  card_id: string | null
  activity_type: string
  activity_date: Date
  created_at: Date
}

// Helper functions for common queries
export async function getContacts(userId: string): Promise<Contact[]> {
  return await sql`
    SELECT * FROM contacts 
    WHERE user_id = ${userId} 
    ORDER BY name ASC
  `
}

export async function getCards(userId: string): Promise<Card[]> {
  return await sql`
    SELECT * FROM cards 
    WHERE user_id = ${userId} 
    ORDER BY created_at DESC
  `
}

export async function getReminders(userId: string): Promise<Reminder[]> {
  return await sql`
    SELECT r.*, c.name as contact_name
    FROM reminders r
    JOIN contacts c ON r.contact_id = c.id
    WHERE r.user_id = ${userId}
    AND r.reminder_date >= CURRENT_DATE
    AND r.reminder_sent = FALSE
    ORDER BY r.reminder_date ASC
  `
}

export async function getActivitiesByDateRange(userId: string, startDate: Date, endDate: Date): Promise<Activity[]> {
  return await sql`
    SELECT * FROM activities
    WHERE user_id = ${userId}
    AND activity_date BETWEEN ${startDate.toISOString()} AND ${endDate.toISOString()}
    ORDER BY activity_date DESC
  `
}
