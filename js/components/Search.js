import React from 'react';
import Sketchfab from 'sketchfab-js';
import BrowseMixin from './BrowseMixin';
var _ = {
    uniq: require('lodash/array/uniq')
};

let Search = React.createClass({
    mixins: [BrowseMixin],

    fetchData() {
        Sketchfab.Models.search(this.props.location.query.q, this.state.offset).then((response) => {

            var models = _.uniq(this.state.models.concat(response.results), false, 'uid');

            this.setState({
                models: models,
                offset: models.length,
                isLoading: false
            });
        });
    },
});

module.exports = Search;
