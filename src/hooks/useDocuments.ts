"use client";

import { useState, useEffect } from "react";
import type { DocumentMetadata } from "@/types";

interface UseDocumentsReturn {
  documents: DocumentMetadata[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useDocuments(): UseDocumentsReturn {
  const [documents, setDocuments] = useState<DocumentMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/documents", { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch documents");
        const data = (await res.json()) as DocumentMetadata[];
        setDocuments(data);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Unknown error");
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    setError(null);
    fetch("/api/documents")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch documents");
        const data = (await res.json()) as DocumentMetadata[];
        setDocuments(data);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Unknown error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { documents, isLoading, error, refetch };
}
