import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6702b9',
        white: '#efeff3',
        border: 'rgba(255, 255, 255, 0.3)',
      },
      padding: {
        layout: '1.25rem',
      },
    },
  },
  plugins: [],
};
export default config;
