import React from 'react';
import ReactList from 'react-list';
import { History } from 'react-router';
var Model = require('./Model');
var _ = {
    uniqBy: require('lodash/uniqBy')
};

let Browse = {

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            models: [],
            offset: 0,
            isLoading: false,
            category: this.props.params.category
        }
    },

    componentDidMount() {
        this.getData();
    },

    getData() {

        if (this.state.isLoading === true) {
            return;
        }

        this.setState({
            isLoading: true
        });

        this.fetchData();
    },

    onDataSuccess( response ) {

        if (this.isMounted()) {

            var models = _.uniqBy(
                this.state.models.concat(response.results),
                (model) => { return model.urlid; }
            );

            this.setState({
                models: models,
                offset: models.length,
                isLoading: false
            });

        }

    },

    handleScroll(e) {
        const [firstVisibleIndex, lastVisibleIndex] = this.refs['list'].getVisibleRange();
        if (lastVisibleIndex >= (this.state.models.length - 12)) {
            this.setState({
                isLoading: true
            });
            this.getData();
        }
    },

    handleModelClick(e) {
        e.preventDefault();
        var id = e.currentTarget.getAttribute('data-uid');
        this.context.router.push({pathname:'/model/' + id, state:{modal: true}});
    },

    renderItem(index, key) {
        var model = this.state.models[index];
        return <Model key={model.urlid} model={model} clickHandler={this.handleModelClick}></Model>
    },

    render() {
        return (
            <div className="browse-grid" onScroll={this.handleScroll}>
                <ReactList
                    ref="list"
                    itemRenderer={this.renderItem}
                    length={this.state.models.length}
                    type="uniform"
                />
            </div>
        )
    }

};

module.exports = Browse;
