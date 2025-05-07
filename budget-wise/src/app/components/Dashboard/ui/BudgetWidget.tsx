// src/components/Dashboard/ui/BudgetWidget.tsx
"use client";

import Card from "../../common/Card";
import ProgressBar from "../../common/ProgressBar";

interface Props {
  budget: number;
  spent: number;
  loading: boolean;
}

export function BudgetWidget({ budget, spent, loading }: Props) {
  const totalBudget = loading ? 0 : budget;
  const totalSpent = loading ? 0 : spent;
  const remaining = totalBudget - totalSpent;

  return (
    <Card className="flex flex-col p-4 h-full">
      <h3 className="text-lg font-semibold text-[var(--text-light)]">
        Monthly Budget
      </h3>
      <p className="mt-2 text-2xl font-bold text-[var(--text-light)]">
        ${loading ? "..." : totalBudget}
      </p>

      {/* full‑width bar with percentage */}
      <div className="mt-4 w-full">
        <ProgressBar
          value={remaining}
          max={totalBudget}
          showPercentage
          className="w-full"
        />
      </div>
    </Card>
  );
}
