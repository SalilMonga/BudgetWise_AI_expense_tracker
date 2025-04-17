export interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: "Completed" | "Pending";
  color: string;
}

export interface Goal {
  id: number;
  title: string;
  targetAmount: number;
  savedAmount: number;
  category?: string;
}
