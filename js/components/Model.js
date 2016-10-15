import React from 'react';
var _ = {
    sortBy: require( 'lodash/sortBy' )
};

var Model = React.createClass({

    handleMouseOver: function( ) {
        // console.log('->' + this.props.model.urlid);
    },

    handleMouseOut: function( ) {
        // console.log('<-' + this.props.model.urlid);
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

        var fallbackUrl = this.props.model.fallback && this.props.model.fallback.url;
        var avatar = this.getAvatar( 32 );

        return (
            <div data-uid={this.props.model.urlid} className="grid-item" onClick={this.props.clickHandler} onMouseOver={this.props.mouseOverHandler} onMouseOut={this.handleMouseOut}>
                <div className="modelcard" data-uid={this.props.model.urlid}>
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
