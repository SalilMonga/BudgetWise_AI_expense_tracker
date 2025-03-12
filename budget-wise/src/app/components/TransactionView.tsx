"use client";
import { useState } from "react";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([
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
  ]);
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
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

  const filteredTransactions = transactions.filter((txn) =>
    txn.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveTransaction = () => {
    if (
      !newTransaction.description ||
      !newTransaction.amount ||
      !newTransaction.category
    ) {
      alert("Please fill all fields before saving.");
      return;
    }

    setTransactions([newTransaction, ...transactions]); // Add new transaction at the top
    setIsAdding(false); // Hide input row
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
    }); // Reset input fields
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      {/* Floating Transactions Widget */}
      <div className="bg-gray-900/80 backdrop-blur-md p-6 rounded-xl shadow-2xl w-[80vw] max-w-4xl border border-gray-700">
        {/* Title & Search */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-white">Transactions</h2>
          <div className="flex gap-3">
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full transition"
              onClick={() => setIsAdding(true)}
            >
              +
            </button>
            <input
              type="text"
              placeholder="Search transactions..."
              className="p-2 bg-gray-800 rounded-md text-white focus:outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400">
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
                      className="bg-gray-800 p-2 rounded-md w-full text-white text-sm"
                      placeholder="Enter description"
                      value={newTransaction.description}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          description: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="p-3">
                    <select
                      className="bg-gray-800 p-2 rounded-md text-white text-sm w-full"
                      value={newTransaction.category}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          category: e.target.value,
                        })
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
                      className="bg-gray-800 p-2 rounded-md w-full text-white text-sm"
                      placeholder="Amount"
                      value={newTransaction.amount}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          amount: Number(e.target.value),
                        })
                      }
                    />
                  </td>
                  <td className="p-3">
                    <span className="text-yellow-400 text-sm">● Pending</span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 text-sm rounded-md"
                      onClick={() => handleSaveTransaction()}
                    >
                      ✔ Save
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 text-sm rounded-md"
                      onClick={() => setIsAdding(false)}
                    >
                      ✖ Cancel
                    </button>
                  </td>
                </tr>
              )}
              {filteredTransactions.map((txn, idx) => (
                <tr key={idx} className="border-b border-gray-800 text-white">
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
                    <button className="text-gray-400 hover:text-white">
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center text-gray-400">
          <p className="text-sm">Showing 1 to 10 of 50 entries</p>
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
    </div>
  );
};

export default TransactionsPage;
