"use client";

import { useEffect, useRef, useState } from "react";
import ThemeToggle from "../common/ThemeToggle";
import { useTheme } from "next-themes";
import { FaPencilAlt } from "react-icons/fa";
import { useProfile } from "../../../hooks/useProfile";
import { useRouter } from "next/navigation";

interface Props {
  onClose: () => void;
}

export default function ProfilePopover({ onClose }: Props) {
  const { profile, isLoading, updateProfile } = useProfile();
  const [monthlyBudget, setMonthlyBudget] = useState(profile?.monthlyBudget ?? 2450);
  const [darkMode, setDarkMode] = useState(profile?.darkMode ?? true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const popoverRef = useRef<HTMLDivElement>(null);
  const { setTheme } = useTheme();
  const [editingBudget, setEditingBudget] = useState(false);
  const budgetInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (editingBudget && budgetInputRef.current) {
      budgetInputRef.current.focus();
    }
  }, [editingBudget]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      await updateProfile({ monthlyBudget, darkMode });
      setMessage("Profile updated!");
    } catch {
      setMessage("Failed to update profile.");
    }
    setSaving(false);
  };

  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
    setTheme(checked ? "dark" : "light");
  };

  const handleBudgetEdit = () => setEditingBudget(true);
  const handleBudgetBlur = () => setEditingBudget(false);
  const handleBudgetKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEditingBudget(false);
    }
  };

  return (
    <div
      ref={popoverRef}
      className="absolute right-0 mt-2 w-80 bg-[var(--background-gray)] border border-[var(--text-dark)] rounded-xl shadow-xl z-50 p-6"
      style={{ top: '3.5rem' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[var(--text-light)]">Profile</h3>
        <button onClick={onClose} className="text-[var(--text-dark)] hover:text-[var(--text-light)] text-xl">&times;</button>
      </div>
      {/* Dummy profile info */}
      <div className="mb-4 space-y-1 text-[var(--text-dark)]">
        <div><span className="font-medium">Name:</span> John Doe</div>
        <div><span className="font-medium">Email:</span> johndoe@email.com</div>
        <div><span className="font-medium">Phone:</span> (555) 123-4567</div>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
          {/* Monthly Budget Row */}
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-[var(--text-dark)] mr-2">Monthly Budget</label>
            {editingBudget ? (
              <input
                type="number"
                value={monthlyBudget}
                min={0}
                ref={budgetInputRef}
                onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                onBlur={handleBudgetBlur}
                onKeyDown={handleBudgetKeyDown}
                className="w-28 px-2 py-1 bg-[var(--background)] border border-[var(--text-dark)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] text-right"
              />
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-light)] font-medium">${monthlyBudget}</span>
                <button type="button" onClick={handleBudgetEdit} className="text-[var(--text-dark)] hover:text-[var(--primary-purple)]">
                  <FaPencilAlt className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--text-dark)]">Dark Mode</span>
            <ThemeToggle checked={darkMode} onChange={handleDarkModeChange} />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-[var(--primary-purple)] text-white rounded-md hover:bg-[var(--primary-purple)]/90 transition w-full"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          {message && <div className="text-green-500 text-sm mt-2">{message}</div>}
        </form>
      )}
      {/* Logout button */}
      <button
        onClick={() => {
          localStorage.removeItem("bw_greeted");
          localStorage.removeItem("bw_user_email");
          localStorage.removeItem("sb-access-token");
          localStorage.removeItem("welcome_message_shown");
          window.dispatchEvent(new Event("authchange"));
          window.dispatchEvent(new Event("storage"));
          router.push("/");
        }}
        className="mt-6 w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
} 