import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getUserFromToken } from "@/utils/auth/getUserFromToken";

export async function DELETE(req: NextRequest) {
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Note ID is required" }, { status: 400 });
    }

    // ✅ Check if the note exists
    const note = await prisma.note.findUnique({ where: { id } });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    // ✅ Ensure the note belongs to the user
    if (note.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // ✅ Delete the note
    await prisma.note.delete({ where: { id } });

    return NextResponse.json({ message: "Note deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("❌ Error deleting note:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}