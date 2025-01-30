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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#4F46E5', // Indigo
        secondary: '#A78BFA', // Soft Purple
        dark: {
          100: '#0F172A', // Deep Navy
          200: '#1E293B', // Charcoal
        },
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to bottom, #0F172A, #1E293B)',
      },
    },
  },
  plugins: [],
} satisfies Config;