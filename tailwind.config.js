import {nextui} from '@nextui-org/theme'
import { color } from 'framer-motion'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      '3xs': '0.5rem',
      sm: '0.875rem',
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}
