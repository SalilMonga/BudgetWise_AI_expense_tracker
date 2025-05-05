"use client";

interface Props {
  savedAmount: number;
  targetAmount: number;
}

export default function GoalProgressBar({ savedAmount, targetAmount }: Props) {
  const pct =
    targetAmount > 0 ? Math.min((savedAmount / targetAmount) * 100, 100) : 0;

  return (
    <div className="w-full bg-[var(--background)] border border-[var(--text-dark)] rounded-full h-3 overflow-hidden">
      <div
        className="
          h-full
          bg-[var(--fill)]
          transition-all duration-300 ease-in-out
        "
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
