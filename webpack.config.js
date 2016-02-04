var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: "./app.js",
    output: {
        path: __dirname,
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
