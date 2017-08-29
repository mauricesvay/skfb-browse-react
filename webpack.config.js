var webpack = require( 'webpack' );
var path = require( 'path' );
var ExtractTextPlugin = require( "extract-text-webpack-plugin" );

module.exports = {
    devtool: 'cheap-source-map',
    entry: [ "./app.js" ],
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
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract( {
                    use: "css-loader"
                } )
            },
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin( {
            NODE_ENV: 'production'
        } ),
        new ExtractTextPlugin( "styles.css" )
    ],
    resolve: {
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
    }
};
