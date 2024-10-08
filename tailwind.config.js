/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rubik", "Arial", "Helvetica", "sans-serif"],
      },
      backgroundImage: {
        "bg-pattern": "url('./assets/image/bg.webp')",
      },
    },
  },
  plugins: [],
};
