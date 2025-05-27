"use client";

import { ReactNode } from "react";

interface Props {
  title: string;
  value: string;
  subtitle?: ReactNode;
  change?: string;
}

export default function KpiCard({ title, value, subtitle, change }: Props) {
  return (
    <div className="bg-[var(--card-bg)] p-4 rounded-lg shadow-md flex flex-col">
      <span className="text-sm text-[var(--text-dark)]">{title}</span>
      <span className="text-2xl font-semibold text-[var(--text-light)]">
        {value}
      </span>
      {subtitle && (
        <span className="text-sm text-[var(--text-dark)]">{subtitle}</span>
      )}
      {change && <span className="text-sm text-green mt-1">{change}</span>}
    </div>
  );
}
