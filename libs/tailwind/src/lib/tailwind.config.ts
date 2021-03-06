import aspectRatio from '@tailwindcss/aspect-ratio';
import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { createThemes } from 'tw-colors';
import colors from './base/colors';
import button from './components/button';

export default {
  theme: {
    colors: {
      current: colors.current,
      inherit: colors.inherit,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
    },
    extend: {},
  },
  plugins: [
    forms,
    aspectRatio,
    require('tailwindcss-safe-area'),
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
        // halloween: {
        //   primary: colors.orange,
        //   secondary: colors.purple,
        //   neutral: colors.neutral,
        //   success: colors.green,
        //   warning: colors.yellow,
        //   danger: colors.red,
        //   info: colors.blue,
        // },
        // christmas: {
        //   primary: colors.red,
        //   secondary: colors.green,
        //   neutral: colors.neutral,
        //   success: colors.green,
        //   warning: colors.yellow,
        //   danger: colors.red,
        //   info: colors.blue,
        // },
      }),
      {
        defaultTheme: {
          light: 'light',
          dark: 'dark',
        },
        strict: true,
      },
    ),
    plugin(({ addComponents }) => {
      addComponents(button);
    }),
  ],
} satisfies Omit<Config, 'content'>;
