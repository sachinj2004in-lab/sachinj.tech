/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#ff1f1f',
          hover: '#e01616',
          muted: 'rgba(255, 31, 31, 0.12)',
        },
        ink: '#0d0d0d',
        paper: '#ffffff',
        muted: '#5e5e5e',
        hairline: 'rgba(13, 13, 13, 0.09)',
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        sans: ['"Inter Tight Variable"', '"Inter Tight"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.18em',
      },
    },
  },
  plugins: [],
}
