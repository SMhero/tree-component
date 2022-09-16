module.exports = {
  extends: [
    "airbnb",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:css-modules/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["@typescript-eslint", "react-hooks", "css-modules"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "no-shadow": 0,
    quotes: 0,
    "implicit-arrow-linebreak": 0,
    "no-param-reassign": 0,
    "no-confusing-arrow": 0,
    "arrow-parens": [0, "as-needed", { requireForBlockBody: true }],
    curly: [2, "all"],
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
    "css-modules/no-undef-class": [2, { camelCase: "dashes" }],
    "css-modules/no-unused-class": [2, { camelCase: "dashes" }],
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "import/extensions": [
      2,
      {
        ts: "error",
        tsx: "error",
      },
    ],
    "jsx-a11y/label-has-associated-control": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "max-len": ["warn", { code: 80, tabWidth: 4 }],
    "no-plusplus": 0,
    "object-curly-newline": [
      "error",
      {
        multiline: true,
        consistent: true,
      },
    ],
    "operator-linebreak": ["error", "after"],
    "react/react-in-jsx-scope": 0,
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
      },
    ],
    "react/jsx-no-useless-fragment": 0,
    "react/jsx-wrap-multilines": 0,
    "react/static-property-placement": 0,
    "react/jsx-props-no-spreading": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/destructuring-assignment": 0,
    "react/button-has-type": 0,
    "react/jsx-no-undef": 2,
    "react/jsx-one-expression-per-line": 0,
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
      },
    },
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      rules: {
        "function-paren-newline": 0,
        "operator-linebreak": [0, "after"],
        "react/prop-types": "off",
        "react/require-default-props": 0,
        "@typescript-eslint/no-unused-vars": [2, { args: "none" }],
      },
    },
  ],
};
