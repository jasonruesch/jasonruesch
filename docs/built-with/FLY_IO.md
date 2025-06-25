## [Fly.io Deployment](https://fly.io/)

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
