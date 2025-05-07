// src/app/components/TransactionPage/ui/TransactionsList.tsx
"use client";

import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useTheme } from "next-themes";
import {
  darkCategoryColorMap,
  lightCategoryColorMap,
} from "@/lib/categoryColors";
import { Transaction } from "../../../../types";

export interface TransactionsListProps {
  transactions: Transaction[];
  showActions?: boolean;
  maxItems?: number;
  onUpdate?: (txn: Transaction) => void;
  onDelete?: (id: number) => void;
}

export default function TransactionsList({
  transactions,
  showActions = true,
  maxItems,
  onUpdate,
  onDelete,
}: TransactionsListProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const colorMap = isDark ? darkCategoryColorMap : lightCategoryColorMap;

  // only show up to maxItems if it was provided
  const items =
    maxItems != null ? transactions.slice(0, maxItems) : transactions;

  return (
    <>
      {items.map((txn) => (
        <tr
          key={txn.id}
          className="border-b border-gray-300 text-[var(--text-light)]"
        >
          <td className="p-3">{txn.date}</td>
          <td className="p-3">{txn.description}</td>
          <td className="p-3">
            <span
              style={{ backgroundColor: colorMap[txn.category] }}
              className={`px-2 py-1 text-xs font-bold rounded-md ${isDark ? "text-white" : "text-gray-800"
                }`}
            >
              {txn.category}
            </span>
          </td>
          <td
            className={`p-3 ${txn.category === "Income" ? "text-green-500" : "text-red-500"}`}
          >
            ${Math.abs(txn.amount).toFixed(2)}
          </td>
          <td className="p-3">
            <span
              className={`text-sm font-medium ${txn.status === "Completed"
                ? "text-green-400"
                : txn.status === "Recurring"
                  ? "text-blue-400"
                  : "text-yellow-400"
                }`}
            >
              ● {txn.status}
            </span>
          </td>
          <td className="p-3 flex items-center gap-3">
            {showActions && (
              <>
                <FaCheck
                  className="cursor-pointer text-green-500 hover:text-green-300"
                  onClick={() => onUpdate?.({ ...txn, status: "Completed" })}
                />
                <FaTimes
                  className="cursor-pointer text-red-500 hover:text-red-400"
                  onClick={() => onDelete?.(txn.id)}
                />
              </>
            )}
          </td>
        </tr>
      ))}
    </>
  );
}
