module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
    amd: true,
  },
  extends: ['airbnb-base', 'eslint:recommended'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': 0,
    'import/no-unresolved': 'off',
    'no-restricted-globals': 'off',
    'no-undef': 'off',
    'no-return-assign': 'off',
    'no-unused-vars': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'no-fallthrough': 'off',
  },
};
