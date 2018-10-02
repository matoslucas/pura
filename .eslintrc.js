module.exports = {
  extends: [
    "@strv/javascript/environments/react/v15",
    "@strv/javascript/environments/react/optional",
    "@strv/javascript/coding-styles/recommended",
    "@strv/javascript/coding-styles/react"
  ],
  env: {
    browser: true,
    node: true,
    mocha: true,
    es6: true
  },
  ecmaFeatures: {
    jsx: true,
    experimentalObjectRestSpread: true,
    modules: true
  },
  parserOptions: {
    sourceType: "module"
  },
  parser: "babel-eslint",
  rules: {
    "no-restricted-syntax": 0,
    "max-len": 0,
    "no-underscore-dangle": 0,
    "global-require": 0,
    "operator-linebreak": 0,
    "react/jsx-filename-extension": 0, // need to be fixed
    "no-process-env": 0 // need to be fixed
  },
  plugins: ["react", "import"],
  settings: {
    "import/parser": "babel-eslint",
    "import/resolver": {
      webpack: {
        config: "webpack/dev.config.js"
      }
    }
  },
  globals: {
    __DEVELOPMENT__: true,
    __CLIENT__: true,
    __SERVER__: true,
    __DISABLE_SSR__: true,
    __DEVTOOLS__: true,
    __INTERCOM_APP_ID__: true,
    socket: true,
    webpackIsomorphicTools: true
  }
};
