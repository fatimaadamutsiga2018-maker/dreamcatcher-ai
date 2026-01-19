import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

// Welcome gift: 20 Energy for new users
const WELCOME_ENERGY = 20;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with welcome energy
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        energyBalance: WELCOME_ENERGY, // Welcome gift!
      },
    });

    // Record welcome energy in history
    await prisma.energyHistory.create({
      data: {
        userId: user.id,
        amount: WELCOME_ENERGY,
        type: 'welcome',
        description: 'Welcome to Dreamcatcher! Your first 20 Energy to explore.',
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        userId: user.id,
        welcomeEnergy: WELCOME_ENERGY,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
