import React from 'react';
import { Link } from 'react-router';
import sketchfabSDK from '../lib/sketchfab.js';

let UserInfo = React.createClass({
    isLoggedIn() {
        return this.props.user.accessToken != '';
    },

    render() {
        if (this.isLoggedIn()) {
            return <Link activeClassName="active" to="/newsfeed"><i className="icon ion-ios-person"></i> My feed</Link>
        } else {
            return <a onClick={this.props.onLoginClick}>Login</a>
        }
    }
});

module.exports = UserInfo;
