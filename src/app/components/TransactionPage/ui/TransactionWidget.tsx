// src/app/components/dashboard/TransactionWidget.tsx
"use client";

import Link from "next/link";
import { useTransactions } from "../../../../hooks/TransactionsData";
import Card from "../../common/Card";
import TransactionsList from "./TransactionsList";

export function TransactionWidget() {
  const { transactions, isLoading, isError } = useTransactions();

  // grab the most recent 5
  const recent = transactions.slice(0, 5);

  return (
    <Card className="h-full">
      <h2 className="text-lg font-semibold text-[var(--text-dark)] mb-4">
        Recent Transactions
      </h2>

      {isLoading ? (
        <p className="text-center py-6">Loading…</p>
      ) : isError ? (
        <p className="text-center py-6 text-red-600">Failed to load.</p>
      ) : (
        <div className="overflow-hidden rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-muted text-[var(--text-dark)]">
                {["Date", "Description", "Category", "Amount", "Status"].map(
                  (h) => (
                    <th key={h} className="p-3 font-medium text-sm">
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              <TransactionsList
                transactions={recent}
                showActions={false}
                maxItems={5}
              />
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 text-right">
        <Link
          href="/?view=transactions"
          className="text-sm text-blue-600 hover:underline"
        >
          View all →
        </Link>
      </div>
    </Card>
  );
}
