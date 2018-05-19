const path = require("path");
const fs = require("fs");
const __root = path.resolve(__dirname, "webpack-config");
const merge = require("webpack-merge");

module.exports = [
  merge(
    // We merge our multiple configuration files into one
    fs
      .readdirSync(__root)
      .filter(filename => /^webpack-config/.test(filename) && !/test.js$/.test(filename))
      .map(filename => require(path.join(__root, filename)))
  )
].concat(
  // Include our tests
  require("./webpack-config/webpack-config.test.js")
);
