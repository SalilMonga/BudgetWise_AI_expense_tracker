import { NextResponse } from "next/server";

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

export async function GET() {
  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newTxn = { ...body, id: Date.now() };
  transactions.unshift(newTxn);
  return NextResponse.json({
    message: "Transaction added",
    transaction: newTxn,
  });
}
