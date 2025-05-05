// src/app/components/dashboard/TransactionWidget.tsx
"use client";

import { useTransactions } from "../../../../hooks/TransactionsData";
import Link from "next/link";
import TransactionsList from "./TransactionsList";
import Card from "../../common/Card";

export function TransactionWidget() {
  const { transactions, isLoading } = useTransactions();

  // only show the last 5
  const recent = transactions.slice(0, 5);

  return (
    <Card className="h-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Recent Transactions
      </h2>
      {isLoading ? (
        <p>Loading…</p>
      ) : (
        <>
          <TransactionsList
            transactions={recent}
            showActions={false}
            maxItems={5}
          />
          <div className="mt-4 text-right">
            <Link
              href="/view?=transactions"
              className="text-sm text-blue-600 hover:underline"
            >
              View all →
            </Link>
          </div>
        </>
      )}
    </Card>
  );
}
