import React from 'react';
import Sketchfab from 'sketchfab-js';
import BrowseMixin from './BrowseMixin';
var _ = {
    uniq: require('lodash/array/uniq')
};

let Category = React.createClass({
    mixins: [BrowseMixin],

    componentWillReceiveProps(nextProps) {
        if (this.props.params.category !== nextProps.params.category) {
            this.setState({
                models: [],
                offset: 0,
                isLoading: true
            });
            this.fetchData();
        }
    },

    fetchData() {
        Sketchfab.Models.byCategory(this.props.params.category, this.state.offset).then((response) => {

            var models = _.uniq(this.state.models.concat(response.results), false, 'uid');

            this.setState({
                models: models,
                offset: models.length,
                isLoading: false
            });
        });
    },
});

module.exports = Category;
