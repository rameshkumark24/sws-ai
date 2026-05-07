/**
 * JSON storage utility for documents metadata persistence.
 */

import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { ensureDirectory } from "./fileStorage";
import type { DocumentMetadata } from "@/types";

const PROJECT_ROOT = process.cwd();
const DATA_DIR = join(PROJECT_ROOT, "data");
const DOCUMENTS_FILE = join(DATA_DIR, "documents.json");

export async function readDocuments(): Promise<DocumentMetadata[]> {
  try {
    const raw = await readFile(DOCUMENTS_FILE, "utf-8");
    const parsed = JSON.parse(raw) as DocumentMetadata[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeDocuments(
  docs: DocumentMetadata[]
): Promise<void> {
  await ensureDirectory(DATA_DIR);
  await writeFile(DOCUMENTS_FILE, JSON.stringify(docs, null, 2), "utf-8");
}

export async function findDocumentById(
  id: string
): Promise<DocumentMetadata | undefined> {
  const docs = await readDocuments();
  return docs.find((d) => d.id === id);
}

export async function addDocument(
  doc: DocumentMetadata
): Promise<DocumentMetadata> {
  const docs = await readDocuments();
  docs.push(doc);
  await writeDocuments(docs);
  return doc;
}
