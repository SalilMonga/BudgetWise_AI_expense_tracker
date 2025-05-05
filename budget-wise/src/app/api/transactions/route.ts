import { NextResponse } from "next/server";

// use ISO dates so downstream grouping by YYYY‑MM‑DD works
const transactions = [
  {
    id: 1,
    date: "2024-01-20",
    description: "Grocery Store",
    category: "Food",
    amount: -82.5,
    status: "Completed",
  },
  {
    id: 2,
    date: "2024-01-19",
    description: "Monthly Salary",
    category: "Income",
    amount: 3000,
    status: "Completed",
  },
  {
    id: 3,
    date: "2024-01-18",
    description: "Electric Bill",
    category: "Bills",
    amount: -125,
    status: "Pending",
  },
  {
    id: 4,
    date: "2024-01-17",
    description: "Coffee Shop",
    category: "Food",
    amount: -4.5,
    status: "Completed",
  },
  {
    id: 5,
    date: "2024-01-16",
    description: "Gas Station",
    category: "Transport",
    amount: -45,
    status: "Completed",
  },
  {
    id: 6,
    date: "2024-01-15",
    description: "Online Shopping",
    category: "Shopping",
    amount: -129.99,
    status: "Completed",
  },
  {
    id: 7,
    date: "2024-01-14",
    description: "Freelance Payment",
    category: "Income",
    amount: 850,
    status: "Completed",
  },
  {
    id: 8,
    date: "2024-01-13",
    description: "Internet Bill",
    category: "Bills",
    amount: -79.99,
    status: "Pending",
  },
  {
    id: 9,
    date: "2024-01-12",
    description: "Restaurant Dinner",
    category: "Food",
    amount: -68.5,
    status: "Completed",
  },
  {
    id: 10,
    date: "2024-01-11",
    description: "Public Transport",
    category: "Transport",
    amount: -25,
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
