import React from 'react';
import sketchfabSDK from '../lib/sketchfab.js';

let ModelDetail = React.createClass({

    getInitialState() {
        return {
            url: 'about:blank'
        }
    },

    componentWillMount() {
        sketchfabSDK.Model.byId(this.props.params.id).then((response) => {
            this.setState({
                url: response.embedUrl + '?autostart=1'
            })
        });
    },

    render() {
        return (
            <div className="modelDetail">
                <iframe src={this.state.url}></iframe>
            </div>
        );
    }
});

module.exports = ModelDetail;
