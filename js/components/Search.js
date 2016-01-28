import React from 'react';
import BrowseMixin from './BrowseMixin';
import sketchfabSDK from '../lib/sketchfab.js';

let Search = React.createClass({

    mixins: [BrowseMixin],

    componentWillReceiveProps( /*nextProps*/ ) {
        this.setState({
            models: [],
            offset: 0
        });
    },

    componentDidUpdate(prevProps/*, prevState*/) {
        if (this.props.location.query.q != prevProps.location.query.q) {
            this.getData();
        }
    },

    getStorageKey() {
        return 'browse/search/' + this.props.location.query.q;
    },

    fetchData() {
        sketchfabSDK.Models.search(this.props.location.query.q, this.state.offset).then(this.onDataSuccess);
    }
});

module.exports = Search;
