## [Lint-Staged](https://github.com/lint-staged/lint-staged)

```bash
npm install -D lint-staged
```

Create [.lintstagedrc.js](../../.lintstagedrc.js) with the following:

```typescript
export default {
  '*.{ts,tsx,js,jsx}': ['nx affected -t lint --uncommitted --fix'],
  '*': ['nx format:write --base=main --head=HEAD'],
};
```
