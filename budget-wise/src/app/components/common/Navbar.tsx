"use client";

import { useState } from "react";
import Link from "next/link";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import { FiCreditCard } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view");

  const getLinkClasses = (viewName: string) =>
    `px-3 py-2 text-sm font-medium transition-colors duration-150 ${
      currentView === viewName
        ? "text-primary border-b-2 border-primary"
        : "text-foreground hover:text-primary"
    }`;

  return (
    <nav className="bg-[var(--background-gray)] backdrop-blur-sm bg-opacity-80 border-b border-muted shadow-md fixed top-0 w-full z-10 h-14 mb-14">
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
            <Link
              href="/?view=dashboard"
              className={getLinkClasses("dashboard")}
            >
              Dashboard
            </Link>
            <Link
              href="/?view=transactions"
              className={getLinkClasses("transactions")}
            >
              Transactions
            </Link>
            {/* <Link href="/?view=budget" className={getLinkClasses("budget")}>
              Budget
            </Link> */}
            <Link href="/?view=goals" className={getLinkClasses("goals")}>
              Goals
            </Link>
            <Link href="/?view=reports" className={getLinkClasses("reports")}>
              Reports
            </Link>
          </div>

          {/* Right-side icons */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <button className="p-2 rounded-md hover:bg-primary/30 transition-colors">
              <FaSearch className="h-4 w-4" />
            </button>

            <div className="relative">
              <button className="p-2 rounded-md hover:bg-primary/30 transition-colors">
                <FaBell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
              </button>
            </div>

            <button className="p-2 rounded-md hover:bg-primary/30 transition-colors">
              <FaUser className="h-4 w-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md hover:bg-primary/30 transition-colors"
              >
                <span className="sr-only">Open menu</span>
                {isMobileMenuOpen ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 border-t border-muted">
          <Link href="/?view=dashboard" className={getLinkClasses("dashboard")}>
            Dashboard
          </Link>
          <Link
            href="/?view=transactions"
            className={getLinkClasses("transactions")}
          >
            Transactions
          </Link>
          <Link href="/?view=budget" className={getLinkClasses("budget")}>
            Budget
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
