# Table of Contents

1. [Nx](#nx)
1. [Tailwind CSS 4 and tailwind-merge](#tailwind-css-4-and-tailwind-merge)
1. [Husky](#husky)
1. [Lint-Staged](#lint-staged)
1. [Conventional Commits and Commitlint](#conventional-commits-and-commitlint)
1. [Commitizen](#commitizen)
1. [Google Analytics](#google-analytics)
<!-- 1. [Docker](#docker) -->
1. [Nx Release](#nx-release)
1. [Other Tools](#other-tools)

<div id="nx"></div>

## [Nx](https://nx.dev/)

```bash
npx create-nx-workspace@latest
```

> Note: Create an integrated monorepo with a React app using React Router, Vite, Playwright, TailwindCSS and Nx Cloud for GitHub Actions.

<div id="tailwind-css-4-and-tailwind-merge"></div>

## [Tailwind CSS 4](https://tailwindcss.com/) and [tailwind-merge](https://github.com/dcastil/tailwind-merge)

```bash
cd apps/jasonruesch
npx @tailwindcss/upgrade
cd ../../
npm install -D @tailwindcss/vite
npm install -D prettier@latest prettier-plugin-tailwindcss
npm install -D tailwind-merge
rm -rf apps/jasonruesch/postcss.config.js
```

Update `apps/jasonruesch/vite.config.ts` with the following:

```typescript
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  ...
  plugins: [
    ...
    tailwindcss(),
  ],
  ...
});
```

Update `apps/jasonruesch/src/styles.css` with the following:

```css
@import 'tailwindcss';
```

Update `apps/jasonruesch/app/root.tsx` with the following:

```typescript
...
import '../styles.css';
...
```

Update `.prettierrc` with the following:

```json
{
  ...
  "plugins": ["prettier-plugin-tailwindcss"]
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

```typescript
export default {
  '*.{ts,tsx,js,jsx}': ['nx affected -t lint --uncommitted --fix'],
  '*': ['nx format:write --base=new-dev --head=HEAD'],
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

Create `commitlint.config.js` with the following:

```typescript
async function getConfig() {
  const {
    default: {
      utils: { getProjects },
    },
  } = await import('@commitlint/config-nx-scopes');

  return {
    rules: {
      'scope-enum': async (ctx) => [
        2,
        'always',
        [
          ...(await getProjects(ctx, ({ name }) => !name.includes('e2e'))),
          'repo',
          'release',
        ],
      ],
    },
  };
}

module.exports = getConfig();
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

```typescript
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

Create `apps/jasonruesch/.env.example` with the following:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Copy `.env.example` to `.env.local` and replace `G-XXXXXXXXXX` with your Google Analytics Measurement ID.

Update `apps/jasonruesch/src/app/app.tsx` with the following:

```typescript
import ReactGA from 'react-ga4';

export function App() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (measurementId) ReactGA.initialize(measurementId);
  ...
}
```

<!--
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

CMD ["npx", "nx", "dev", "jasonruesch", "--host"]
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
-->

<div id="nx-release"></div>

## Nx Release

Update `nx.json` with the following:

```json
{
  ...
  "release": {
    "projects": ["jasonruesch"],
    "version": {
      "conventionalCommits": true
    },
    "changelog": {
      "workspaceChangelog": {
        "createRelease": "github"
      }
    }
  }
}
```

Then, tag the current commit with the first version number:

```bash
git tag v0.0.1
git push origin v0.0.1
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
