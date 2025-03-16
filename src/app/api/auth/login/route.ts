import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../../lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Store this in .env

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // 🔹 Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        details: true, // Include user details in the response
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // 🔹 Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // 🔹 Generate JWT Token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔹 Return success response with token & user details
    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userDetails: user.details,
      },
    });

  } catch (error) {
    console.error("Sign-in Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}