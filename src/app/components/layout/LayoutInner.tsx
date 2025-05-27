"use client";

import { useSearchParams } from "next/navigation";
import { Providers } from "../../providers";
import Navbar from "../common/Navbar";
import BodyWrapper from "./BodyWrapper";

export default function LayoutInner({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  // If no view param, show login page in dark mode, no navbar
  if (!view) {
    return (
      <div className="dark bg-[#0f172a] min-h-screen flex items-center justify-center">
        {children}
      </div>
    );
  }

  // Otherwise, show app layout
  return (
    <Providers>
      <Navbar />
      <BodyWrapper>{children}</BodyWrapper>
    </Providers>
  );
} 