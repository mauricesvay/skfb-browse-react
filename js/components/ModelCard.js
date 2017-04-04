import React from 'react';
import SketchfabDataApi from '../lib/api';
import { Link } from 'react-router-dom';
var _ = {
    sortBy: require( 'lodash/sortBy' )
};

const sketchfabDataApi = new SketchfabDataApi( );

var Model = React.createClass({

    getInitialState: function( ) {
        return { fallback: null, isMouseOver: false };
    },

    _getFallback: function( ) {
        sketchfabDataApi.model.getFallback( this.props.model.uid ).then(( result ) => {
            var fallback = null;
            if ( result.images && result.images.length ) {
                fallback = result.images.reduce( function( previous, current ) {
                    if ( current.height === 180 ) {
                        return current;
                    } else {
                        return previous;
                    }
                });
            }
            this.setState({ fallback: fallback });
        });
    },

    handleMouseEnter: function( e ) {
        if ( this.state.isMouseOver === false ) {
            this.setState({ isMouseOver: true });
            setTimeout( ( ) => {
                if ( this.state.isMouseOver === true ) {
                    this._getFallback( );
                }
            }, 1000 );
        }
    },

    handleMouseLeave: function( e ) {
        this.setState({ isMouseOver: false });
    },

    getAvatar: function( size ) {

        var avatar = '';

        var images = this.props.model.user.avatar.images;
        for ( var i = 0; i < images.length; i++ ) {
            avatar = images[i].url;
            if ( images[i].width == size ) {
                break;
            }
        }

        return avatar;
    },

    render: function( ) {

        var images = _.sortBy( this.props.model.thumbnails.images, 'width' );
        var preview;
        for ( var j = 0; j < images.length; j++ ) {
            preview = images[j].url;
            if ( images[j].width >= 400 ) {
                break;
            }
        }

        var fallbackUrl = this.state.fallback && this.state.fallback.url;
        var avatar = this.getAvatar( 32 );

        return (
            <div data-uid={this.props.model.uid} className="grid-item" onClick={this.props.clickHandler} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <div className="modelcard" data-uid={this.props.model.uid}>
                    <a href={this.props.model.viewerUrl} target="_blank">
                        <div className="modelcard-preview" style={{
                            backgroundImage: 'url(' + preview + ')'
                        }}>
                            <div className="fallback-container">
                                <div className="fallback-image" style={{
                                    backgroundImage: 'url(' + ( fallbackUrl
                                        ? fallbackUrl
                                        : '' ) + ')'
                                }}></div>
                            </div>
                            <div className="fallback-loader"></div>
                            <div className="meta">
                                <span className={this.props.model.likeCount > 0
                                    ? 'count'
                                    : 'hidden'} title="Likes">
                                    <i className="ion ion-ios-star"></i>
                                    {this.props.model.likeCount}
                                </span>
                                <span className={this.props.model.commentCount > 0
                                    ? 'count'
                                    : 'hidden'} title="Comments">
                                    <i className="ion ion-ios-chatbubble"></i>
                                    {this.props.model.commentCount}
                                </span>
                            </div>
                        </div>
                        <div className="modelcard-info">
                            <img src={avatar} width="32" height="32" alt="" className="avatar"></img>
                            <span className="model-title" title={this.props.model.name}>
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
});

module.exports = Model;
