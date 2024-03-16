import { CSSRuleObject, PluginUtils } from 'tailwindcss/types/config';

export default (theme: PluginUtils['theme'], darkContext: string) =>
  ({
    p: {
      color: theme('colors.neutral-500'),

      '@media screen(sm)': {
        fontSize: theme('fontSize.xl'),
        lineHeight: theme('lineHeight.7'),
      },

      '@media screen(lg)': {
        fontSize: theme('fontSize.2xl'),
        lineHeight: theme('lineHeight.8'),
      },

      [darkContext]: {
        color: theme('colors.neutral-400'),
      },
    },
  }) satisfies CSSRuleObject;
