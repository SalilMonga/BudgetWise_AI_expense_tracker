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
    <Card className="space-y-2">
      <h3 className="text-lg font-semibold text-[var(--text-light)]">
        Monthly Budget
      </h3>
      <p className="text-md font-medium truncate text-[var(--text-light)]">
        Remaining: ${remaining.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </p>
      <div className="flex justify-end gap-6 text-sm text-[var(--text-dark)] mb-1">
        <span>Original: <span className="text-[var(--text-light)]">${totalBudget.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></span>
        <span>Spent: <span className="text-red-400">${totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></span>
      </div>
      <ProgressBar
        value={remaining}
        max={totalBudget}
        showPercentage
      />
    </Card>
  );
}
