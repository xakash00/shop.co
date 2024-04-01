
const defaultTheme = require("tailwindcss/defaultTheme");


const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'sm': '576px',
      'md': '960px',
      'lg': '1440px',
    },

    extend: {
      colors: {
        primary: {
          DEFAULT: "#000000",
          light: "#F0F0F0",
        },
      },
      // container: {
      //   center: true,
      //   padding: "1rem",
      //   screens: {
      //     sm: "1270px",
      //     md: "1270px",
      //     lg: "1270px",
      //     xl: "1270px",
      //     "2xl": "1270px",
      //   },
      // },
      fontFamily: {
        body: ["Satoshi", ...defaultTheme.fontFamily.sans],
        integral: ["Integral CF", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
export default config
