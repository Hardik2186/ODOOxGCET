/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Adding custom colors to match your dark-mode UI
        background: "#0a0a0a",
        card: "#121212",
      },
    },
  },
  plugins: [],
}