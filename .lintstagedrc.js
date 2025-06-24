export default {
  '*.{ts,tsx,js,jsx}': ['nx affected -t lint --uncommitted --fix'],
  '*': ['nx format:write --base=new-dev --head=HEAD'],
};
