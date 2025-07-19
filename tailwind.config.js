/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'in': 'in 0.5s ease-out',
        'fade-in-50': 'fadeIn 0.5s ease-out',
        'slide-in-from-top-2': 'slideInFromTop 0.2s ease-out',
        'slide-in-from-top-4': 'slideInFromTop 0.4s ease-out',
        'slide-in-from-top-6': 'slideInFromTop 0.6s ease-out',
        'slide-in-from-bottom-2': 'slideInFromBottom 0.2s ease-out',
        'slide-in-from-bottom-4': 'slideInFromBottom 0.4s ease-out',
        'slide-in-from-bottom-6': 'slideInFromBottom 0.6s ease-out',
        'slide-in-from-bottom-8': 'slideInFromBottom 0.8s ease-out',
        'slide-in-from-bottom-10': 'slideInFromBottom 1.0s ease-out',
        'slide-in-from-left-4': 'slideInFromLeft 0.4s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInFromTop: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInFromBottom: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};