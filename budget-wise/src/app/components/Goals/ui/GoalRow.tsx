"use client";

import { FaThumbtack, FaWallet, FaClock } from "react-icons/fa";
import { Goal } from "@/types";
import ProgressBar from "../../common/ProgressBar";

interface Props {
  goal: Goal;
  onAddFunds: () => void;
  onPin: () => void;
}

export default function GoalRow({ goal, onAddFunds, onPin }: Props) {
  // Calculate months remaining and monthly savings needed
  const deadline = new Date(goal.deadline);
  const today = new Date();
  const monthsRemaining = Math.max(
    0,
    (deadline.getFullYear() - today.getFullYear()) * 12 +
    (deadline.getMonth() - today.getMonth())
  );

  const remainingAmount = goal.targetAmount - goal.savedAmount;
  const monthlySavingsNeeded = monthsRemaining > 0
    ? remainingAmount / monthsRemaining
    : remainingAmount;

  // Calculate progress percentage
  const progressPercentage = (goal.savedAmount / goal.targetAmount) * 100;

  // Calculate if goal is on track
  const isOnTrack = monthsRemaining > 0 && monthlySavingsNeeded <= (goal.savedAmount / monthsRemaining);

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
            className={`text-xs ${goal.pinned ? "text-yellow-400" : "text-gray-400"
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
          ${goal.savedAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
        </span>
      </div>

      {/* Progress bar with percentage */}
      <div className="space-y-2">
        <ProgressBar
          value={goal.savedAmount}
          max={goal.targetAmount}
          showPercentage
        />
        <div className="flex justify-between items-center text-xs">
          <span className="text-[var(--text-dark)]">
            {progressPercentage.toFixed(1)}% complete
          </span>
          <span className={`${isOnTrack ? 'text-green-500' : 'text-yellow-500'}`}>
            {isOnTrack ? 'On track' : 'Needs attention'}
          </span>
        </div>
      </div>

      {/* Deadline and monthly savings info */}
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2 text-[var(--text-dark)]">
          <FaClock className="w-4 h-4" />
          <span>
            {monthsRemaining > 0
              ? `${monthsRemaining} month${monthsRemaining !== 1 ? 's' : ''} left`
              : 'Deadline passed'}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[var(--text-light)] font-medium">
            ${monthlySavingsNeeded.toFixed(2)}
          </span>
          <span className="text-[var(--text-dark)] text-xs ml-1">/month needed</span>
        </div>
      </div>
    </div>
  );
}
