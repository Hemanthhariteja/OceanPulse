/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-cyan': '#00d9ff',
        'secondary-cyan': '#0ea5e9',
        'deep-black': '#0a0e1a',
        'dark-gray': '#0f1419',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.7',
            transform: 'scale(1.05)',
          },
        },
        'heartbeat': {
          '0%, 100%': {
            transform: 'scale(1)',
            boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
          },
          '25%': {
            transform: 'scale(1.1)',
            boxShadow: '0 0 40px rgba(0, 217, 255, 0.3), 0 0 60px rgba(0, 217, 255, 0.3)',
          },
          '50%': {
            transform: 'scale(1)',
            boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
          },
        },
      },
    },
  },
  plugins: [],
}
