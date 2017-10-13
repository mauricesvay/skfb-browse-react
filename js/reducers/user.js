import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
    ADD_LIKE,
    REMOVE_LIKE,
    CONTAINS_LIKE
} from "../actions/user";

var defaultUserState = {
    accessToken: "",
    likes: {}
};

function userReducer(state = defaultUserState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            var newState = {
                ...state
            };
            newState.accessToken = action.accessToken;
            return newState;
        case LOGIN_ERROR:
            console.error("Login error", action.error);
            return state;
        case LOGOUT:
            return defaultUserState;
        case ADD_LIKE:
            console.log("ADD_LIKE", action);
            var newState = {
                ...state
            };
            newState.likes[action.uid] = true;
            return newState;
        case REMOVE_LIKE:
            var newState = {
                ...state
            };
            newState.likes[action.uid] = false;
            return newState;
        case CONTAINS_LIKE:
            var newState = {
                ...state
            };
            newState.likes[action.uid] = action.contains;
            return newState;
        default:
            return state;
    }
}

export default userReducer;
