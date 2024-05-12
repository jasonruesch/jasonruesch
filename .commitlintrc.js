import config from '@commitlint/config-nx-scopes';

const { getProjects } = config.utils;

export default {
  extends: ['@commitlint/config-conventional'],
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
