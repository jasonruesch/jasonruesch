interface ImportMetaEnv {
  readonly PACKAGE_VERSION: string;
  readonly VITE_EMAIL_RECIPIENT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
