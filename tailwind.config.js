/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}", // optional but useful for Next.js
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        grayBg: "#999999",       // background color (like screenshot)
        offWhite: "#d1d1d1",     // subtle hover color
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite', // your slow rotation
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)', // natural spring feel
      },
    },
  },
  plugins: [],
};
