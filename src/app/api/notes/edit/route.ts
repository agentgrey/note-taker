import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getUserFromToken } from "@/utils/auth/getUserFromToken";

export async function PATCH(req: NextRequest) {
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

    const body = await req.json();
    const { title, content } = body;

    if (!title && !content) {
      return NextResponse.json({ error: "At least one field (title or content) is required" }, { status: 400 });
    }

    const existingNote = await prisma.note.findUnique({ where: { id } });

    if (!existingNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    if (existingNote.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: { 
        title: title || existingNote.title,
        content: content || existingNote.content,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ message: "Note updated successfully", note: updatedNote }, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating note:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

