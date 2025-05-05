// src/app/components/transactions/TransactionsList.tsx
"use client";

import { FaCheck, FaTimes } from "react-icons/fa";
import { APITransaction as Transaction } from "@/hooks/TransactionsData";
import { useTheme } from "next-themes";
import {
  darkCategoryColorMap,
  lightCategoryColorMap,
} from "@/lib/categoryColors";
import React from "react";

interface Props {
  transactions: Transaction[];
  isAdding: boolean;
  onAdd: (txn: Omit<Transaction, "id">) => void;
  onUpdate: (txn: Transaction) => void;
  onDelete: (id: number) => void;
  searchValue: string;
  onSearch: (q: string) => void;
}

export default function TransactionsList({
  transactions,
  isAdding,
  onAdd,
  onUpdate,
  onDelete,
  searchValue,
  onSearch,
}: Props) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // local add-row state
  const [draft, setDraft] = React.useState<Omit<Transaction, "id">>({
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    description: "",
    category: "",
    amount: 0,
    status: "Pending",
  });

  const filtered = transactions.filter((t) =>
    t.description.toLowerCase().includes(searchValue.toLowerCase())
  );
  const colorMap = isDark ? darkCategoryColorMap : lightCategoryColorMap;

  return (
    <>
      {/* header + add/search */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[var(--text-light)]">
          Transactions
        </h2>
        <div className="flex gap-3">
          <button
            className="bg-[var(--fill)] text-[var(--text-light)] px-4 py-2 rounded-full transition"
            onClick={() => onAdd(draft)}
          >
            +
          </button>
          <input
            type="text"
            placeholder="Search transactions..."
            className="p-2 bg-[var(--background-gray)] rounded-md text-[var(--text-light)] focus:outline-none"
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-muted text-[var(--text-dark)]">
              {[
                "Date",
                "Description",
                "Category",
                "Amount",
                "Status",
                "Actions",
              ].map((h) => (
                <th key={h} className="p-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isAdding && (
              <tr className="border-b border-gray-800">
                <td className="p-3">{draft.date}</td>
                <td className="p-3">
                  <input
                    type="text"
                    className="bg-[var(--background)] p-2 rounded-md w-full text-[var(--text-light)] text-xs"
                    placeholder="Description"
                    value={draft.description}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, description: e.target.value }))
                    }
                  />
                </td>
                <td className="p-3">
                  <select
                    className="bg-[var(--background)] p-2 rounded-md text-[var(--text-light)] text-sm w-full"
                    value={draft.category}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, category: e.target.value }))
                    }
                  >
                    <option value="">Select</option>
                    {["Food", "Bills", "Transport", "Shopping", "Income"].map(
                      (c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      )
                    )}
                  </select>
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    className="bg-[var(--background)] p-2 rounded-md w-full text-[var(--text-light)] text-sm"
                    placeholder="Amount"
                    value={draft.amount === 0 ? "" : draft.amount}
                    onChange={(e) => {
                      const val =
                        e.target.value === "" ? 0 : Number(e.target.value);
                      setDraft((d) => ({ ...d, amount: val }));
                    }}
                  />
                </td>
                <td className="p-3">
                  <span className="text-yellow-400 text-sm">● Pending</span>
                </td>
                <td className="p-3 flex gap-2">
                  <FaCheck
                    className="text-green-500 cursor-pointer"
                    onClick={() => onAdd(draft)}
                  />
                  <FaTimes
                    className="text-red-500 cursor-pointer"
                    onClick={() => {}}
                  />
                </td>
              </tr>
            )}

            {filtered.map((txn) => (
              <tr
                key={txn.id}
                className="border-b border-gray-800 text-[var(--text-light)]"
              >
                <td className="p-3">{txn.date}</td>
                <td className="p-3">{txn.description}</td>
                <td className="p-3">
                  <span
                    style={{ backgroundColor: colorMap[txn.category] }}
                    className={`px-2 py-1 text-xs font-bold rounded-md ${
                      isDark ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {txn.category}
                  </span>
                </td>
                <td
                  className={`p-3 ${
                    txn.amount < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  ${txn.amount.toFixed(2)}
                </td>
                <td className="p-3">
                  <span
                    className={`text-sm font-medium ${
                      txn.status === "Completed"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    ● {txn.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <FaCheck
                    className="text-green-500 cursor-pointer"
                    onClick={() => onUpdate({ ...txn, status: "Completed" })}
                  />
                  <FaTimes
                    className="text-red-500 cursor-pointer"
                    onClick={() => onDelete(txn.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
