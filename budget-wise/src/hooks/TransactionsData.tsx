import useSWR, { mutate as globalMutate } from "swr";
import { Transaction } from "../types";

// export interface APITransaction {
//   id: number;
//   date: string; // ISO: "YYYY-MM-DD"
//   description: string;
//   category: string;
//   amount: number;
//   status: "Completed" | "Pending";
// }

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useTransactions() {
  const { data, error, isLoading, mutate } = useSWR<Transaction[]>(
    "/api/transactions",
    fetcher
  );

  const addTransaction = async (txn: Omit<Transaction, "id">) => {
    await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(txn),
    });
    mutate(); // revalidate
  };

  const updateTransaction = async (txn: Transaction) => {
    await fetch(`/api/transactions?id=${txn.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(txn),
    });
    mutate(); // revalidate
  };

  const deleteTransaction = async (id: number) => {
    await fetch(`/api/transactions?id=${id}`, {
      method: "DELETE"
    });
    mutate(); // revalidate
  };

  return {
    transactions: data || [],
    isLoading,
    isError: !!error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    mutate, // expose mutate if needed
  };
}
