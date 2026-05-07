import { NextResponse } from "next/server";
import { saveFile, generateUniqueFilename } from "@/lib/fileStorage";
import { addDocument } from "@/lib/jsonStorage";
import type { DocumentMetadata } from "@/types";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const storedFileName = generateUniqueFilename(file.name);
    const storagePath = await saveFile(buffer, storedFileName);

    const doc: DocumentMetadata = {
      id: crypto.randomUUID(),
      originalName: file.name,
      storedFileName,
      fileSize: file.size,
      mimeType: file.type,
      uploadStatus: "completed",
      uploadDate: new Date().toISOString(),
      storagePath,
    };

    await addDocument(doc);

    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
