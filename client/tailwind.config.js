/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#373A40",
        secondaryColor: "#EEEEEE",
        thirdColor: "#DC5F00",
        fourColor: "#686D76",
        thirdColorO: "#DC5F00",
      },
    },
  },
  plugins: [],
};
