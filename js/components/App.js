import React from 'react';
import { Link, RouteHandler } from 'react-router';
import { Navigation } from 'react-router';
import Sidebar from './Sidebar';
import Sketchfab from 'sketchfab-js';
require('script!localforage'); // window.localforage

Sketchfab.init({
    client_id: 'ig-3miFgAznsYmxUP9VGoN@Chj7ZIrUfAG!UWwne',
    redirect_uri: 'http://localhost:8000/authSuccess.html',
});

let App = React.createClass({

    mixins: [Navigation],

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

    onSearch(e) {
        e.preventDefault();
        this.transitionTo('/search?q=' + this.state.q);
    },

    onSearchChange(e) {
        this.setState({q: e.target.value});
        if (e.target.value.indexOf('#') === 0) {
            console.log('Tag search');
        }
    },

    onLoginClick(e) {

        if (this.state.accessToken === null) {
            Sketchfab.connect()
                .then((token) => {
                    this.setState({
                        accessToken: token
                    });
                    localforage.setItem('accessToken', token);
                    return Sketchfab.Users.me(token);
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
                        <RouteHandler/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = App;
