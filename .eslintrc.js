module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: [
          '.js',
          '.jsx',
        ],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'no-nested-ternary': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'consistent-return': 'off',
    'react/no-unescaped-entities': 'off',
    'max-len': 'off',
  },
};
