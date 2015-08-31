import React from 'react';
import Grid from './Grid';

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

    render() {
        return (
            <div>
                <Grid models={this.state.models} loadMoreHandler={this.onLoadMoreClicked} isLoading={this.state.isLoading}/>
            </div>
        )
    }

};

module.exports = Browse;
