"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const BodyWrapper = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent SSR mismatch
    return null;
  }

  return (
    <div className="min-h-screen pt-14 bg-[var(--background-gray)] text-[var(--text-light)]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-4">{children}</div>
    </div>
  );
};

export default BodyWrapper;
