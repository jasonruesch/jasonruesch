export default {
  '*.{ts,tsx,js,jsx}': ['nx affected -t lint --uncommitted --fix'],
  '*': ['nx format:write --base=main --head=HEAD'],
};
