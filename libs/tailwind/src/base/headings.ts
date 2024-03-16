import { CSSRuleObject, PluginUtils } from 'tailwindcss/types/config';

export default (theme: PluginUtils['theme']) =>
  ({
    h1: {
      fontSize: theme('fontSize.5xl'),
      lineHeight: theme('lineHeight.none'),
      fontWeight: theme('fontWeight.bold'),
    },
    h2: {
      fontSize: theme('fontSize.3xl'),
      lineHeight: theme('lineHeight.9'),
      fontWeight: theme('fontWeight.bold'),
    },
    h3: {
      fontSize: theme('fontSize.xl'),
      lineHeight: theme('lineHeight.7'),
      fontWeight: theme('fontWeight.bold'),
    },
    h4: {
      fontWeight: theme('fontWeight.extrabold'),
    },
  }) satisfies CSSRuleObject;
