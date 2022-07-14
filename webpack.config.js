const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: "./src/app.js",
    output:{
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        // publicPath: 'dist'
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8080,
        devMiddleware: {
          writeToDisk: true
        }
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: "assets", to: "assets" },
        ],
      }),
    ],
}