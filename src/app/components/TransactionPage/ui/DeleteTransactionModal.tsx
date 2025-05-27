"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Transaction } from "@/types";
import { Goal } from "@/types";

interface Props {
  transaction: Transaction;
  onClose: () => void;
  onConfirm: () => void;
}

interface GoalImpact {
  goal: Goal;
  monthsSaved: number;
  newMonthlySavings: number;
  currentMonthlySavings: number;
}

export default function DeleteTransactionModal({ transaction, onClose, onConfirm }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const [impact, setImpact] = useState<GoalImpact | null>(null);

  const calculateImpact = useCallback((goals: Goal[]) => {
    // Only calculate impact for recurring transactions
    if (transaction.status !== "Recurring") return;

    const monthlyAmount = Math.abs(transaction.amount); // Use absolute value since expenses are negative
    let bestImpact: GoalImpact | null = null;
    let pinnedGoalImpact: GoalImpact | null = null;

    goals.forEach((goal) => {
      const deadline = new Date(goal.deadline);
      const today = new Date();
      const monthsRemaining = Math.max(
        0,
        (deadline.getFullYear() - today.getFullYear()) * 12 +
        (deadline.getMonth() - today.getMonth())
      );

      if (monthsRemaining > 0) {
        const remainingAmount = goal.targetAmount - goal.savedAmount;
        const currentMonthlySavings = remainingAmount / monthsRemaining;

        // Calculate new monthly savings needed after removing this expense
        const newMonthlySavings = (remainingAmount - monthlyAmount) / monthsRemaining;

        // Calculate how many months we'll save
        const monthsSaved = monthsRemaining - (remainingAmount / (currentMonthlySavings + monthlyAmount));

        const goalImpact: GoalImpact = {
          goal,
          monthsSaved,
          newMonthlySavings,
          currentMonthlySavings
        };

        // Store impact for pinned goal separately
        if (goal.pinned) {
          pinnedGoalImpact = goalImpact;
        }

        // Update best impact if this one saves more months
        if (!bestImpact || goalImpact.monthsSaved > bestImpact.monthsSaved) {
          bestImpact = goalImpact;
        }
      }
    });

    // Prioritize showing impact on pinned goal if it exists and has a positive impact
    if (pinnedGoalImpact && (pinnedGoalImpact as GoalImpact).monthsSaved > 0) {
      setImpact(pinnedGoalImpact);
    } else {
      setImpact(bestImpact);
    }
  }, [transaction.status, transaction.amount]);

  useEffect(() => {
    // Fetch goals when modal opens
    fetch("/api/goals")
      .then((res) => res.json())
      .then((goals: Goal[]) => {
        calculateImpact(goals);
      });
  }, [calculateImpact]);

  return (
    <div
      ref={backdropRef}
      onClick={(e) => e.target === backdropRef.current && onClose()}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="w-full max-w-md bg-[var(--background-gray)] p-6 rounded-2xl border border-[var(--text-dark)] shadow-xl">
        <h3 className="text-xl font-semibold text-[var(--text-light)] mb-4">
          Delete Transaction
        </h3>

        <div className="space-y-4">
          <p className="text-[var(--text-light)]">
            Are you sure you want to delete this transaction? This action cannot be &quot;undone&quot;.
          </p>

          <div className="bg-[var(--background)] p-4 rounded-lg">
            <p className="font-medium text-[var(--text-light)]">
              {transaction.description}
            </p>
            <p className="text-[var(--text-dark)]">
              ${Math.abs(transaction.amount).toFixed(2)} - {transaction.category}
            </p>
          </div>

          {impact && (
            <div className="bg-white dark:bg-green-900/20 p-4 rounded-lg border border-green-400 dark:border-green-800">
              <h4 className="font-medium text-gray-900 dark:text-green-200 mb-2">
                Impact on &quot;{impact.goal.title}&quot;
                {impact.goal.pinned && (
                  <span className="ml-2 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-0.5 rounded-full">
                    Pinned Goal
                  </span>
                )}
              </h4>
              <ul className="space-y-2 text-sm text-gray-800 dark:text-green-300">
                <li>
                  • You&apos;ll reach your goal {Math.round(impact.monthsSaved)} months sooner
                </li>
                <li>
                  • Monthly savings needed will decrease from ${impact.currentMonthlySavings.toFixed(2)} to ${impact.newMonthlySavings.toFixed(2)}
                </li>
                <li>
                  • You&apos;ll save ${Math.abs(transaction.amount).toFixed(2)} per month
                </li>
              </ul>
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-[var(--text-dark)] hover:text-[var(--text-light)] transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 