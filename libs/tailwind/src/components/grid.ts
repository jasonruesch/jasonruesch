export default {
  '.grid-layout': {
    '@apply grid grid-cols-4 gap-4 px-4': '',

    '@media screen(sm)': {
      '@apply grid-cols-8': '',
    },
    '@media screen(md)': {
      '@apply px-10': '',
    },
    '@media screen(lg)': {
      '@apply grid-cols-12': '',
    },
    '@media screen(xl)': {
      '@apply gap-6': '',
    },
    '@media screen(2xl)': {
      '@apply w-full max-w-screen-2xl px-12 mx-auto': '',
    },

    '&.has-sidebar': {
      '@media screen(lg)': {
        '@apply px-6': '',
      },
      '@media screen(2xl)': {
        '@apply px-8': '',
      },
    },
  },
};
