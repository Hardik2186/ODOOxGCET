/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // REQUIRED for the toggle to work
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // You can define custom colors here if needed
      }
    },
  },
  plugins: [],
}