"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Store email in localStorage
    localStorage.setItem("bw_user_email", email);
    setTimeout(() => {
      router.push("/?view=dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-neutral-900 p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center"
      >
        <div className="flex flex-col items-center mb-8">
          <span className="mb-4 text-3xl">🗃️</span>
          <h1 className="text-2xl font-semibold text-white mb-2">Sign in</h1>
        </div>
        <form onSubmit={handleLogin} className="w-full space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md bg-neutral-800 border border-neutral-700 text-white placeholder-gray-500 focus:border-white focus:ring-1 focus:ring-white px-3 py-2 outline-none"
              placeholder="Your email address"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md bg-neutral-800 border border-neutral-700 text-white placeholder-gray-500 focus:border-white focus:ring-1 focus:ring-white px-3 py-2 outline-none"
              placeholder="Password"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition"
            type="submit"
          >
            Continue
          </motion.button>
        </form>
        <div className="mt-6 text-center text-xs text-gray-500">
          Don&apos;t have an account? <span className="text-white underline cursor-pointer">Sign up</span>
        </div>
      </motion.div>
    </div>
  );
} 