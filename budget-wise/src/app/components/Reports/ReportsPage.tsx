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

const ReportsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then(setTransactions)
      .catch(console.error);
  }, []);

  // 🔢 Group by category
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

  return (
    <div className="min-h-screen bg-[var(--background-gray)] text-[var(--text-light)]">
      <h2 className="text-2xl font-bold mb-6">Spending Reports</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 📊 Bar Chart */}
        <div className="bg-[var(--background)] p-4 rounded-lg shadow-md h-[400px]">
          <h3 className="text-lg font-semibold mb-2">Spending by Category</h3>
          <ResponsiveBar
            data={barData}
            keys={["amount"]}
            indexBy="category"
            margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
            padding={0.3}
            colors={{ datum: "data.color" }}
            theme={{
              // textColor: "var(--text-light)",
              axis: {
                ticks: {
                  text: { fill: "var(--text-light)" },
                },
                legend: {
                  text: { fill: "var(--text-light)" },
                },
              },
              tooltip: {
                container: {
                  background: "var(--background-gray)",
                  color: "var(--text-light)",
                },
              },
            }}
            axisBottom={{
              tickRotation: -20,
            }}
            axisLeft={{
              legend: "Amount",
              legendPosition: "middle",
              legendOffset: -40,
            }}
          />
        </div>

        {/* 🥧 Donut Chart */}
        <div className="bg-[var(--background)] p-4 rounded-lg shadow-md h-[400px]">
          <h3 className="text-lg font-semibold mb-2">Spending Distribution</h3>
          <ResponsivePie
            data={pieData}
            margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
            innerRadius={0.5}
            padAngle={1}
            cornerRadius={4}
            activeOuterRadiusOffset={8}
            colors={{ datum: "data.color" }}
            theme={{
              labels: {
                text: {
                  fill: "var(--text-light)",
                },
              },
              tooltip: {
                container: {
                  background: "var(--background-gray)",
                  color: "var(--text-light)",
                },
              },
            }}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateY: 36,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "var(--text-light)",
                symbolSize: 18,
                symbolShape: "circle",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
