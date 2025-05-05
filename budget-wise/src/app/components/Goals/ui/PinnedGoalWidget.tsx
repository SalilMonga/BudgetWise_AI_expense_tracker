// src/app/components/ui/PinnedGoalWidget.tsx
"use client";

import { useEffect, useState } from "react";
import { Goal } from "@/types/goals";
import Card from "../../common/Card";
import GoalProgressBar from "./ProgressBar";

export default function PinnedGoalWidget() {
  const [goal, setGoal] = useState<Goal | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/goals");
      if (!res.ok) return;
      const data: Goal[] = await res.json();
      setGoal(data.find((g) => g.pinned) ?? null);
    })();
  }, []);

  if (!goal) return null;

  return (
    <Card className="space-y-4">
      <h3 className="text-lg font-semibold text-[var(--text-light)]">
        Goal Progress
      </h3>
      <p className="text-md font-medium truncate text-[var(--text-light)]">
        {goal.title}
      </p>
      <GoalProgressBar
        savedAmount={goal.savedAmount}
        targetAmount={goal.targetAmount}
      />
    </Card>
  );
}
