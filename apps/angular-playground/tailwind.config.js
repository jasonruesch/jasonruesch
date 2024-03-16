const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const { tailwindPreset } = require('@jasonruesch/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tailwindPreset],
  prefix: 'tw-',
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
