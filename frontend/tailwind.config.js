import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
        "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
      {
        convoflow: {
          "primary": "#2563eb",          // Deep Blue - elegant action color
          "primary-focus": "#1d4ed8",
          "primary-content": "#ffffff",

          "secondary": "#0d9488",        // Muted Teal - less neon, more mature
          "secondary-content": "#ffffff",

          "accent": "#9333ea",           // Rich Violet - balanced vibrancy
          "accent-content": "#ffffff",

          "neutral": "#1e293b",          // Slate - perfect for dark base
          "neutral-content": "#f1f5f9",

          "base-100": "#0f172a",         // Deep navy background
          "base-200": "#1c2434",         // Slightly lighter for containers
          "base-content": "#f1f5f9",     // Brighter text for readability

          "info": "#0ea5e9",             // Cyan
          "success": "#10b981",          // Emerald
          "warning": "#f59e0b",          // Amber
          "error": "#ef4444",            // Red
        },
      },
      "dark", // fallback
    ],
  },
}
