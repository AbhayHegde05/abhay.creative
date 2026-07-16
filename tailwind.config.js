/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#09090B',
        card: '#111113',
        primary: '#7C3AED',
        secondary: '#3B82F6',
        text: '#FFFFFF',
        muted: '#A1A1AA'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'blur-reveal': 'blurReveal 1s ease-out forwards',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'noise': 'noise 0.2s steps(10) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        blurReveal: {
          '0%': { opacity: '0', filter: 'blur(20px)' },
          '100%': { opacity: '1', filter: 'blur(0)' }
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 30px rgba(124, 58, 237, 0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(124, 58, 237, 0.5), 0 0 100px rgba(59, 130, 246, 0.3)' }
        },
        noise: {
          '0%': { backgroundPosition: '0 0' },
          '10%': { backgroundPosition: '10% 10%' },
          '20%': { backgroundPosition: '20% 20%' },
          '30%': { backgroundPosition: '30% 30%' },
          '40%': { backgroundPosition: '40% 40%' },
          '50%': { backgroundPosition: '50% 50%' },
          '60%': { backgroundPosition: '60% 60%' },
          '70%': { backgroundPosition: '70% 70%' },
          '80%': { backgroundPosition: '80% 80%' },
          '90%': { backgroundPosition: '90% 90%' },
          '100%': { backgroundPosition: '100% 100%' }
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(rgba(124, 58, 237, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.05) 1px, transparent 1px)'
      },
      backgroundSize: {
        'grid': '60px 60px'
      },
      boxShadow: {
        'glow-primary': '0 0 40px rgba(124, 58, 237, 0.4)',
        'glow-secondary': '0 0 40px rgba(59, 130, 246, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      },
      backdropBlur: {
        'glass': '20px'
      }
    }
  },
  plugins: []
}