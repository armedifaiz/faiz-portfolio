/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#050505',
          900: '#0a0a0a',
          800: '#121212',
          700: '#1c1c1c',
          600: '#2a2a2a',
        },
        accent: {
          DEFAULT: '#ef4444',
          soft: '#f87171',
          dim: '#7f1d1d',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
