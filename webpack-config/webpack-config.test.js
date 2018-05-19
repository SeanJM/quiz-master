const path = require("path");
const __root = path.resolve(__dirname, "..");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool: process.env.NODE_ENV === "production" ? false : "source-map",
  devServer: {
    contentBase: path.join(__root, "dist/"),
    hot: true, // This is what allows to just replace a module (component)
    port: 3000,
    open: true
  },
  entry: "./test/index.js",
  output: {
    path: path.resolve(__root, "dist"),
    filename: "test.js"
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@h": path.resolve(__root, "src/scripts/hyperscript.js"),
      "@components": path.resolve(__root, "src/components/"),
      "@class": path.resolve(__root, "src/class/"),
      "@store": path.resolve(__root, "src/store"),
      "@scripts": path.resolve(__root, "src/scripts"),
      "@app": path.resolve(__root, "src/app"),
      "@deep": path.resolve(__root, "src/scripts/deep"),
      "@": path.resolve(__root, "src/"),
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["env"],
          plugins: ["transform-object-rest-spread"]
        }
      }
    }]
  }
}