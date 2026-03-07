import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "pulse-slow": "pulseSlow 10s ease-in-out infinite",
        "pulse-slower": "pulseSlower 16s ease-in-out infinite",
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.25)" },
        },
        pulseSlower: {
          "0%, 100%": { transform: "scale(1.1)" },
          "50%": { transform: "scale(1.35)" },
        },
      },
    },
  },
  plugins: [],
}

export default config