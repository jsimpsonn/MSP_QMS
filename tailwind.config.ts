import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',  // Enabling dark mode using the class strategy
  content: [
    './components/**/*.{ts,tsx}',
    './components/ui/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
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
      colors: {
        // Light mode colors
        background: "#ffffff",
        foreground: "#ffffff",
        card: "hsl(0, 0%, 100%)",
        "card-foreground": "hsl(222.2, 84%, 4.9%)",
        popover: "hsl(0, 0%, 100%)",
        "popover-foreground": "hsl(222.2, 84%, 4.9%)",
        primary: "hsl(221.2, 83.2%, 53.3%)",
        "primary-foreground": "hsl(210, 40%, 98%)",
        secondary: "hsl(210, 40%, 96.1%)",
        "secondary-foreground": "hsl(222.2, 47.4%, 11.2%)",
        muted: "hsl(210, 40%, 96.1%)",
        "muted-foreground": "hsl(215.4, 16.3%, 46.9%)",
        accent: "hsl(210, 40%, 96.1%)",
        "accent-foreground": "hsl(222.2, 47.4%, 11.2%)",
        destructive: "hsl(0, 84.2%, 60.2%)",
        "destructive-foreground": "hsl(210, 40%, 98%)",
        border: "hsl(214.3, 31.8%, 91.4%)",
        input: "hsl(214.3, 31.8%, 91.4%)",
        ring: "hsl(221.2, 83.2%, 53.3%)",
        
        // Dark mode colors
        "dark-background": "#212121",
        "dark-foreground": "#ececec",
        "dark-card": "#2f2f2f",
        "dark-card-foreground": "#ececec",
        "dark-popover": "#212121",
        "dark-popover-foreground": "#ececec",
        "dark-primary": "#BB86FC",
        "dark-primary-foreground": "#212121",
        "dark-secondary": "#171717",
        "dark-secondary-foreground": "#212121",
        "dark-muted": "#888888",
        "dark-muted-foreground": "#ececec",
        "dark-accent": "#FF5722",
        "dark-accent-foreground": "#212121",
        "dark-destructive": "#FF5722",
        "dark-destructive-foreground": "#212121",
        "dark-border": "#333333",
        "dark-input": "#444444",
        "dark-ring": "#BB86FC",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
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
      backdropBlur: {
        '8px': '8px',
      },
      opacity: {
        '80': '0.8',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],  // Adding Tailwind CSS animate plugin
};

export default config;  // Exporting the Tailwind CSS configuration as default
