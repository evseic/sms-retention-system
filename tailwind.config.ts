import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-navy": "#0F2E3A",
        "forest-dark": "#0B222C",
        "emerald-growth": "#14B8A6",
        "border-subtle": "#E1EBF0",
        "surface": "#F3F7F8",
        "on-surface": "#1C292E",
        "on-surface-variant": "#405054",
        "surface-container": "#FFFFFF",
        "surface-container-low": "#EAF0F2",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-highest": "#D6DFE3",
        "primary-container": "#0B2730",
        "on-primary-container": "#8BA1A9",
        "on-primary-fixed-variant": "#304951",
        "on-primary-fixed": "#0F2E3A",
        "data-soft": "#88B8C4",
        "data-muted": "#568491",
        "secondary-container": "#D4ECF0",
        "on-secondary-container": "#0A4B50",
      },
      spacing: {
        "container-max": "1280px",
        "stack-lg": "32px",
        "margin-mobile": "16px",
        "gutter": "24px",
        "stack-md": "16px",
        "base": "4px",
        "stack-sm": "8px",
        "margin-desktop": "40px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
