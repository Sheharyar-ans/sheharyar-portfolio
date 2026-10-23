/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#080808',
        surface: {
          1: '#111111',
          2: '#171717',
          3: '#222222',
        },
        accent: {
          DEFAULT: '#B7FF3C',
          glow: 'rgba(183, 255, 60, 0.25)',
          soft: 'rgba(183, 255, 60, 0.08)',
        },
        brand: {
          border: 'rgba(255, 255, 255, 0.10)',
          borderHover: 'rgba(255, 255, 255, 0.22)',
          muted: '#737373',
          secondary: '#A3A3A3',
        }
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
