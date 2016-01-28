import React from 'react';
import { Link } from 'react-router';
import sketchfabSDK from '../lib/sketchfab.js';
import localforage from 'localforage';

import Sidebar from './Sidebar';
import Modal from './Modal';
import SearchForm from './SearchForm';

let App = React.createClass({

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    childContextTypes: {
        router: React.PropTypes.object
    },

    getChildContext: function() {
        return {
            router: this.context.router
        };
    },

    getInitialState() {
        return {
            accessToken: null,
            authUser: null
        };
    },

    componentWillMount() {
        localforage.getItem('accessToken').then((value)=>{
            if (value) {
                this.setState({
                    accessToken: value
                });
            }
        });
        localforage.getItem('user').then((value)=>{
            if (value) {
                this.setState({
                    user: value
                });
            }
        });
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.key !== this.props.location.key) {
            if (nextProps.location.state && nextProps.location.state.modal) {
                this.previousChildren = this.props.children;
            }
        }
    },

    onLoginClick() {

        if (this.state.accessToken === null) {
            sketchfabSDK.connect()
                .then((token) => {
                    this.setState({
                        accessToken: token
                    });
                    localforage.setItem('accessToken', token);
                    return sketchfabSDK.Users.me(token);
                })
                .then((response) => {
                    this.setState({
                        authUser: response
                    });
                    localforage.setItem('user', response);
                    // console.log(this.state);
                })
                .catch((/*error*/) => {
                    // console.error('Error while logging in', error);
                });
        }

    },

    renderLogin() {
        if (this.state.accessToken && this.state.user) {
            return (
                <span>
                    <img src={this.state.user.avatars.images[0].url} alt="" width="24" height="24" style={{borderRadius:'50%'}}/>
                    {this.state.user.displayName}
                </span>
            );
        } else {
            return (<a href="#" onClick={this.onLoginClick}>Login</a>);
        }
    },

    render() {

        let { location } = this.props;

        let isModal = (
            location.state &&
            location.state.modal &&
            this.previousChildren
        );

        return (
            <div className="app">
                <header className="header">
                    <div className="logo">
                        <Link to="/"><img src="assets/img/logo-sketchfab-white.png" width="140"/></Link>
                    </div>
                    <div className="toolbar">
                        <SearchForm></SearchForm>
                    </div>
                    <div className="filters">
                        <div className="btn-group sort-by">
                            <button className="btn btn-small" value="-likeCount">Liked</button>
                            <button className="btn btn-small" value="-viewCount">Popular</button>
                            <button className="btn btn-small active" value="-createdAt">Recent</button>
                        </div>
                    </div>
                </header>
                <div className="main">
                    <Sidebar loginComponent={this.renderLogin()}/>
                    <div className="content">
                        {isModal ?
                            this.previousChildren :
                            this.props.children
                        }
                    </div>
                </div>
                {isModal && (
                    <Modal isOpen={true} onExit={()=>{this.context.router.goBack();}}>
                            {this.props.children}
                    </Modal>
                )}
            </div>
        );
    }
});

module.exports = App;
