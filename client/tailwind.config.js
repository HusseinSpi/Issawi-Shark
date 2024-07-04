/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#08D9D6",
        secondaryColor: "#00ADB5",
        thirdColor: "#EEEEEE",
      },
    },
  },
  plugins: [],
};
