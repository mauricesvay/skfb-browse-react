import { FETCH_MODELS_SUCCESS } from "../actions/actions";

function modelsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_MODELS_SUCCESS:
            var newState = {
                ...state
            };

            var key = action.key;

            if (newState.hasOwnProperty(key)) {
                newState[key] = {
                    models: newState[key].models.concat(
                        action.models.map(m => m.uid)
                    ),
                    nextCursor: action.nextCursor
                };
            } else {
                newState[key] = {
                    models: action.models.map(m => m.uid),
                    nextCursor: action.nextCursor
                };
            }

            return newState;
        default:
            return state;
    }
}

export default modelsReducer;
