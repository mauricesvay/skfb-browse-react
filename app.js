import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import User from './js/User';
import Router from './js/config/routes';
import reducers from './js/reducers/reducers';

let store = createStore(
    reducers,
    {
        user: {
            accessToken: User.getAccessToken()
        }
    },
    applyMiddleware(
        thunkMiddleware
    )
);

render(
    <Provider store={store}>
        {Router}
    </Provider>,
    document.querySelector('.app')
);
