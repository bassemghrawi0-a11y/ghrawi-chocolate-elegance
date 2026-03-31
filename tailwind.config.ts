import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        display: ["Cormorant Garamond", "serif"],
        body: ["Jost", "sans-serif"],
        arabic: ["Cairo", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        "border-mid": "hsl(var(--border-mid))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Semantic tokens
        "text-base": "hsl(var(--text))",
        "text-muted-warm": "hsl(var(--text-muted))",
        "text-hint": "hsl(var(--text-hint))",
        "bg-dark": "hsl(var(--bg-dark))",
        "bg-warm": "hsl(var(--bg-warm))",
        "light-fill": "hsl(var(--light-fill))",
        cream: "hsl(var(--cream))",
        gold: "hsl(var(--gold))",
        chocolate: "hsl(var(--chocolate))",
        "warm-beige": "hsl(var(--warm-beige))",
        "mid-tone": "hsl(var(--mid-tone))",
      },
      spacing: {
        "section-y": "100px",
        "section-x": "60px",
        "section-x-mobile": "24px",
        "col-gap": "60px",
        "comp-gap": "32px",
        "internal": "24px",
        "small-gap": "16px",
        "micro": "8px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "ken-burns": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
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
        "fade-up": "fade-up 0.65s ease-out forwards",
        "fade-in": "fade-in 0.65s ease-out forwards",
        "ken-burns": "ken-burns 20s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
