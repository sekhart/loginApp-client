const path = require("path");
const HTMLplugin = require("html-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
    },
  },
  {
    test: /\.css$/,
    exclude: /node_modules/,
    use: ["style-loader", "css-loader"],
  },
];

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    filename: "index-bundle.js",
    path: path.resolve(__dirname, "./build"),
    publicPath: "/",
  },
  module: { rules },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
