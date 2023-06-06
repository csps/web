/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "./src/**/*.{vue,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'primary': '#4A2558',
        'secondary': '#D4A923',
        'tertiary': "#06203F"
      }
    },
  },
  plugins: [],
}

