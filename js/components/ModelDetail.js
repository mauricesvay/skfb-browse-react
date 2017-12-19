import React from "react";
import PropTypes from "prop-types";
import LikeButton from "./LikeButton";
import relativeDate from "relative-date";

class ModelDetail extends React.Component {
    componentWillMount() {
        if (!this.props.model) {
            this.props.requestModel(this.props.uid);
        }
    }

    render() {
        const model = this.props.model;

        if (model === null) {
            return (
                <div className="modelDetail">
                    <div className="modelDetail__viewer">
                        <iframe src="about:blank" allow="vr" allowfullscreen />
                    </div>
                    <div className="modelDetail__info" />
                </div>
            );
        }

        const humanDate = relativeDate(new Date(model.publishedAt));
        return (
            <div className="modelDetail">
                <div className="modelDetail__viewer">
                    <iframe
                        src={model.embedUrl + "?autostart=1"}
                        allowFullScreen
                    />
                </div>
                <div className="modelDetail__info">
                    <h1 className="modelDetail__title">{model.name}</h1>
                    <span className="modelDetail__meta">
                        <span className="modelDetail_author">
                            by {model.user.displayName}
                        </span>{" "}
                        (<span
                            className="modelDetail_date"
                            title={model.publishedAt}
                        >
                            {humanDate}
                        </span>)
                    </span>
                    <div className="modelDetail_actions">
                        <LikeButton model={model} />
                    </div>
                    <div className="modelDetail__description">
                        {model.description +
                            " " +
                            model.tags.map(tag => "#" + tag.name).join(", ")}

                        <p>
                            Categories:{" "}
                            {model.categories
                                .map(category => category.name)
                                .join(", ")}
                        </p>
                    </div>
                    <ul className="modelDetail__stats">
                        <li>⭐️ {model.likeCount} likes</li>
                        <li>👁 {model.viewCount} views</li>
                        <li>💬 {model.commentCount} comments</li>
                    </ul>
                    <ul className="modelDetail__stats">
                        <li>Faces: {model.faceCount}</li>
                        <li>Vertex: {model.vertexCount}</li>
                    </ul>
                    <ul className="modelDetail__stats">
                        <li><a href={'https://crimson-jellyfish.glitch.me/gif/' + model.uid} target="_blank">Get GIF</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

ModelDetail.propTypes = {
    uid: PropTypes.string.isRequired,
    model: PropTypes.object
};

module.exports = ModelDetail;
