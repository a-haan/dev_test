/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  // corePlugins: {
  //   preflight: false,
  // },
  // important: "#root",
  theme: {
    extend: {
      colors: {
        background: {
          default: '#191c1b',
          onDefault: '#e1e3e0',
          surface: '#191c1b',
          onSurface: '#e1e3e0',
          outline: '#89938e',
          surfaceVariant: '#3f4945',
          onSurfaceVariant: '#bfc9c3',
        },
        primary: {
          default: '#00e0b5',
          onPrimary: '#00382b',
          primaryContainer: '#005140',
          onPrimaryContainer: '#34fecf',
        },
        secondary: {
          default: '#4cdadc',
          onSecondary: '#003738',
          secondaryContainer: '#004f51',
          onSecondaryContainer: '#6ff6f9',
        },
        tertiary: {
          default: '#a8cbe2',
          onTertiary: '#0d3446',
          tertiaryContainer: '#284b5d',
          onTertiaryContainer: '#c4e7ff',
        },
      },
      fontFamily: {
        display: ['var(--font-sf)', 'system-ui', 'sans-serif'],
        default: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        // Tooltip
        'slide-up-fade': 'slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-fade': 'slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        // Tooltip
        'slide-up-fade': {
          '0%': { opacity: 0, transform: 'translateY(6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-down-fade': {
          '0%': { opacity: 0, transform: 'translateY(-6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
