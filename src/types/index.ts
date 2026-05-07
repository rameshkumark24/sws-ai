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

export interface SelectedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: "pending";
}
