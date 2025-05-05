"use client";

import { FaThumbtack, FaWallet } from "react-icons/fa";
import { Goal } from "@/types";
import ProgressBar from "../../common/ProgressBar";

interface Props {
  goal: Goal;
  onAddFunds: () => void;
  onPin: () => void;
}

export default function GoalRow({ goal, onAddFunds, onPin }: Props) {
  return (
    <div className="bg-[var(--background-gray)] p-4 rounded-2xl border border-[var(--text-dark)] shadow-md flex flex-col gap-4">
      <div className="flex justify-between items-center">
        {/* Title */}
        <h3 className="text-lg font-medium text-[var(--text-light)] truncate">
          {goal.title}
        </h3>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Pin/Unpin button */}
          <button
            onClick={onPin}
            className={`text-xs ${
              goal.pinned ? "text-yellow-400" : "text-gray-400"
            } hover:text-yellow-500 transition`}
            title={goal.pinned ? "Pinned" : "Pin this goal"}
          >
            <FaThumbtack />
          </button>

          {/* Manage funds button */}
          <button
            onClick={onAddFunds}
            aria-label="Manage funds"
            title="Manage funds"
            className="p-1 rounded-full hover:bg-[var(--background)] transition"
          >
            <FaWallet className="w-5 h-5 text-green" />
          </button>
        </div>
      </div>

      {/* Category and amounts */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-[var(--text-dark)]">
          {goal.category ?? "General"}
        </span>
        <span className="text-sm font-semibold text-[var(--text-light)]">
          ${goal.savedAmount} / ${goal.targetAmount}
        </span>
      </div>

      {/* Progress bar */}
      <ProgressBar
        value={goal.savedAmount}
        max={goal.targetAmount}
        showPercentage
      />
    </div>
  );
}
