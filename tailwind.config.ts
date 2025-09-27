import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

/**
 * Tailwind configuration copied from the original React project.  It
 * exposes the same colour palette, fonts and animations using CSS
 * custom properties defined in `assets/css/index.css`.  The content
 * globs point at the new Nuxt project's directory structure.
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        // Background System
        'bg-950': 'hsl(var(--bg-950))',
        'bg-900': 'hsl(var(--bg-900))',
        surface: 'hsl(var(--surface))',
        // Text System
        'text-base': 'hsl(var(--text-base))',
        'text-muted': 'hsl(var(--text-muted))',
        // Accent Colours
        amethyst: 'hsl(var(--amethyst))',
        'aurora-teal': 'hsl(var(--aurora-teal))',
        rose: 'hsl(var(--rose))',
        amber: 'hsl(var(--amber))',
        // Legacy aliases
        violet: 'hsl(var(--amethyst))',
        magenta: 'hsl(var(--rose))',
        mint: 'hsl(var(--aurora-teal))',
        starlight: 'hsl(var(--amber))',
        // Generic palette (for compatibility with shadcn/ui elements)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      backgroundImage: {
        'gradient-cosmic': 'var(--gradient-cosmic)',
        'gradient-nebula': 'var(--gradient-nebula)',
      },
      boxShadow: {
        'glow-violet': 'var(--glow-violet)',
        'glow-magenta': 'var(--glow-magenta)',
        glass: 'var(--shadow-glass)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      transitionTimingFunction: {
        cosmic: 'var(--ease-cosmic)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        tilt: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        orbit: 'orbit 20s linear infinite',
        shimmer: 'shimmer 1000ms linear',
        'fade-in-up': 'fade-in-up 600ms cubic-bezier(0.22,1,0.36,1) forwards',
        tilt: 'tilt 0.6s ease-in-out',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
