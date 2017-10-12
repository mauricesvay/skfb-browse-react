import React from "react";
import { Link } from "react-router-dom";
import User from "../User";
import PropTypes from "prop-types";

class UserInfo extends React.Component {
    render() {
        if (User.isConnected()) {
            return (
                <div>
                    <button
                        onClick={e => {
                            e.preventDefault();
                            this.props.onLogoutClick(e);
                        }}
                    >
                        Logout
                    </button>
                </div>
            );
        } else {
            return <a onClick={this.props.onLoginClick}>Login</a>;
        }
    }
}

UserInfo.propTypes = {
    onLoginClick: PropTypes.func.isRequired,
    onLogoutClick: PropTypes.func.isRequired
};

module.exports = UserInfo;
