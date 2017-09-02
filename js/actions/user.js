import User from "../User";

const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOGOUT = "LOGOUT";

module.exports = {
    LOGIN_REQUEST: LOGIN_REQUEST,
    LOGIN_SUCCESS: LOGIN_SUCCESS,
    LOGIN_ERROR: LOGIN_ERROR,
    LOGOUT: LOGOUT,

    requestLogin: function() {
        return function(dispatch) {
            dispatch({
                type: LOGIN_REQUEST
            });

            User.connect()
                .then(function(grant) {
                    User.setAccessToken(grant.access_token);
                    dispatch({
                        type: LOGIN_SUCCESS,
                        accessToken: grant.access_token
                    });

                    // getFeed( dispatch, {}, 0);
                })
                .catch(function(error) {
                    dispatch({
                        type: LOGIN_ERROR,
                        error: error
                    });
                });
        };
    },

    requestLogout: function() {
        User.logout();
        return {
            type: LOGOUT
        };
    }
};
