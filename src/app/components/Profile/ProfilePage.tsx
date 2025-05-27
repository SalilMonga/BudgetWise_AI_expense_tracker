"use client";

import { useState } from "react";
import Card from "../common/Card";
import ThemeToggle from "../common/ThemeToggle";
import { useProfile } from "../../../hooks/useProfile";

export default function ProfilePage() {
  const { profile, isLoading, updateProfile } = useProfile();
  const [monthlyBudget, setMonthlyBudget] = useState(
    profile?.monthlyBudget ?? 2450
  );
  const [darkMode, setDarkMode] = useState(profile?.darkMode ?? true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

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

  if (isLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-8 space-y-6">
      <h2 className="text-2xl font-semibold mb-4 text-[var(--text-light)]">
        Profile
      </h2>
      <Card className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-[var(--text-dark)]">
            Monthly Budget
          </label>
          <input
            type="number"
            value={monthlyBudget}
            min={0}
            onChange={(e) => setMonthlyBudget(Number(e.target.value))}
            className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--text-dark)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)]"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--text-dark)]">
            Dark Mode
          </span>
          <ThemeToggle checked={darkMode} onChange={setDarkMode} />
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-[var(--primary-purple)] text-white rounded-md hover:bg-[var(--primary-purple)]/90 transition"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {message && (
          <div className="text-green-500 text-sm mt-2">{message}</div>
        )}
      </Card>
    </div>
  );
}
