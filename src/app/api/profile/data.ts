import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "profile.json");

interface ProfileData {
  monthlyBudget: number;
  darkMode: boolean;
}

// Ensure data directory exists
if (!fs.existsSync(path.dirname(DATA_FILE))) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}

// Initialize with default values if file doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify({
      monthlyBudget: 2450,
      darkMode: true,
    })
  );
}

export function getProfile(): ProfileData {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading profile data:", error);
    return {
      monthlyBudget: 2450,
      darkMode: true,
    };
  }
}

export function updateProfile(updates: Partial<ProfileData>): ProfileData {
  try {
    const currentData = getProfile();
    const newData = { ...currentData, ...updates };
    fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2));
    return newData;
  } catch (error) {
    console.error("Error updating profile data:", error);
    throw error;
  }
}
