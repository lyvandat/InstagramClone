/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        stretch: {
          "0%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        leave: {
          "0%, 100%": { transform: "scale(1)" },
          "60%": { transform: "scale(1.3)" },
        },
        circle: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate{360deg)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar-hide")],
};
