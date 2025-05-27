"use client";

import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background-gray)] text-[var(--text-light)] p-8">
      <div className="flex flex-col items-center">
        <FiAlertTriangle className="text-[var(--primary-purple)] mb-4" size={64} />
        <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
        <p className="mb-6 text-lg text-[var(--text-dark)] text-center max-w-md">
          Oops! The page you are looking for does not exist or has been moved.<br />
          Please check the URL or return to your dashboard.
        </p>
        <Link
          href="/?view=dashboard"
          className="px-6 py-3 bg-[var(--primary-purple)] text-white rounded-full font-semibold shadow-md hover:bg-[var(--primary-purple)]/90 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
} 