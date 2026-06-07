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
        "deep-navy": "#0F172A",
        "emerald-growth": "#10B981",
        "border-subtle": "#E2E8F0",
        "surface": "#F7F9FB",
        "on-surface": "#191C1E",
        "on-surface-variant": "#45464D",
        "surface-container": "#ECEEF0",
        "surface-container-low": "#F2F4F6",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-highest": "#E0E3E5",
        "primary-container": "#131B2E",
        "on-primary-container": "#7C839B",
        "on-primary-fixed-variant": "#3F465C",
        "on-primary-fixed": "#131B2E",
        // Additional colors from reference if needed
        "data-soft": "#A9C5DA",
        "data-muted": "#80A1BA",
        "secondary-container": "#6CF8BB",
        "on-secondary-container": "#00714D",
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
