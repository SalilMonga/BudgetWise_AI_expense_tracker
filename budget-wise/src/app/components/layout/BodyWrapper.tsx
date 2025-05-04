"use client";

import { useEffect, useState } from "react";

const BodyWrapper = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent SSR mismatch
    return null;
  }

  return (
    <main className=" bg-[var(--background)] transition-colors duration-300 ease-in-out">
      <div className="min-h-screen pt-14 bg-[var(--background-gray)] text-[var(--text-light)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 mt-4">{children}</div>
      </div>
    </main>
  );
};

export default BodyWrapper;
