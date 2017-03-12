import React from 'react';

class ModelDetail extends React.Component {

    componentWillMount( ) {
        if ( !this.props.model ) {
            this.props.requestModel( this.props.uid );
        }
    }

    render( ) {

        var url = this.props.model
            ? this.props.model.embedUrl
            : 'about:blank';

        return (
            <div className="modelDetail">
                <iframe src={url}></iframe>
            </div>
        );
    }
}

ModelDetail.propTypes = {
    uid: React.PropTypes.string.isRequired,
    model: React.PropTypes.object
}

module.exports = ModelDetail;
