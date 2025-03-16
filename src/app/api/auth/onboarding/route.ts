import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Secure your secret in env file

export async function POST(req: Request): Promise<NextResponse> {
  try {
    // 🔹 Get token from headers
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
    }

    // 🔹 Extract token
    const token = authHeader.split(" ")[1];

    // 🔹 Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }

    const { userId } = decoded as { userId: string };

    // 🔹 Parse request body
    const { age, phone, address, subjects, bio, website } = await req.json();

    // 🔹 Validate fields
    if (!age || !phone || !address || !subjects || !Array.isArray(subjects)) {
      return NextResponse.json({ error: "All fields are required and subjects must be an array" }, { status: 400 });
    }

    // 🔹 Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 🔹 Check if user already completed onboarding
    const existingDetails = await prisma.userDetails.findUnique({ where: { userId } });
    if (existingDetails) {
      return NextResponse.json({ error: "Onboarding already completed" }, { status: 409 });
    }
    // 🔹 Save user details
    const userDetails = await prisma.userDetails.create({
      data: { userId, age, phone, address, subjects, bio, website },
    });

    return NextResponse.json({
      message: "Onboarding successful",
      userDetails
    }, { status: 201 });

  } catch (error) {
    console.error("Onboarding Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
