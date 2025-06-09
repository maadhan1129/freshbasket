/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fffdf0',
          100: '#fff9d9',
          200: '#fff3b3',
          300: '#ffed8c',
          400: '#ffe766',
          500: '#FFD700', // primary yellow
          600: '#e6c200',
          700: '#ccad00',
          800: '#b39900',
          900: '#998500',
          950: '#4d4200',
        },
        secondary: {
          50: '#ffffff',
          100: '#fafafa',
          200: '#f5f5f5',
          300: '#e5e5e5',
          400: '#d4d4d4',
          500: '#ffffff', // secondary white
          600: '#e6e6e6',
          700: '#cccccc',
          800: '#b3b3b3',
          900: '#999999',
          950: '#4d4d4d',
        },
        accent: {
          50: '#fffdf0',
          100: '#fff9d9',
          200: '#fff3b3',
          300: '#ffed8c',
          400: '#ffe766',
          500: '#FFC107', // accent amber
          600: '#e6ae00',
          700: '#cc9b00',
          800: '#b38800',
          900: '#997500',
          950: '#4d3a00',
        },
        success: {
          500: '#FFD700', // success yellow
        },
        warning: {
          500: '#FFC107', // warning amber
        },
        error: {
          500: '#ef4444', // error red
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};