import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT
} from '../actions/user';

var defaultUserState = {
    accessToken: ''
}

function userReducer( state = defaultUserState, action ) {
    switch ( action.type ) {
    case LOGIN_SUCCESS:
        console.info( action.accessToken );
        return {
            accessToken: action.accessToken
        };
    case LOGIN_ERROR:
        console.error( 'Login error', action.error );
        return state;
    case LOGOUT:
        return {
            accessToken: ''
        };
    default:
        return state;
    }
}

export default userReducer;
