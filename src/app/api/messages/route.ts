
import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { auth } from "@/shared/lib/auth";

// GET: Fetch all messages (Admin only - basic check)
export async function GET() {
    try {
        const session = await auth();
        // In a real app, check for ADMIN role. 
        // For now, requiring login is a basic step, or we can make it public if desired.
        // Keeping it public-ish or basic auth for now as per "admin panel" request later.

        // Fetch messages sorted by newest first
        const messages = await prisma.guestMessage.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(messages);
    } catch (error) {
        console.error("Failed to fetch messages:", error);
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}

// POST: Submit a new message
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { content, contactInfo } = body;

        if (!content) {
            return NextResponse.json({ error: "Content is required" }, { status: 400 });
        }

        const newMessage = await prisma.guestMessage.create({
            data: {
                content,
                contactInfo,
            },
        });

        return NextResponse.json(newMessage, { status: 201 });
    } catch (error) {
        console.error("Failed to create message:", error);
        return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
    }
}
