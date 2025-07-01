## Nx Release

Update [nx.json](../../nx.json) with the following:

```json
{
  ...
  "release": {
    "projects": ["!**/*-e2e"],
    "version": {
      "conventionalCommits": true,
      "versionActionsOptions": {
        "skipLockFileUpdate": true
      }
    },
    "changelog": {
      "workspaceChangelog": {
        "createRelease": "github"
      }
    }
  },
  "sync": {
    "applyChanges": true
  }
}
```

Then, tag the current commit with the first version number:

```bash
git tag v0.0.1
git push origin v0.0.1
```
