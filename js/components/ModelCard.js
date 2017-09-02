import React from "react";
import SketchfabDataApi from "../lib/api";
import { Link } from "react-router-dom";
import FallbackPreview from "./FallbackPreview";

const sketchfabDataApi = new SketchfabDataApi();

class Model extends React.Component {
    constructor() {
        super();
        this.state = {
            fallback: null,
            isMouseOver: false
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

    getAvatar(size) {
        var avatar = "";

        var images = this.props.model.user.avatar.images;
        for (var i = 0; i < images.length; i++) {
            avatar = images[i].url;
            if (images[i].width == size) {
                break;
            }
        }

        return avatar;
    }

    render() {
        var images = [...this.props.model.thumbnails.images].sort(function(
            a,
            b
        ) {
            return a.width - b.width;
        });

        var preview;
        for (var j = 0; j < images.length; j++) {
            preview = images[j].url;
            if (images[j].width >= 400) {
                break;
            }
        }

        var avatar = this.getAvatar(32);
        var classNames = "modelcard";
        if (this.props.model.staffpickedAt !== null) {
            classNames += " staffpicked";
        }

        return (
            <div
                data-uid={this.props.model.uid}
                className="grid-item"
                onClick={this.props.clickHandler}
                onMouseEnter={this.handleMouseEnter.bind(this)}
                onMouseLeave={this.handleMouseLeave.bind(this)}
            >
                <div className={classNames} data-uid={this.props.model.uid}>
                    <a href={this.props.model.viewerUrl} target="_blank">
                        <div
                            className="modelcard-preview"
                            style={{
                                backgroundImage: "url(" + preview + ")"
                            }}
                        >
                            <FallbackPreview
                                fallback={this.props.model.fallback}
                            />
                            <div className="fallback-loader" />
                            <div className="meta">
                                <span
                                    className={
                                        this.props.model.likeCount > 0 ? (
                                            "count"
                                        ) : (
                                            "hidden"
                                        )
                                    }
                                    title="Likes"
                                >
                                    <svg
                                        className="icon"
                                        x="0px"
                                        y="0px"
                                        width="16px"
                                        height="16px"
                                        viewBox="0 0 512 512"
                                    >
                                        <g>
                                            <path d="M480,207H308.6L256,47.9L203.4,207H32l140.2,97.9L117.6,464L256,365.4L394.4,464l-54.7-159.1L480,207z" />
                                        </g>
                                    </svg>
                                    {this.props.model.likeCount}
                                </span>
                                <span
                                    className={
                                        this.props.model.commentCount > 0 ? (
                                            "count"
                                        ) : (
                                            "hidden"
                                        )
                                    }
                                    title="Comments"
                                >
                                    <svg
                                        className="icon"
                                        x="0px"
                                        y="0px"
                                        width="16px"
                                        height="16px"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M256,96C149.9,96,64,165.1,64,250.3c0,30.7,11.2,59.3,30.4,83.3c0.9,0.9,2.9,3.8,3.6,4.9c0,0-1-1.6-1.1-1.9c0,0,0,0,0,0l0,0
                                    	c0,0,0,0,0,0c2.3,3.3,3.6,7.1,3.6,11.2c0,1.4-17.9,58-17.9,58l0,0c-1.3,4.4,2.1,8.9,7.6,10c0.8,0.2,1.6,0.2,2.4,0.2
                                    	c1.3,0,2.5-0.2,3.7-0.5l1.6-0.6l50.6-22c0.9-0.4,9-3.5,10-3.9c0,0,0.6-0.2,0.6-0.2c0,0-0.1,0-0.6,0.2c3.4-1.2,7.2-1.8,11.2-1.8
                                    	c3.6,0,7.1,0.5,10.3,1.5c0.1,0,0.2,0,0.2,0.1c0.5,0.2,1,0.3,1.5,0.5c23.1,7.9,48.4,10.3,75.1,10.3c106,0,191-64.1,191-149.3
                                    	C448,165.1,362,96,256,96L256,96z" />
                                    </svg>
                                    {this.props.model.commentCount}
                                </span>
                            </div>
                        </div>
                        <div className="modelcard-info">
                            <img
                                src={avatar}
                                width="32"
                                height="32"
                                alt=""
                                className="avatar"
                            />
                            <span
                                className="model-title"
                                title={this.props.model.name}
                            >
                                {this.props.model.name}
                            </span>
                            <span className="model-author">
                                by {this.props.model.user.displayName}
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default Model;
