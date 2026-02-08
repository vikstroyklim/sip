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
        primary: {
          DEFAULT: "#0A1628", // Deep dark blue
          wood: "#2C2416",   // Woody tone
        },
        accent: {
          DEFAULT: "#FF6B35", // Energetic orange
          green: "#2D6A4F",   // Eco green
        },
        background: {
          DEFAULT: "#FFFFFF",
          gray: "#F5F5F7",
        },
        text: {
          DEFAULT: "#1C1C1E", // Charcoal black
          muted: "#6E6E73",   // Muted gray
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["SF Pro Display", "Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
      },
    },
  },
  plugins: [],
};
export default config;
