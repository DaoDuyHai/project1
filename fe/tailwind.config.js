/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fbf7fd',
          100: '#f5ecfa',
          200: '#edd9f5',
          500: '#7e22ce',
          600: '#6b21a8',
          700: '#532470',
          800: '#43195d',
          900: '#321047',
          primary: '#532470',
          dark: '#35124b',
          light: '#faf6fd',
        },
        accent: {
          red: '#c91f28',
          gold: '#eab308',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        cursive: ['"Alex Brush"', '"Dancing Script"', 'cursive'],
      }
    },
  },
  plugins: [],
}
