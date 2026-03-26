/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif],
        display: ['Inter', sans-serif],
      },
      colors: {
        // Futuristic Dark Mode Palette
        background: {
          primary: '#0B0F19',    // Obsidian / Midnight Base
          secondary: '#0E1424',  // Slightly lighter obsidian
          tertiary: '#151D33',   // Surface Primary
        },
        accent: {
          cyan: '#00E5FF',       // Electric Blue / Cyan
          magenta: '#D500F9',    // Cyber Purple
          purple: '#651FFF',     // Deep Violet
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.03)',
          medium: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.1)',
        },
        dark: {
          bg: '#08080C',
          card: '#12121A',
          accent: '#1A1A2E',
          border: 'rgba(255, 255, 255, 0.1)',
        }
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '16px',
        md: '24px',
        lg: '32px',
        xl: '48px',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 240, 255, 0.3)',
        'glow-md': '0 0 20px rgba(0, 240, 255, 0.4)',
        'glow-lg': '0 0 30px rgba(0, 240, 255, 0.5)',
        'glow-xl': '0 0 50px rgba(0, 240, 255, 0.6)',
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.3)',
        'neon-magenta': '0 0 20px rgba(181, 53, 246, 0.5), 0 0 40px rgba(181, 53, 246, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'particle-burst': 'particleBurst 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 240, 255, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        particleBurst: {
          '0%': { transform: 'scale(0) translate(0, 0)', opacity: '1' },
          '100%': { transform: 'scale(1) translate(var(--tx), var(--ty))', opacity: '0' },
        },
      },
      transitionTimingFunction: {
        'power4': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'back-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'deep-space': 'linear-gradient(135deg, #0B0F19 0%, #0E1424 50%, #151D33 100%)',
      }
    },
  },
  plugins: [],
}
