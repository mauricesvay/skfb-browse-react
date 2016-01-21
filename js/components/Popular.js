import React from 'react';
import BrowseMixin from './BrowseMixin';
import sketchfabSDK from '../lib/sketchfab.js';

let Popular = React.createClass({
    
    mixins: [BrowseMixin],

    getStorageKey() {
        return 'browse/popular';
    },

    fetchData() {
        sketchfabSDK.Models.popular(this.state.offset).then(this.onDataSuccess);
    },
});

module.exports = Popular;
