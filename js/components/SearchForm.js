import React from 'react';

var SearchForm = React.createClass({

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            q: ''
        };
    },

    onSearch(e) {
        e.preventDefault();
        this.context.router.push({pathname:'/search', query:{q: this.state.q}});
    },

    onSearchChange(e) {
        this.setState({q: e.target.value});
        if (e.target.value.indexOf('#') === 0) {
            console.log('Tag search');
        }
    },

    render() {
        return (
            <form action="" method="GET" onSubmit={this.onSearch} className="toolbar-tool">
                <div className="search">
                    <label htmlFor="q">Search</label>
                    <input type="search" className="search-field" id="q" name="q" value={this.state.q} onChange={this.onSearchChange}/>
                    <button type="submit" className="search-btn"><i className="icon ion-search"></i></button>
                </div>
            </form>
        );
    }
});

module.exports = SearchForm;
