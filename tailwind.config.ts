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
        sans: [
          "Satoshi",
          "Plus Jakarta Sans",
          "Inter",
          "DM Sans",
          "system-ui",
          "sans-serif",
        ],
        satoshi: ["Satoshi", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
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
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, hsl(var(--gradient-primary-from)), hsl(var(--gradient-primary-to)))",
        "gradient-secondary":
          "linear-gradient(135deg, hsl(var(--gradient-secondary-from)), hsl(var(--gradient-secondary-to)))",
        "gradient-success":
          "linear-gradient(135deg, hsl(var(--gradient-success-from)), hsl(var(--gradient-success-to)))",
        "gradient-warning":
          "linear-gradient(135deg, hsl(var(--gradient-warning-from)), hsl(var(--gradient-warning-to)))",
        "gradient-danger":
          "linear-gradient(135deg, hsl(var(--gradient-danger-from)), hsl(var(--gradient-danger-to)))",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-aurora":
          "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
        "gradient-ocean": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "gradient-sunset": "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)",
        "gradient-midnight":
          "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
        "gradient-cosmic":
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      },
      backdropBlur: {
        xs: "2px",
        "3xl": "64px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "3xl": "2rem",
        "4xl": "2.5rem",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-md)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        glow: "var(--shadow-glow)",
        "glow-sm": "0 0 10px hsl(var(--primary) / 0.2)",
        "glow-md": "0 0 20px hsl(var(--primary) / 0.3)",
        "glow-lg": "0 0 30px hsl(var(--primary) / 0.4)",
        "inner-glow": "inset 0 0 20px hsl(var(--primary) / 0.1)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
        144: "36rem",
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
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px hsl(var(--primary) / 0.2)" },
          "50%": { boxShadow: "0 0 20px hsl(var(--primary) / 0.4)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px hsl(var(--primary) / 0.2)" },
          "100%": { boxShadow: "0 0 20px hsl(var(--primary) / 0.4)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        "slide-in-left": "slide-in-left 0.5s ease-out",
        "slide-in-up": "slide-in-up 0.5s ease-out",
        "slide-in-down": "slide-in-down 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        shimmer: "shimmer 2s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "rotate-slow": "rotate-slow 10s linear infinite",
        "gradient-shift": "gradient-shift 15s ease infinite",
      },
      transitionDuration: {
        "2000": "2000ms",
        "3000": "3000ms",
      },
      blur: {
        "4xl": "72px",
        "5xl": "96px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities, addComponents }) {
      addUtilities({
        ".glass": {
          background: "var(--glass-bg)",
          "backdrop-filter": "var(--glass-backdrop-blur)",
          border: "1px solid var(--glass-border)",
        },
        ".glass-strong": {
          background: "var(--glass-bg-strong)",
          "backdrop-filter": "var(--glass-backdrop-blur-strong)",
          border: "1px solid var(--glass-border)",
        },
        ".glass-card": {
          background: "var(--glass-bg-strong)",
          "backdrop-filter": "var(--glass-backdrop-blur-strong)",
          border: "1px solid var(--glass-border)",
          "box-shadow": "var(--shadow-xl)",
        },
        ".glass-panel": {
          background: "var(--glass-bg)",
          "backdrop-filter": "var(--glass-backdrop-blur)",
          border: "1px solid var(--glass-border)",
          "box-shadow": "var(--shadow-lg)",
        },
        ".text-shadow": {
          "text-shadow": "0 2px 4px rgba(0, 0, 0, 0.1)",
        },
        ".text-shadow-lg": {
          "text-shadow": "0 4px 8px rgba(0, 0, 0, 0.2)",
        },
        ".bg-gradient-animated": {
          background:
            "linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c)",
          "background-size": "400% 400%",
          animation: "gradient-shift 15s ease infinite",
        },
      });

      addComponents({
        ".btn-modern": {
          "@apply rounded-2xl px-6 py-3 font-semibold transition-all duration-200 relative overflow-hidden":
            {},
          "box-shadow":
            "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1)",
        },
        ".btn-modern:active": {
          "box-shadow":
            "inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)",
          transform: "translateY(1px)",
        },
        ".card-modern": {
          "@apply glass-card rounded-3xl p-8 transition-all duration-300": {},
        },
        ".card-modern:hover": {
          "@apply -translate-y-1": {},
          "box-shadow": "var(--shadow-2xl), var(--shadow-glow)",
        },
        ".form-field": {
          "@apply glass-card rounded-2xl border-white/20 transition-all duration-200":
            {},
        },
        ".form-field:focus-within": {
          "@apply border-primary/50": {},
          "box-shadow": "var(--shadow-lg), var(--shadow-glow)",
        },
      });
    },
  ],
} satisfies Config;
