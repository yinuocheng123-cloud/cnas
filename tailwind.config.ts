import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a",
        ink: "#1f2937",
        muted: "#64748b",
        subtle: "#94a3b8",
        line: "#e5e7eb",
        paper: "#ffffff",
        surface: "#f8fafc",
        card: "#fbfcfd",
        moss: "#1e3a8a",
        clay: "#64748b",
        skyglass: "#f8fafc",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"],
      },
      fontSize: {
        display: ["2.625rem", { lineHeight: "1.2", fontWeight: "700" }],
        title: ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        body: ["0.9375rem", { lineHeight: "1.6", fontWeight: "400" }],
        meta: ["0.8125rem", { lineHeight: "1.5", fontWeight: "400" }],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
