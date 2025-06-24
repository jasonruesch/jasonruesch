# Release Process

## Apps

### Preview

- Triggered by PR to `dev` branch or workflow dispatch
- Test (lint, unit tests, e2e tests)
- Build app
- Deploy to Preview

### Staging

- Triggered by push to `dev` branch or workflow dispatch
- Test (lint, unit tests, e2e tests)
- Build app
- Deploy to Staging

### Production

- Triggered by push of tag with `v*.*.*` format or workflow dispatch
- Build app
- Deploy to Production

> Note: To kick off a release to Production, run `npx nx release`
> This will bump the version, generate a changelog, create a tag, and push the tag to trigger the release workflow
> It will also create a release in GitHub with the changelog as the release notes
