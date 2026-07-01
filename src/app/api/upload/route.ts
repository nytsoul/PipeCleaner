import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { auth } from "@/auth";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Only image files are allowed (JPEG, PNG, WebP, GIF)" }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File size must be under 5MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `${uniqueSuffix}.${fileExtension}`;

    // Define path in public folder
    const uploadDir = join(process.cwd(), "public", "uploads");
    
    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });

    const filePath = join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${filename}`;
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
