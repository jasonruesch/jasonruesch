import { CSSRuleObject, PluginUtils } from 'tailwindcss/types/config';

export default (theme: PluginUtils['theme'], darkContext: string) =>
  ({
    '@keyframes gradient': theme('keyframes.gradient'),

    '.gradient-heading': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: theme('spacing.1'),
      paddingBottom: theme('spacing.1'),
      paddingLeft: theme('spacing.4'),
      paddingRight: theme('spacing.4'),
      textAlign: 'center',
      fontSize: theme('fontSize.xl'),
      lineHeight: theme('lineHeight.cap'),
      fontWeight: theme('fontWeight.normal'),
      textTransform: 'uppercase',
      backgroundImage: theme('backgroundImage.gradient-500'),
      backgroundSize: theme('backgroundSize.300%'),
      animation: theme('animation.gradient'),
      backgroundClip: 'text',
      color: theme('colors.transparent'),
      transform: 'scale(1.1)',

      '& > :not([hidden]) ~ :not([hidden])': {
        marginLeft: theme('spacing.4'),
      },

      '@media screen(sm)': {
        fontSize: theme('fontSize.5xl'),
        backgroundImage: theme('backgroundImage.gradient-500-sm'),
        transform: 'scale(1)',
      },

      '@media screen(lg)': {
        maxWidth: theme('screens.lg'),
        fontSize: theme('fontSize.6xl'),
      },

      [darkContext]: {
        backgroundImage: theme('backgroundImage.gradient-400'),

        '@media screen(sm)': {
          backgroundImage: theme('backgroundImage.gradient-400-sm'),
        },
      },

      '@media (prefers-reduced-motion)': {
        animation: 'none',
      },

      '.heading-lg': {
        fontSize: theme('fontSize.4xl'),
        lineHeight: theme('lineHeight.cap'),

        '@media screen(sm)': {
          fontSize: theme('fontSize.7xl'),
        },

        '@media screen(lg)': {
          fontSize: theme('fontSize.8xl'),
        },
      },
    },
  }) satisfies CSSRuleObject;
