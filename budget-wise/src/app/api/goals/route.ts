// src/app/api/goals/route.ts
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
// src/app/api/goals/route.ts
import { goalStore } from "./data";

export async function GET() {
  return NextResponse.json(goalStore.goals);
}

export async function POST(req: Request) {
  const payload = (await req.json()) as {
    title: string;
    targetAmount: number;
    savedAmount: number;
    category: string | "";
  };
  const newGoal = { ...payload, id: uuid(), pinned: false };
  goalStore.goals.unshift(newGoal);
  return NextResponse.json(newGoal, { status: 201 });
}
