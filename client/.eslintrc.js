module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'airbnb',
    'react-app',
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    quotes: ['error', 'single'],
    indent: 0,
    'no-underscore-dangle': 0,
    "no-console": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-did-update-set-state": "off",
    "react/no-deprecated": 0,
    "react/destructuring-assignment": 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-console': 'off',
    'import/no-extraneous-dependencies': ['off', { devDependencies: true }],
    'no-trailing-spaces': 'off',
    'no-return-assign': 'off',
    'react/self-closing-comp': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'array-callback-return': 'off',
    'consistent-return': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-undef': 'off',
    'linebreak-style': ['error', 'unix'],
    'no-unused-vars': 'off',
    'max-len': ['error', { code: 200 }],
    'react/jsx-one-expression-per-line': 'off',
    'no-param-reassign': ['error', { props: false }],
    'import/no-dynamic-require': 0,
    'global-require': 0
  }
};
