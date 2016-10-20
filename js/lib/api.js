var axios = require( 'axios' );
var Promise = require( 'bluebird' );
var localforage = require( 'localforage' );
var querystring = require( 'querystring' );

var BASE_URL = 'https://api.sketchfab.com';
var MODELS_ENDPOINT = '/v3/models';
var COLLECTIONS_ENDPOINT = '/v3/collections';

function _apiGet( url ) {
    return new Promise( function( resolve, reject ) {
        //@TODO check cursor
        localforage.getItem( url ).then( function( value ) {
            if ( value !== null ) {
                console.log( 'Cache HIT', url );
                resolve( value );
            } else {
                console.log( 'Cache MISS', url );
                axios.get( url ).then( function( response ) {
                    localforage.setItem( url, response.data );
                    resolve( response.data );
                } ).catch( function( error ) {
                    reject( error );
                } );
            }
        } ).catch( function() {
            console.log( 'Cache ERROR', url );
            axios.get( url ).then( function( response ) {
                localforage.setItem( url, response.data );
                resolve( response.data );
            } ).catch( function( error ) {
                reject( error );
            } );
        } );
    } );
}

function SketchfabDataApi() {

}

SketchfabDataApi.prototype = {

    model: {
        get: function( uid ) {
            var url = BASE_URL + MODELS_ENDPOINT + '/' + uid;
            return _apiGet( url );
        }
    },

    models: {
        get: function( query ) {
            var qs = querystring.stringify( query );
            var url = BASE_URL + MODELS_ENDPOINT + '?' + qs;
            return _apiGet( url );
        }
    },

    collections: {
        get: function( query ) {
            var qs = querystring.stringify( query );
            var url = BASE_URL + COLLECTIONS_ENDPOINT + '/' + query.uid + '/models?' + qs;
            return _apiGet( url );
        }
    }
}

module.exports = SketchfabDataApi;
