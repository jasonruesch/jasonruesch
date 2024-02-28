# Tailwind

The custom tailwind library found at `/libs/tailwind` is installed as a local npm package. This allows us to reference it from other projects' Tailwind CSS configs.

The command that installs the package is:

```bash
npm install --save-dev libs/tailwind
```

This command sets up the appropriate references in the `package-lock.json` file.

If for any reason, the `package-lock.json` file needs to be deleted, the tailwind package will need to be reinstalled the same way as above to ensure the references are set up correctly.
