import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getUserFromToken } from "@/utils/auth/getUserFromToken";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");
    console.log('id', id)

    // ✅ Validate note ID format
    if (!id) {
      return NextResponse.json({ error: "Note ID is required" }, { status: 400 });
    }
    console.log("id" , id);
    // ✅ Fetch the note
    const note = await prisma.note.findUnique({ where: { id } });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    // ✅ Ensure the note belongs to the user
    if (note.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    return NextResponse.json({ note }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching note:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
