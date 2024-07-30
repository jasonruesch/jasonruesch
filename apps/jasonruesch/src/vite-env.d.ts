interface ImportMetaEnv {
  readonly MODE: string;
  readonly PACKAGE_VERSION: string;
  readonly VITE_EMAIL_RECIPIENT: string;
  readonly VITE_AUTH_EMAIL: string;
  readonly VITE_AUTH_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
