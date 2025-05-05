export interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: "Completed" | "Pending";
}

export * from "./goals";
