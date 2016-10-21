import { combineReducers } from 'redux';
import {
    FETCH_MODELS_SUCCESS,
    FETCH_MODELS_ERROR,
    FETCH_MODELS_REQUEST,
    FETCH_MODEL_SUCCESS,
    FETCH_MODEL_ERROR,
    FETCH_MODEL_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT
} from '../actions/actions';
var _ = {
    uniqBy: require( 'lodash/uniqBy' )
}

function modelsReducer( state = {}, action ) {
    switch ( action.type ) {
        case FETCH_MODELS_SUCCESS:
            var newState = {
                ...state
            };

            var key = action.key;

            if (newState.hasOwnProperty( key )) {
                newState[key] = {
                    models: _.uniqBy( newState[key].models.concat( action.models ), m => m.uid ),
                    nextCursor: action.nextCursor
                };
            } else {
                newState[key] = {
                    models: action.models,
                    nextCursor: action.nextCursor
                }
            }

            return newState;
        default:
            return state;
    }
}

function modelReducer( state = {}, action ) {
    switch ( action.type ) {
        case FETCH_MODEL_SUCCESS:
            var newState = {
                ...state
            };
            var uid = action.uid;
            newState[uid] = action.model;
            return newState;
        case FETCH_MODEL_ERROR:
        default:
            return state;
    }
}

function loadingReducer( state = {}, action ) {
    var key = JSON.stringify( action.query );
    switch ( action.type ) {
        case FETCH_MODELS_SUCCESS:
        case FETCH_MODELS_ERROR:
            var newState = {
                ...state
            };
            newState[key] = false;
            return newState;
        case FETCH_MODELS_REQUEST:
            var newState = {
                ...state
            };
            newState[key] = true;
            return newState;
        default:
            return state;
    }
}

var defaultUserState = {
    accessToken: ''
}

function userReducer( state = defaultUserState, action ) {
    switch ( action.type ) {
        case LOGIN_SUCCESS:
            return { accessToken: action.accessToken };
        case LOGIN_ERROR:
            console.log( 'Login error' );
            return state;
        case LOGOUT:
            return { accessToken: '' };
        default:
            return state;
    }
}

const MainReducer = combineReducers({ models: modelsReducer, model: modelReducer, isLoading: loadingReducer, user: userReducer });

module.exports = MainReducer;
