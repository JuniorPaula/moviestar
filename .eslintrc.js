module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
  },
};
