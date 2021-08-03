module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    'airbnb-typescript',
    "plugin:prettier/recommended",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: "./tsconfig.json",
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      2,
      {
        prefer: "type-imports"
      },
    ],
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/restrict-template-expressions": 0,
    "import/order": [
      1,
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
      },
    ],
    "react/jsx-key": 2,
    "arrow-body-style": 2,
    "no-void": ["error", { "allowAsStatement": true }],
  },
};
