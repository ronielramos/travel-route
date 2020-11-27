module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    es6: true,
    mocha: true,
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    camelcase: 'off',
    'max-len': ['warn', 100],
    'max-lines': ['warn', 180],
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
    'no-useless-catch': 'off',
    'sort-keys': 'warn'
  }
}
