"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function WelcomeMessage() {
  const [showMessage, setShowMessage] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("bw_user_email");
      if (email) {
        let name = email.split("@")[0];
        if (name.length > 0) {
          name = name.charAt(0).toUpperCase() + name.slice(1);
        }
        setUsername(name);
      }
      // Only show greeting if not greeted before
      const greeted = localStorage.getItem("welcome_message_shown");
      if (!greeted) {
        setShowMessage(true);
        // Hide greeting after 1.7s and set flag
        const timer = setTimeout(() => {
          setShowMessage(false);
          localStorage.setItem("welcome_message_shown", "1");
        }, 1700);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  if (!showMessage || !username) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.7, delay: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <motion.div
        initial={{ scale: 1.1, opacity: 1 }}
        animate={{ scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.45, delay: 0.85, ease: "easeIn" }}
        className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg"
      >
        Hi, {username}
      </motion.div>
    </motion.div>
  );
} 