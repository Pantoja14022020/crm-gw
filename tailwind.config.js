/** @type {import('tailwindcss').Config} 
/*export default {
  content: ["./index.html","./src/**//*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}*/

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        'base': '0.6rem'
      }
    },
  },
  plugins: [],
});