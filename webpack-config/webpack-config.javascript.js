const { HotModuleReplacementPlugin, DefinePlugin } = require("webpack");
const path = require("path");
const __root = path.resolve(__dirname, "..");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool: process.env.NODE_ENV === "production" ? false : "source-map",

  devServer: {
    contentBase: path.join(__root, "dist/"),
    hot: true, // This is what allows to just replace a module (component)
    port: 3000,
    open: true,
  },

  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__root, "dist"),
    filename: "bundle.js",
  },

  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@deep": path.resolve(__root, "src/scripts/deep"),
      "@": path.resolve(__root, "src/"),
      "@components": path.resolve(__root, "src/components"),
      "@store": path.resolve(__root, "src/store"),
      "@action": path.resolve(__root, "src/action"),
    },
  },

  module: {
    rules: [{
      test: /\.js(x|)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["env"],
          plugins: [
            "transform-object-rest-spread",
            // JSX syntax with Preact
            ["transform-react-jsx"],
          ],
        },
      },
    }],
  },

  plugins: [
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};