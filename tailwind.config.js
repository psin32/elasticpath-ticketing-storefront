/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-blue-500',
    'bg-gray-500',
    'bg-red-500',
    'bg-white-500',
    'bg-teal-500',
    'bg-purple-500',
    'bg-black-500',
    'bg-green-500',
    'bg-yellow-500'
  ],
  theme: {
    extend: {
      colors: {
        // primary: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#0033CC", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a", "950": "#172554" }
        primary: colors.teal
      },
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      transitionDuration: {
        '4000': '4000ms',
      }
    },
    fontFamily: {
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

