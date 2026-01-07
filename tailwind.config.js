/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],

  
  safelist: [
    "bg-gray-100",
    "text-gray-800",
    "p-4",
    "text-xl",
  ],

  theme: {
    extend: {},
  },
  plugins: [],
};
