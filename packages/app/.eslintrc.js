module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    extraFileExtensions: ['.ts, .tsx'],
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['custom-rule'],
  rules: {
    'custom-rule/my-rule': 'error'
  },
};
