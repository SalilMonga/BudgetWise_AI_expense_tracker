// src/app/dashboard/DashboardPage.tsx
"use client";

import PinnedGoalWidget from "../Goals/ui/PinnedGoalWidget";
import { BudgetWidget } from "./ui/BudgetWidget";
import KpiCard from "./ui/KpiCard";
import { MonthlyExpenseWidget } from "./ui/MonthlyExpense";
import ReportsPage from "../Reports/ReportsPage";
import { TransactionWidget } from "../TransactionPage/ui/TransactionWidget";

export default function DashboardPage() {
  // you can replace these with real calculations/hooks later
  const totalBudget = 2450;
  const spent = 560.48;
  const pctRemaining = Math.round(((totalBudget - spent) / totalBudget) * 100);

  const savingsGoal = 5000;
  const saved = 3000;

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* ─── KPI ROW ────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <KpiCard
          title="Monthly Budget"
          value={`$${totalBudget.toLocaleString()}`}
          subtitle={`${pctRemaining}% remaining`}
        />
        <KpiCard
          title="Total Expenses"
          value={`$${spent.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}`}
          subtitle={`${Math.round((spent / totalBudget) * 100)}% of budget`}
        />
        <KpiCard
          title="Savings Goal"
          value={`$${savingsGoal.toLocaleString()}`}
          subtitle={`$${saved.toLocaleString()} saved`}
        />
      </div>

      {/* ─── PROGRESS BARS ───────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-min">
        <BudgetWidget />
        <PinnedGoalWidget />
      </div>

      {/* ─── TRANSACTIONS & REPORTS ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <TransactionWidget />
        <ReportsPage isWidget />
      </div>

      {/* ─── MONTHLY EXPENSE CHART ───────────────────────── */}
      <MonthlyExpenseWidget />
    </div>
  );
}
