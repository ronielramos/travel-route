module.exports = {
  all: true,
  cache: false,
  'check-coverage': true,
  exclude: [
    'coverage/**',
    'node_modules/**',
    '**/*.spec.ts'
  ],
  extends: '@istanbuljs/nyc-config-typescript',
  extension: ['.ts'],
  include: ['src/**/*.ts'],
  instrument: true,
  reporter: ['html', 'text', 'text-summary'],
  sourceMap: true
}
