"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void;
}

export default function UploadZone({ onFilesSelected }: UploadZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFilesSelected(acceptedFiles);
      }
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    noClick: false,
    noKeyboard: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        group relative cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center
        transition-all duration-300 ease-out
        ${
          isDragActive
            ? "border-primary bg-primary-light/60 scale-[1.01]"
            : "border-border bg-muted hover:border-primary/40 hover:bg-primary-light/30"
        }
      `}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center gap-4">
        <div
          className={`
            flex h-16 w-16 items-center justify-center rounded-full
            transition-all duration-300
            ${
              isDragActive
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "bg-primary-light text-primary group-hover:scale-110"
            }
          `}
        >
          <Upload
            size={28}
            strokeWidth={1.5}
            className={`transition-transform duration-300 ${isDragActive ? "-translate-y-0.5" : ""}`}
          />
        </div>

        <div className="space-y-1.5">
          <p className="text-base font-medium text-card-foreground">
            {isDragActive ? "Drop your PDFs here" : "Drag and drop your PDFs here"}
          </p>
          <p className="text-sm text-secondary">or</p>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
          className="
            inline-flex h-10 items-center justify-center rounded-lg
            bg-primary px-6 text-sm font-medium text-white
            transition-all duration-200
            hover:bg-primary-dark hover:shadow-md hover:shadow-primary/20
            active:scale-[0.98]
          "
        >
          Browse Files
        </button>

        <p className="text-xs text-secondary">
          Supported format: <span className="font-medium text-foreground">PDF</span> only
        </p>
      </div>
    </div>
  );
}
