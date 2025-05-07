"use client";

import { useSearchParams } from "next/navigation";
import CentralRouter from "./components/common/CentralRouter";
import LoginPage from "./components/Login/LoginPage";

export default function Home() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  // If no view is specified, show the login page
  if (!view) {
    return <LoginPage />;
  }

  // Otherwise, use the CentralRouter for other views
  return <CentralRouter />;
}
