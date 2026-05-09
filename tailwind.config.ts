import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#dc2626",
          hover: "#b91c1c",
        },

        background: {
          light: "#FFFFFF",
          dark: "#050505",
        },

        foreground: {
          light: "#000000",
          dark: "#F5F5F5",
        },

        card: {
          light: "#FFFFFF",
          dark: "#111111",
        },

        borderDark: "#262626",
      },

      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        rajdhani: ["var(--font-rajdhani)", "sans-serif"],
      },

      animation: {
        "spin-slow": "spin 20s linear infinite",
        "spin-slow-reverse": "spin-reverse 25s linear infinite",
        "fade-in": "fade-in 1.5s ease-out forwards",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },

      keyframes: {
        "spin-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },

        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        "pulse-soft": {
          "0%, 100%": {
            opacity: "0.9",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.03)",
          },
        },

        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },
    },
  },

  plugins: [],
};

export default config;