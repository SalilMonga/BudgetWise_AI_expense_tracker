/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-purple)",
        background: "var(--background)",
        "background-gray": "var(--background-gray)",
        foreground: "var(--text-light)",
        muted: "var(--text-dark)",
        green: "var(--green)",
        red: "var(--red)",
        yellow: "var(--yellow)",
        blue: "var(--blue)",
        orange: "var(--orange)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};
