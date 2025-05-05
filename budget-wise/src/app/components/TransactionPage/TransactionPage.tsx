// src/app/transactions/page.tsx
"use client";

import { useTransactions } from "@/hooks/TransactionsData";
import { useState } from "react";
import TransactionsList from "./ui/TransactionsList";
import Card from "../common/Card";

export default function TransactionsPage() {
  const {
    transactions,
    isLoading,
    isError,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  const [search, setSearch] = useState("");
  const [isAdding, setAdding] = useState(false);

  if (isLoading) return <div>Loading…</div>;
  if (isError) return <div>Error loading transactions.</div>;

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <TransactionsList
        transactions={transactions}
        isAdding={isAdding}
        onAdd={(txn) => {
          setAdding(false);
          addTransaction(txn);
        }}
        onUpdate={updateTransaction}
        onDelete={deleteTransaction}
        searchValue={search}
        onSearch={setSearch}
      />
    </Card>
  );
}
