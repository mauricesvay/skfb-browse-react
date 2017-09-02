var webpack = require("webpack");
var config = require("./webpack.config.js");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

config.plugins = [
    new webpack.EnvironmentPlugin({
        NODE_ENV: "development"
    }),
    new ExtractTextPlugin("styles.css")
];

module.exports = config;
