/**
 * Shared TypeScript types for the Document Management Dashboard.
 */

export type UploadStatus = "pending" | "uploading" | "complete" | "failed";

export interface UploadQueueItem {
  id: string;
  file: File;
  name: string;
  size: number;
  progress: number;
  status: UploadStatus;
  createdAt: Date;
}

export interface DocumentMetadata {
  id: string;
  originalName: string;
  storedFileName: string;
  fileSize: number;
  mimeType: string;
  uploadStatus: string;
  uploadDate: string;
  storagePath: string;
}

export interface ApiDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  status: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  status: "processing" | "completed" | "failed";
}
