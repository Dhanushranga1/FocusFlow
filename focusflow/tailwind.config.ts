// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B132B',
        foreground: '#F8F9FA',
        primary: '#3A86FF',
        secondary: '#00F5D4',
        accent: '#8338EC',
        motivation: '#FF9F1C',
        urgency: '#FF0054',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to bottom, #0B132B, #1C2541)',
      },
    },
  },
  plugins: [],
} satisfies Config;