import tailwindPreset from '@jasonruesch/tailwind';
import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import { join } from 'path';
import type { Config } from 'tailwindcss';

export default {
  presets: [tailwindPreset],
  content: [
    join(__dirname, 'index.html'),
    join(__dirname, 'src/**/*!(*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
