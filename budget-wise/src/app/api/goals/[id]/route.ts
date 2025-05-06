// src/app/api/goals/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import type { Goal } from "@/types/goals";
import { goalStore } from "../data";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = params;
  const body = (await request.json()) as {
    delta?: number;
    pinned?: boolean;
  };

  let updatedGoal: Goal | null = null;

  // 1) If pinning, clear pin from all, then set it on this one
  if (typeof body.pinned === "boolean" && body.pinned) {
    goalStore.goals.forEach((g) => (g.pinned = g.id === id));
  }

  // 2) Apply delta / pin to the matching goal
  goalStore.goals = goalStore.goals.map((g) => {
    if (g.id !== id) return g;

    updatedGoal = { ...g };

    if (typeof body.delta === "number") {
      updatedGoal.savedAmount = g.savedAmount + body.delta;
    }
    if (typeof body.pinned === "boolean") {
      updatedGoal.pinned = body.pinned;
    }

    return updatedGoal;
  });

  if (!updatedGoal) {
    return NextResponse.json({ error: "Goal not found" }, { status: 404 });
  }
  return NextResponse.json(updatedGoal);
}
