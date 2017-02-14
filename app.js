import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import User from './js/User';
import Router from './js/config/routes';
import reducers from './js/reducers/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
    reducers,
    {
        user: {
            accessToken: User.getAccessToken()
        }
    },
    composeEnhancers(applyMiddleware(
        thunkMiddleware
    ))
);

render(
    <Provider store={store}>
        {Router}
    </Provider>,
    document.querySelector('.app')
);
