const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { HotModuleReplacementPlugin } = require("webpack");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool: process.env.NODE_ENV === "production" ? false : "source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist/"),
    hot: true, // This is what allows to just replace a module (component)
    port: 3000,
    open: true
  },
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".scss"],
    alias: {
      "@h": path.resolve(__dirname, "src/scripts/hyperscript.js"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@class": path.resolve(__dirname, "src/class/"),
      "@store": path.resolve(__dirname, "src/store"),
      "@scripts": path.resolve(__dirname, "src/scripts"),
      "@app": path.resolve(__dirname, "src/app"),
      "@deep": path.resolve(__dirname, "src/scripts/deep"),
      "@": path.resolve(__dirname, "src/"),
    }
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader", // translates CSS into CommonJS and adds auto prefixing
        "sass-loader" // compiles Sass to CSS
      ]
    }, {
      test: /\.js$/,
      exclude: /node_modlues/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["env"],
          plugins: ["transform-object-rest-spread"]
        }
      }
    }]
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
