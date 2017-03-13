import React from 'react';
import qs from 'qs';

var SearchForm = React.createClass({

    getInitialState( ) {
        var queryString = qs.parse(this.props.location.search.substr( 1 ));
        return {
            q: queryString.q || ''
        };
    },
    componentWillUpdate( nextProps, nextState ) {
        // Clear search field when leaving search
        if ( this.props.location.pathname === '/search' && nextProps.location.pathname !== '/search' ) {
            this.setState({ q: '' });
        }
    },
    onSearch( e ) {
        e.preventDefault( );
        this.props.history.push({
            pathname: '/search',
            search: 'q=' + encodeURIComponent( this.state.q )
        });
    },
    onSearchChange( e ) {
        this.setState({ q: e.target.value });
        if ( e.target.value.indexOf( '#' ) === 0 ) {
            //console.log('Tag search');
        }
    },
    render( ) {
        return (
            <form action="" method="GET" onSubmit={this.onSearch} className="toolbar-tool">
                <div className="search">
                    <label htmlFor="q">Search</label>
                    <input type="search" className="search-field" id="q" name="q" value={this.state.q} onChange={this.onSearchChange}/>
                    <button type="submit" className="search-btn">
                        <i className="icon ion-search"></i>
                    </button>
                </div>
            </form>
        );
    }
});

module.exports = SearchForm;
