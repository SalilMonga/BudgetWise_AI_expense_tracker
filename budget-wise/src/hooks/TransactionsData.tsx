import { useState, useEffect } from "react";

export interface APITransaction {
  id: number;
  date: string; // ISO: "YYYY-MM-DD"
  description: string;
  category: string;
  amount: number;
  status: "Completed" | "Pending";
}

export type Transaction = APITransaction;

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(false);

    fetch("/api/transactions", { signal: ctrl.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<Transaction[]>;
      })
      .then(setTransactions)
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(true);
        }
      })
      .finally(() => setLoading(false));

    return () => {
      ctrl.abort();
    };
  }, []);

  const addTransaction = async (txn: Omit<Transaction, "id">) => {
    const optimisticId = Date.now();
    const optimisticTxn: Transaction = { id: optimisticId, ...txn };
    setTransactions((prev) => [optimisticTxn, ...prev]);

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(txn),
      });
      if (!res.ok) throw new Error();
      const { transaction: saved } = (await res.json()) as {
        transaction: Transaction;
      };
      setTransactions((prev) =>
        prev.map((t) => (t.id === optimisticId ? saved : t))
      );
    } catch (err) {
      console.error(err);
      setTransactions((prev) => prev.filter((t) => t.id !== optimisticId));
    }
  };

  const updateTransaction = async (txn: Transaction) => {
    const prev = [...transactions];
    setTransactions((prevList) =>
      prevList.map((t) => (t.id === txn.id ? txn : t))
    );

    try {
      const res = await fetch(`/api/transactions?id=${txn.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(txn),
      });
      if (!res.ok) throw new Error();
      const { transaction: updated } = (await res.json()) as {
        transaction: Transaction;
      };
      setTransactions((prevList) =>
        prevList.map((t) => (t.id === updated.id ? updated : t))
      );
    } catch (err) {
      console.error(err);
      setTransactions(prev);
    }
  };

  const deleteTransaction = async (id: number) => {
    const prev = [...transactions];
    setTransactions((prevList) => prevList.filter((t) => t.id !== id));

    try {
      const res = await fetch(`/api/transactions?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
    } catch (err) {
      console.error(err);
      setTransactions(prev);
    }
  };

  return {
    transactions,
    isLoading,
    isError,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
