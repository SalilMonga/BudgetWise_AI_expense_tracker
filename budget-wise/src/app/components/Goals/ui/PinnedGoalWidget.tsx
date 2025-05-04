"use client";

import { FaThumbtack } from "react-icons/fa";

interface Props {
  pinned: boolean;
  onToggle: () => void;
}

export default function PinnedGoalWidget({ pinned, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      aria-label={pinned ? "Unpin goal" : "Pin goal"}
      title={pinned ? "Unpin goal" : "Pin goal"}
      className="p-1 rounded-full hover:bg-[var(--background-gray)] transition"
    >
      <FaThumbtack
        className={`w-5 h-5 ${pinned ? "text-yellow" : "text-muted"}`}
      />
    </button>
  );
}
