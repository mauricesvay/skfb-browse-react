var axios = require("axios");
var querystring = require("querystring");
var localforage = require("localforage");
var User = require("../User");

var BASE_URL = "https://api.sketchfab.com";
var MODELS_ENDPOINT = "/v3/models";
var SEARCH_ENDPOINT = "/v3/search";
var COLLECTIONS_ENDPOINT = "/v3/collections";
var FEED_ENDPOINT = "/i/feeds";

var isDev = process.env.NODE_ENV === "development";

function apiGet(url, config) {
    return new Promise(function(resolve, reject) {
        // only cache requests with cursor
        if (url.indexOf("cursor=") !== -1) {
            localforage
                .getItem(url)
                .then(data => {
                    if (data !== null) {
                        isDev && console.log("Cache HIT", url);
                        resolve(data);
                    } else {
                        isDev && console.log("Cache MISS", url);
                        axios
                            .get(url, config)
                            .then(response => {
                                localforage.setItem(url, response.data);
                                resolve(response.data);
                            })
                            .catch(error => {
                                reject(error);
                            });
                    }
                })
                .catch(err => {
                    reject(err);
                });
        } else {
            axios
                .get(url, config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        }
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
                    .catch(function(error) {
                        reject(error);
                    });
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
                            .catch(function(error) {
                                reject(error);
                            });
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

            var instance = axios.create({
                baseURL: BASE_URL,
                headers: {
                    Authorization: "Bearer " + User.getAccessToken()
                }
            });
            return instance.get(FEED_ENDPOINT);
        }
    }
};

module.exports = SketchfabDataApi;
