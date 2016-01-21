import React from 'react';
import BrowseMixin from './BrowseMixin';
import sketchfabSDK from '../lib/sketchfab.js';

let Search = React.createClass({
    
    mixins: [BrowseMixin],

    getStorageKey() {
        return 'browse/search/' + this.props.location.query.q;
    },

    fetchData() {
        sketchfabSDK.Models.search(this.props.location.query.q, this.state.offset).then(this.onDataSuccess);
    },
});

module.exports = Search;
