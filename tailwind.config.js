/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  prefix: 'tw-',
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [],
};