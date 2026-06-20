/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 👉 This explicitly forces Tailwind to listen to the toggle button
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};