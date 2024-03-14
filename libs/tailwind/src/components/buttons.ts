import { CSSRuleObject, PluginUtils } from 'tailwindcss/types/config';

export default (theme: PluginUtils['theme'], darkContext: string) =>
  ({
    ':not(.btn-link)': {
      '&.btn-primary, &.btn-neutral, &.btn-info, &.btn-danger': {
        display: 'inline-flex',
        flexShrink: '0',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme('spacing.1'),
        borderRadius: theme('borderRadius.md'),
        paddingTop: theme('spacing[1.5]'),
        paddingBottom: theme('spacing[1.5]'),
        paddingLeft: theme('spacing[2.5]'),
        paddingRight: theme('spacing[2.5]'),
        fontSize: theme('fontSize.sm'),
        lineHeight: theme('lineHeight.5'),
        fontWeight: theme('fontWeight.semibold'),
        boxShadow: theme('boxShadow.sm'),
        borderWidth: theme('borderWidth.DEFAULT'),
        borderColor: theme('borderColor.transparent'),

        '&:focus-visible': {
          outlineWidth: theme('outlineWidth.2'),
        },

        '&:disabled': {
          borderStyle: 'dashed',
        },

        '&.btn-small': {
          paddingTop: theme('spacing.1'),
          paddingBottom: theme('spacing.1'),
          paddingLeft: theme('spacing.2'),
          paddingRight: theme('spacing.2'),
          fontSize: theme('fontSize.xs'),
          lineHeight: theme('lineHeight.4'),
        },

        '&.btn-icon': {
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          fontSize: theme('fontSize.base'),
          lineHeight: theme('lineHeight.6'),

          '&.btn-small': {
            paddingLeft: theme('spacing.2'),
            paddingRight: theme('spacing.2'),
            fontSize: theme('fontSize.xs'),
            lineHeight: theme('lineHeight.4'),
          },
        },
      },

      '&.btn-primary': {
        backgroundColor: theme('colors.primary-600'),
        color: theme('colors.white'),

        '&:hover:not(:disabled)': {
          backgroundColor: theme('colors.primary-500'),
        },

        '&:focus-visible': {
          outlineColor: theme('colors.primary-600'),
        },

        '&:disabled': {
          borderColor: theme('colors.primary-300'),
          backgroundColor: theme('colors.primary-50'),
          color: theme('colors.primary-800'),
        },

        [darkContext]: {
          backgroundColor: theme('colors.primary-500'),

          '&:hover:not(:disabled)': {
            backgroundColor: theme('colors.primary-400'),
          },

          '&:focus-visible': {
            outlineColor: theme('colors.primary-500'),
          },
        },
      },

      '&.btn-neutral': {
        backgroundColor: theme('colors.neutral-600'),
        color: theme('colors.white'),

        '&:hover:not(:disabled)': {
          backgroundColor: theme('colors.neutral-500'),
        },

        '&:focus-visible': {
          outlineColor: theme('colors.neutral-600'),
        },

        '&:disabled': {
          borderColor: theme('colors.neutral-300'),
          backgroundColor: theme('colors.neutral-50'),
          color: theme('colors.neutral-800'),
        },

        [darkContext]: {
          backgroundColor: theme('colors.neutral-500'),

          '&:hover:not(:disabled)': {
            backgroundColor: theme('colors.neutral-400'),
          },

          '&:focus-visible': {
            outlineColor: theme('colors.neutral-500'),
          },
        },
      },

      '&.btn-info': {
        backgroundColor: theme('colors.info-600'),
        color: theme('colors.white'),

        '&:hover:not(:disabled)': {
          backgroundColor: theme('colors.info-500'),
        },

        '&:focus-visible': {
          outlineColor: theme('colors.info-600'),
        },

        '&:disabled': {
          borderColor: theme('colors.info-300'),
          backgroundColor: theme('colors.info-50'),
          color: theme('colors.info-800'),
        },

        [darkContext]: {
          backgroundColor: theme('colors.info-500'),

          '&:hover:not(:disabled)': {
            backgroundColor: theme('colors.info-400'),
          },

          '&:focus-visible': {
            outlineColor: theme('colors.info-500'),
          },
        },
      },

      '&.btn-danger': {
        backgroundColor: theme('colors.danger-600'),
        color: theme('colors.white'),

        '&:hover:not(:disabled)': {
          backgroundColor: theme('colors.danger-500'),
        },

        '&:focus-visible': {
          outlineColor: theme('colors.danger-600'),
        },

        '&:disabled': {
          borderColor: theme('colors.danger-300'),
          backgroundColor: theme('colors.danger-50'),
          color: theme('colors.danger-800'),
        },

        [darkContext]: {
          backgroundColor: theme('colors.danger-500'),

          '&:hover:not(:disabled)': {
            backgroundColor: theme('colors.danger-400'),
          },

          '&:focus-visible': {
            outlineColor: theme('colors.danger-500'),
          },
        },
      },
    },

    '.btn-link': {
      '&:focus': {
        outlineStyle: 'none',
      },

      '&:disabled': {
        opacity: theme('opacity.50'),
      },

      '&.btn-primary': {
        color: theme('colors.primary-500'),

        '&:hover:not(:disabled)': {
          color: theme('colors.primary-400'),
        },

        '&:focus': {
          color: theme('colors.primary-400'),
        },

        [darkContext]: {
          color: theme('colors.primary-400'),

          '&:hover:not(:disabled)': {
            color: theme('colors.primary-300'),
          },

          '&:focus': {
            color: theme('colors.primary-300'),
          },
        },
      },

      '&.btn-neutral': {
        color: theme('colors.neutral-500'),

        '&:hover:not(:disabled)': {
          color: theme('colors.neutral-400'),
        },

        '&:focus': {
          color: theme('colors.neutral-400'),
        },

        [darkContext]: {
          color: theme('colors.neutral-400'),

          '&:hover:not(:disabled)': {
            color: theme('colors.neutral-300'),
          },

          '&:focus': {
            color: theme('colors.neutral-300'),
          },
        },
      },

      '&.btn-info': {
        color: theme('colors.info-500'),

        '&:hover:not(:disabled)': {
          color: theme('colors.info-400'),
        },

        '&:focus': {
          color: theme('colors.info-400'),
        },

        [darkContext]: {
          color: theme('colors.info-400'),

          '&:hover:not(:disabled)': {
            color: theme('colors.info-300'),
          },

          '&:focus': {
            color: theme('colors.info-300'),
          },
        },
      },

      '&.btn-danger': {
        color: theme('colors.danger-500'),

        '&:hover:not(:disabled)': {
          color: theme('colors.danger-400'),
        },

        '&:focus': {
          color: theme('colors.danger-400'),
        },

        [darkContext]: {
          color: theme('colors.danger-400'),

          '&:hover:not(:disabled)': {
            color: theme('colors.danger-300'),
          },

          '&:focus': {
            color: theme('colors.danger-300'),
          },
        },
      },
    },
  }) satisfies CSSRuleObject;
