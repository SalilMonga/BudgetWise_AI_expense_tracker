"use client";

import { useRef, useState } from "react";
import { Goal } from "@/types";

interface Props {
  goal: Goal;
  onClose: () => void;
  onSave: (delta: number) => void;
}

export default function AddFundsModal({ goal, onClose, onSave }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const [amountText, setAmountText] = useState("");
  const [withdraw, setWithdraw] = useState(false);

  const save = () => {
    const val = parseFloat(amountText);
    if (isNaN(val) || val <= 0) return;
    onSave(withdraw ? -val : val);
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
          w-full max-w-sm
          bg-[var(--background-gray)]
          text-[var(--text-light)]
          p-6 rounded-2xl border border-[var(--text-dark)]
          shadow-xl
        "
      >
        <h3 className="text-xl font-semibold mb-4">
          {withdraw ? "Withdraw Funds" : "Add Funds"}
        </h3>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Mode</label>
          <select
            value={withdraw ? "withdraw" : "add"}
            onChange={(e) => setWithdraw(e.target.value === "withdraw")}
            className="
              w-full px-3 py-2
              bg-[var(--background-gray)]
              border border-[var(--text-dark)]
              rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)]
            "
          >
            <option value="add">Add Funds</option>
            <option value="withdraw">Withdraw Funds</option>
          </select>
        </div>

        <p className="text-sm mb-2">
          Goal: <strong>{goal.title}</strong>
        </p>

        <input
          type="number"
          placeholder="Amount"
          inputMode="decimal"
          value={amountText}
          onChange={(e) =>
            setAmountText(e.target.value.replace(/^0+(?=\d)/, ""))
          }
          className="
            w-full px-3 py-2
            bg-[var(--background-gray)]
            border border-[var(--text-dark)]
            rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)]
          "
        />

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-[var(--text-dark)] hover:text-[var(--text-light)] transition"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="
              px-4 py-2 text-sm
              bg-[var(--primary-purple)] hover:bg-[var(--primary-purple)]/90
              text-white rounded-md transition
            "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
