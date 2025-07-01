## [Fly.io Deployment](https://fly.io/)

Install the flyctl CLI tool and set up your Fly.io account and app:

```bash
brew install flyctl
flyctl auth login
flyctl launch --name jasonruesch --no-deploy
mv fly.toml apps/jasonruesch/fly.production.toml
rm -rf Dockerfile
rm -rf .github/workflows/fly-deploy.yml
rm -rf .github/workflows/ci.yml
```

Update [apps/jasonruesch/fly.production.toml](../../apps/jasonruesch/fly.production.toml) with the following:

```toml
...
[build]
  dockerfile = './Dockerfile.production'

[env]
  PORT = '3000'

[http_service]
  internal_port = 3000
...
```

Create a Fly.io config for Staging by running the following:

```bash
flyctl launch --name jasonruesch-staging --no-deploy
mv fly.toml apps/jasonruesch/fly.staging.toml
rm -rf Dockerfile
rm -rf .github/workflows/fly-deploy.yml
```

Update [apps/jasonruesch/fly.staging.toml](../../apps/jasonruesch/fly.staging.toml) with the following:

```toml
...
[build]
  dockerfile = './Dockerfile.staging'

[env]
  PORT = '3000'

[http_service]
  internal_port = 3000
...
```

Create a Fly.io config for PR Previews by running the following:

```bash
cp apps/jasonruesch/fly.staging.toml apps/jasonruesch/fly.preview.toml
```

Update [apps/jasonruesch/fly.preview.toml](../../apps/jasonruesch/fly.preview.toml) with the following:

```toml
...
app = 'jasonruesch-staging' # Remove this line since the app name will be set dynamically in the CI workflow

[build]
  dockerfile = './Dockerfile.preview'
...
```

Update [apps/jasonruesch/package.json](../../apps/jasonruesch/package.json) with the following:

```json
{
  ...
  "nx": {
    "targets": {
      ...
      "deploy": {
        "command": "YELLOW='\\033[0;33m' RESET='\\033[0m'; echo \"${YELLOW}Development deployment is not supported.${RESET}\"",
        "configurations": {
          "production": {
            "command": "flyctl deploy --config apps/jasonruesch/fly.production.toml --image-label jasonruesch-v$(npm --prefix apps/jasonruesch pkg get version | tr -d '\"')"
          },
          "staging": {
            "command": "flyctl deploy --config apps/jasonruesch/fly.staging.toml"
          },
          "preview": {
            "command": "flyctl deploy --config apps/jasonruesch/fly.preview.toml"
          }
        }
      }
    }
  }
}
```

Deploy initial version to Production:

```bash
npx nx deploy jasonruesch --configuration=production
```

Deploy initial version to Staging:

```bash
npx nx deploy jasonruesch --configuration=staging
```
