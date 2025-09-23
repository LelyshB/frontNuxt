import type { Config } from 'tailwindcss'

// Tailwind configuration for the Cosmic Astrology project.  This file
// instructs Tailwind to look for utility classes within the `app` and
// layout files and extends the default theme with our custom colour
// palette, gradients, shadows and animations.  The colours are
// defined via CSS custom properties in `assets/css/main.css` which
// allows runtime manipulation via CSS.

export default {
  darkMode: ['class'],
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app.vue',
    './error.vue'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      colors: {
        // Background system
        'bg-950': 'hsl(var(--bg-950))',
        'bg-900': 'hsl(var(--bg-900))',
        surface: 'hsl(var(--surface))',

        // Text system
        'text-base': 'hsl(var(--text-base))',
        'text-muted': 'hsl(var(--text-muted))',

        // Accent colours
        amethyst: 'hsl(var(--amethyst))',
        'aurora-teal': 'hsl(var(--aurora-teal))',
        rose: 'hsl(var(--rose))',
        amber: 'hsl(var(--amber))',

        // Legacy aliases
        violet: 'hsl(var(--amethyst))',
        magenta: 'hsl(var(--rose))',
        mint: 'hsl(var(--aurora-teal))',
        starlight: 'hsl(var(--amber))'
      },
      backgroundImage: {
        'gradient-cosmic': 'var(--gradient-cosmic)'
      },
      boxShadow: {
        'glow-violet': 'var(--glow-violet)',
        'glow-magenta': 'var(--glow-magenta)'
      },
      transitionTimingFunction: {
        cosmic: 'var(--ease-cosmic)'
      },
      keyframes: {
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        },
        shimmer: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' }
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        tilt: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' }
        }
      },
      animation: {
        orbit: 'orbit 20s linear infinite',
        shimmer: 'shimmer 2.3s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        tilt: 'tilt 0.6s ease-in-out'
      }
    }
  },
  plugins: []
} satisfies Config