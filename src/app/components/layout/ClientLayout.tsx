"use client";

import { Suspense, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import Navbar from "../common/Navbar";
import { useSearchParams } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const validViews = ["dashboard", "transactions", "goals", "reports", "profile"];

  useEffect(() => {
    setMounted(true);
    const isAuthenticated = !!localStorage.getItem("sb-access-token");
    setShowNavbar(isAuthenticated && !!view && validViews.includes(view));
  }, [view]);

  if (!mounted) {
    return null;
  }

  // If no view param, show login page in dark mode, no navbar
  if (!view) {
    return (
      <div className="dark bg-[#0f172a] min-h-screen flex items-center justify-center">
        {children}
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Suspense fallback={<div className="p-4">Loading navigation…</div>}>
        {showNavbar && <Navbar />}
      </Suspense>
      <main className="bg-[var(--background-gray)] transition-colors duration-300 ease-in-out">
        <div className="min-h-screen pt-14 text-[var(--text-light)]">
          <div className="max-w-7xl mx-auto px-6 md:px-8 mt-4">{children}</div>
        </div>
      </main>
    </ThemeProvider>
  );
} 