import css from "./styles/app.css";

import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { HashRouter, Route } from "react-router-dom";

import User from "./js/User";
import reducers from "./js/reducers/reducers";

import App from "./js/views/App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
    reducers,
    {
        user: {
            accessToken: User.getAccessToken(),
            likes: {}
        }
    },
    composeEnhancers(applyMiddleware(thunkMiddleware))
);

render(
    <Provider store={store}>
        <HashRouter>
            <Route component={App} />
        </HashRouter>
    </Provider>,
    document.querySelector(".app")
);
