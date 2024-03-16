import { CSSRuleObject, PluginUtils } from 'tailwindcss/types/config';

export default (theme: PluginUtils['theme']) =>
  ({
    '.grid-layout': {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      gap: theme('spacing.4'),
      paddingLeft: theme('spacing.4'),
      paddingRight: theme('spacing.4'),

      '@media screen(sm)': {
        gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
      },

      '@media screen(md)': {
        paddingLeft: theme('spacing.10'),
        paddingRight: theme('spacing.10'),
      },

      '@media screen(lg)': {
        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
      },

      '@media screen(xl)': {
        gap: theme('spacing.6'),
      },

      '@media screen(2xl)': {
        width: '100%',
        maxWidth: theme('screens.2xl'),
        paddingLeft: theme('spacing.12'),
        paddingRight: theme('spacing.12'),
        marginLeft: 'auto',
        marginRight: 'auto',
      },

      '&:where(.has-sidebar, .has-sidebar *)': {
        '@media screen(lg)': {
          paddingLeft: theme('spacing.6'),
          paddingRight: theme('spacing.6'),
        },

        '@media screen(2xl)': {
          paddingLeft: theme('spacing.8'),
          paddingRight: theme('spacing.8'),
        },
      },
    },
  }) satisfies CSSRuleObject;
