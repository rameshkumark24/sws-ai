"use client";

export default function UploadCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-card-foreground">
            Upload Documents
          </h3>
          <p className="text-sm text-secondary">
            Drag and drop files here, or click to browse
          </p>
        </div>
        <button
          type="button"
          disabled
          className="mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-white opacity-60 transition-colors hover:bg-primary-dark"
        >
          Browse Files
        </button>
      </div>
    </div>
  );
}
