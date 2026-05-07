"use client";

import type { UploadStatus } from "@/types";

interface ProgressBarProps {
  progress: number;
  status: UploadStatus;
}

export default function ProgressBar({ progress, status }: ProgressBarProps) {
  const isComplete = status === "complete";
  const isFailed = status === "failed";

  const barColor = isComplete
    ? "bg-emerald-500"
    : isFailed
      ? "bg-red-500"
      : "bg-primary";

  const glowColor = isComplete
    ? "shadow-emerald-500/30"
    : isFailed
      ? "shadow-red-500/30"
      : "shadow-primary/30";

  return (
    <div className="flex items-center gap-3 w-full">
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-border">
        <div
          className={`
            absolute left-0 top-0 h-full rounded-full
            ${barColor}
            transition-all duration-300 ease-out
            ${progress > 0 ? `shadow-[0_0_8px] ${glowColor}` : ""}
          `}
          style={{ width: `${progress}%` }}
        />
      </div>
      <span
        className={`
          min-w-[3ch] text-right text-xs font-semibold tabular-nums
          ${isComplete ? "text-emerald-600" : isFailed ? "text-red-600" : "text-primary"}
        `}
      >
        {progress}%
      </span>
    </div>
  );
}
