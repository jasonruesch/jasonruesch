import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';
import tailwindcssSafeArea from 'tailwindcss-safe-area';
import plugin from 'tailwindcss/plugin';
import { PluginUtils } from 'tailwindcss/types/config';
import { createThemes } from 'tw-colors';
import colors from '../base/colors';
import headings from '../base/headings';
import paragraphs from '../base/paragraphs';
import buttons from '../components/buttons';
import gradientHeading from '../components/gradient-heading';
import grid from '../components/grid';

export const tailwindPreset = {
  theme: {
    colors: {
      current: colors.current,
      inherit: colors.inherit,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
    },
    extend: {
      lineHeight: {
        cap: 'calc(1cap - 1px)',
      },
      keyframes: {
        gradient: {
          '0%': {
            backgroundPosition: '85% 85%',
          },
          '20%': {
            backgroundPosition: '85% 85%',
          },
          '100%': {
            backgroundPosition: '15% 15%',
          },
        },
      },
      animation: {
        gradient: 'gradient 10s linear infinite',
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
      backgroundImage: ({ theme }: PluginUtils) => ({
        'gradient-500-sm': `linear-gradient(145deg, ${theme(
          'colors.primary-500',
        )} 45%, ${theme('colors.secondary-500')}, ${theme(
          'colors.white',
        )}, ${theme('colors.secondary-500')}, ${theme(
          'colors.primary-500',
        )} 55%)`,
        'gradient-400-sm': `linear-gradient(145deg, ${theme(
          'colors.primary-400',
        )} 45%, ${theme('colors.secondary-400')}, ${theme(
          'colors.black',
        )}, ${theme('colors.secondary-400')}, ${theme(
          'colors.primary-400',
        )} 55%)`,
        'gradient-500': `linear-gradient(145deg, ${theme(
          'colors.primary-500',
        )} 45%, ${theme('colors.secondary-500')} 49%, ${theme(
          'colors.secondary-500',
        )} 51%, ${theme('colors.primary-500')} 55%)`,
        'gradient-400': `linear-gradient(145deg, ${theme(
          'colors.primary-400',
        )} 45%, ${theme('colors.secondary-400')} 49%, ${theme(
          'colors.secondary-400',
        )} 51%, ${theme('colors.primary-400')} 55%)`,
      }),
    },
  },
  plugins: [
    forms,
    tailwindcssSafeArea,
    createThemes(
      ({ light, dark }) => ({
        light: light({
          primary: colors.cyan,
          secondary: colors.fuchsia,
          neutral: colors.neutral,
          success: colors.green,
          warning: colors.yellow,
          danger: colors.red,
          info: colors.blue,
        }),
        dark: dark({
          primary: colors.violet,
          secondary: colors.teal,
          neutral: colors.neutral,
          success: colors.green,
          warning: colors.yellow,
          danger: colors.red,
          info: colors.blue,
        }),
      }),
      {
        defaultTheme: {
          light: 'light',
          dark: 'dark',
        },
        strict: true,
        produceThemeClass: (themeName) => `theme-${themeName}`,
        produceThemeVariant: (themeName) => `theme-${themeName}`,
      },
    ),
    plugin(({ addBase, addComponents }) => {
      addBase(headings);
      addBase(paragraphs);

      addComponents(grid);
      addComponents(buttons);
      addComponents(gradientHeading);
    }),
  ],
} satisfies Omit<Config, 'content'>;
