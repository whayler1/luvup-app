module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": [
      "eslint:recommended",
      "react-native",
      "react-native-prettier"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "babel"
    ],
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
    },
    "globals": {
      "element": true,
      "by": true,
      "context": true,
    }
};
