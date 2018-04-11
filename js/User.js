import { cookie } from "cookie_js";
import config from "./config/config";
import SketchfabOAuth2 from "sketchfab-oauth2";

module.exports = {
    isConnected() {
        return !!cookie.get("accessToken");
    },

    getAccessToken() {
        return cookie.get("accessToken");
    },

    setAccessToken(token) {
        cookie.set("accessToken", token);
    },

    connect(params) {
        var client = new SketchfabOAuth2(config.oauth2);
        return client.connect(params);
    },

    logout() {
        cookie.remove("accessToken");
    }
};
