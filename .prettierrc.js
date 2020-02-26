module.exports = {
  trailingComma: 'none',
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  arrowParens: 'always',
  overrides: [
    {
      files: ['.prettierrc', , '.eslintrc', '.stylelintrc'],
      options: {
        parser: 'babel'
      }
    }
  ]
};
