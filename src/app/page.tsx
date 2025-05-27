"use client";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import LoginPage from "./components/Login/LoginPage";
import WelcomeMessage from "./components/WelcomeMessage";
import Navbar from "./components/common/Navbar";
import { ThemeProvider } from "next-themes";

const CentralRouter = dynamic(() => import("./components/common/CentralRouter"), {
  ssr: false,
  loading: () => <div className="p-4">Loading content…</div>,
});

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("sb-access-token"));
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("authchange", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authchange", checkAuth);
    };
  }, []);

  if (!mounted || isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="dark bg-[#0f172a] min-h-screen flex items-center justify-center">
          <LoginPage />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Navbar />
      <main className="bg-[var(--background-gray)] transition-colors duration-300 ease-in-out">
        <div className="min-h-screen pt-14 text-[var(--text-light)]">
          <div className="max-w-7xl mx-auto px-6 md:px-8 mt-4">
            <WelcomeMessage />
            <Suspense fallback={<div className="p-4">Loading content…</div>}>
              <CentralRouter />
            </Suspense>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
} 