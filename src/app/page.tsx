"use client";

import { useState, useCallback } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import UploadCard from "@/components/UploadCard";
import DocumentTable from "@/components/DocumentTable";
import type { SelectedFile } from "@/types";

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function DashboardPage() {
  const [files, setFiles] = useState<SelectedFile[]>([]);

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    const mapped: SelectedFile[] = newFiles.map((file) => ({
      id: generateId(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "pending" as const,
    }));
    setFiles((prev) => [...prev, ...mapped]);
  }, []);

  const handleRemoveFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-8">
          <DashboardHeader
            title="Document Management"
            subtitle="Upload, organize, and manage your documents in one place"
          />

          <UploadCard
            files={files}
            onFilesSelected={handleFilesSelected}
            onRemoveFile={handleRemoveFile}
          />

          <DocumentTable />
        </div>
      </main>
    </div>
  );
}
