const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry:  path.resolve(__dirname, './src/index.tsx'),
  mode: "development",
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".less", ".css"],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
    },
  },
  module: {
    rules: [
        {
            test: /\.(js|jsx|tsx|ts)$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
        },
        // {
        //     test: /\.css$/,
        //     use: ["style-loader", "css-loader"],
        // },
        {
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader',
            ],
        },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
    new CleanWebpackPlugin(),
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
  ],
}