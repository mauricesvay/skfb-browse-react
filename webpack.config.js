module.exports = {
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
    }
};
