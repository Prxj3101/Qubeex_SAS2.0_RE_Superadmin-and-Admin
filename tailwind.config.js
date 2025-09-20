/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        shine: {
          '0%': { 'background-position': '200% center' },
          '100%': { 'background-position': '-200% center' },
        },
        'border-shine': {
          '0%': { 'border-image-source': 'linear-gradient(270deg, #8b5cf6, #ec4899, #3b82f6, #facc15)' },
          '50%': { 'border-image-source': 'linear-gradient(90deg, #8b5cf6, #ec4899, #3b82f6, #facc15)' },
          '100%': { 'border-image-source': 'linear-gradient(270deg, #8b5cf6, #ec4899, #3b82f6, #facc15)' },
        },
      },
      animation: {
        'shine-gradient': 'shine 3s linear infinite',
        'border-shine': 'border-shine 3s linear infinite',
      },
      backgroundSize: {
        '200': '200% 100%',
      },
    },
  },
  plugins: [],
};
