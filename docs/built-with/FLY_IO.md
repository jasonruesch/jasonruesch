## [Fly.io Deployment](https://fly.io/)

Install the flyctl CLI tool and set up your Fly.io account and app:

```bash
brew install flyctl
flyctl auth login
flyctl launch --no-deploy
mv fly.toml apps/jasonruesch/
rm -rf Dockerfile
rm -rf .github/workflows/ci.yml .github/workflows/fly-deploy.yml
```

Update [apps/jasonruesch/fly.toml](../apps/jasonruesch/fly.toml) with the following:

```toml
[build]
  dockerfile = './Dockerfile'

[env]
  PORT = '3000'

[http_service]
  internal_port = 3000
```

Update [apps/jasonruesch/package.json](../apps/jasonruesch/package.json) with the following:

```json
{
  ...
  "nx": {
    "targets": {
      ...
      "deploy": {
        "command": "flyctl deploy --config apps/jasonruesch/fly.toml"
      }
    }
  }
}
```

Deploy initial version:

```bash
npx nx deploy jasonruesch
```

Launch a new app for Staging:

```bash
flyctl launch --name jasonruesch-staging --no-deploy
mv fly.toml apps/jasonruesch/fly.staging.toml
cp apps/jasonruesch/Dockerfile apps/jasonruesch/Dockerfile.staging
rm -rf Dockerfile
rm -rf .github/workflows/fly-deploy.yml
```

Update [apps/jasonruesch/fly.staging.toml](../apps/jasonruesch/fly.staging.toml) with the following:

```toml
[build]
  dockerfile = './Dockerfile.staging'

[env]
  PORT = '3000'

[http_service]
  internal_port = 3000
```

Update [apps/jasonruesch/Dockerfile.staging](../apps/jasonruesch/Dockerfile.staging) with the following:

```dockerfile
...
ENV NODE_ENV="staging"
...
```

Update [apps/jasonruesch/package.json](../apps/jasonruesch/package.json) with the following:

```
"deploy": {
  "command": "flyctl deploy --config apps/jasonruesch/fly.toml",
  "configurations": {
    "production": {
      "command": "flyctl deploy --config apps/jasonruesch/fly.toml"
    },
    "staging": {
      "command": "flyctl deploy --config apps/jasonruesch/fly.staging.toml"
    }
  }
}
```

Deploy initial version to Staging:

```bash
npx nx deploy jasonruesch --configuration=staging
```

Setup configurations for PR Previews:

```bash
cp apps/jasonruesch/Dockerfile apps/jasonruesch/Dockerfile.preview
```

Create [apps/jasonruesch/fly.preview.toml](../apps/jasonruesch/fly.preview.toml) with the following:

```toml
# fly.toml app configuration file generated for jasonruesch on 2025-06-25T15:39:53-04:00
#
# See https://fly.io/docs/reference/configuration/ for information about how to use this file.
#

primary_region = 'iad'

[build]
  dockerfile = './Dockerfile.preview'

[env]
  PORT = '3000'

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = 'stop'
  auto_start_machines = true
  min_machines_running = 0
  processes = ['app']

[[vm]]
  memory = '1gb'
  cpu_kind = 'shared'
  cpus = 1
```

Update [apps/jasonruesch/Dockerfile.preview](../apps/jasonruesch/Dockerfile.preview) with the following:

```dockerfile
...
ENV NODE_ENV="development"
...
```
