import qs from "qs";
import SketchfabDataApi from "../lib/api.js";
import Url from "url";
import User from "../User";

var sketchabDataApi = new SketchfabDataApi();

const FETCH_MODELS_REQUEST = "FETCH_MODELS_REQUEST";
const FETCH_MODELS_SUCCESS = "FETCH_MODELS_SUCCESS";
const FETCH_MODELS_ERROR = "FETCH_MODELS_ERROR";

const FETCH_MODEL_REQUEST = "FETCH_MODEL_REQUEST";
const FETCH_MODEL_SUCCESS = "FETCH_MODEL_SUCCESS";
const FETCH_MODEL_ERROR = "FETCH_MODEL_ERROR";

const FETCH_FALLBACK_REQUEST = "FETCH_FALLBACK_REQUEST";
const FETCH_FALLBACK_SUCCESS = "FETCH_FALLBACK_SUCCESS";
const FETCH_FALLBACK_ERROR = "FETCH_FALLBACK_ERROR";

var isRequestPending = {};

function getCollectionModels(dispatch, key, query, cursor) {
    let requestQuery = {
        ...query
    };

    if (cursor) {
        requestQuery.cursor = cursor;
    }

    if (isRequestPending[key]) {
        console.info("getCollectionModels: already requesting");
        return;
    } else {
        console.info("getCollectionModels", requestQuery);
        isRequestPending[key] = true;

        sketchabDataApi.collections
            .get(requestQuery)
            .then(response => {
                isRequestPending[key] = false;
                var nextCursor = "";
                if (response.data && response.data.next) {
                    var urlParts = Url.parse(response.data.next, true);
                    var urlQuery = urlParts.query;
                    var nextCursor = urlQuery.cursor;
                }
                var models = response.data.results.map(model => {
                    model.viewerUrl =
                        "https://sketchfab.com/models/" + model.uid;
                    return model;
                });

                dispatch({
                    type: FETCH_MODELS_SUCCESS,
                    key: key,
                    query: query,
                    models: models,
                    nextCursor: nextCursor
                });

                // Prefetch next page
                if (nextCursor !== "") {
                    dispatch(
                        requestPrefetch(key, {
                            ...requestQuery,
                            cursor: nextCursor
                        })
                    );
                }
            })
            .catch(() => {
                console.error("getCollectionModels: error");
                isRequestPending[key] = false;
                dispatch({
                    type: FETCH_MODELS_ERROR,
                    key: key,
                    query: query
                });
            });
    }
}

function getModels(dispatch, key, query, cursor) {
    let requestQuery = {
        ...query
    };

    if (cursor) {
        requestQuery.cursor = cursor;
    }

    if (isRequestPending[key]) {
        console.info("getModels: already requesting");
        return;
    } else {
        console.info("requestModels", requestQuery);
        isRequestPending[key] = true;

        sketchabDataApi.models
            .get(requestQuery)
            .then(response => {
                isRequestPending[key] = false;
                var nextCursor = "";
                if (response.next) {
                    var urlParts = Url.parse(response.next, true);
                    var urlQuery = urlParts.query;
                    nextCursor = urlQuery.cursor || "";
                }

                var models = response.results.map(model => {
                    model.viewerUrl =
                        "https://sketchfab.com/models/" + model.uid;
                    return model;
                });

                dispatch({
                    type: FETCH_MODELS_SUCCESS,
                    key: key,
                    query: query,
                    models: models,
                    nextCursor: nextCursor
                });

                // Prefetch next page
                dispatch(
                    requestPrefetch(key, {
                        ...requestQuery,
                        cursor: nextCursor
                    })
                );
            })
            .catch(error => {
                console.error("getModels: error", error);
                isRequestPending[key] = false;
                dispatch({
                    type: FETCH_MODELS_ERROR,
                    key: key,
                    query: query
                });
            });
    }
}

function requestPrefetch(key, query) {
    return function(dispatch) {
        console.log("Prefetching", query);
        sketchabDataApi.models.get(query);
    };
}

function getModel(dispatch, uid) {
    if (isRequestPending[uid]) {
        console.info("getModel: already requesting", uid);
        return;
    } else {
        console.log("getModel: ", uid);
        isRequestPending[uid] = true;
        sketchabDataApi.model
            .get(uid)
            .then(model => {
                isRequestPending[uid] = false;
                dispatch({
                    type: FETCH_MODEL_SUCCESS,
                    uid: uid,
                    model: model
                });
            })
            .catch(() => {
                isRequestPending[uid] = false;
                dispatch({
                    type: FETCH_MODEL_ERROR,
                    uid: uid
                });
            });
    }
}

function getFallback(dispatch, uid) {
    sketchabDataApi.model
        .getFallback(uid)
        .then(result => {
            var fallback = null;
            if (result.images && result.images.length) {
                fallback = result.images.reduce(function(previous, current) {
                    if (current.height === 180) {
                        return current;
                    } else {
                        return previous;
                    }
                });
                dispatch({
                    type: FETCH_FALLBACK_SUCCESS,
                    uid: uid,
                    fallback: fallback
                });
            } else {
                dispatch({
                    type: FETCH_FALLBACK_ERROR,
                    uid: uid
                });
            }
        })
        .catch(() => {
            dispatch({
                type: FETCH_FALLBACK_ERROR,
                uid: uid
            });
        });
}

function search(dispatch, key, query, cursor) {
    if (isRequestPending[key]) {
        console.info("search: already requesting", query.q);
        return;
    }

    console.info("search:", query.q);
    isRequestPending[key] = true;
    sketchabDataApi.models
        .search({
            q: query.q,
            type: "models",
            cursor: cursor
        })
        .then(response => {
            isRequestPending[key] = false;
            var nextCursor = "";
            if (response.next) {
                var queryString = qs.parse(
                    response.next.substr(response.next.indexOf("?") + 1)
                );
                nextCursor = queryString.cursor || "";
            }

            dispatch({
                type: FETCH_MODELS_SUCCESS,
                key: key,
                query: query,
                models: response.results,
                nextCursor: nextCursor
            });
        })
        .catch(() => {
            isRequestPending[key] = false;
            dispatch({
                type: FETCH_MODELS_ERROR,
                key: key,
                query: query
            });
        });
}

module.exports = {
    FETCH_MODELS_REQUEST: FETCH_MODELS_REQUEST,
    FETCH_MODELS_SUCCESS: FETCH_MODELS_SUCCESS,
    FETCH_MODELS_ERROR: FETCH_MODELS_ERROR,

    FETCH_MODEL_REQUEST: FETCH_MODEL_REQUEST,
    FETCH_MODEL_SUCCESS: FETCH_MODEL_SUCCESS,
    FETCH_MODEL_ERROR: FETCH_MODEL_ERROR,

    FETCH_FALLBACK_REQUEST: FETCH_FALLBACK_REQUEST,
    FETCH_FALLBACK_SUCCESS: FETCH_FALLBACK_SUCCESS,
    FETCH_FALLBACK_ERROR: FETCH_FALLBACK_ERROR,

    requestModels: function(key, query, cursor) {
        return function(dispatch) {
            dispatch({
                type: FETCH_MODELS_REQUEST,
                key: key,
                query: query,
                cursor: cursor
            });

            if (query.special) {
                switch (query.special) {
                    case "collection":
                        getCollectionModels(dispatch, key, query, cursor);
                        break;
                    case "search":
                        search(dispatch, key, query, cursor);
                        break;
                }
            } else {
                getModels(dispatch, key, query, cursor);
            }
        };
    },

    requestModel: function(uid) {
        return function(dispatch) {
            dispatch({
                type: FETCH_MODEL_REQUEST,
                uid: uid
            });

            getModel(dispatch, uid);
        };
    },

    requestFallback: function(uid) {
        return function(dispatch) {
            dispatch({
                type: FETCH_FALLBACK_REQUEST,
                uid: uid
            });

            getFallback(dispatch, uid);
        };
    }
};
