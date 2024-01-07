import type { Config } from 'tailwindcss'
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'custom-one': '#14181C', // replace '#123456' with your hex code
        'custom-one-light': '#2C3038',
        'custom-one-dark': '#0D0F12',
        'custom-two': '#9ab',
        'custom-three':'#D8E0E8'
      },
      keyframes: {
        'color-change': {
          '0%': { backgroundColor: '#14181C' },
          '50%': { backgroundColor: '#282C34' },
          '100%': { backgroundColor: '#14181C' },
        },
      },
      animation: {
        'color-change': 'color-change 2s linear infinite',

      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui()
  ],
}
export default config
