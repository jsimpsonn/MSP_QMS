// tailwind.config.ts

import type { Config } from "tailwindcss";  // Importing the Config type from tailwindcss

const config = {
  darkMode: 'class',  // Enabling dark mode using the class strategy
  content: [
    './pages/**/*.{ts,tsx}',  // Specifying the paths to scan for class names
    './components/**/*.{ts,tsx}',
    './components/ui/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",  // Setting a prefix for all utility classes (empty string means no prefix)
  theme: {
    container: {
      center: true,  // Centering the container by default
      padding: "2rem",  // Adding padding to the container
      screens: {
        "2xl": "1400px",  // Setting the container width for 2xl screen size
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },  // Defining keyframes for accordion down animation
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },  // Defining keyframes for accordion up animation
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",  // Adding accordion down animation
        "accordion-up": "accordion-up 0.2s ease-out",  // Adding accordion up animation
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],  // Adding Inter font family
      },
      screens: {
        'sm': '640px',  // Defining custom screen sizes
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        dark: {
          primaryBg: '#09090b',
          secondaryBg: '#1E1E1E',
          tertiaryBg: '#2C2C2C',
          primaryText: '#E0E0E0',
          secondaryText: '#B0B0B0',
          tertiaryText: '#888888',
          primaryAccent: '#BB86FC',
          secondaryAccent: '#03DAC6',
          tertiaryAccent: '#FF5722',
          primaryBorder: '#333333',
          secondaryBorder: '#444444',
          primaryHighlight: '#FFFFFF',
          secondaryHighlight: '#FFD700',
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],  // Adding Tailwind CSS animate plugin
} satisfies Config;  // Ensuring the config object satisfies the Config type

export default config;  // Exporting the Tailwind CSS configuration as default
