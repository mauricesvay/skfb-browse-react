var webpack = require( 'webpack' );
var path = require( 'path' );

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: "./app.js",
    output: {
        path: path.join( __dirname, 'docs' ),
        filename: "app.bundle.js"
    },
    module: {
        loaders: [ {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        } ]
    },
    plugins: [
        new webpack.DefinePlugin( {
            'process.env': {
                NODE_ENV: '"development"'
            }
        } ),
        new webpack.EnvironmentPlugin( [
            "NODE_ENV"
        ] )
    ],
    "resolve": {
        "alias": {
            "react": "preact-compat",
            "react-dom": "preact-compat"
        }
    }
};
