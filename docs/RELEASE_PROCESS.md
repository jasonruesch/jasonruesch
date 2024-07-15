# Release Process

## Apps

### Preview

- Triggered by PR to `main` branch or workflow dispatch
- Test affected (lint, unit tests, e2e tests)
- Build affected or manually triggered with workflow dispatch
- Deploy to Preview if affected or manually triggered with workflow dispatch

### Staging

- Triggered by push to `main` branch or workflow dispatch
- Test affected (lint, unit tests, e2e tests)
- Build affected or manually triggered with workflow dispatch
- Deploy to Staging if affected or manually triggered with workflow dispatch

### Production

- Triggered by push of tag with `v*.*.*` format or workflow dispatch
- Build
- Deploy to Production

> Note: To kick off a release to Production, run `npm run release`
