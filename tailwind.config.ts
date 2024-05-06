import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|popover|ripple|spinner).js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      layout: {
        radius: {
          small: '0.25rem',
          medium: '0.5rem',
          large: '0.75rem',
        },
      },
      themes: {
        light: {
          colors: {
            foreground: colors.zinc[950],
            background: colors.zinc[200],
            default: colors.zinc[300],
            primary: colors.blue[600],
          },
        },
        dark: {
          colors: {
            foreground: colors.zinc[100],
            background: colors.zinc[900],
            default: colors.zinc[700],
            primary: colors.blue[700],
          },
        },
      },
    }),
  ],
};
export default config;
