var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: "./app.js",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "app.bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"production"'}
        })
    ]
};
