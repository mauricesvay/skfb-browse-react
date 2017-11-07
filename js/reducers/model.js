import {
    FETCH_MODELS_SUCCESS,
    FETCH_MODEL_SUCCESS,
    FETCH_FALLBACK_SUCCESS
} from "../actions/actions";

import { ADD_LIKE, REMOVE_LIKE } from "../actions/user";

function allModelsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_MODELS_SUCCESS:
            var newState = { ...state };
            var uid;
            for (var i = 0, l = action.models.length; i < l; i++) {
                uid = action.models[i].uid;
                if (newState.hasOwnProperty(uid)) {
                    newState[uid] = { ...newState[uid], ...action.models[i] };
                } else {
                    newState[uid] = action.models[i];
                }
            }
            return newState;
        case FETCH_MODEL_SUCCESS:
            var uid = action.uid;
            var newState = { ...state, [uid]: action.model };
            return newState;
        case FETCH_FALLBACK_SUCCESS:
            var newState = { ...state };
            var uid = action.uid;
            if (newState[uid]) {
                newState[uid].fallback = action.fallback;
            }
            return newState;
        case ADD_LIKE:
            var uid = action.uid;
            var newState = { ...state };
            if (newState[uid]) {
                newState[uid] = { ...newState[uid] };
                newState[uid].likeCount += 1;
            }
            return newState;
        case REMOVE_LIKE:
            var uid = action.uid;
            var newState = { ...state };
            if (newState[uid]) {
                newState[uid] = { ...newState[uid] };
                newState[uid].likeCount = Math.max(
                    0,
                    newState[uid].likeCount - 1
                );
            }
            return newState;
        default:
            return state;
    }
}

export default allModelsReducer;
