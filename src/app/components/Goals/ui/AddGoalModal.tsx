"use client";

import { useRef, useState } from "react";
import { Goal } from "@/types";

interface Props {
  onClose: () => void;
  onSave: (draft: Omit<Goal, "id" | "pinned">) => void;
}

export default function AddGoalModal({ onClose, onSave }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSave = () => {
    if (!title.trim() || !targetAmount || Number(targetAmount) <= 0 || !deadline) return;
    onSave({
      title: title.trim(),
      targetAmount: Number(targetAmount),
      savedAmount: 0,
      category: category.trim(),
      deadline,
    });
    onClose();
  };

  return (
    <div
      ref={backdropRef}
      onClick={(e) => e.target === backdropRef.current && onClose()}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        className="
          w-full max-w-md
          bg-[var(--background-gray)]
          text-[var(--text-light)]
          p-6 rounded-2xl border border-[var(--text-dark)]
          shadow-xl
        "
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Add New Goal</h3>
          <button
            onClick={onClose}
            className="text-[var(--text-dark)] hover:text-[var(--text-light)] transition"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="
                w-full px-3 py-2
                bg-[var(--background)]
                border border-[var(--text-dark)]
                rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)]
              "
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Target Amount
            </label>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) =>
                setTargetAmount(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className="
                w-full px-3 py-2
                bg-[var(--background)]
                border border-[var(--text-dark)]
                rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)]
              "
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="
                w-full px-3 py-2
                bg-[var(--background)]
                border border-[var(--text-dark)]
                rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)]
              "
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Target Date</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="
                w-full px-3 py-2
                bg-[var(--background)]
                border border-[var(--text-dark)]
                rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)]
              "
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-[var(--text-dark)] hover:text-[var(--text-light)] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="
              px-4 py-2 text-sm
              bg-[var(--primary-purple)] hover:bg-[var(--primary-purple)]/90
              text-white rounded-md transition
            "
          >
            Save Goal
          </button>
        </div>
      </div>
    </div>
  );
}
