/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#FF1F1F',
          hover: '#E01616',
          muted: 'rgba(255, 31, 31, 0.12)',
          glow: 'rgba(255, 31, 31, 0.35)',
        },
        cinematic: {
          black: '#0A0B0E',
          dark: '#12141A',
          card: '#161922',
          border: 'rgba(255, 255, 255, 0.08)',
          light: '#F8F9FA',
          lightCard: '#FFFFFF',
          lightBorder: 'rgba(0, 0, 0, 0.08)',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        tightest: '-.04em',
      },
      backgroundImage: {
        'grid-pattern-light': "radial-gradient(circle, rgba(0, 0, 0, 0.06) 1px, transparent 1px)",
        'grid-pattern-dark': "radial-gradient(circle, rgba(255, 255, 255, 0.07) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
