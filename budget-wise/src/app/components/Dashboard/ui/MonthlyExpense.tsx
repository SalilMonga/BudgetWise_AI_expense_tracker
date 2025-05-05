// src/app/components/ui/MonthlyExpenseWidget.tsx
"use client";

import { ResponsiveBar } from "@nivo/bar";
import Card from "../../common/Card";

export function MonthlyExpenseWidget() {
  // dummy data — swap in your real endpoint
  const data = [
    { month: "Jan", expense: 1500 },
    { month: "Feb", expense: 1200 },
    { month: "Mar", expense: 1700 },
    { month: "Apr", expense: 1300 },
    { month: "May", expense: 1400 },
  ];

  return (
    <Card className="mt-6">
      <h3 className="text-lg font-semibold text-[var(--text-light)] mb-2">
        Monthly Expenses
      </h3>
      <div className="h-[300px]">
        <ResponsiveBar
          data={data}
          keys={["expense"]}
          indexBy="month"
          margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
          padding={0.3}
          colors={{ scheme: "set2" }}
          theme={{
            axis: {
              ticks: { text: { fill: "var(--text-light)" } },
              legend: { text: { fill: "var(--text-light)" } },
            },
          }}
          axisBottom={{
            legend: "Month",
            legendPosition: "middle",
            legendOffset: 40,
          }}
          axisLeft={{
            legend: "Expense",
            legendPosition: "middle",
            legendOffset: -50,
          }}
        />
      </div>
    </Card>
  );
}
