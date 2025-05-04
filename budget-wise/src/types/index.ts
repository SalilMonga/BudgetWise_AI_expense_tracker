export interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: "Completed" | "Pending";
  color: string;
}

export * from "./goals";
