import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { name, email, password } = await req.json();

    // 🔹 Validate input fields
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // 🔹 Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email is already registered" }, { status: 409 });
    }

    // 🔹 Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 Create new user
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    // 🔹 Generate JWT Token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔹 Return success response
    return NextResponse.json({
      message: "User registered successfully",
      token,
      user: { id: user.id, name: user.name, email: user.email }
    }, { status: 201 });

  } catch (error) {
    console.error("Sign-up Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}