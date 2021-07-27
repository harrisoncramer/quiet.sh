module.exports = {
  env: {
    node: true,
    jest: true,
    browser: false,
    commonjs: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
};
