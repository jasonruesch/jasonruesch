# Table of Contents

1. [Nx](#nx)
2. [React 19 Beta](#react-19-beta)
3. [React Router 6](#react-router-6)
4. [Tailwind CSS 4 Alpha and tailwind-merge](#tailwind-css-4-alpha-and-tailwind-merge)
5. [Husky](#husky)
6. [Lint-Staged](#lint-staged)
7. [Conventional Commits and Commitlint](#conventional-commits-and-commitlint)
8. [Commitizen](#commitizen)
9. [Google Analytics](#google-analytics)
10. [Docker](#docker)
11. [Other Tools](#other-tools)

<div id="nx"></div>

## [Nx](https://nx.dev/)

```bash
npx create-nx-workspace@latest
```

> Note: Create an integrated monorepo with a React app using no framework, Vite, Playwright, CSS and Nx Cloud for GitHub Actions.

Update `package.json` with the following:

```json
"type": "module",
...
"overrides": {
  "nx": "19.4.0"
}
```

Update `apps/jasonruesch-e2e/playwright.config.ts` with the following:

```javascript
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
```

Update `apps/jasonruesch-e2e/tsconfig.json` with the following:

```json
"compilerOptions": {
  ...
  "module": "esnext",
}
```

<div id="react-19-beta"></div>

## [React 19 Beta](https://reactjs.org/)

```bash
npm install react@beta react-dom@beta
npm install -D @types/react@npm:types-react@beta @types/react-dom@npm:types-react-dom@beta
```

Update `package.json` with the following:

```json
"overrides": {
  ...
  "react": "^19.0.0-beta-26f2496093-20240514",
  "react-dom": "^19.0.0-beta-26f2496093-20240514",
  "@types/react": "npm:types-react@^19.0.0-beta.2",
    "@types/react-dom": "npm:types-react-dom@^19.0.0-beta.2"
}
```

<div id="react-router-6"></div>

## [React Router 6](https://reactrouter.com/)

```bash
npm install react-router-dom
```

<div id="tailwind-css-4-alpha-and-tailwind-merge"></div>

## [Tailwind CSS 4 Alpha](https://tailwindcss.com/) and [tailwind-merge](https://github.com/dcastil/tailwind-merge)

```bash
npm install -D vite@latest tailwindcss@^4.0.0-alpha.16 @tailwindcss/vite@next
npm install -D prettier@latest prettier-plugin-tailwindcss
npm install -D tailwind-merge
```

> Note: The latest `tailwindcss` next version breaks --text-5xl for the `.gradient-header` class.

Update `apps/jasonruesch/src/styles.css` with the following:

```css
@import 'tailwindcss';
```

Update `apps/jasonruesch/vite.config.ts` with the following:

```javascript
...
import tailwindcss from '@tailwindcss/vite';
...
plugins: [
  ...
  tailwindcss()
],
...
```

Update `apps/jasonruesch/tsconfig.json` with the following:

```json
"compilerOptions": {
  ...
  "moduleResolution": "bundler",
}
```

<div id="husky"></div>

## [Husky](https://typicode.github.io/husky/)

```bash
npx husky-init && npm install
npx husky add .husky/commit-msg ''
npx husky add .husky/prepare-commit-msg ''
```

<div id="lint-staged"></div>

## [Lint-Staged](https://github.com/lint-staged/lint-staged)

```bash
npm install -D lint-staged
```

Create `.lintstagedrc.js` with the following:

```javascript
export default {
  '*.{ts,tsx,js,jsx}': ['nx affected -t lint --uncommitted --fix'],
  '*': ['nx format:write --base=main --head=HEAD'],
};
```

Update `.husky/pre-commit` with the following:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

<div id="conventional-commits-and-commitlint"></div>

## [Conventional Commits](https://www.conventionalcommits.org/) and [Commitlint](https://commitlint.js.org/)

```bash
npm install -D @commitlint/config-nx-scopes @commitlint/cli @commitlint/config-conventional
```

Create `.commitlintrc.js` with the following:

```javascript
import config from '@commitlint/config-nx-scopes';

const { getProjects } = config.utils;

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': async (ctx) => [2, 'always', [...(await getProjects(ctx, ({ name }) => !name.includes('e2e'))), 'repo', 'release']],
  },
};
```

Update `.husky/commit-msg` with the following:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install commitlint -V --edit "$1"
```

<div id="commitizen"></div>

## [Commitizen](https://commitizen-tools.github.io/commitizen/)

```bash
npm install -D commitizen @commitlint/cz-commitlint
```

Create `cz-adapter.cjs` with the following:

```javascript
exports.prompter = async (inquirerIns, commit) => {
  (await import('@commitlint/cz-commitlint')).prompter(inquirerIns, commit);
};
```

> Note: The `cz-adapter.cjs` file is required to use the `@commitlint/cz-commitlint` with ESM.

Update `package.json` with the following:

```json
"config": {
  "commitizen": {
    "path": "./cz-adapter.cjs"
  }
}
```

Update `.husky/prepare-commit-msg` with the following:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# $2 contains the source of the commit message.
# It can be message, template, merge, squash, or commit (for git commit --amend)
if [ "$2" = "commit" ]; then
  echo "Skipping prepare-commit-msg hook due to amend."
  exit 0
elif [ "$2" = "message" ]; then
  echo "Skipping prepare-commit-msg hook due to message already provided."
  exit 0
fi

# If we're in the middle of an interactive rebase, GIT_SEQUENCE_EDITOR will be set.
# We'll skip the hook in this case as well.
if [ -n "$GIT_SEQUENCE_EDITOR" ]; then
  echo "Skipping prepare-commit-msg hook due to rebase."
  exit 0
fi

# Require Commitizen prompt for all branches, especially feature branches.
(exec < /dev/tty && node_modules/.bin/cz --hook) || true < /dev/null
```

<div id="google-analytics"></div>

## [Google Analytics](https://analytics.google.com/)

```bash
npm install react-ga4
```

> Note: See [react-ga4](https://github.com/codler/react-ga4) for setup instructions and configuration.

<div id="docker"></div>

## [Docker](https://www.docker.com/)

```bash
npx nx add @nx/node
npx nx g setup-docker
```

Update `apps/jasonruesch/Dockerfile` with the following:

```dockerfile
# Run the container with `docker run -p 4200:4200 -t jasonruesch`.
FROM docker.io/node:lts-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npx", "nx", "serve", "jasonruesch", "--host", "0.0.0.0"]
```

Create `docker-compose.yml` with the following:

```yaml
version: '3'

services:
  jasonruesch:
    image: jasonruesch:latest
    container_name: jasonruesch
    build:
      context: .
      dockerfile: ./apps/jasonruesch/Dockerfile
    ports:
      - '4200:4200'
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true # To fix an issue with HMR on Windows machines
```

<div id="other-tools"></div>

## Other Tools

- [Vite](https://vitejs.dev/)
- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [GitHub Actions](https://github.com/features/actions)
- [Vercel](https://vercel.com/)
- [Figma](https://www.figma.com/)
- [Semantic Versioning](https://semver.org/)
- [Scroll-Driven Animations](https://scroll-driven-animations.style/)
- [ResizeObserver Polyfill](https://github.com/que-etc/resize-observer-polyfill)
- [Framer Motion](https://www.framer.com/)
- [react-markdown](https://github.com/remarkjs/react-markdown)
- [React Syntax Highlighter](https://react-syntax-highlighter.github.io/react-syntax-highlighter/)
- [rehype-raw](https://github.com/rehypejs/rehype-raw)
- [Heroicons](https://heroicons.com/)
- [HeadlessUI](https://headlessui.com/)
- [Flagsmith](https://www.flagsmith.com/)
- [vite-plugin-static-copy](https://github.com/sapphi-red/vite-plugin-static-copy)
