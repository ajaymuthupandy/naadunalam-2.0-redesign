import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Earth (mann) + sun gold, from the logo's soil and sun; forest from its leaves
        "nn-soil": "#7E3814",
        "nn-soil-dk": "#5A270D",
        "nn-gold": "#F5B335",
        "nn-gold-lt": "#FFD98A",
        "nn-green": "#143F2A",
        "nn-green-dk": "#0D2C1D",
        "nn-leaf": "#365F3F",
        "nn-leaf-dk": "#263C2A",
        "nn-cream": "#FBF1DE",
        "nn-paper": "#F4E4C3",
        "nn-bg": "#FBF1DE",
        "nn-card": "#FFF9EE",
        "nn-line": "#E6D2AC",
        "nn-ink": "#2A190C",
        "nn-muted": "#6B5440",
      },
      fontFamily: {
        display: ["'Bricolage Grotesque'", "Outfit", "sans-serif"],
        sans: ["Outfit", "system-ui", "sans-serif"],
        tamil: ["'Noto Sans Tamil'", "Outfit", "sans-serif"],
      },
      boxShadow: {
        nn: "0 1px 2px rgba(42,25,12,.06), 0 14px 30px -16px rgba(42,25,12,.35)",
        "nn-hover": "0 2px 4px rgba(42,25,12,.08), 0 30px 50px -22px rgba(42,25,12,.5)",
      },
    },
  },
  plugins: [],
};

export default config;
