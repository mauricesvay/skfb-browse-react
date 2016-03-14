import { combineReducers } from 'redux';
import { FETCH_MODELS_SUCCESS, FETCH_MODELS_ERROR, FETCH_MODELS_REQUEST } from '../actions/actions';
var _ = {
    uniqBy: require('lodash/uniqBy')
}

function modelsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_MODELS_SUCCESS:
            var newState = {
                ...state
            };

            var key = JSON.stringify(action.query);
            if (newState.hasOwnProperty(key)) {
                newState[key] = _.uniqBy(newState[key].concat(action.models), m => m.uid );
            } else {
                newState[key] = action.models;
            }

            return newState;
        default:
            return state;
    }
}

function loadingReducer(state = {}, action) {
    var key = JSON.stringify(action.query);
    switch (action.type) {
        case FETCH_MODELS_SUCCESS:
        case FETCH_MODELS_ERROR:
            var newState = {...state};
            newState[key] = false;
            return newState;
        case FETCH_MODELS_REQUEST:
            var newState = {...state};
            newState[key] = true;
            return newState;
        default:
            return state;
    }
}

const MainReducer = combineReducers({
    models: modelsReducer,
    isLoading: loadingReducer
});

module.exports = MainReducer;
