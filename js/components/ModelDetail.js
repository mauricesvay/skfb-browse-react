import React from 'react';

class ModelDetail extends React.Component {

    componentWillMount() {
        if ( !this.props.model ) {
            this.props.requestModel( this.props.uid );
        }
    }

    render() {

        const model = this.props.model;

        if ( model !== null ) {
            return (
                <div className="modelDetail">
                    <div className="modelDetail__viewer">
                        <iframe src={model.embedUrl + '?autostart=1'} allowfullscreen></iframe>
                    </div>
                    <div className="modelDetail__info">
                        <h1 className="modelDetail__title">{model.name}</h1>
                        <span>by {model.user.displayName} on {model.publishedAt}</span>
                        <div className="modelDetail__description">
                            {model.description}
                            {model.tags.map(tag => '#' + tag.name).join(', ')}
                        </div>
                        <ul>
                            <li>Likes: {model.likeCount}</li>
                            <li>Views: {model.viewCount}</li>
                            <li>Downloads: {model.downloadCount}</li>
                            <li>Faces: {model.faceCount}</li>
                            <li>Vertex: {model.vertexCount}</li>
                            <li>Categories: {model.categories.map(category => category.name).join(', ')}</li>
                            <li>Comments: {model.commentCount}</li>
                        </ul>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="modelDetail">
                    <div className="modelDetail__viewer">
                        <iframe src="about:blank"></iframe>
                    </div>
                    <div className="modelDetail__info"></div>
                </div>
            );
        }
    }
}

ModelDetail.propTypes = {
    uid: React.PropTypes.string.isRequired,
    model: React.PropTypes.object
}

module.exports = ModelDetail;
