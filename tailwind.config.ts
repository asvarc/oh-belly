import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Oh Belly brand palette — Soft Pop
        cream: "#FFF8F0",
        blush: "#FFD6C8",
        peach: "#FFB899",
        coral: "#FF7A5C",
        mint: "#B8F0D8",
        sage: "#7DDCB0",
        lavender: "#E8D5FF",
        violet: "#C99EFF",
        lemon: "#FFFACD",
        sunny: "#FFE566",
        sky: "#C8EEFF",
        bubble: "#A8DCFF",
        // Neutrals
        ink: "#1A1A2E",
        "ink-light": "#3D3D5C",
        muted: "#9898B2",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "7xl": ["4.5rem", { lineHeight: "1.05" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "0.95" }],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-mid": "float 6s ease-in-out infinite 1s",
        "float-fast": "float 4s ease-in-out infinite 0.5s",
        "spin-slow": "spin 20s linear infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-20px) rotate(2deg)" },
          "66%": { transform: "translateY(-10px) rotate(-1deg)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "radial-gradient(ellipse 120% 80% at 50% -10%, #FFD6C8 0%, #FFF8F0 60%, #C8EEFF 100%)",
        "mint-gradient": "linear-gradient(135deg, #B8F0D8 0%, #C8EEFF 100%)",
        "peach-gradient": "linear-gradient(135deg, #FFD6C8 0%, #FFB899 100%)",
        "violet-gradient": "linear-gradient(135deg, #E8D5FF 0%, #C99EFF 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(255, 184, 153, 0.15), inset 0 1px 0 rgba(255,255,255,0.6)",
        "glass-strong": "0 20px 60px rgba(255, 122, 92, 0.2), inset 0 1px 0 rgba(255,255,255,0.8)",
        "card-soft": "0 4px 24px rgba(26, 26, 46, 0.06), 0 1px 4px rgba(26,26,46,0.04)",
        "card-hover": "0 12px 48px rgba(26, 26, 46, 0.12), 0 4px 12px rgba(26,26,46,0.06)",
        "can-glow-coral": "0 0 60px rgba(255,122,92,0.4), 0 0 120px rgba(255,122,92,0.2)",
        "can-glow-mint": "0 0 60px rgba(125,220,176,0.4), 0 0 120px rgba(125,220,176,0.2)",
        "can-glow-violet": "0 0 60px rgba(201,158,255,0.4), 0 0 120px rgba(201,158,255,0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
