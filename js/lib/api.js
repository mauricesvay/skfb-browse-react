var axios = require( 'axios' );
var querystring = require( 'querystring' );

var BASE_URL = 'https://api.sketchfab.com';
var MODELS_ENDPOINT = '/v3/models';
var COLLECTIONS_ENDPOINT = '/v3/collections';

function SketchfabDataApi() {

}

SketchfabDataApi.prototype = {

    model: {
        get: function ( uid ) {
            var url = BASE_URL + MODELS_ENDPOINT + '/' + uid;
            return axios.get( url );
        }
    },

    models: {
        get: function ( query ) {
            var qs = querystring.stringify( query );
            var url = BASE_URL + MODELS_ENDPOINT + '?' + qs;
            return axios.get( url );
        }
    },

    collections: {
        get: function ( query ) {
            var qs = querystring.stringify( query );
            var url = BASE_URL + COLLECTIONS_ENDPOINT + '/' + query.uid + '/models?' + qs;
            return axios.get( url );
        }
    }
}

module.exports = SketchfabDataApi;
