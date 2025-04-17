// src/app/api/goals/route.ts
import { NextResponse } from "next/server";

let goals = [
  {
    id: 1,
    title: "Emergency Fund",
    targetAmount: 1000,
    savedAmount: 450,
    category: "Savings",
  },
  {
    id: 2,
    title: "New Motorcycle",
    targetAmount: 5000,
    savedAmount: 1250,
    category: "Personal",
  },
];

export async function GET() {
  return NextResponse.json(goals);
}

export async function POST(req: Request) {
  const newGoal = await req.json();
  const id = Math.floor(Math.random() * 10000);
  const goal = { id, ...newGoal };
  goals.unshift(goal);
  return NextResponse.json({ goal });
}
