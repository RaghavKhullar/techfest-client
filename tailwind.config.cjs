/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    content: [
      "./src/components/**/*.tsx",
      "./src/pages/**/*.tsx",
      "./index.html",
    ],
    theme: {
      fontFamily: {
        bebus: "'Bebas Neue', sans-serif",
        fira: "'Fira Sans', sans-serif",
      },
    },
    plugins: [],
  };
  