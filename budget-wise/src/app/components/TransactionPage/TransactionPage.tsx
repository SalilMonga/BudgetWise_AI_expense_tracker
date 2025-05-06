"use client";

import { useState } from "react";

import Card from "@/app/components/common/Card";
import { FaCheck, FaTimes } from "react-icons/fa";
import TransactionsList from "./ui/TransactionsList";
import { useTransactions } from "../../../hooks/TransactionsData";
import { Transaction } from "../../../types";
import DeleteTransactionModal from "./ui/DeleteTransactionModal";

const ITEMS_PER_PAGE = 10;

export default function TransactionsPage() {
  const {
    transactions,
    isLoading,
    isError,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();
  // const { resolvedTheme } = useTheme();
  // const isDark = resolvedTheme === "dark";

  // search text
  const [search, setSearch] = useState("");
  // "add‐new" row toggle & draft
  const [isAdding, setAdding] = useState(false);
  const [draft, setDraft] = useState<Omit<Transaction, "id">>({
    date: new Date().toLocaleDateString("en-CA"), // ISO YYYY-MM-DD
    description: "",
    category: "",
    amount: 0,
    status: "Pending",
  });

  // Delete modal state
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) return <div className="p-6 text-center">Loading…</div>;
  if (isError)
    return (
      <div className="p-6 text-center text-red-600">
        Error loading transactions.
      </div>
    );

  // filter by description
  const filtered = transactions.filter((t) =>
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTransactions = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // handlers
  const startAdd = () => setAdding(true);
  const cancelAdd = () => {
    setAdding(false);
    setDraft({
      date: new Date().toLocaleDateString("en-CA"),
      description: "",
      category: "",
      amount: 0,
      status: "Pending",
    });
  };
  const saveAdd = () => {
    addTransaction(draft);
    cancelAdd();
  };

  const handleDeleteClick = (id: number) => {
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
      setTransactionToDelete(transaction);
    }
  };

  const handleDeleteConfirm = () => {
    if (transactionToDelete) {
      deleteTransaction(transactionToDelete.id);
      setTransactionToDelete(null);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card className="w-full max-w-5xl mx-auto my-8">
      {/* header + search + "+" */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[var(--text-light)]">
          Transactions
        </h2>
        <div className="flex gap-3">
          <button
            onClick={startAdd}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-[var(--fill)] text-white text-lg transition"
          >
            +
          </button>
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 bg-[var(--background-gray)] rounded-md text-[var(--text-light)] focus:outline-none"
          />
        </div>
      </div>

      {/* table */}
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
            {/* add-new row */}
            {isAdding && (
              <tr className="border-b border-gray-300">
                <td className="p-3">{draft.date}</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Description"
                    value={draft.description}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, description: e.target.value }))
                    }
                    className="w-full p-2 bg-[var(--background)] rounded-md text-[var(--text-light)]"
                  />
                </td>
                <td className="p-3">
                  <select
                    value={draft.category}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, category: e.target.value }))
                    }
                    className="w-full p-2 bg-[var(--background)] rounded-md text-[var(--text-light)]"
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
                    placeholder="Amount"
                    value={draft.amount === 0 ? "" : draft.amount}
                    onChange={(e) => {
                      const v =
                        e.target.value === "" ? 0 : Number(e.target.value);
                      setDraft((d) => ({ ...d, amount: v }));
                    }}
                    className="w-full p-2 bg-[var(--background)] rounded-md text-[var(--text-light)]"
                  />
                </td>
                <td className="p-3">
                  <select
                    value={draft.status}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, status: e.target.value as Transaction["status"] }))
                    }
                    className="w-full p-2 bg-[var(--background)] rounded-md text-[var(--text-light)]"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Recurring">Recurring</option>
                  </select>
                </td>
                <td className="p-3 flex gap-2">
                  <FaCheck
                    onClick={saveAdd}
                    className="text-green-500 cursor-pointer hover:text-green-300 transition"
                  />
                  <FaTimes
                    onClick={cancelAdd}
                    className="text-red-500 cursor-pointer hover:text-red-400 transition"
                  />
                </td>
              </tr>
            )}

            {/* the rest of the rows */}
            <TransactionsList
              transactions={paginatedTransactions}
              onUpdate={(t) => updateTransaction(t)}
              onDelete={handleDeleteClick}
            />
          </tbody>
        </table>
      </div>

      {/* pagination footer */}
      <div className="mt-4 flex justify-between items-center text-[var(--text-dark)]">
        <p className="text-sm">
          Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)} of {filtered.length} transactions
        </p>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 text-sm rounded-md ${page === currentPage
                ? "bg-[var(--fill)] text-white"
                : "bg-[var(--background-gray)] text-[var(--text-dark)] hover:bg-[var(--background)]"
                }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {/* Delete Transaction Modal */}
      {transactionToDelete && (
        <DeleteTransactionModal
          transaction={transactionToDelete}
          onClose={() => setTransactionToDelete(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </Card>
  );
}
