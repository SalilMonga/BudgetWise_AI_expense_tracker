// src/components/common/ProgressBar.tsx
"use client";

import React from "react";

interface ProgressBarProps {
  value: number;
  max: number;
  showPercentage?: boolean;
  className?: string;
}

export default function ProgressBar({
  value,
  max,
  showPercentage = false,
  className = "",
}: ProgressBarProps) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div className={`relative flex items-center ${className}`}>
      {/* Track */}
      <div className="flex-1 h-2 bg-[var(--background)] border border-[var(--text-dark)] rounded-full overflow-hidden">
        {/* Fill */}
        <div
          className="h-full bg-[var(--fill)] transition-all duration-300 ease-in-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      {showPercentage && (
        <span className="ml-2 text-xs text-[var(--text-dark)] whitespace-nowrap">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}
