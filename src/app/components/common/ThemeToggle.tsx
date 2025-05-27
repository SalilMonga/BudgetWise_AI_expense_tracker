"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const ThemeToggle = ({ checked, onChange }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // If controlled
  if (typeof checked === "boolean" && onChange) {
    return (
      <button
        aria-label="Toggle dark mode"
        onClick={() => onChange(!checked)}
        className="w-10 h-6 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition"
      >
        <span
          className={`w-4 h-4 rounded-full shadow-md transform transition-transform ${checked ? "translate-x-4 bg-purple-500" : "translate-x-0 bg-white"}`}
        />
      </button>
    );
  }

  // Fallback to theme context
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
