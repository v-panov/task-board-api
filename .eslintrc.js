module.exports = {
  parser: 'babel-eslint',
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
