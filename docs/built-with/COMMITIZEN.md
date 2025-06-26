## [Commitizen](https://commitizen-tools.github.io/commitizen/)

```bash
npm install -D commitizen @commitlint/cz-commitlint
```

Create [cz-adapter.cjs](../../cz-adapter.cjs) with the following:

```typescript
exports.prompter = async (inquirerIns, commit) => {
  (await import('@commitlint/cz-commitlint')).prompter(inquirerIns, commit);
};
```

> Note: The `cz-adapter.cjs` file is required to use the `@commitlint/cz-commitlint` with ESM.

Update [package.json](../../package.json) with the following:

```json
"config": {
  "commitizen": {
    "path": "./cz-adapter.cjs"
  }
}
```
