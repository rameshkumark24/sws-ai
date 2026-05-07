/**
 * Shared TypeScript types for the Document Management Dashboard.
 */

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  status: "processing" | "completed" | "failed";
}

export interface UploadFile {
  file: File;
  id: string;
}
