import React from 'react';
import BrowseMixin from './BrowseMixin';
import sketchfabSDK from '../lib/sketchfab.js';

let Category = React.createClass({

    mixins: [BrowseMixin],

    componentWillReceiveProps( nextProps ) {
        this.setState({
            models: [],
            offset: 0,
            category: nextProps.params.category
        });
    },

    componentDidUpdate(prevProps, prevState) {
        if (this.state.category != prevState.category) {
            this.getData();
        }
    },

    getStorageKey() {
        return 'browse/category/' + this.state.category;
    },

    fetchData() {
        sketchfabSDK.Models.byCategory(this.state.category, this.state.offset).then(this.onDataSuccess);
    },
});

module.exports = Category;
