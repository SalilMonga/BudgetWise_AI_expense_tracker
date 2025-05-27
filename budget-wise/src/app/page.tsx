"use client";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import LoginPage from "./components/Login/LoginPage";
import WelcomeMessage from "./components/WelcomeMessage";

const CentralRouter = dynamic(() => import("./components/common/CentralRouter"), {
  ssr: false,
  loading: () => <div className="p-4">Loading content…</div>,
});

function HomePageContent() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Only clear localStorage once per browser session after server restart
    if (!sessionStorage.getItem("cleared_on_load")) {
      localStorage.removeItem("bw_greeted");
      localStorage.removeItem("bw_user_email");
      localStorage.removeItem("sb-access-token");
      localStorage.removeItem("welcome_message_shown");
      sessionStorage.setItem("cleared_on_load", "1");
      window.dispatchEvent(new Event("authchange"));
      window.dispatchEvent(new Event("storage"));
    }
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

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <main>
      <WelcomeMessage />
      <Suspense fallback={<div className="p-4">Loading content…</div>}>
        <CentralRouter />
      </Suspense>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="p-4">Loading root content…</div>}>
      <HomePageContent />
    </Suspense>
  );
}
