import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Store in .env file

export async function PATCH(req: NextRequest): Promise<NextResponse> {
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

    // 🔹 Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 🔹 Check if user has completed onboarding
    const existingDetails = await prisma.userDetails.findUnique({ where: { userId } });
    if (!existingDetails) {
      return NextResponse.json({ error: "Onboarding not completed yet" }, { status: 400 });
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      return NextResponse.json({ error: "Invalid phone number. Must be 10 digits" }, { status: 400 });
    }

    if (subjects && (!Array.isArray(subjects) || subjects.some(sub => typeof sub !== "string"))) {
      return NextResponse.json({ error: "Subjects must be an array of strings" }, { status: 400 });
    }

    // 🔹 Update user details
    const updatedDetails = await prisma.userDetails.update({
      where: { userId },
      data: {
        age: age ?? existingDetails.age,
        phone: phone ?? existingDetails.phone,
        address: address ?? existingDetails.address,
        subjects: subjects ?? existingDetails.subjects,
        bio: bio ?? existingDetails.bio,
        website: website ?? existingDetails.website
      },
    });

    return NextResponse.json({
      message: "User details updated successfully",
      userDetails: updatedDetails,
    }, { status: 200 });

  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
