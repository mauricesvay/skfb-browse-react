import sketchfabSDK from '../lib/sketchfab.js';
import SketchfabDataApi from '../lib/api.js';
import Url from 'url';
import User from '../User';
var _ = {
    clone: require( 'lodash/clone' )
};

var sketchabDataApi = new SketchfabDataApi();

const FETCH_MODELS_REQUEST = 'FETCH_MODELS_REQUEST';
const FETCH_MODELS_SUCCESS = 'FETCH_MODELS_SUCCESS';
const FETCH_MODELS_ERROR = 'FETCH_MODELS_ERROR';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';

const LOGOUT = 'LOGOUT';

var isRequestPending = {};

function getFeed( dispatch, query, offset = 0 ) {
    let key = JSON.stringify( query );

    if ( !User.isConnected() ) {
        console.log( 'User is not connected' );
        dispatch( {
            type: FETCH_MODELS_ERROR,
            query: query
        } );
    }

    if ( isRequestPending[ key ] ) {
        console.info( 'getFeed: already requesting' );
        return;
    }

    isRequestPending[ key ] = true;
    sketchfabSDK.Feed.all( User.getAccessToken(), {
            offset
        } )
        .then( ( feed ) => {
            isRequestPending[ key ] = false;
            dispatch( {
                type: FETCH_MODELS_SUCCESS,
                query: query,
                models: feed.results
            } );
        } )
        .catch( ( error ) => {
            isRequestPending[ key ] = false;
            console.error( 'getFeed: error', error );
            dispatch( {
                type: FETCH_MODELS_ERROR,
                query: query
            } );
        } );
}

function getCollectionModels( dispatch, key, query, cursor ) {
    var requestQuery = _.clone( query );
    if ( cursor ) {
        requestQuery.cursor = cursor;
    }

    if ( isRequestPending[ key ] ) {
        console.info( 'getCollectionModels: already requesting' );
        return;
    } else {
        console.info( 'getCollectionModels', requestQuery );
        isRequestPending[ key ] = true;

        sketchabDataApi.collections.get( requestQuery ).then( ( response ) => {

            isRequestPending[ key ] = false;
            var nextCursor = '';
            if ( response.data && response.data.next ) {
                var urlParts = Url.parse( response.data.next, true );
                var urlQuery = urlParts.query;
                var nextCursor = urlQuery.cursor;
            }
            var models = response.data.results.map( ( model ) => {
                model.viewerUrl = 'https://sketchfab.com/models/' + model.uid;
                return model;
            } );

            dispatch( {
                type: FETCH_MODELS_SUCCESS,
                key: key,
                query: query,
                models: models,
                nextCursor: nextCursor
            } );

            // Prefetch next page
            if ( nextCursor !== '' ) {
                dispatch( requestPrefetch( key, {
                    ...requestQuery,
                    cursor: nextCursor
                } ) );
            }

        } ).catch( () => {

            console.error( 'getCollectionModels: error' );
            isRequestPending[ key ] = false;
            dispatch( {
                type: FETCH_MODELS_ERROR,
                key: key,
                query: query
            } );

        } );
    }
}

function getModels( dispatch, key, query, cursor ) {

    var requestQuery = _.clone( query );
    if ( cursor ) {
        requestQuery.cursor = cursor;
    }

    if ( isRequestPending[ key ] ) {
        console.info( 'getModels: already requesting' );
        return;
    } else {
        console.info( 'requestModels', requestQuery );
        isRequestPending[ key ] = true;

        sketchabDataApi.models.get( requestQuery ).then( ( response ) => {

            isRequestPending[ key ] = false;
            var urlParts = Url.parse( response.data.next, true );
            var urlQuery = urlParts.query;
            var nextCursor = urlQuery.cursor || '';

            var models = response.data.results.map( ( model ) => {
                model.viewerUrl = 'https://sketchfab.com/models/' + model.uid;
                return model;
            } );

            dispatch( {
                type: FETCH_MODELS_SUCCESS,
                key: key,
                query: query,
                models: models,
                nextCursor: nextCursor
            } );

            // Prefetch next page
            dispatch( requestPrefetch( key, {
                ...requestQuery,
                cursor: nextCursor
            } ) );

        } ).catch( () => {

            console.error( 'getModels: error' );
            isRequestPending[ key ] = false;
            dispatch( {
                type: FETCH_MODELS_ERROR,
                key: key,
                query: query
            } );

        } );
    }
}

function requestPrefetch( key, query ) {
    return function ( dispatch ) {
        console.log( 'Prefetching', query );
        sketchabDataApi.models.get( query );
    }
}

module.exports = {
    FETCH_MODELS_REQUEST: FETCH_MODELS_REQUEST,
    FETCH_MODELS_SUCCESS: FETCH_MODELS_SUCCESS,
    FETCH_MODELS_ERROR: FETCH_MODELS_ERROR,

    LOGIN_REQUEST: LOGIN_REQUEST,
    LOGIN_SUCCESS: LOGIN_SUCCESS,
    LOGIN_ERROR: LOGIN_ERROR,
    LOGOUT: LOGOUT,

    requestModels: function ( key, query, cursor ) {
        return function ( dispatch ) {
            dispatch( {
                type: FETCH_MODELS_REQUEST,
                key: key,
                query: query,
                cursor: cursor
            } );

            if ( query.special ) {
                if ( query.special === 'newsfeed' ) {
                    getFeed( dispatch, query, offset );
                } else if ( query.special === 'collection' ) {
                    getCollectionModels( dispatch, key, query, cursor );
                }
            } else {
                getModels( dispatch, key, query, cursor );
            }
        }
    },

    requestLogin: function () {
        return function ( dispatch ) {
            dispatch( {
                type: LOGIN_REQUEST
            } );

            User.connect()
                .then( function ( grant ) {
                    User.setAccessToken( grant.access_token );
                    dispatch( {
                        type: LOGIN_SUCCESS,
                        accessToken: grant.access_token
                    } );
                } )
                .catch( function ( error ) {
                    dispatch( {
                        type: LOGIN_ERROR,
                        error: error
                    } );
                } );
        }
    },

    requestLogout: function () {
        User.logout();
        return {
            type: LOGOUT
        };
    }
};
