// src/app/api/goals/route.ts
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
// src/app/api/goals/route.ts
import { goalStore } from "./data";
import { GoalCreatePayload } from "@/types/goals";

export async function GET() {
  return NextResponse.json(goalStore.goals);
}

export async function POST(req: Request) {
  const payload = await req.json() as GoalCreatePayload;
  const newGoal = { 
    ...payload, 
    id: uuid(), 
    pinned: false,
    savedAmount: payload.savedAmount ?? 0 // Ensure savedAmount is set
  };
  goalStore.goals.unshift(newGoal);
  return NextResponse.json(newGoal);
}
