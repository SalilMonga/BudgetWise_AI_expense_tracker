"use client";
import { useState } from "react";

const transactions = [
  {
    date: "Jan 20, 2024",
    description: "Grocery Store",
    category: "Food",
    amount: -82.5,
    status: "Completed",
    color: "purple",
  },
  {
    date: "Jan 19, 2024",
    description: "Monthly Salary",
    category: "Income",
    amount: 3000,
    status: "Completed",
    color: "green",
  },
  {
    date: "Jan 18, 2024",
    description: "Electric Bill",
    category: "Bills",
    amount: -125,
    status: "Pending",
    color: "red",
  },
  {
    date: "Jan 17, 2024",
    description: "Coffee Shop",
    category: "Food",
    amount: -4.5,
    status: "Completed",
    color: "purple",
  },
  {
    date: "Jan 16, 2024",
    description: "Gas Station",
    category: "Transport",
    amount: -45,
    status: "Completed",
    color: "blue",
  },
  {
    date: "Jan 15, 2024",
    description: "Online Shopping",
    category: "Shopping",
    amount: -129.99,
    status: "Completed",
    color: "orange",
  },
  {
    date: "Jan 14, 2024",
    description: "Freelance Payment",
    category: "Income",
    amount: 850,
    status: "Completed",
    color: "green",
  },
  {
    date: "Jan 13, 2024",
    description: "Internet Bill",
    category: "Bills",
    amount: -79.99,
    status: "Pending",
    color: "red",
  },
  {
    date: "Jan 12, 2024",
    description: "Restaurant Dinner",
    category: "Food",
    amount: -68.5,
    status: "Completed",
    color: "purple",
  },
  {
    date: "Jan 11, 2024",
    description: "Public Transport",
    category: "Transport",
    amount: -25,
    status: "Completed",
    color: "blue",
  },
];

const TransactionsPage = () => {
  const [search, setSearch] = useState("");

  const filteredTransactions = transactions.filter((txn) =>
    txn.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 mx-auto max-w-5xl">
      {/* Title and Search */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Transactions</h2>
        <input
          type="text"
          placeholder="Search transactions..."
          className="p-2 bg-gray-800 rounded-md text-white focus:outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3">Date</th>
              <th className="p-3">Description</th>
              <th className="p-3">Category</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((txn, idx) => (
              <tr key={idx} className="border-b border-gray-800">
                <td className="p-3">{txn.date}</td>
                <td className="p-3">{txn.description}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs font-bold rounded-md bg-${txn.color}-600 text-white`}
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
                  <button className="text-gray-400 hover:text-white">⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-400">Showing 1 to 10 of 50 entries</p>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 text-sm rounded-md ${
                page === 1
                  ? "bg-purple-500 text-white"
                  : "bg-gray-800 text-gray-400"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
