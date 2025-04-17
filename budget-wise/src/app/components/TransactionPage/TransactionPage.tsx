"use client";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: "Completed" | "Pending";
  color: string;
}

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, "id">>(
    {
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      description: "",
      category: "",
      amount: 0,
      status: "Pending",
      color: "gray",
    }
  );

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then(setTransactions)
      .catch(console.error);
  }, []);

  const filteredTransactions = transactions.filter((txn) =>
    txn.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveTransaction = async () => {
    if (
      !newTransaction.description ||
      !newTransaction.amount ||
      !newTransaction.category
    ) {
      alert("Please fill all fields before saving.");
      return;
    }

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        body: JSON.stringify(newTransaction),
      });
      const { transaction } = await res.json();
      setTransactions([transaction, ...transactions]);
      setIsAdding(false);
      setNewTransaction({
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        description: "",
        category: "",
        amount: 0,
        status: "Pending",
        color: "gray",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[var(--background-gray)] text-[var(--text-light)]">
      <div className="bg-[var(--background-gray)] backdrop-blur-md p-6 rounded-xl shadow-2xl w-[80vw] max-w-4xl border border-muted">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[var(--text-light)]">
            Transactions
          </h2>
          <div className="flex gap-3">
            <button
              className="bg-purple-500 hover:bg-purple-600 text-[var(--text-light)] px-4 py-2 rounded-full transition"
              onClick={() => {
                setIsAdding(true);
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);
              }}
            >
              +
            </button>
            <input
              type="text"
              placeholder="Search transactions..."
              className="p-2 bg-[var(--background-gray)] rounded-md text-[var(--text-light)] focus:outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-lg">
          {/* <div className="bg-[var(--background-gray)] backdrop-blur-md p-6 rounded-xl shadow-2xl w-[80vw] max-w-4xl border border-muted"> */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-muted text-[var(--text-dark)]">
                <th className="p-3">Date</th>
                <th className="p-3">Description</th>
                <th className="p-3">Category</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isAdding && (
                <tr className="border-b border-gray-800">
                  <td className="p-3">{newTransaction.date}</td>
                  <td className="p-3">
                    <input
                      type="text"
                      className="bg-[var(--background)] p-2 rounded-md w-full text-[var(--text-light)] text-xs"
                      placeholder="Enter description"
                      value={newTransaction.description}
                      onChange={(e) =>
                        setNewTransaction((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </td>
                  <td className="p-3">
                    <select
                      className="bg-[var(--background)] p-2 rounded-md text-[var(--text-light)] text-sm w-full"
                      value={newTransaction.category}
                      onChange={(e) =>
                        setNewTransaction((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select</option>
                      <option value="Food">Food</option>
                      <option value="Bills">Bills</option>
                      <option value="Transport">Transport</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Income">Income</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      className="bg-[var(--background)] p-2 rounded-md w-full text-[var(--text-light)] text-sm"
                      placeholder="Amount"
                      value={newTransaction.amount}
                      onChange={(e) =>
                        setNewTransaction((prev) => ({
                          ...prev,
                          amount: Number(e.target.value),
                        }))
                      }
                    />
                  </td>
                  <td className="p-3">
                    <span className="text-yellow-400 text-sm">● Pending</span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-4">
                      <FaCheck
                        className="text-green-500 text-l cursor-pointer hover:text-green-300 transition inline-flex"
                        onClick={handleSaveTransaction}
                      />
                      <FaTimes
                        className="text-red-500 text-l cursor-pointer hover:text-red-400 transition inline-flex"
                        onClick={() => setIsAdding(false)}
                      />
                    </div>
                  </td>
                </tr>
              )}
              {filteredTransactions.map((txn, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-800 text-[var(--text-light)]"
                >
                  <td className="p-3">{txn.date}</td>
                  <td className="p-3">{txn.description}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded-md ${
                        txn.color ? `bg-${txn.color}-600` : "bg-gray-600"
                      } text-[var(--text-light)]`}
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
                  <td className="p-3">
                    <button className="text-[var(--text-dark)] hover:text-[var(--text-light)]">
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center text-[var(--text-dark)]">
          <p className="text-sm">Showing 1 to 10 of 50 entries</p>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-3 py-1 text-sm rounded-md ${
                  page === 1
                    ? "bg-purple-500 text-[var(--text-light)]"
                    : "bg-[var(--background-gray)] text-[var(--text-dark)]"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
