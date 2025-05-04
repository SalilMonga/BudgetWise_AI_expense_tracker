"use client";

interface Props {
  savedAmount: number;
  targetAmount: number;
}

export default function GoalProgressBar({ savedAmount, targetAmount }: Props) {
  const pct =
    targetAmount > 0 ? Math.min((savedAmount / targetAmount) * 100, 100) : 0;

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
      <div
        className="h-full bg-purple-500 transition-all duration-300 ease-in-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
