import React from 'react';
import { Link } from 'react-router';
import User from '../User';

let UserInfo = React.createClass({
    render() {
        if (User.isConnected()) {
            return <Link activeClassName="active" to="/newsfeed"><i className="icon ion-ios-person"></i> My feed</Link>
        } else {
            return <a onClick={this.props.onLoginClick}>Login</a>
        }
    }
});

module.exports = UserInfo;
