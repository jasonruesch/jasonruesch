export default {
  // '{apps,libs}/**/*.{ts,tsx,js,jsx,html,json,scss,css,md}': [
  //   'nx affected:lint --uncommitted --fix',
  // ],
  '*.{ts,tsx,js,jsx,html,json,scss,css,md,yaml,yml}': [
    'nx format:write --base=main --head=HEAD',
  ],
};
