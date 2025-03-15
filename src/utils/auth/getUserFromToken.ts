import jwt from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function getUserFromToken(req: NextRequest) {
  try {
    // ✅ Extract the Authorization header
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("❌ No or invalid Authorization header provided");
      return null;
    }

    // ✅ Get the token from the header
    const token = authHeader.split(" ")[1];

    // ✅ Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };

    if (!decoded?.userId) {
      console.error("❌ Invalid token payload");
      return null;
    }

    // ✅ Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        details: true, // Fetch additional user details if needed
      },
    });

    if (!user) {
      console.error("❌ User not found for token");
      return null;
    }

    return user;
  } catch (error: any) {
    console.error("❌ Token Verification Error:", error.message);
    return null; // Return null if token is invalid or expired
  }
}