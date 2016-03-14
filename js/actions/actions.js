import sketchfabSDK from '../lib/sketchfab.js';
var _ = {
    clone: require('lodash/clone')
};

const FETCH_MODELS_REQUEST = 'FETCH_MODELS_REQUEST';
const FETCH_MODELS_SUCCESS = 'FETCH_MODELS_SUCCESS';
const FETCH_MODELS_ERROR = 'FETCH_MODELS_ERROR';

var isRequestPending = {};

module.exports = {
    FETCH_MODELS_REQUEST: FETCH_MODELS_REQUEST,
    FETCH_MODELS_SUCCESS: FETCH_MODELS_SUCCESS,
    FETCH_MODELS_ERROR: FETCH_MODELS_ERROR,

    requestModels: function(query, offset) {
        return function(dispatch) {
            dispatch({
                type: FETCH_MODELS_REQUEST,
                query: query
            });

            var requestQuery = _.clone(query);
            if (offset) {
                requestQuery.offset = offset;
            }
            var key = JSON.stringify(requestQuery);

            if (isRequestPending[key]) {
                console.log('fetch error: already requesting');
                return;
            } else {
                console.log('requestModels', requestQuery);
                isRequestPending[key] = true;
                sketchfabSDK.Models.all(requestQuery).then((response) => {
                    isRequestPending[key] = false;
                    dispatch({
                        type: FETCH_MODELS_SUCCESS,
                        query: query,
                        models: response.results
                    });
                }, () => {
                    console.log('fetch error');
                    isRequestPending[key] = false;
                    dispatch({
                        type: FETCH_MODELS_ERROR,
                        query: query
                    });
                });
            }
        }
    }
};
