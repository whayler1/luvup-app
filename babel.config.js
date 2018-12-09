/* eslint-disable import/no-commonjs */
module.exports = {
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        alias: {
          'react-native-vector-icons': '@expo/vector-icons',
        },
      },
    ],
    '@babel/plugin-transform-flow-strip-types',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-proposal-json-strings',
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-transform-regenerator',
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: false,
        regenerator: true,
      },
    ],
  ],
  presets: [
    '@babel/preset-env',
    'module:metro-react-native-babel-preset',
    // '@babel/preset-react',
  ],
  env: {
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: [
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-syntax-import-meta',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-json-strings',
        [
          '@babel/plugin-proposal-decorators',
          {
            legacy: true,
          },
        ],
        '@babel/plugin-proposal-function-sent',
        '@babel/plugin-proposal-numeric-separator',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-throw-expressions',
        '@babel/plugin-transform-flow-strip-types',
        // ['@babel/plugin-proposal-decorators', { legacy: true }],
        // ['@babel/plugin-proposal-class-properties', { loose: true }],
        // '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-regenerator',
        [
          '@babel/plugin-transform-runtime',
          {
            helpers: false,
            regenerator: true,
          },
        ],
      ],
      only: ['./**/*.js', 'node_modules/jest-runtime'],
      ignore: ['art/core/color.js'],
    },
  },
};
