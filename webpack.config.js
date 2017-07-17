var webpack = require( 'webpack' );
var path = require( 'path' );

module.exports = {
    devtool: 'cheap-source-map',
    entry: "./app.js",
    output: {
        path: path.join( __dirname, 'docs' ),
        filename: "app.bundle.js"
    },
    module: {
        rules: [ {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: [ {
                loader: 'babel-loader',
                options: {
                    presets: [ 'stage-3', 'env', 'react' ]
                }
            } ]
        } ]
    },
    plugins: [
        new webpack.EnvironmentPlugin( {
            NODE_ENV: 'production'
        } )
    ],
    resolve: {
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
    }
};
