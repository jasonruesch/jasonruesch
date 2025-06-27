## [Commitlint](https://commitlint.js.org/) and [Conventional Commits](https://www.conventionalcommits.org/)

```bash
npm install -D @commitlint/config-nx-scopes @commitlint/cli @commitlint/config-conventional
```

Create [commitlint.config.js](../../commitlint.config.js) with the following:

```typescript
async function getConfig() {
  const {
    default: {
      utils: { getProjects },
    },
  } = await import('@commitlint/config-nx-scopes');

  return {
    rules: {
      'scope-enum': async (ctx) => [2, 'always', [...(await getProjects(ctx, ({ name }) => !name.includes('e2e'))), 'repo', 'release']],
    },
  };
}

module.exports = getConfig();
```
