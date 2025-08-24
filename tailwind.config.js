/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // scan your React files
  ],
  theme: {
    extend: {
      colors: {
        // optional: add brand colors
        primary: "#6366f1", // indigo-500
        secondary: "#06b6d4", // cyan-500
        accent: "#f59e0b", // amber-500
      },
    },
  },
  plugins: [],
}
