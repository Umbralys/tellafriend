/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float-slow': 'float 20s ease-in-out infinite',
        'float-slower': 'float 25s ease-in-out infinite reverse',
        'beam-slow': 'beam 15s ease-in-out infinite',
        'beam-slower': 'beam 18s ease-in-out infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'twinkle-slow': 'twinkle 5s ease-in-out infinite',
        'spotlight-slow': 'spotlight 8s ease-in-out infinite',
        'spotlight-reverse': 'spotlight 12s ease-in-out infinite reverse',
        'glow-pulse': 'glow 6s ease-in-out infinite',
        'shimmer': 'shimmer 10s ease-in-out infinite',
        'pulse-gradient': 'pulseGradient 2s ease-in-out infinite', // New animation
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-20px) translateX(10px)' },
          '50%': { transform: 'translateY(0) translateX(20px)' },
          '75%': { transform: 'translateY(20px) translateX(10px)' },
        },
        beam: {
          '0%, 100%': { opacity: '0.2', transform: 'translateY(0) scale(1)' },
          '50%': { opacity: '0.1', transform: 'translateY(20px) scale(1.1)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.1', transform: 'scale(0.8)' },
        },
        spotlight: {
          '0%, 100%': { 
            transform: 'translate(0%, 0%) rotate(0deg)',
            opacity: '0.1'
          },
          '25%': { 
            transform: 'translate(20%, -15%) rotate(90deg)',
            opacity: '0.3'
          },
          '50%': { 
            transform: 'translate(-10%, 20%) rotate(180deg)',
            opacity: '0.1'
          },
          '75%': { 
            transform: 'translate(-25%, -10%) rotate(270deg)',
            opacity: '0.2'
          }
        },
        glow: {
          '0%, 100%': { 
            opacity: '0.2',
            filter: 'blur(20px)'
          },
          '50%': { 
            opacity: '0.4',
            filter: 'blur(12px)'
          }
        },
        shimmer: {
          '0%, 100%': {
            'background-position': '200% center',
            opacity: '0.1'
          },
          '50%': {
            'background-position': '-200% center',
            opacity: '0.2'
          }
        },
        pulseGradient: {  // New keyframes
          '0%, 100%': { 
            opacity: '1', 
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '0.85', 
            transform: 'scale(1.09)'
          },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}


