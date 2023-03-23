/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      allMobile: { min: "0px", max: "639px" },
      mobileS: { min: "0px", max: "374px" },
      mobileM: { min: "375px", max: "424px" },
      mobileL: { min: "425px", max: "640px" },
      sm: { min: "641px", max: "767px" },
      md: { min: "768px", max: "1023px" },
      lg: { min: "1024px", max: "1281px" },
      xl: { min: "1282px", max: "1535px" },
      "2xl": "1536px",
    },
    extend: {},
  },
  plugins: [],
};
