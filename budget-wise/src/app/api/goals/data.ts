// src/app/api/goals/data.ts
import type { Goal } from "@/types/goals";

//updated to store because in PATCH api we are setting goals = goals.map and that is not allowed in normal variables, even though it is a read-only, we can mutate the internal state of the variable
export const goalStore = {
  goals: <Goal[]>[
    {
      id: "g1",
      title: "Emergency Fund",
      targetAmount: 2000,
      savedAmount: 500,
      category: "",
      pinned: true,
    },
    {
      id: "g2",
      title: "Dining Out Budget - March",
      targetAmount: 300,
      savedAmount: 240,
      category: "",
      pinned: false,
    },
    {
      id: "g3",
      title: "Save for Vacation",
      targetAmount: 1500,
      savedAmount: 1200,
      category: "",
      pinned: false,
    },
  ],
};
