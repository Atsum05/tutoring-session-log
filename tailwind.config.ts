import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f5f0e6",
        ink: "#22303a",
        faded: "#6b6a63",
        rule: "#ddd3c1",
        margin: "#c0392b",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },

      keyframes: {
        "ink-in": {
          from: { opacity: "0", transform: "translateY(6px)", filter: "blur(2px)" },
          to: { opacity: "1", transform: "none", filter: "none" },
        },
        "draw-x": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        "fresh-ink": {
          from: { backgroundColor: "rgb(192 57 43 / 0.12)" },
          to: { backgroundColor: "transparent" },
        },
      },
      animation: {
        "ink-in": "ink-in 500ms cubic-bezier(0.2, 0.7, 0.2, 1) both",
        "draw-x": "draw-x 700ms cubic-bezier(0.65, 0, 0.35, 1) both",
        "fresh-ink": "fresh-ink 1.8s ease-out both",
      },

    },
  },
  plugins: [],
};

export default config;