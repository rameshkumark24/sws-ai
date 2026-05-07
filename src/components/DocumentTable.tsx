"use client";

import { Download, FileText, Loader2 } from "lucide-react";
import { useDocuments } from "@/hooks/useDocuments";
import { formatFileSize, formatDate } from "@/lib/utils";

const columns = [
  { key: "name", label: "Document Name" },
  { key: "type", label: "Type" },
  { key: "size", label: "Size" },
  { key: "date", label: "Uploaded" },
  { key: "status", label: "Status" },
  { key: "actions", label: "" },
];

export default function DocumentTable() {
  const { documents, isLoading, error } = useDocuments();

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold text-card-foreground">
          Documents
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-16 text-center text-secondary"
                >
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 size={28} className="animate-spin text-primary" />
                    <p className="text-sm">Loading documents...</p>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-16 text-center text-red-500"
                >
                  <p className="text-sm">{error}</p>
                </td>
              </tr>
            ) : documents.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-16 text-center text-secondary"
                >
                  <div className="flex flex-col items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-border"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <p className="text-sm">No documents uploaded yet</p>
                    <p className="text-xs text-secondary">
                      Upload your first document to get started
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              documents.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b border-border transition-colors hover:bg-muted/30"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                        <FileText size={16} className="text-primary" />
                      </div>
                      <span className="truncate text-sm font-medium text-card-foreground">
                        {doc.originalName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-secondary uppercase">
                      PDF
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary">
                    {formatFileSize(doc.fileSize)}
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary">
                    {formatDate(new Date(doc.uploadDate))}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium text-emerald-700 bg-emerald-50">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`/api/download/${doc.id}`}
                      download={doc.originalName}
                      className="
                        inline-flex h-8 w-8 items-center justify-center rounded-lg
                        text-secondary transition-all duration-200
                        hover:bg-primary-light hover:text-primary
                        active:scale-95
                      "
                      title="Download"
                      aria-label={`Download ${doc.originalName}`}
                    >
                      <Download size={16} />
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
