"use client";

import { FileText, X } from "lucide-react";
import UploadZone from "./UploadZone";
import { formatFileSize } from "@/lib/utils";
import type { SelectedFile } from "@/types";

interface UploadCardProps {
  files: SelectedFile[];
  onFilesSelected: (files: File[]) => void;
  onRemoveFile: (id: string) => void;
}

export default function UploadCard({
  files,
  onFilesSelected,
  onRemoveFile,
}: UploadCardProps) {
  return (
    <div className="space-y-6">
      <UploadZone onFilesSelected={onFilesSelected} />

      <div className="rounded-2xl border border-border bg-card shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-base font-semibold text-card-foreground">
            Selected Files{" "}
            <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-light px-1.5 text-xs font-medium text-primary">
              {files.length}
            </span>
          </h2>
        </div>

        {files.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <FileText size={20} className="text-secondary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-secondary">
                No files selected
              </p>
              <p className="text-xs text-secondary">
                PDF files you select will appear here
              </p>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {files.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                    <FileText size={18} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-card-foreground">
                      {file.name}
                    </p>
                    <p className="text-xs text-secondary">
                      {formatFileSize(file.size)} ·{" "}
                      <span className="inline-flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        Pending
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveFile(file.id)}
                  className="
                    ml-4 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
                    text-secondary transition-all duration-200
                    hover:bg-red-50 hover:text-red-500
                    active:scale-95
                  "
                  aria-label={`Remove ${file.name}`}
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
