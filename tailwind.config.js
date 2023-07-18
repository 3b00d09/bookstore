/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend:{
        colors:{
          "secondary-purple":"#6C7193",
          "secondary-white":"#D9D9D9"
        },
      }

    },
    plugins: [],
  }