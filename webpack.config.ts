import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

const sourcePath = path.join(__dirname, "src");

const devtool =
  process.env.NODE === "development"
    ? "source-map"
    : "eval-cheap-module-source-map";
const mode = process.env.NODE === "development" ? "development" : "production";
const performance = {
  hints: process.env.NODE_ENV === "production" ? "warning" : false,
};

module.exports = {
  devtool,
  entry: path.join(sourcePath, "index"),
  mode,
  target: "web",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: [sourcePath, "node_modules"],
  },
  performance,
  module: {
    rules: [
      {
        include: [sourcePath],
        test: /\.(j|t)sx?$/,
        use: ["babel-loader"],
      },
      {
        include: [sourcePath],
        test: /\.p?css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                exportLocalsConvention: "dashes",
                localIdentName: "[path][name]__[local]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env"]],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[hash]-[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.join(sourcePath, "/assets/favicon.ico"),
      template: path.join(__dirname, "/index.html"),
    }),
  ],
  devServer: {
    compress: true,
    historyApiFallback: true,
    port: 3000,
    static: path.join(__dirname, "dist"),
  },
};
