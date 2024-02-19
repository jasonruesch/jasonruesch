export default {
  ':not(.btn-link)': {
    '&.btn-primary, &.btn-neutral, &.btn-info, &.btn-danger': {
      '@apply inline-flex shrink-0 items-center justify-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border border-transparent disabled:border disabled:border-dashed':
        '',

      '&.btn-small': {
        '@apply px-2 py-1 text-xs rounded': '',
      },

      '&.btn-icon': {
        '@apply px-2 text-base': '',

        '&.btn-small': {
          '@apply px-1': '',
        },
      },
    },

    '&.btn-primary': {
      '@apply bg-primary-600 dark:bg-primary-500 text-white enabled:hover:bg-primary-500 dark:enabled:hover:bg-primary-400 focus-visible:outline-primary-600 dark:focus-visible:outline-primary-500 disabled:border-primary-300 disabled:bg-primary-50 disabled:text-primary-800':
        '',
    },

    '&.btn-neutral': {
      '@apply bg-neutral-600 dark:bg-neutral-500 text-white enabled:hover:bg-neutral-500 dark:enabled:hover:bg-neutral-400 focus-visible:outline-neutral-600 dark:focus-visible:outline-neutral-500 disabled:border-neutral-300 disabled:bg-neutral-50 disabled:text-neutral-800':
        '',
    },

    '&.btn-info': {
      '@apply bg-info-600 dark:bg-info-500 text-white enabled:hover:bg-info-500 dark:enabled:hover:bg-info-400 focus-visible:outline-info-600 dark:focus-visible:outline-info-500 disabled:border-info-300 disabled:bg-info-50 disabled:text-info-800':
        '',
    },

    '&.btn-danger': {
      '@apply bg-danger-600 dark:bg-danger-500 text-white enabled:hover:bg-danger-500 dark:enabled:hover:bg-danger-400 focus-visible:outline-danger-600 dark:focus-visible:outline-danger-500 disabled:border-danger-300 disabled:bg-danger-50 disabled:text-danger-800':
        '',
    },
  },

  '.btn-link': {
    '@apply focus:outline-none disabled:opacity-50': '',

    '&.btn-primary': {
      '@apply text-primary-500 enabled:hover:text-primary-400 dark:text-primary-400 dark:enabled:hover:text-primary-300 focus:text-primary-400 dark:focus:text-primary-300':
        '',
    },

    '&.btn-neutral': {
      '@apply text-neutral-500 enabled:hover:text-neutral-400 dark:text-neutral-400 dark:enabled:hover:text-neutral-300 focus:text-neutral-400 dark:focus:text-neutral-300':
        '',
    },

    '&.btn-info': {
      '@apply text-info-500 enabled:hover:text-info-400 dark:text-info-400 dark:enabled:hover:text-info-300 focus:text-info-400 dark:focus:text-info-300':
        '',
    },

    '&.btn-danger': {
      '@apply text-danger-500 enabled:hover:text-danger-400 dark:text-danger-400 dark:enabled:hover:text-danger-300 focus:text-danger-400 dark:focus:text-danger-300':
        '',
    },
  },
};
