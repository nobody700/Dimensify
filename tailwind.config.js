/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4fe',
          100: '#dfe8fd',
          200: '#c7d5fb',
          300: '#a1b8f8',
          400: '#7491f3',
          500: '#506aed',
          600: '#3a49e3',
          700: '#3038cf',
          800: '#2a30a8',
          900: '#292e84',
          950: '#1a1c4d',
        },
        secondary: {
          50: '#f2fcfd',
          100: '#e7f9fc',
          200: '#c8f1f7',
          300: '#98e4f0',
          400: '#5fcee6',
          500: '#39b6d4',
          600: '#2792b3',
          700: '#207592',
          800: '#1f6078',
          900: '#1e5165',
          950: '#11344a',
        },
        accent: {
          50: '#fdf3f9',
          100: '#fbe8f5',
          200: '#f9d1ec',
          300: '#f5addc',
          400: '#ef7cc3',
          500: '#e550a8',
          600: '#d42e8c',
          700: '#b71d6f',
          800: '#971b5a',
          900: '#7d1a4c',
          950: '#4e0a2b',
        },
        dark: {
          50: '#f6f6f7',
          100: '#e2e2e7',
          200: '#c4c4ce',
          300: '#a1a1b1',
          400: '#7e7e93',
          500: '#65657b',
          600: '#505064',
          700: '#424252',
          800: '#383844',
          900: '#27272e',
          950: '#1a1a1f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};