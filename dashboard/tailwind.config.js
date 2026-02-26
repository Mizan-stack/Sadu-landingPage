/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#faf8f5',
        sand: '#e8e4df',
        beige: '#d4cfc7',
        maroon: '#722f37',
        'maroon-dark': '#5a252c',
        'maroon-light': '#a34750',
        emerald: '#0d6b5c',
        'emerald-dark': '#0a5548',
      },
      backgroundColor: {
        'dark-bg': '#1a1a1a',
        'dark-surface': '#2d2d2d',
      },
    },
  },
  plugins: [],
};
