# Release Process

## Apps

Pull request:

- test (lint, unit tests, e2e tests)
- build
- upload build artifact
- deploy to Preview

Main branch:

- test (lint, unit tests, e2e tests)
- bump version (deploy only)
- build
- upload build artifact with version
- deploy to Staging

Release:

- download build artifact
- deploy to Production

## Libraries

Pull request:

- test (lint, unit tests, e2e tests)
- build

Main branch:

- test (lint, unit tests, e2e tests)
- bump version (deploy only)
- build
- upload build artifact with version

Release:

- download build artifact
- publish to GitHub Packages
