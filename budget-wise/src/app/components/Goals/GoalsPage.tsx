"use client";

import { useEffect, useState } from "react";
import AddGoalModal from "./ui/AddGoalModal";
import { Goal } from "@/types";
import GoalRow from "./ui/GoalRow";
import AddFundsModal from "./ui/AddFundsModal";

export default function GoalsView() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [fundsGoalId, setFundsGoalId] = useState<string | null>(null);

  // Create a new goal
  const addGoal = async (draft: Omit<Goal, "id" | "pinned">) => {
    const res = await fetch("/api/goals", {
      method: "POST",
      body: JSON.stringify(draft),
    });
    const created = (await res.json()) as Goal;
    setGoals((g) => [created, ...g]);
  };

  // Add or withdraw funds
  // Add or withdraw funds
  const addFunds = async (goalId: string, delta: number) => {
    await fetch(`/api/goals/${goalId}`, {
      method: "PATCH",
      body: JSON.stringify({ delta }),
    });

    setGoals((goals) =>
      goals.map((goal) =>
        goal.id === goalId
          ? { ...goal, savedAmount: goal.savedAmount + delta }
          : goal
      )
    );
  };

  // Pin a goal
  const pinGoal = async (goalId: string) => {
    await fetch(`/api/goals/${goalId}`, {
      method: "PATCH",
      body: JSON.stringify({ pinned: true }),
    });

    setGoals((goals) =>
      goals.map((goal) => ({ ...goal, pinned: goal.id === goalId }))
    );
  };
  // Fetch goals on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/goals");
        if (res.ok) {
          setGoals(await res.json());
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Your Goals
        </h2>
        <button
          onClick={() => setShowAddGoal(true)}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full shadow-md transition"
        >
          + Add Goal
        </button>
      </div>

      {/* Goal list */}
      {goals.map((goal) => (
        <GoalRow
          key={goal.id}
          goal={goal}
          onAddFunds={() => setFundsGoalId(goal.id)}
          onPin={() => pinGoal(goal.id)}
        />
      ))}

      {/* Add-Goal Modal */}
      {showAddGoal && (
        <AddGoalModal onClose={() => setShowAddGoal(false)} onSave={addGoal} />
      )}

      {fundsGoalId && (
        <AddFundsModal
          goal={goals.find((g) => g.id === fundsGoalId)!}
          onClose={() => setFundsGoalId(null)}
          onSave={(delta: number) => {
            addFunds(fundsGoalId, delta);
            setFundsGoalId(null);
          }}
        />
      )}
    </div>
  );
}
