/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./posts/*.html",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

