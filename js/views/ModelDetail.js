import React from 'react';
import SketchfabDataApi from '../lib/api.js';

var sketchfabDataApi = new SketchfabDataApi( );

let ModelDetail = React.createClass({

    getInitialState( ) {
        return { url: 'about:blank' };
    },

    componentWillMount( ) {
        sketchfabDataApi.model.get( this.props.params.id ).then(( response ) => {
            this.setState({
                url: response.data.embedUrl + '?autostart=1'
            });
        });
    },

    render( ) {
        return (
            <div className="modelDetail">
                <iframe src={this.state.url}></iframe>
            </div>
        );
    }
});

module.exports = ModelDetail;
