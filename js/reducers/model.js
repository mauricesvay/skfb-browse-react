import {
    FETCH_MODELS_SUCCESS,
    FETCH_MODEL_SUCCESS
} from '../actions/actions';

function allModelsReducer( state = {}, action ) {
    switch ( action.type ) {
    case FETCH_MODELS_SUCCESS:
        var newState = {
            ...state
        };
        var uid;
        for ( var i = 0, l = action.models.length; i < l; i++ ) {
            uid = action.models[ i ].uid;
            if ( newState.hasOwnProperty( uid ) ) {
                newState[ uid ] = {
                    ...newState[ uid ],
                    ...action.models[ i ]
                };
            } else {
                newState[ uid ] = action.models[ i ];
            }
        }
        return newState;
    case FETCH_MODEL_SUCCESS:
        var uid = action.uid;
        var newState = {
            ...state,
            [ uid ]: action.model
        }
        return newState;
    default:
        return state;
    }
}

export default allModelsReducer;
