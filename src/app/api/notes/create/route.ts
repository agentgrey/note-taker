import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { z } from "zod";
import { getUserFromToken } from "@/utils/auth/getUserFromToken";

// ✅ Validation Schema
const noteSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
  subject: z.string().min(1, "Subject is required"),
});

export async function POST(req: NextRequest) {
  try {
    // ✅ Parse request body
    const body = await req.json();
    const validation = noteSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors }, { status: 400 });
    }

    const { title, content, subject } = validation.data;

    // ✅ Authenticate User
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    // // ✅ Ensure user has selected this subject
    // if (!user.subjects.includes(subject)) {
    //   return NextResponse.json({ error: `Invalid subject: '${subject}'. Please select a valid subject.` }, { status: 400 });
    // }
    const email = "johndoe@example1.com";
    const users = await prisma.user.findUnique({
      where: { email },
      include: {
        details: true, // Include user details in the response
      },
    });
    
    // ✅ Create the note
    const note = await prisma.note.create({
      data: {
        title,
        content,
        subject,
        userId: user.id,
      },
    });

    return NextResponse.json(
      { message: "Note created successfully", note },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Create Note Error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
