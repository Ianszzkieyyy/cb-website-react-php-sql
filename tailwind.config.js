// tailwind.config.js (ESM version)
import { defineConfig } from 'tailwindcss'
import scrollbar from 'tailwind-scrollbar'

export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 6s linear infinite",
      },
    },
  },
  plugins: [
    scrollbar,
  ],
});