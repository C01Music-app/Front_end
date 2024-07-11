/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-500': '#00aeef',
        'green-500': '#8dc63f',
        'orange-500': '#f58220',
        'pink-500': '#ed145b',
        'purple-500': '#1F072FFF',
      },
      height:{
        '80vh':'80vh',
      },
      width:{
        '80vw':'80vw',
      },
    },
  },
  plugins: [],
}
