import React from 'react';
import Grid from './Grid';
import ReactList from 'react-list';
var Model = require('./Model');

let Browse = {

    getInitialState() {
        return {
            models: [],
            offset: 0,
            isLoading: false
        }
    },

    componentDidMount() {
        this.setState({
            isLoading: true
        });
        this.fetchData();
    },

    // onLoadMoreClicked(e) {
    //     e.preventDefault();
    //     this.setState({
    //         isLoading: true
    //     });
    //     this.fetchData();
    // },

    handleScroll(e) {
        const [firstVisibleIndex, lastVisibleIndex] = this.refs['list'].getVisibleRange();
        if (lastVisibleIndex >= (this.state.models.length - 12)) {
            this.setState({
                isLoading: true
            });
            this.fetchData();
        }
    },

    renderItem(index, key) {
        var model = this.state.models[index];
        return <Model key={model.urlid} model={model}></Model>
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
