var axios = require( 'axios' );
var querystring = require( 'querystring' );
var localforage = require( 'localforage' );

var BASE_URL = 'https://api.sketchfab.com';
var MODELS_ENDPOINT = '/v3/models';

var isDev = ( process.env.NODE_ENV === 'development' );

function apiGet( url, config ) {
    return new Promise( function( resolve, reject ) {
        // only cache requests with cursor
        if ( url.indexOf( 'cursor=' ) !== -1 ) {
            localforage.getItem( url ).then( ( data ) => {
                if ( data !== null ) {
                    isDev && console.log( 'Cache HIT', url );
                    resolve( data );
                } else {
                    isDev && console.log( 'Cache MISS', url );
                    axios.get( url, config ).then( ( response ) => {
                        localforage.setItem( url, response.data );
                        resolve( response.data );
                    } ).catch( ( error ) => {
                        reject( error );
                    } );
                }
            } ).catch( ( err ) => {
                reject( err );
            } );
        } else {
            axios.get( url, config ).then( ( response ) => {
                resolve( response.data );
            } ).catch( ( error ) => {
                reject( error );
            } );
        }
    } );
}

function SketchfabDataApi() {

}

SketchfabDataApi.prototype = {

    model: {
        get: function( uid ) {
            var url = BASE_URL + MODELS_ENDPOINT + '/' + uid;
            return apiGet( url );
        }
    },

    models: {
        get: function( query ) {
            var qs = querystring.stringify( query );
            var url = BASE_URL + MODELS_ENDPOINT + '?' + qs;
            return apiGet( url );
        }
    },

    search: function( query ) {

    }
}

module.exports = SketchfabDataApi;
