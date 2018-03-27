import { FETCH_MODELS_SUCCESS } from "../actions/actions";

function uniq(ar) {
    return ar.filter(function(value, index, self) {
        return self.indexOf(value) === index;
    });
}

function modelsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_MODELS_SUCCESS:
            var newState = {
                ...state
            };

            var key = action.key;

            if (newState.hasOwnProperty(key)) {
                newState[key] = {
                    models: uniq(
                        newState[key].models.concat(
                            action.models.map(m => m.uid)
                        )
                    ),
                    nextCursor: action.nextCursor
                };
            } else {
                newState[key] = {
                    models: uniq(action.models.map(m => m.uid)),
                    nextCursor: action.nextCursor
                };
            }

            return newState;
        default:
            return state;
    }
}

export default modelsReducer;
