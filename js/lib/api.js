var axios = require("axios");
var querystring = require("querystring");
var localforage = require("localforage");
var User = require("../User");

var BASE_URL = "https://api.sketchfab.com";
var MODELS_ENDPOINT = "/v3/models";
var SEARCH_ENDPOINT = "/v3/search";
var COLLECTIONS_ENDPOINT = "/v3/collections";
var FEED_ENDPOINT = "/i/feeds";
var ME_LIKES_ENDPOINT = "/v3/me/likes";

var isDev = process.env.NODE_ENV === "development";

function getAxiosInstance() {
    if (!User.isConnected()) {
        return;
    }
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: "Bearer " + User.getAccessToken()
        }
    });
}

function apiGet(url, config) {
    // Only cache url that have a cursor
    var useCache = url.indexOf("cursor=") !== -1;

    return new Promise(function(resolve, reject) {
        if (!useCache) {
            axios
                .get(url, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(reject);
            return;
        }

        localforage
            .getItem(url)
            .then(data => {
                if (data !== null) {
                    isDev && console.info("Cache HIT", url);
                    resolve(data);
                } else {
                    isDev && console.info("Cache MISS", url);
                    axios
                        .get(url, config)
                        .then(response => {
                            localforage.setItem(url, response.data, function(
                                error
                            ) {
                                if (error) {
                                    console.error("Localforage error", error);
                                }
                            });
                            resolve(response.data);
                        })
                        .catch(reject);
                }
            })
            .catch(reject);
    });
}

function SketchfabDataApi() {}

SketchfabDataApi.prototype = {
    model: {
        get: function(uid) {
            return new Promise(function(resolve, reject) {
                var urlInfo = BASE_URL + MODELS_ENDPOINT + "/" + uid;
                var urlFallback = BASE_URL + "/i/models/" + uid + "/fallback";

                axios
                    .all([axios.get(urlInfo), axios.get(urlFallback)])
                    .then(function(responses) {
                        var modelInfo = responses[0].data;
                        modelInfo.fallback = responses[1].data.results;
                        resolve(modelInfo);
                    })
                    .catch(reject);
            });
        },

        getFallback: function(uid) {
            return new Promise(function(resolve, reject) {
                var url = BASE_URL + "/i/models/" + uid + "/fallback";

                localforage.getItem(url).then(data => {
                    if (data !== null) {
                        resolve(data);
                    } else {
                        axios
                            .get(url)
                            .then(function(response) {
                                localforage.setItem(url, response.data.results);
                                resolve(response.data.results);
                            })
                            .catch(reject);
                    }
                });
            });
        }
    },

    models: {
        get: function(query) {
            var qs = querystring.stringify(query);
            var url = BASE_URL + MODELS_ENDPOINT + "?" + qs;
            return apiGet(url);
        },

        search: function(query) {
            var qs = querystring.stringify(query);
            var url = BASE_URL + SEARCH_ENDPOINT + "?" + qs;
            return apiGet(url);
        }
    },

    collections: {
        get: function(query) {
            var qs = querystring.stringify(query);
            var url =
                BASE_URL +
                COLLECTIONS_ENDPOINT +
                "/" +
                query.uid +
                "/models?" +
                qs;
            return axios.get(url);
        }
    },

    feed: {
        get: function() {
            if (!User.isConnected()) {
                console.error("No feed for anonymous users");
                return;
            }

            var instance = getAxiosInstance();
            return instance.get(FEED_ENDPOINT);
        }
    },

    likes: {
        add: function(uid) {
            var instance = getAxiosInstance();
            return instance.post(ME_LIKES_ENDPOINT, {
                model: uid
            });
        },
        remove: function(uid) {
            var instance = getAxiosInstance();
            return instance.delete(ME_LIKES_ENDPOINT + "/" + uid);
        },
        contains: function(uid) {
            var endpoint = ME_LIKES_ENDPOINT + "/contains?model_uids=" + uid;
            var instance = getAxiosInstance();
            return instance.get(endpoint);
        }
    }
};

module.exports = SketchfabDataApi;
