/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '.dark'],
  theme: {
    extend: {
      colors: {
        'alca-ground': 'var(--ground)',
        'alca-surface': 'var(--surface)',
        'alca-ink': 'var(--ink)',
        'alca-red': 'var(--red)',
      }
    },
  },
  plugins: [],
}