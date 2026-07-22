/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0D0F14",
          secondary: "#161A22",
          tertiary: "#1D2230",
        },
        accent: {
          blue: "#1EA7FF",
          cyan: "#19E6D1",
          purple: "#7B5CFF",
        },
        ink: {
          DEFAULT: "#F5F5F7",
          muted: "#9AA3B2",
          faint: "#5C6577",
        },
        line: "rgba(245,245,247,0.08)",
      },
      fontFamily: {
        sans: [
          "Satoshi",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Satoshi",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "synq-gradient": "linear-gradient(135deg, #19E6D1 0%, #1EA7FF 45%, #7B5CFF 100%)",
        "synq-gradient-radial":
          "radial-gradient(circle at top right, rgba(123,92,255,0.25), transparent 60%), radial-gradient(circle at bottom left, rgba(25,230,209,0.15), transparent 50%)",
        "glass-gradient":
          "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))",
      },
      boxShadow: {
        glow: "0 0 40px rgba(30,167,255,0.25)",
        "glow-cyan": "0 0 40px rgba(25,230,209,0.25)",
        "glow-purple": "0 0 40px rgba(123,92,255,0.25)",
        glass: "0 8px 32px rgba(0,0,0,0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: 0.6 },
          "50%": { opacity: 1 },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin-slow 12s linear infinite",
        "fade-up": "fade-up 0.6s ease forwards",
      },
      backgroundSize: {
        200: "200% 200%",
      },
    },
  },
  plugins: [],
};
