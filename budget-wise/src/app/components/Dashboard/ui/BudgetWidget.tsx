// src/app/components/ui/BudgetWidget.tsx
"use client";

import Card from "../../common/Card";
import GoalProgressBar from "../../Goals/ui/ProgressBar";

export function BudgetWidget() {
  // replace these with real data calls
  const totalBudget = 2450;
  const spent = 1850;

  return (
    <Card>
      <h3 className="text-lg font-semibold text-[var(--text-light)]">
        Monthly Budget
      </h3>
      <p className="mt-2 text-2xl font-bold text-[var(--text-light)]">
        ${totalBudget.toFixed(0)}
      </p>
      <span className="text-sm text-[var(--text-dark)]">
        {Math.round(((totalBudget - spent) / totalBudget) * 100)}% remaining
      </span>
      <div className="mt-4">
        <GoalProgressBar
          savedAmount={totalBudget - spent}
          targetAmount={totalBudget}
        />
      </div>
    </Card>
  );
}
