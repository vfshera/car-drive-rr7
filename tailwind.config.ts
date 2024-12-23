import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";
import dt from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", ...dt.fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        brand: {
          1: "#14213d",
          2: "#fca311",
          3: "#e5e5e5",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
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
      spacing: {
        "5/100": "5%",
        "10/100": "10%",
        "15/100": "15%",
        "20/100": "20%",
        "22/100": "22%",
        "30/100": "30%",
        "35/100": "35%",
        "45/100": "45%",
        "55/100": "55%",
        "65/100": "65%",
        "75/100": "75%",
        "85/100": "85%",
        "95/100": "95%",
      },

      minHeight: {
        0: "0",
        "1/4vh": "25vh",
        "1/2vh": "50vh",
        "2/3vh": "60vh",
        "3/4vh": "75vh",
        "4/5vh": "80vh",
        100: "100px",
        135: "135px",
        150: "150px",
        200: "200px",
        280: "280px",
        300: "300px",
        400: "400px",
        "app-screen": "calc(100vh - 4rem)",
        "app-mscreen": "calc(100% - 4rem)",
      },
      height: {
        100: "100px",
        150: "150px",
        200: "200px",
        300: "300px",
        400: "400px",
        "1/4vh": "25vh",
        "1/2vh": "50vh",
        "2/3vh": "60vh",
        "3/4vh": "75vh",
        "4/5vh": "80vh",
        appFull: "calc(100vh - 4rem)",
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config;
