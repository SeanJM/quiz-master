const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const __root = path.resolve(__dirname, "..");

module.exports = {
  resolve: {
    extensions: [".scss"],
    alias: {
      "@styles": path.resolve(__root, "src/styles"),
    },
  },

  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader", // translates CSS into CommonJS
        "sass-loader", // compiles Sass to CSSß
        {
          loader: "postcss-loader",
          options: {
            ident: "postcss",
            plugins: process.env.NODE_ENV === "development"
              ? [
                require("autoprefixer")(), // Adds browser prefixes (-moz-, -o-, '-ms-, etc...)
              ]
              : [
                require("autoprefixer")(),
                require("cssnano")(), // Compresses CSS
              ],
          },
        },
      ],
    }],
  },

  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};