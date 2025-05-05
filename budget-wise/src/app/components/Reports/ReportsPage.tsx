// src/app/components/reports/ReportsPage.tsx
"use client";

import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { useEffect, useState } from "react";
import { Transaction } from "../../../types";
import { useTheme } from "next-themes";
import {
  lightCategoryColorMap,
  darkCategoryColorMap,
} from "@/lib/categoryColors";
import Card from "../common/Card";

interface ReportsPageProps {
  /** full page when false, dashboard‐widget when true */
  isWidget?: boolean;
}

export default function ReportsPage({ isWidget = false }: ReportsPageProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    fetch("/api/transactions")
      .then((r) => r.json())
      .then(setTransactions)
      .catch(console.error);
  }, []);

  // group negative transactions by category
  const categoryMap: Record<string, number> = {};
  transactions.forEach((txn) => {
    if (txn.amount < 0) {
      categoryMap[txn.category] =
        (categoryMap[txn.category] || 0) + Math.abs(txn.amount);
    }
  });

  const colorMap = isDark ? darkCategoryColorMap : lightCategoryColorMap;

  const barData = Object.entries(categoryMap).map(([category, value]) => ({
    category,
    amount: value,
    color: colorMap[category] || "#999999",
  }));

  const pieData = Object.entries(categoryMap).map(([category, value]) => ({
    id: category,
    label: category,
    value,
    color: colorMap[category] || "#999999",
  }));

  if (isWidget) {
    return (
      <Card className="h-full flex flex-col p-4">
        <h3 className="text-lg font-semibold mb-2">Spending Distribution</h3>
        <div className="flex-1 w-full">
          <ResponsivePie
            data={pieData}
            margin={{ top: 20, right: 100, bottom: 60, left: 100 }}
            innerRadius={0.5}
            padAngle={1}
            cornerRadius={4}
            //Test out
            activeOuterRadiusOffset={8}
            arcLinkLabelsSkipAngle={10} // only label slices > 10°
            arcLinkLabelsTextOffset={8} // bring the text closer to the slice
            arcLinkLabelsOffset={4} // shorten the dashed line
            arcLinkLabelsDiagonalLength={8}
            arcLinkLabelsStraightLength={4}
            arcLinkLabelsThickness={1}
            colors={{ datum: "data.color" }}
            theme={{
              labels: { text: { fill: "var(--text-light)" } },
              tooltip: {
                container: {
                  background: "var(--background-gray)",
                  color: "var(--text-light)",
                },
              },
            }}
          />
        </div>
      </Card>
    );
  }

  // ───── FULL PAGE MODE ──────────────
  return (
    <div className="min-h-screen bg-[var(--background-gray)] text-[var(--text-light)]">
      <h2 className="text-2xl font-bold mb-6">Spending Reports</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-[var(--background)] p-4 rounded-lg shadow-md h-[450px]">
          <h3 className="text-lg font-semibold mb-2">Spending by Category</h3>
          <div className="w-full h-[400px]">
            <ResponsiveBar
              data={barData}
              keys={["amount"]}
              indexBy="category"
              margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
              padding={0.3}
              colors={{ datum: "data.color" }}
              theme={{
                axis: {
                  ticks: { text: { fill: "var(--text-light)" } },
                  legend: { text: { fill: "var(--text-light)" } },
                },
                tooltip: {
                  container: {
                    background: "var(--background-gray)",
                    color: "var(--text-light)",
                  },
                },
              }}
              axisBottom={{ tickRotation: -20 }}
              axisLeft={{
                legend: "Amount",
                legendPosition: "middle",
                legendOffset: -40,
              }}
            />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-[var(--background)] p-4 rounded-lg shadow-md h-[450px]">
          <h3 className="text-lg font-semibold mb-2">Spending Distribution</h3>
          <div className="w-full h-[400px]">
            <ResponsivePie
              data={pieData}
              margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
              innerRadius={0.5}
              padAngle={1}
              cornerRadius={4}
              activeOuterRadiusOffset={8}
              colors={{ datum: "data.color" }}
              theme={{
                labels: { text: { fill: "var(--text-light)" } },
                tooltip: {
                  container: {
                    background: "var(--background-gray)",
                    color: "var(--text-light)",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
