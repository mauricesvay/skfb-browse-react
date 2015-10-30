import React from 'react';
import { Router, Route } from 'react-router';

import App from '../components/App';
import Staffpicks from '../components/Staffpicks';
import Popular from '../components/Popular';
import Recent from '../components/Recent';
import Search from '../components/Search';
import Category from '../components/Category';

module.exports = (
    <Router>
        <Route name="app" path="/" component={App}>
            <Route name="staffpicks" path="/staffpicks" component={Staffpicks}/>
            <Route name="popular" path="/popular" component={Popular}/>
            <Route name="recent" path="/recent" component={Recent}/>
            <Route name="search" path="/search" component={Search}/>
            <Route name="category" path="/category/:category" component={Category}/>
        </Route>
    </Router>
);
