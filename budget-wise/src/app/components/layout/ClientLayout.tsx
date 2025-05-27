"use client";

import { Suspense, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import Navbar from "../common/Navbar";
import { useSearchParams } from "next/navigation";

function NavbarWrapper() {
  const [showNavbar, setShowNavbar] = useState(false);
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const validViews = ["dashboard", "transactions", "goals", "reports", "profile"];

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("sb-access-token");
    setShowNavbar(isAuthenticated && !!view && validViews.includes(view));
  }, [view]);

  if (!showNavbar) return null;
  return <Navbar />;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Suspense fallback={<div className="p-4">Loading navigation…</div>}>
        <NavbarWrapper />
      </Suspense>
      <div className="pt-14">{children}</div>
    </ThemeProvider>
  );
} 