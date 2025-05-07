// src/app/dashboard/DashboardPage.tsx
"use client";

import { useEffect, useState } from "react";
import PinnedGoalWidget from "../Goals/ui/PinnedGoalWidget";
import { BudgetWidget } from "./ui/BudgetWidget";
import KpiCard from "./ui/KpiCard";
import { MonthlyExpenseWidget } from "./ui/MonthlyExpense";
import ReportsPage from "../Reports/ReportsPage";
import { TransactionWidget } from "../TransactionPage/ui/TransactionWidget";
import { useTransactions } from "../../../hooks/TransactionsData";
import { useProfile } from "../../../hooks/useProfile";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { profile, isLoading: loadingBudget } = useProfile();
  const { transactions } = useTransactions();

  // Calculate spent for current month
  const now = new Date();
  const currentMonth = now.toISOString().slice(0, 7); // "YYYY-MM"
  const spent = transactions
    .filter((txn) => txn.date.startsWith(currentMonth) && txn.amount < 0)
    .reduce((sum, txn) => sum + Math.abs(txn.amount), 0);

  const pctRemaining = Math.round(
    profile?.monthlyBudget > 0
      ? ((profile.monthlyBudget - spent) / profile.monthlyBudget) * 100
      : 0
  );

  const savingsGoal = 5000;
  const saved = 3000;

  // Get user email from localStorage and extract username
  const [username, setUsername] = useState<string | null>(null);
  const [showGreeting, setShowGreeting] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("bw_user_email");
      if (email) {
        let name = email.split("@")[0];
        if (name.length > 0) {
          name = name.charAt(0).toUpperCase() + name.slice(1);
        }
        setUsername(name);
      }
      // Only show greeting if not greeted before
      const greeted = localStorage.getItem("bw_greeted");
      if (!greeted) {
        setShowGreeting(true);
        // Hide greeting after 1.7s and set flag
        const timer = setTimeout(() => {
          setShowGreeting(false);
          localStorage.setItem("bw_greeted", "1");
        }, 1700);
        return () => clearTimeout(timer);
      } else {
        setShowGreeting(false);
      }
    }
  }, []);

  return (
    <>
      {/* Fullscreen animated greeting overlay */}
      {showGreeting && username && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <motion.div
            initial={{ scale: 1.1, opacity: 1 }}
            animate={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.45, delay: 0.85, ease: "easeIn" }}
            className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg"
          >
            Hi, {username}
          </motion.div>
        </motion.div>
      )}
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* ─── KPI ROW ────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <KpiCard
            title="Monthly Budget"
            value={`$${profile?.monthlyBudget?.toLocaleString() ?? "0"}`}
            subtitle={
              loadingBudget ? "Loading..." : `${pctRemaining}% remaining`
            }
          />
          <KpiCard
            title="Total Expenses"
            value={`$${spent.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}`}
            subtitle={
              loadingBudget
                ? ""
                : `${Math.round(
                  (spent / (profile?.monthlyBudget ?? 1)) * 100
                )}% of budget`
            }
          />
          <KpiCard
            title="Savings Goal"
            value={`$${savingsGoal.toLocaleString()}`}
            subtitle={`$${saved.toLocaleString()} saved`}
          />
        </div>

        {/* ─── PROGRESS BARS ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-min">
          <BudgetWidget
            budget={profile?.monthlyBudget ?? 0}
            spent={spent}
            loading={loadingBudget}
          />
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
    </>
  );
}
