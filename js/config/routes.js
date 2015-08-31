import React from 'react';
import { DefaultRoute, Route } from 'react-router';

import App from '../components/App';
import Staffpicks from '../components/Staffpicks';
import Popular from '../components/Popular';
import Recent from '../components/Recent';
import Search from '../components/Search';
import Category from '../components/Category';

module.exports = (
    <Route name="app" path="/" handler={App}>
        <Route name="staffpicks" path="/staffpicks" handler={Staffpicks}/>
        <Route name="popular" path="/popular" handler={Popular}/>
        <Route name="recent" path="/recent" handler={Recent}/>
        <Route name="search" path="/search" handler={Search}/>

        <Route name="category" path="/category/:category" handler={Category}/>
    </Route>
);
