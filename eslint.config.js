import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    astro: true,
    css: true,
    graphql: true,
    html: true,
    markdown: true,
    prettierOptions: {
      endOfLine: 'lf',
    },
  },
  astro: true,
  pnpm: false,
  rules: {
    'eslint-comments/no-unlimited-disable': 'off',
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
  },
})
