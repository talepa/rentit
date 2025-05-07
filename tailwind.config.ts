
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
        border: '#E0E0E0', // Borders/Divider
        input: '#E0E0E0',
        ring: '#5C6BC0', // Primary color for focus states
        background: '#F8F9FA', // Background
        foreground: '#2D3436', // Text (Dark)
        primary: {
          DEFAULT: '#5C6BC0', // Indigo
          foreground: '#FFFFFF', // Text (Light)
        },
        secondary: {
          DEFAULT: '#FFA726', // Warm Orange
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#66BB6A', // Soft Green
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F8F9FA',
          foreground: '#2D3436',
        },
        destructive: {
          DEFAULT: 'hsl(0, 84.2%, 60.2%)',
          foreground: 'hsl(0, 0%, 98%)',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#2D3436',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#2D3436',
        },
        // Adding appbg and textdark for consistency with existing code
        appbg: '#F8F9FA',
        textdark: '#2D3436',
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      skew: {
        '30': '30deg',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
