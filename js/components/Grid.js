import React from 'react';
import ReactList from 'react-list';
import {requestModels} from '../actions/actions';
import Model from './Model';
var _ = {
    throttle: require('lodash/throttle')
};

var scrollTop = 0;

let Grid = React.createClass({

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    componentWillMount() {
        this.fetchModels();
    },

    componentDidUpdate(prevProps, prevState) {
        if (this.props.params.category != prevProps.params.category) {
            this.fetchModels();
        }
        if (this.props.location.query.q != prevProps.location.query.q) {
            this.fetchModels();
        }
    },

    fetchModels: function() {
        if (this.props['requestModels'] && this.props.models.length === 0 ) {
            this.props.requestModels();
        }
    },

    handleScroll: function(e){
        const [firstVisibleIndex, lastVisibleIndex] = this.refs['list'].getVisibleRange();
        var isScrollingDown = (e.target.scrollTop - scrollTop > 0);
        var isAtBottom = lastVisibleIndex >= (this.props.models.length - 1);

        if (isScrollingDown && isAtBottom) {
            this.loadMore();
        }
    },

    loadMore: function() {
        var nextOffset = 0;
        if (this.props.nextOffset) {
            nextOffset = this.props.nextOffset;
        } else {
            nextOffset = this.props.models.length;
        }

        this.props.requestModels(nextOffset);
    },

    handleModelClick(e) {
        e.preventDefault();
        var id = e.currentTarget.getAttribute('data-uid');
        this.context.router.push({pathname:'/model/' + id, state:{modal: true}});
    },

    renderItem(index/*, key*/) {
        var model = this.props.models[index];
        return (<Model key={model.urlid} model={model} clickHandler={this.handleModelClick}></Model>);
    },

    renderLoading() {
        if (this.props.isLoading) {
            return <div style={{background:'black', color: 'white', textAlign: 'center', padding:'10px'}}>Loading</div>
        } else {
            return <div style={{background:'black', color: 'white', textAlign: 'center', padding:'10px'}} onClick={this.loadMore}>Load more</div>;
        }
    },

    render() {
        return (
            <div className="browse-grid" onScroll={this.handleScroll}>
                <ReactList
                    ref="list"
                    itemRenderer={this.renderItem}
                    length={this.props.models.length}
                    type="uniform"
                    models={this.props.models}
                />
                { this.renderLoading() }
            </div>
        );
    }
});

module.exports = Grid;
