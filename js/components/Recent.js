import React from 'react';
import BrowseMixin from './BrowseMixin';
import sketchfabSDK from '../lib/sketchfab.js';

let Recent = React.createClass({

    mixins: [BrowseMixin],

    getStorageKey() {
        return 'browse/recents';
    },

    fetchData() {
        sketchfabSDK.Models.recent(this.state.offset).then(this.onDataSuccess);
    }
});

module.exports = Recent;
