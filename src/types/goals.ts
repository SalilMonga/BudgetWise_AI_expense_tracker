// src/types/goals.ts

/** A single savings goal as stored/returned by the API */
export interface Goal {
  /** Unique identifier (UUID, MongoID, etc.) */
  id: string;

  /** User‑visible title, e.g. "Emergency Fund" */
  title: string;

  /** Total amount the user wants to save */
  targetAmount: number;

  /** Amount saved so far */
  savedAmount: number;

  /** Optional free‑text label, e.g. "Savings", "Personal", … */
  category?: string;

  /** True if the user pinned this goal for quick display */
  pinned: boolean;

  /** Target date to reach the goal (ISO string) */
  deadline: string;
}

/* ------------------------------------------------------------------ */
/* Helper utility types – handy for API payloads                      */
/* ------------------------------------------------------------------ */

/** Payload for creating a new goal (server will add id & pinned) */
export type GoalCreatePayload = Omit<Goal, "id" | "pinned">;

/** Payload for adding funds to an existing goal */
export interface GoalAddFundsPayload {
  delta: number; // amount to add
}

/** Payload for toggling pin status */
export interface GoalPinPayload {
  pinned: boolean;
}
