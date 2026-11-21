import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#07080A",
        charcoal: "#0F1115",
        graphite: "#181B22",
        silver: "#A7B0C0",
        "electric-blue": "#2563EB",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      letterSpacing: {
        editorial: "-0.03em",
        wideLabel: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
