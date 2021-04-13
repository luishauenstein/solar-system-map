const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
};
