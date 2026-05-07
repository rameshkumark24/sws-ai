/**
 * File storage utilities for local filesystem operations.
 */

import { mkdir, writeFile, access } from "fs/promises";
import { join } from "path";

const PROJECT_ROOT = process.cwd();
export const UPLOADS_DIR = join(PROJECT_ROOT, "uploads");

export async function ensureDirectory(dir: string): Promise<void> {
  try {
    await mkdir(dir, { recursive: true });
  } catch {
    // Directory may already exist
  }
}

export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 8);
  const extension = originalName.slice(originalName.lastIndexOf("."));
  return `${timestamp}-${random}${extension}`;
}

export async function saveFile(
  buffer: Buffer,
  filename: string
): Promise<string> {
  await ensureDirectory(UPLOADS_DIR);
  const filePath = join(UPLOADS_DIR, filename);
  await writeFile(filePath, buffer);
  return filePath;
}

export function getFilePath(filename: string): string {
  return join(UPLOADS_DIR, filename);
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}
