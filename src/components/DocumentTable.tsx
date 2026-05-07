"use client";

const columns = [
  { key: "name", label: "Document Name" },
  { key: "type", label: "Type" },
  { key: "size", label: "Size" },
  { key: "date", label: "Uploaded" },
  { key: "status", label: "Status" },
];

export default function DocumentTable() {
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
