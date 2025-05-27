"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBell, FaUser } from "react-icons/fa";
import { FiCreditCard } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import ProfilePopover from "../Profile/ProfilePopover";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view");
  const [showProfile, setShowProfile] = useState(false);

  const getLinkClasses = (view: string) => {
    const baseClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
    return currentView === view
      ? `${baseClasses} bg-[var(--primary-purple)] text-white`
      : `${baseClasses} text-[var(--text-light)] hover:bg-[var(--background-gray)]`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background-gray)] border-b border-[var(--border)] text-[var(--text-light)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-primary font-semibold text-lg"
          >
            <FiCreditCard className="h-5 w-5" />
            BudgetWise
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/?view=dashboard" className={getLinkClasses("dashboard")}>
              Dashboard
            </Link>
            <Link href="/?view=transactions" className={getLinkClasses("transactions")}>
              Transactions
            </Link>
            <Link href="/?view=goals" className={getLinkClasses("goals")}>
              Goals
            </Link>
            <Link href="/?view=reports" className={getLinkClasses("reports")}>
              Reports
            </Link>
          </div>

          {/* Right-side icons */}
          <div className="flex items-center gap-3">
            {/* <ThemeToggle /> */}

            {/* <button className="p-2 rounded-md hover:bg-primary/30 transition-colors">
              <FaSearch className="h-4 w-4" />
            </button> */}

            <div className="relative">
              <button className="p-2 rounded-md hover:bg-primary/30 transition-colors">
                <FaBell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
              </button>
            </div>

            {/* Profile icon-only button on the right */}
            <div className="relative">
              <button
                className="p-2 rounded-md hover:bg-primary/30 transition-colors"
                aria-label="Profile"
                onClick={() => setShowProfile((v) => !v)}
              >
                <FaUser className="h-5 w-5" />
              </button>
              {showProfile && (
                <ProfilePopover onClose={() => setShowProfile(false)} />
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-[var(--text-light)] hover:bg-[var(--background-gray)]"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 border-t border-muted">
          <Link href="/?view=dashboard" className={getLinkClasses("dashboard")}>
            Dashboard
          </Link>
          <Link href="/?view=transactions" className={getLinkClasses("transactions")}>
            Transactions
          </Link>
          <Link href="/?view=goals" className={getLinkClasses("goals")}>
            Goals
          </Link>
          <Link href="/?view=reports" className={getLinkClasses("reports")}>
            Reports
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
