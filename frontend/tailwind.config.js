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
      {
        convoflow: {
          "primary": "#3b82f6",          // Blue
          "primary-focus": "#2563eb",
          "primary-content": "#ffffff",

          "secondary": "#14b8a6",        // Teal
          "secondary-content": "#ffffff",

          "accent": "#a855f7",           // Violet
          "accent-content": "#ffffff",

          "neutral": "#1e293b",          // Slate
          "neutral-content": "#f1f5f9",

          "base-100": "#0f172a",         // Deep dark background
          "base-200": "#1e293b",         // Surface color
          "base-content": "#e2e8f0",     // Light text

          "info": "#0ea5e9",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
      "dark" // fallback
    ],
  },
}

