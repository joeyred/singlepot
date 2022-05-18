const base = require('./eslint.base');

module.exports = {
  ...base,
  env: {
    node: true,
    es2019: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended'
  ]
}