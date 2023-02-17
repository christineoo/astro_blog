/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

const disabledCss = {
  "code::before": false,
  "code::after": false,
  "blockquote p:first-of-type::before": false,
  "blockquote p:last-of-type::after": false,
  pre: false,
  // code: false,
  "pre code": false,
  "pre div": false,
  "code::before": false,
  "code::after": false,
  a: {
    "&:hover": {
      color: colors.purple[700],
    },
  },
};

module.exports = {
  darkMode: "class",
  content: [
    "./public/**/*.html",
    "./pages/**/*.{js,ts,jsx,tsx}",
    // './components/**/*.{js,ts,jsx,tsx}',
    "./src/**/*.{astro,js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: colors.purple[700],
          secondary: colors.purple[800],
          dark: {
            primary: colors.purple[300],
            secondary: colors.purple[500],
          },
          accent: {
            gray: {
              light: colors.gray[300],
              dark: colors.gray[500],
            },
            default: colors.blue[700],
          },
        },
      },
      typography: {
        DEFAULT: { css: disabledCss },
        // sm: { css: disabledCss },
        // lg: { css: disabledCss },
        // xl: { css: disabledCss },
        // '2xl': { css: disabledCss },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
