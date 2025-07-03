## UI Library

Generate a UI library using the following command:

```bash
npm install @headlessui/react framer-motion clsx
bash scripts/cp-dep.sh @headlessui/react package.json apps/jasonruesch/package.json
bash scripts/cp-dep.sh framer-motion package.json apps/jasonruesch/package.json
bash scripts/cp-dep.sh clsx package.json apps/jasonruesch/package.json
npx nx g @nx/react:library --directory=libs/ui ui  --importPath=@jasonruesch/ui
rm -rf libs/ui/src/lib/ui.tsx
```

Select `vite` as the bundler and `none` as the test runner.

Update [libs/ui/tsconfig.lib.json](../../libs/ui/tsconfig.lib.json) to include the `dom` lib:

```json
{
  ...
  "compilerOptions": {
    ...
    lib: ["dom"]
  },
  ...
}
```

Download [Catalyst UI Kit](https://tailwindcss.com/plus/ui-kit) and extract the typescript contents to `libs/ui/src/lib/catalyst`.

Update the [libs/ui/src/lib/catalyst/link.tsx](../../libs/ui/src/lib/catalyst/link.tsx) component with the following content:

```jsx
import * as Headless from '@headlessui/react';
import React, { forwardRef } from 'react';
import { Link as RouterLink, type LinkProps } from 'react-router';

export const Link = forwardRef(function Link(
  props: { href: string | LinkProps['to'] } & Omit<LinkProps, 'to'>,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {
  return (
    <Headless.DataInteractive>
      <RouterLink {...props} to={props.href} ref={ref} />
    </Headless.DataInteractive>
  );
});
```

Create the barrel file [libs/ui/src/lib/catalyst/index.ts](../../libs/ui/src/lib/catalyst/index.ts) that exports all of the components in the `catalyst` directory.

Update the [libs/ui/src/index.ts](../../libs/ui/src/index.ts) barrel file to export the `catalyst` components instead of the default `ui.tsx`:

```typescript
export * from './lib/catalyst';
```

Update [apps/jasonruesch/styles.css](../../apps/jasonruesch/styles.css) to include the Tailwind CSS source:

```css
@import 'tailwindcss';
@source '../../libs/ui/src';

@theme {
  --font-sans: Inter, sans-serif;
}
```

Install Heroicons:

```bash
npm install @heroicons/react
bash scripts/cp-dep.sh @heroicons/react package.json apps/jasonruesch/package.json
```

Install the [vite-tsconfig-paths](https://www.npmjs.com/package/vite-tsconfig-paths) plugin:

```bash
npm install -D vite-tsconfig-paths
```

Update [apps/jasonruesch/vite.config.ts](../../apps/jasonruesch/vite.config.ts) to include the `vite-tsconfig-paths` plugin:

```typescript
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  ...
  plugins: [
    ...
    tsconfigPaths(),
  ],
  ...
});
```
