async function getConfig() {
  const {
    default: {
      utils: { getProjects },
    },
  } = await import('@commitlint/config-nx-scopes');

  return {
    rules: {
      'scope-enum': async (ctx) => [
        2,
        'always',
        [
          ...(await getProjects(ctx, ({ name }) => !name.includes('e2e'))),
          'repo',
          'release',
        ],
      ],
    },
  };
}

module.exports = getConfig();
