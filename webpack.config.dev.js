var webpack = require( 'webpack' );
var config = require( './webpack.config.js' );

config.plugins = [
    new webpack.EnvironmentPlugin( {
        NODE_ENV: 'development'
    } )
];

module.exports = config;
