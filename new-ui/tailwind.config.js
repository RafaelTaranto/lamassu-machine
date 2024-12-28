/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      amazonite: {
        primary: '#37e8d7',
        secondary: '#2cb9ac',
        tertiary: '#34d9c8',
        accent: '#0e4160',
      },
      salmon: {
        primary: '#fe7f78',
        secondary: '#cb6560',
        tertiary: '#e6746d',
        accent: '#403c51',
      },
      charcoal: '#4a4a4a',
      concrete: '#f2f2f2',
      white: '#ffffff',
      black: '#000000',
    },
    extend: {},
  },
  plugins: [],
}