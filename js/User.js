import {
    cookie
} from 'cookie_js';
import sketchfabSDK from './lib/sketchfab.js';

module.exports = {
    isConnected() {
        return !!cookie.get('accessToken');
    },

    getAccessToken() {
        return cookie.get('accessToken');
    },

    setAccessToken(token) {
        cookie.set('accessToken', token);
    },

    connect() {
        return sketchfabSDK.connect();
    },

    logout() {
        cookie.remove('accessToken');
    }
}
