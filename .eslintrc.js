module.exports = {
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
      "__DEV__": true,
    }
};
