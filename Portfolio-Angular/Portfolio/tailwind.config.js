/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {display: ['responsive', 'group-hover', 'group-focus', 'focus-within', 'hover', 'focus']},
  },
  variants: {},
  plugins: [],
}
