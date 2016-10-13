import React from 'react';
import {hashHistory, Router, Route} from 'react-router';

import User from '../User';

import App from '../views/App';
import Newsfeed from '../views/Newsfeed';
import Staffpicks from '../views/Staffpicks';
import Popular from '../views/Popular';
import Recent from '../views/Recent';
import Search from '../views/Search';
import Category from '../views/Category';
import ModelDetail from '../views/ModelDetail';

module.exports = (
    <Router history={hashHistory}>
        <Route name="app" path="/" component={App} onEnter={(nextState, replace) => {
            if (nextState.location.pathname === '/') {
                replace('/staffpicks');
            }
        }}>
            <Route name="newsfeed" path="/newsfeed" component={Newsfeed} onEnter={(nextState, replace) => {
                if (!User.isConnected()) {
                    replace('/');
                }
            }}/>
            <Route name="staffpicks" path="/staffpicks" component={Staffpicks}/>
            <Route name="popular" path="/popular" component={Popular}/>
            <Route name="recent" path="/recent" component={Recent}/>
            <Route name="search" path="/search" component={Search}/>
            <Route name="category" path="/category/:category" component={Category}/>
            <Route name="model" path="/model/:id" component={ModelDetail}/>
        </Route>
    </Router>
);
