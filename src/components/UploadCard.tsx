"use client";

import { FileText, X, RotateCcw } from "lucide-react";
import UploadZone from "./UploadZone";
import ProgressBar from "./ProgressBar";
import { formatFileSize } from "@/lib/utils";
import { useUploadStore } from "@/store/useUploadStore";
import type { UploadStatus } from "@/types";

function statusConfig(status: UploadStatus) {
  switch (status) {
    case "pending":
      return {
        dot: "bg-amber-400",
        label: "Pending",
        text: "text-amber-600",
      };
    case "uploading":
      return {
        dot: "bg-primary animate-pulse",
        label: "Uploading",
        text: "text-primary",
      };
    case "complete":
      return {
        dot: "bg-emerald-500",
        label: "Complete",
        text: "text-emerald-600",
      };
    case "failed":
      return {
        dot: "bg-red-500",
        label: "Failed",
        text: "text-red-600",
      };
  }
}

export default function UploadCard() {
  const items = useUploadStore((state) => state.items);
  const removeItem = useUploadStore((state) => state.removeItem);
  const retryItem = useUploadStore((state) => state.retryItem);

  return (
    <div className="space-y-6">
      <UploadZone />

      <div className="rounded-2xl border border-border bg-card shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-base font-semibold text-card-foreground">
            Upload Queue{" "}
            <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-light px-1.5 text-xs font-medium text-primary">
              {items.length}
            </span>
          </h2>
        </div>

        {items.length === 0 ? (
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
            {items.map((item) => {
              const status = statusConfig(item.status);
              const isFailed = item.status === "failed";

              return (
                <li
                  key={item.id}
                  className="flex flex-col gap-3 px-6 py-4 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                      <FileText size={18} className="text-primary" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-card-foreground">
                          {item.name}
                        </p>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${status.text} bg-opacity-10`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                          />
                          {status.label}
                        </span>
                      </div>
                      <p className="text-xs text-secondary">
                        {formatFileSize(item.size)}
                      </p>
                      <div className="sm:hidden">
                        <ProgressBar
                          progress={item.progress}
                          status={item.status}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:gap-3">
                    <ProgressBar
                      progress={item.progress}
                      status={item.status}
                    />
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {isFailed && (
                      <button
                        type="button"
                        onClick={() => retryItem(item.id)}
                        className="
                          inline-flex h-8 w-8 items-center justify-center rounded-lg
                          text-secondary transition-all duration-200
                          hover:bg-primary-light hover:text-primary
                          active:scale-95
                        "
                        aria-label={`Retry ${item.name}`}
                        title="Retry upload"
                      >
                        <RotateCcw size={15} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="
                        inline-flex h-8 w-8 items-center justify-center rounded-lg
                        text-secondary transition-all duration-200
                        hover:bg-red-50 hover:text-red-500
                        active:scale-95
                      "
                      aria-label={`Remove ${item.name}`}
                      title="Remove file"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
