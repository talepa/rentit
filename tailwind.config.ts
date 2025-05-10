
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        border: '#9bd5e9', // Light blue from palette
        input: '#9bd5e9',
        ring: '#053e5d', // Medium dark blue from palette
        background: '#f8fafc', // Light background
        foreground: '#01030d', // Darkest color from palette for text
        primary: {
          DEFAULT: '#053e5d', // Medium dark blue from palette
          foreground: '#FFFFFF', // Text (Light)
        },
        secondary: {
          DEFAULT: '#4f8391', // Medium blue from palette
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#9bd5e9', // Light blue from palette
          foreground: '#01030d', // Dark text
        },
        muted: {
          DEFAULT: '#e2e8f0',
          foreground: '#64748b',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#FFFFFF',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#01030d',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#01030d',
        },
        // Adding app-specific colors
        appbg: '#f8fafc',
        textdark: '#01030d',
        // Custom palette colors
        palette: {
          lightblue: '#9bd5e9',
          mediumblue: '#4f8391',
          darkblue: '#053e5d',
          navyblue: '#0a2247',
          darkest: '#01030d'
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(155, 213, 233, 0.5)" },
          "50%": { boxShadow: "0 0 15px rgba(155, 213, 233, 0.8)" },
        },
        "slide-up-fade": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down-fade": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)", opacity: "0.8" },
          "70%": { transform: "scale(0.9)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "wave": {
          "0%": { transform: "translateX(0) translateZ(0) scaleY(1)" },
          "50%": { transform: "translateX(-25%) translateZ(0) scaleY(0.55)" },
          "100%": { transform: "translateX(-50%) translateZ(0) scaleY(1)" },
        },
        "flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s infinite ease-in-out",
        "slide-up-fade": "slide-up-fade 0.3s ease-out",
        "slide-down-fade": "slide-down-fade 0.3s ease-out",
        "bounce-subtle": "bounce-subtle 2s infinite ease-in-out",
        "fade-in": "fade-in 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "float": "float 3s infinite ease-in-out",
        "spin-slow": "spin-slow 10s linear infinite",
        "bounce-in": "bounce-in 0.7s ease-out",
        "wave": "wave 25s -3s linear infinite",
        "flow": "flow 15s ease infinite",
      },
      skew: {
        '30': '30deg',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'blue-gradient': 'linear-gradient(to right, #053e5d, #0a2247)',
        'wave-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%239bd5e9' fill-opacity='0.4' d='M0,192L48,176C96,160,192,128,288,117.3C384,107,480,117,576,144C672,171,768,213,864,224C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
