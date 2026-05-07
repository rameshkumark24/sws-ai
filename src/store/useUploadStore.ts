"use client";

import { create } from "zustand";
import type { UploadQueueItem } from "@/types";
import { startUploadSimulation } from "@/lib/uploadSimulator";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

interface UploadStoreState {
  items: UploadQueueItem[];
}

interface UploadStoreActions {
  addFiles: (files: File[]) => void;
  removeItem: (id: string) => void;
  retryItem: (id: string) => void;
  updateProgress: (id: string, progress: number) => void;
  setStatus: (id: string, status: UploadQueueItem["status"]) => void;
}

export type UploadStore = UploadStoreState & UploadStoreActions;

export const useUploadStore = create<UploadStore>((set, get) => ({
  items: [],

  addFiles: (files: File[]) => {
    const { items } = get();

    const newItems: UploadQueueItem[] = files
      .filter((file) => {
        const isDuplicate = items.some(
          (item) => item.name === file.name && item.size === file.size
        );
        return !isDuplicate;
      })
      .map((file) => ({
        id: generateId(),
        file,
        name: file.name,
        size: file.size,
        progress: 0,
        status: "pending",
        createdAt: new Date(),
      }));

    if (newItems.length === 0) return;

    set((state) => ({
      items: [...state.items, ...newItems],
    }));

    newItems.forEach((item) => {
      get().setStatus(item.id, "uploading");
      startUploadSimulation(item.id, {
        onProgress: (progress) => get().updateProgress(item.id, progress),
        onComplete: () => get().setStatus(item.id, "complete"),
        onError: () => get().setStatus(item.id, "failed"),
      });
    });
  },

  removeItem: (id: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  retryItem: (id: string) => {
    const item = get().items.find((i) => i.id === id);
    if (!item) return;

    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, progress: 0, status: "uploading" as const } : i
      ),
    }));

    startUploadSimulation(id, {
      onProgress: (progress) => get().updateProgress(id, progress),
      onComplete: () => get().setStatus(id, "complete"),
      onError: () => get().setStatus(id, "failed"),
    });
  },

  updateProgress: (id: string, progress: number) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, progress } : item
      ),
    }));
  },

  setStatus: (id: string, status: UploadQueueItem["status"]) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, status } : item
      ),
    }));
  },
}));
