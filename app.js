import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import cookie from 'cookie_js';

import Router from './js/config/routes';
import reducers from './js/reducers/reducers';

let store = createStore(
    reducers,
    {
        user: {
            accessToken: cookie.get('accessToken', '')
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
