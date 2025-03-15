import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getUserFromToken } from "@/utils/auth/getUserFromToken";

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const subject = searchParams.get("subject");

    // ✅ Validate subject (optional, but must be from user’s selected subjects)
    if (subject && !user.details?.subjects.includes(subject)) {
      return NextResponse.json({ error: "Invalid subject" }, { status: 400 });
    }

    // ✅ Fetch notes (filtered by subject if provided)
    const notes = await prisma.note.findMany({
      where: { userId: user.id, ...(subject ? { subject } : {}) },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching notes:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}