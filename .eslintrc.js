module.exports = {
  //   extends: [
  //     'airbnb',
  //     'eslint:recommended',
  //     'plugin:react/recommended',
  //     'plugin:prettier/recommended',
  //     'plugin:import/react',
  //     'plugin:node/recommended',
  //     'plugin:prettier/recommended'
  //   ],
  //   plugins: [
  //     'react',
  //     'import',
  //     'prettier',
  //   ],
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "react-native",
      "react-native-prettier"
    ],
    "plugins": [
      "react",
      "react-native",
      "babel",
      "import",
      "prettier",
    ],
    parser: 'babel-eslint',
    parserOptions: {
      ecmaVersion: 9,
      ecmaFeatures: {
        jsx: true,
      },
      sourceType: 'module',
    },
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "semi": [
            "error",
            "always"
        ],
        "react-native/no-color-literals": "warn",
        "react-native/no-inline-styles": "warn",
        "react/jsx-handler-names": "warn",
        "no-invalid-this": 0,
        "babel/no-invalid-this": 1,
        "no-console": [
          "warn"
        ],
        "import/no-namespace": 0,
    },
    "globals": {
      "element": true,
      "by": true,
      "context": true,
      "waitFor": true,
      "device": true,
    }
};

// module.exports = {
//   extends: [
//     'airbnb',
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:prettier/recommended',
//     'plugin:import/react',
//     'plugin:node/recommended',
//     'plugin:prettier/recommended'
//   ],
//   plugins: [
//     'react',
//     'import',
//     'prettier',
//   ],
//   parser: 'babel-eslint',
//   parserOptions: {
//     ecmaVersion: 9,
//     ecmaFeatures: {
//       jsx: true,
//     },
//     sourceType: 'module',
//   },
//   rules: {
//     'react/prop-types': 0,
//     'react/jsx-uses-vars': [2],
//     'react/jsx-one-expression-per-line': 0,
//     'react/destructuring-assignment': 0,
//     'no-console': 0,
//     'func-names': 0,
//     'node/no-unsupported-features/es-syntax': 'off',
//     'prettier/prettier': [
//       'error',
//       {
//         semi: true,
//         singleQuote: true,
//         trailingComma: 'all',
//         tabWidth: 2,
//         bracketSpacing: true,
//         jsxBracketSameLine: false,
//       }
//     ],
//     "jsx-a11y/anchor-is-valid": [ "error", {
//       "components": [ "Link" ],
//       "specialLink": [ "hrefLeft", "hrefRight" ],
//       "aspects": [ "invalidHref", "preferButton" ]
//     }]
//   },
//   globals: {
//     jest: true,
//     cy: true,
//     describe: true,
//     it: true,
//     beforeEach: true,
//     beforeAll: true,
//     before: true,
//     afterAll: true,
//     expect: true,
//     jasmine: true,
//   },
//   settings: {
//     'import/resolver': {
//       node: {
//         extensions: ['.js', '.jsx'],
//       },
//     },
//   },
// };
