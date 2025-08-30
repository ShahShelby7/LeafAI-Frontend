/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: ["light"], // Using "light" as the default theme
    darkTheme: "light" // This ensures light theme is used even when system is in dark mode
  },
}