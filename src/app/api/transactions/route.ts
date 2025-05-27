import { NextResponse } from "next/server";

// Get current month's dates
const now = new Date();
const currentMonth = now.getMonth();
const currentYear = now.getFullYear();

// Helper to create a date string for the current month
const createDate = (day: number) => {
  return new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
};

// use ISO dates so downstream grouping by YYYY‑MM‑DD works
const transactions = [
  // Current month transactions
  {
    id: 1,
    date: createDate(20),
    description: "Netflix Subscription",
    category: "Bills",
    amount: -15.99,
    status: "Recurring",
  },
  {
    id: 2,
    date: createDate(19),
    description: "Monthly Salary",
    category: "Income",
    amount: 3000,
    status: "Recurring",
  },
  {
    id: 3,
    date: createDate(18),
    description: "Electric Bill",
    category: "Bills",
    amount: -125,
    status: "Pending",
  },
  {
    id: 4,
    date: createDate(17),
    description: "Coffee Shop",
    category: "Food",
    amount: -4.5,
    status: "Completed",
  },
  {
    id: 5,
    date: createDate(16),
    description: "Gym Membership",
    category: "Bills",
    amount: -45,
    status: "Recurring",
  },
  {
    id: 6,
    date: createDate(15),
    description: "Online Shopping",
    category: "Shopping",
    amount: -129.99,
    status: "Completed",
  },
  {
    id: 7,
    date: createDate(14),
    description: "Freelance Payment",
    category: "Income",
    amount: 850,
    status: "Completed",
  },
  {
    id: 8,
    date: createDate(13),
    description: "Internet Bill",
    category: "Bills",
    amount: -79.99,
    status: "Recurring",
  },
  {
    id: 9,
    date: createDate(12),
    description: "Restaurant Dinner",
    category: "Food",
    amount: -68.5,
    status: "Completed",
  },
  {
    id: 10,
    date: createDate(11),
    description: "Public Transport",
    category: "Transport",
    amount: -25,
    status: "Completed",
  },
  // Previous month transactions
  {
    id: 11,
    date: createDate(-2), // 2 days before current month
    description: "Netflix Subscription",
    category: "Bills",
    amount: -15.99,
    status: "Recurring",
  },
  {
    id: 12,
    date: createDate(-3),
    description: "Monthly Salary",
    category: "Income",
    amount: 3000,
    status: "Recurring",
  },
  {
    id: 13,
    date: createDate(-5),
    description: "Christmas Shopping",
    category: "Shopping",
    amount: -350,
    status: "Completed",
  },
  {
    id: 14,
    date: createDate(-7),
    description: "Gym Membership",
    category: "Bills",
    amount: -45,
    status: "Recurring",
  },
  {
    id: 15,
    date: createDate(-9),
    description: "Internet Bill",
    category: "Bills",
    amount: -79.99,
    status: "Recurring",
  },
  {
    id: 16,
    date: createDate(-11),
    description: "Electric Bill",
    category: "Bills",
    amount: -135,
    status: "Completed",
  },
  {
    id: 17,
    date: createDate(-13),
    description: "Freelance Payment",
    category: "Income",
    amount: 750,
    status: "Completed",
  },
  {
    id: 18,
    date: createDate(-15),
    description: "Grocery Shopping",
    category: "Food",
    amount: -95.50,
    status: "Completed",
  },
  {
    id: 19,
    date: createDate(-17),
    description: "Gas Station",
    category: "Transport",
    amount: -45,
    status: "Completed",
  },
  {
    id: 20,
    date: createDate(-19),
    description: "Coffee Shop",
    category: "Food",
    amount: -4.5,
    status: "Completed",
  },
];

export async function GET() {
  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newTxn = { id: Date.now(), ...body };
  transactions.unshift(newTxn);
  return NextResponse.json({
    message: "Transaction added",
    transaction: newTxn,
  });
}

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = Number(url.searchParams.get("id"));
  const body = await req.json();
  const idx = transactions.findIndex((t) => t.id === id);
  if (idx === -1) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  const updated = { ...transactions[idx], ...body, id };
  transactions[idx] = updated;
  return NextResponse.json({
    message: "Transaction updated",
    transaction: updated,
  });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = Number(url.searchParams.get("id"));
  const idx = transactions.findIndex((t) => t.id === id);
  if (idx === -1) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  transactions.splice(idx, 1);
  return NextResponse.json({ message: "Transaction deleted" });
}
