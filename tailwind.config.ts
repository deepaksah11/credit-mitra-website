import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'brand-base': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      colors: {
        darkSurface: {
          900: '#000000',
          800: '#181818',
          700: '#1F1F1F',
          600: '#272727',
          500: '#313131',
          accent: '#131209',
        },
        brand: {
          primary: '#0F766E', // Refined teal/emerald for trust & financial security
          primaryHover: '#115E59',
          lightBg: '#F8FAFC',
          border: '#E2E8F0',
        },
      },
      spacing: {
        '25': '2px',
        '50': '4px',
        '75': '8px',
        '100': '12px',
        '200': '16px',
        '300': '24px',
        '400': '32px',
        '500': '40px',
        '600': '48px',
        '700': '64px',
        '800': '80px',
        '900': '96px',
      },
    },
  },
  plugins: [],
};

export default config;
