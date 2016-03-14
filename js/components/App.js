import React from 'react';
import { Link } from 'react-router';
import sketchfabSDK from '../lib/sketchfab.js';

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

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.key !== this.props.location.key) {
            if (nextProps.location.state && nextProps.location.state.modal) {
                this.previousChildren = this.props.children;
            }
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
                    <Sidebar/>
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
