import sketchfabSDK from '../lib/sketchfab.js';
import User from '../User';
var _ = {
    clone: require('lodash/clone')
};

const FETCH_MODELS_REQUEST = 'FETCH_MODELS_REQUEST';
const FETCH_MODELS_SUCCESS = 'FETCH_MODELS_SUCCESS';
const FETCH_MODELS_ERROR = 'FETCH_MODELS_ERROR';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';

const LOGOUT = 'LOGOUT';

var isRequestPending = {};

function getFeed(dispatch, query, offset=0) {
    let key = JSON.stringify(query);

    if (!User.isConnected()) {
        console.log('User is not connected');
        dispatch({
            type: FETCH_MODELS_ERROR,
            query: query
        });
    }

    if (isRequestPending[key]) {
        console.info('getFeed: already requesting');
        return;
    }

    isRequestPending[key] = true;
    sketchfabSDK.Feed.all(User.getAccessToken(), {offset})
        .then((feed)=>{
            isRequestPending[key] = false;
            dispatch({
                type: FETCH_MODELS_SUCCESS,
                query: query,
                models: feed.results
            });
        })
        .catch((error)=>{
            isRequestPending[key] = false;
            console.error('getFeed: error', error);
            dispatch({
                type: FETCH_MODELS_ERROR,
                query: query
            });
        });
}

function getModels(dispatch, query, offset) {
    var requestQuery = _.clone(query);
    if (offset) {
        requestQuery.offset = offset;
    }
    let key = JSON.stringify(requestQuery);

    if (isRequestPending[key]) {
        console.info('getModels: already requesting');
        return;
    } else {
        console.info('requestModels', requestQuery);
        isRequestPending[key] = true;
        sketchfabSDK.Models.all(requestQuery).then((response) => {
            isRequestPending[key] = false;
            dispatch({
                type: FETCH_MODELS_SUCCESS,
                query: query,
                models: response.results
            });
        }, () => {
            console.error('getModels: error');
            isRequestPending[key] = false;
            dispatch({
                type: FETCH_MODELS_ERROR,
                query: query
            });
        });
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

    requestModels: function(query, offset) {
        return function(dispatch) {
            dispatch({
                type: FETCH_MODELS_REQUEST,
                query: query
            });

            if (query.special && query.special === 'newsfeed') {
                getFeed(dispatch, query, offset);
            } else {
                getModels(dispatch, query, offset);
            }
        }
    },

    requestLogin: function() {
        return function(dispatch) {
            dispatch({
                type: LOGIN_REQUEST
            });

            User.connect()
                .then(function(grant){
                    User.setAccessToken(grant.access_token);
                    dispatch({
                        type: LOGIN_SUCCESS,
                        accessToken: grant.access_token
                    });
                })
                .catch(function(error){
                    dispatch({
                        type: LOGIN_ERROR,
                        error: error
                    });
                });
        }
    },

    requestLogout: function() {
        User.logout();
        return {
            type: LOGOUT
        };
    }
};
