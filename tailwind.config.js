/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
        '0%, 100%': { transform: 'scale(0.5)' },
        '50%': { transform: 'scale(1)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 }
        }
        // error: {
        //   '0%': { background: 'red' },
        //   '50%': { background: 'green' },
        //   '100%': { background: 'blue' }
        // }
      },
      animation: {
        wiggle: 'wiggle 1s infinite',
        blink: 'blink 1s infinite'
        // error: 'error 1ms infinite'
      }
    },
  },
  plugins: [],
}