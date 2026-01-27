/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0d59f2",
        "primary-hover": "#0b4ecf",
        "background-light": "#f5f6f8",
        "background-dark": "#111827",
        "surface-dark": "#1f2937",
        "surface-darker": "#0f172a",
        "text-secondary": "#9ca3af",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
      boxShadow: {
        glow: "0 0 20px -5px rgba(13, 89, 242, 0.3)",
      },
    },
  },
  plugins: [],
};
