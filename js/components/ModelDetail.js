import React from 'react';

let ModelDetail = React.createClass({

    getInitialState( ) {
        return { url: 'about:blank' };
    },

    componentWillMount( ) {
        this.props['requestModel']( this.props.params.id );
    },

    componentWillReceiveProps( props ) {
        if ( props.model ) {
            this.setState({ model: props.model, url: props.model.embedUrl });
        }
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
