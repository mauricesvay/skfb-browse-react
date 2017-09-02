import {
    FETCH_MODELS_SUCCESS,
    FETCH_MODELS_ERROR,
    FETCH_MODELS_REQUEST
} from "../actions/actions";

function loadingReducer(state = {}, action) {
    var key = JSON.stringify(action.query);
    switch (action.type) {
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

export default loadingReducer;
