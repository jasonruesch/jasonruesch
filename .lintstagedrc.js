export default {
  // TODO: Fix linting for project.json
  // '{apps,libs}/**/*.{ts,tsx,js,jsx,html,json,scss,css,md}': [
  //   'nx affected -t lint --uncommitted --fix',
  // ],
  '*.{ts,tsx,js,jsx,html,json,scss,css,md,yaml,yml}': [
    'nx format:write --base=main --head=HEAD',
  ],
};
