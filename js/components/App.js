import React from 'react';
import { Link, RouteHandler } from 'react-router';
import Sidebar from './Sidebar';
import sketchfabSDK from '../lib/sketchfab.js';
import localforage from 'localforage';
import Modal from './Modal';

let App = React.createClass({

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            q: '',
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

    onSearch(e) {
        e.preventDefault();
        this.context.router.push({pathname:'/search', query:{q: this.state.q}});
    },

    onSearchChange(e) {
        this.setState({q: e.target.value});
        if (e.target.value.indexOf('#') === 0) {
            console.log('Tag search');
        }
    },

    onLoginClick(e) {

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
                    console.log(this.state);
                })
                .catch((error) => {
                    console.error('Error while logging in', error);
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
            return <a href="#" onClick={this.onLoginClick}>Login</a>
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
                        <form action="" method="GET" onSubmit={this.onSearch} className="toolbar-tool">
                            <div className="search">
                                <label htmlFor="q">Search</label>
                                <input type="search" className="search-field" id="q" name="q" value={this.state.q} onChange={this.onSearchChange}/>
                                <button type="submit" className="search-btn"><i className="icon ion-search"></i></button>
                            </div>
                        </form>
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
                    <Modal isOpen={true} onExit={()=>{this.context.router.goBack()}}>
                            {this.props.children}
                    </Modal>
                )}
            </div>
        );
    }
});

module.exports = App;
