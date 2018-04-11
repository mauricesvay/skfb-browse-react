import User from "../User";
import SketchfabDataApi from "../lib/api.js";

const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOGOUT = "LOGOUT";

const ADD_LIKE = "ADD_LIKE";
const REMOVE_LIKE = "REMOVE_LIKE";
const CONTAINS_LIKE = "CONTAINS_LIKE";

var sketchabDataApi = new SketchfabDataApi();

module.exports = {
    LOGIN_REQUEST: LOGIN_REQUEST,
    LOGIN_SUCCESS: LOGIN_SUCCESS,
    LOGIN_ERROR: LOGIN_ERROR,
    LOGOUT: LOGOUT,

    ADD_LIKE: ADD_LIKE,
    REMOVE_LIKE: REMOVE_LIKE,
    CONTAINS_LIKE: CONTAINS_LIKE,

    addLike: function(uid) {
        return function(dispatch) {
            dispatch({
                type: ADD_LIKE,
                uid: uid
            });

            sketchabDataApi.likes.add(uid).catch(function(error) {
                dispatch({
                    type: REMOVE_LIKE,
                    uid: uid
                });
            });
        };
    },

    removeLike: function(uid) {
        return function(dispatch) {
            dispatch({
                type: REMOVE_LIKE,
                uid: uid
            });

            sketchabDataApi.likes.remove(uid).catch(function(error) {
                console.error("Error removing like for " + uid);
            });
        };
    },

    containsLike: function(uid) {
        return function(dispatch) {
            sketchabDataApi.likes.contains(uid).then(function(response){
                if (response.data && response.data.results && response.data.results.hasOwnProperty(uid)) {
                    dispatch({
                        type: CONTAINS_LIKE,
                        uid: uid,
                        contains: response.data.results[uid]
                    });
                }
            }).catch(function(error) {
                console.error("containsLike", error);
            });
        };
    },

    requestLogin: function() {
        return function(dispatch) {
            dispatch({
                type: LOGIN_REQUEST
            });

            User.connect({
                "approval_prompt": "auto"
            })
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
