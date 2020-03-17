module.exports = {
  root: true,
  env: {
    commonjs: true,
    es6: true,
  },
  extends: ['airbnb-base', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: ['prettier'],
  rules: {
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "consistent-return": "off",
    "no-console": 0,
    "no-underscore-dangle": 0
  },
};
