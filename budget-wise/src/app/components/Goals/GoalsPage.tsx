"use client";

import { useEffect, useState, useRef } from "react";
import { Goal } from "../../../types";
export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const [newGoal, setNewGoal] = useState<Omit<Goal, "id">>({
    title: "",
    targetAmount: 0,
    savedAmount: 0,
    category: "",
  });

  useEffect(() => {
    fetch("/api/goals")
      .then((res) => res.json())
      .then(setGoals)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleAddGoal = async () => {
    if (!newGoal.title || !newGoal.targetAmount) return;
    const res = await fetch("/api/goals", {
      method: "POST",
      body: JSON.stringify(newGoal),
    });
    const { goal } = await res.json();
    setGoals([goal, ...goals]);
    setNewGoal({ title: "", targetAmount: 0, savedAmount: 0, category: "" });
    setShowModal(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) setShowModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Your Goals</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full transition"
        >
          + Add Goal
        </button>
      </div>

      {goals.map((goal) => {
        const progress = (goal.savedAmount / goal.targetAmount) * 100;
        return (
          <div
            key={goal.id}
            className="bg-[var(--background)] p-4 rounded-xl border border-muted shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            <div className="flex justify-between items-center mb-2">
              <h3
                className="text-md font-medium truncate max-w-[80%]"
                title={goal.title}
              >
                {goal.title}
              </h3>
              <span className="text-xs text-[var(--text-dark)]">
                {goal.category}
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-purple-500 h-full rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="text-xs mt-1 text-[var(--text-dark)]">
              ${goal.savedAmount} / ${goal.targetAmount}
            </div>
          </div>
        );
      })}

      {showModal && (
        <div
          ref={modalRef}
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        >
          <div className="bg-[var(--background-gray)] p-6 rounded-xl w-full max-w-md border border-muted shadow-xl animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add a New Goal</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                &times;
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Goal Title"
                value={newGoal.title}
                onChange={(e) =>
                  setNewGoal((g) => ({ ...g, title: e.target.value }))
                }
                className="w-full p-2 bg-[var(--background)] rounded-md text-[var(--text-light)]"
              />
              <input
                type="number"
                placeholder="Target Amount"
                value={newGoal.targetAmount}
                onChange={(e) =>
                  setNewGoal((g) => ({ ...g, targetAmount: +e.target.value }))
                }
                className="w-full p-2 bg-[var(--background)] rounded-md text-[var(--text-light)]"
              />
              <input
                type="number"
                placeholder="Saved Amount"
                value={newGoal.savedAmount}
                onChange={(e) =>
                  setNewGoal((g) => ({ ...g, savedAmount: +e.target.value }))
                }
                className="w-full p-2 bg-[var(--background)] rounded-md text-[var(--text-light)]"
              />
              <input
                type="text"
                placeholder="Category (optional)"
                value={newGoal.category}
                onChange={(e) =>
                  setNewGoal((g) => ({ ...g, category: e.target.value }))
                }
                className="w-full p-2 bg-[var(--background)] rounded-md text-[var(--text-light)]"
              />
              <button
                onClick={handleAddGoal}
                className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition"
              >
                Save Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
