module.exports = (api) => {
  api.cache(() => process.env.NODE_ENV);

  return {
    env: {
      development: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties"],
          ["@babel/plugin-transform-react-display-name"],
          [
            "@babel/plugin-transform-runtime",
            {
              regenerator: true,
            },
          ],
        ],
        presets: [
          [
            "@babel/env",
            {
              modules: false,
            },
          ],
          [
            "@babel/preset-react",
            {
              runtime: "automatic",
            },
          ],
          [
            "@babel/typescript",
            {
              allExtensions: true,
              isTSX: true,
            },
          ],
        ],
      },
      production: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties"],
          [
            "babel-plugin-styled-components",
            {
              minify: true,
              transpileTemplateLiterals: true,
            },
          ],
        ],
        presets: [
          [
            "@babel/preset-env",
            {
              corejs: 3.6,
              targets: {
                chrome: "49",
                edge: "15",
                firefox: "52",
                opera: "68",
                safari: "12",
              },
              useBuiltIns: "entry",
            },
          ],
          [
            "@babel/preset-react",
            {
              runtime: "automatic",
            },
          ],
          [
            "@babel/typescript",
            {
              allExtensions: true,
              isTSX: true,
            },
          ],
        ],
      },
    },
  };
};
