"use client";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import LoginPage from "./components/Login/LoginPage";
import WelcomeMessage from "./components/WelcomeMessage";

const CentralRouter = dynamic(() => import("./components/common/CentralRouter"), {
  ssr: false,
  loading: () => <div className="p-4">Loading content…</div>,
});

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("sb-access-token"));
    };

    // Initial check
    checkAuth();

    // Listen for auth changes
    window.addEventListener("storage", checkAuth);
    window.addEventListener("authchange", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authchange", checkAuth);
    };
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Suspense fallback={<div className="p-4">Loading content…</div>}>
      <WelcomeMessage />
      <CentralRouter />
    </Suspense>
  );
}
