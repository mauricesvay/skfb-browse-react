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

    onLoadMoreClicked(e) {
        e.preventDefault();
        this.setState({
            isLoading: true
        });
        this.fetchData();
    },

    renderItem(index, key) {
        var model = this.state.models[index];
        return <Model key={model.urlid} model={model}></Model>
    },

    renderLoadMore: function() {
        if (this.state.isLoading) {
            return <button onClick={this.onLoadMoreClicked} disabled="disabled">Loading</button>
        } else {
            return <button onClick={this.onLoadMoreClicked} onMouseOver={this.onLoadMoreClicked}>Load more</button>
        }
    },

    render() {
        console.log(this.state.models.length + ' items');
        return (
            <div>
                <ReactList
                    ref="list"
                    itemRenderer={this.renderItem}
                    length={this.state.models.length}
                    type="uniform"
                />
                <div style={{padding: '10px', clear: 'both', textAlign: 'center'}}>
                    {this.renderLoadMore()}
                </div>
            </div>
        )
    }

};

module.exports = Browse;
