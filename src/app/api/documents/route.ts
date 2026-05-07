import { NextResponse } from "next/server";
import { readDocuments } from "@/lib/jsonStorage";

export async function GET() {
  try {
    const documents = await readDocuments();
    return NextResponse.json(documents, { status: 200 });
  } catch (error) {
    console.error("Documents fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}
