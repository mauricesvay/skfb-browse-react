import React from 'react';
import { Link } from 'react-router';
import User from '../User';

let UserInfo = React.createClass({

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    render() {
        if (User.isConnected()) {
            return (
                <div>
                    <Link activeClassName="active" to="/newsfeed"><i className="icon ion-ios-person"></i> My feed</Link>
                    <button onClick={ (e)=>{
                        e.preventDefault();
                        this.context.router.push({pathname:'/'});
                        this.props.onLogoutClick(e);
                    }}>Logout</button>
                </div>
            )
        } else {
            return <a onClick={this.props.onLoginClick}>Login</a>
        }
    }
});

module.exports = UserInfo;
