import { NextResponse } from "next/server";
import { sendPasswordResetEmail } from "@/lib/mail";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Return success even if user not found to prevent email enumeration
      return NextResponse.json({ success: "Reset email sent!" }, { status: 200 });
    }

    const token = crypto.randomBytes(32).toString("hex");
    
    // Delete any existing tokens for this email
    try {
      await prisma.passwordResetToken.deleteMany({
        where: { email },
      });
    } catch (e) {
      // Ignore if none exist
    }

    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expires: new Date(Date.now() + 3600 * 1000), // 1 hour
      },
    });

    await sendPasswordResetEmail(email, token);

    return NextResponse.json({ success: "Reset email sent!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
