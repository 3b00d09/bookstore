/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend:{
        colors: {
          'text': '#120b19',
          'background': '#eae3f2',
          'primary': '#562e85',
          'secondary': '#d8cae7',
          'accent': '#451485',
         },         
      },
      fontSize: {
        sm: '0.750rem',
        base: '1rem',
        xl: '1.333rem',
        '2xl': '1.777rem',
        '3xl': '2.369rem',
        '4xl': '3.158rem',
        '5xl': '4.210rem',
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },

    },
    plugins: [],
  }