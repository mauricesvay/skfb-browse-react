var axios = require( 'axios' );
var querystring = require( 'querystring' );

var BASE_URL = 'https://api.sketchfab.com';
var MODELS_ENDPOINT = '/v3/models';

function SketchfabDataApi() {

}

SketchfabDataApi.prototype = {
    models: {
        get: function( query ) {
            var qs = querystring.stringify( query );
            var url = BASE_URL + MODELS_ENDPOINT + '?' + qs;
            return axios.get( url );
        }
    },

    search: function( query ) {

    }
}

module.exports = SketchfabDataApi;
