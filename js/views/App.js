import React from 'react';
import {Link} from 'react-router';
import sketchfabSDK from '../lib/sketchfab.js';

import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import SearchForm from '../components/SearchForm';
import UserInfo from '../components/UserInfoContainer';

let App = React.createClass({

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    childContextTypes: {
        router: React.PropTypes.object
    },

    getChildContext: function() {
        return {router: this.context.router};
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.key !== this.props.location.key) {
            if (nextProps.location.state && nextProps.location.state.modal) {
                this.previousChildren = this.props.children;
            }
        }
    },

    render() {

        let {location} = this.props;

        let isModal = (location.state && location.state.modal && this.previousChildren);

        return (
            <div className="app">
                <header className="header">
                    <div className="logo">
                        <Link to="/"><img src="assets/img/logo-sketchfab-white.png" width="140"/></Link>
                    </div>
                    <div className="toolbar">
                        <SearchForm></SearchForm>
                        <div className="userInfo">
                            <UserInfo></UserInfo>
                        </div>
                    </div>
                </header>
                <div className="main">
                    <Sidebar/>
                    <div className="content">
                        {isModal
                            ? this.previousChildren
                            : this.props.children
}
                    </div>
                </div>
                {isModal && (
                    <Modal isOpen={true} onExit={() => {
                        this.context.router.goBack();
                    }}>
                        {this.props.children}
                    </Modal>
                )}
            </div>
        );
    }
});

module.exports = App;
