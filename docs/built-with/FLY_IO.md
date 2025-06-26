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
