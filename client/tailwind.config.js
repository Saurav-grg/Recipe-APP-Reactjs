/** @type {import('tailwindcss').Config} \*/
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#f4f2ff',
        primary: '#15ed6f',
        secondary: '#f8a192',
        accent: '#f0cd48',
      },
    },
  },
  plugins: [],
};
