import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/mail";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (name.trim().length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = crypto.randomBytes(32).toString("hex");
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires: new Date(Date.now() + 3600 * 1000), // 1 hour
      },
    });

    await sendVerificationEmail(email, token);

    return NextResponse.json({ success: "Confirmation email sent!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
