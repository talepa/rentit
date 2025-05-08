
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
        border: '#D8E2EF', // Lighter border
        input: '#D8E2EF',
        ring: '#4A80F0', // Primary blue for focus states
        background: '#F1F6FB', // Light blue-tinted background
        foreground: '#2D3748', // Text (Dark)
        primary: {
          DEFAULT: '#4A80F0', // Bright blue
          foreground: '#FFFFFF', // Text (Light)
        },
        secondary: {
          DEFAULT: '#FF7D54', // Warm Orange
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#4CD964', // Fresh Green
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F1F6FB',
          foreground: '#2D3748',
        },
        destructive: {
          DEFAULT: 'hsl(0, 84.2%, 60.2%)',
          foreground: 'hsl(0, 0%, 98%)',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#2D3748',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#2D3748',
        },
        // Adding appbg and textdark for consistency with existing code
        appbg: '#F1F6FB',
        textdark: '#2D3748',
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
          "0%, 100%": { boxShadow: "0 0 5px rgba(74, 128, 240, 0.5)" },
          "50%": { boxShadow: "0 0 15px rgba(74, 128, 240, 0.8)" },
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s infinite ease-in-out",
        "slide-up-fade": "slide-up-fade 0.3s ease-out",
        "slide-down-fade": "slide-down-fade 0.3s ease-out",
        "bounce-subtle": "bounce-subtle 2s infinite ease-in-out",
      },
      skew: {
        '30': '30deg',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
