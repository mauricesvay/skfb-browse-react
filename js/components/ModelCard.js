import React from "react";
import { Link } from "react-router-dom";
import SketchfabDataApi from "../lib/api";
import { getImageOfWidth } from "../lib/Image";
import FallbackPreview from "./FallbackPreview";
import { LikeIcon, CommentIcon } from "./Icons";

const sketchfabDataApi = new SketchfabDataApi();

class Model extends React.Component {
    constructor() {
        super();
        this.state = {
            fallback: null,
            isMouseOver: false,
            isScan: false
        };
    }

    _getFallback() {
        if (this.props.hoverHandler) {
            this.props.hoverHandler(this.props.model.uid);
        }
    }

    handleMouseEnter(e) {
        if (this.state.isMouseOver === false) {
            this.setState({
                isMouseOver: true
            });
            setTimeout(() => {
                if (this.state.isMouseOver === true) {
                    this._getFallback();
                }
            }, 1000);
        }
    }

    handleMouseLeave(e) {
        this.setState({
            isMouseOver: false
        });
    }

    handleIsScanClicked(e) {
        e.preventDefault();
        this.setState({
            isScan: true
        });
        if (this.props.clickIsScanHandler) {
            this.props.clickIsScanHandler(this.props.model.uid);
        }
    }

    renderMeta() {
        const hasLike = this.props.model.likeCount > 0;
        const hasComment = this.props.model.commentCount > 0;

        return (
            <div className="meta">
                <span className={hasLike ? "count" : "hidden"} title="Likes">
                    <LikeIcon />
                    {this.props.model.likeCount}
                </span>
                <span
                    className={hasComment ? "count" : "hidden"}
                    title="Comments"
                >
                    <CommentIcon />
                    {this.props.model.commentCount}
                </span>
            </div>
        );
    }

    renderInfo() {
        var avatar = getImageOfWidth(32, this.props.model.user.avatar.images);
        return (
            <div className="modelcard-info">
                <img
                    src={avatar.url}
                    width="32"
                    height="32"
                    alt=""
                    className="avatar"
                />
                <span className="model-title" title={this.props.model.name}>
                    {this.props.model.name}
                </span>
                <span className="model-author">
                    by {this.props.model.user.displayName}
                </span>
            </div>
        );
    }

    render() {
        var preview = getImageOfWidth(720, this.props.model.thumbnails.images);

        var classNames = "modelcard";
        if (this.props.model.staffpickedAt !== null) {
            classNames += " staffpicked";
        }

        return (
            <div
                data-uid={this.props.model.uid}
                className="grid-item"
                onMouseEnter={this.handleMouseEnter.bind(this)}
                onMouseLeave={this.handleMouseLeave.bind(this)}
            >
                <div className={classNames} data-uid={this.props.model.uid}>
                    <a
                        href={this.props.model.viewerUrl}
                        target="_blank"
                        onClick={this.props.clickHandler}
                    >
                        <div
                            className="modelcard-preview"
                            style={{
                                backgroundImage: "url(" + preview.url + ")"
                            }}
                        >
                            <FallbackPreview
                                fallback={this.props.model.fallback}
                            />
                            <div className="fallback-loader" />
                            {this.renderMeta()}
                        </div>
                        {this.renderInfo()}
                    </a>
                    {this.state.isScan === false && <button onClick={this.handleIsScanClicked.bind(this)}>is scan</button>}
                </div>
            </div>
        );
    }
}

export default Model;
