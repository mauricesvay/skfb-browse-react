import {
    combineReducers
} from 'redux';

import userReducer from './user';
import modelsReducer from './models';
import allModelsReducer from './model';
import loadingReducer from './loading';

const MainReducer = combineReducers( {
    user: userReducer,
    models: modelsReducer,
    allModels: allModelsReducer,
    isLoading: loadingReducer,
} );

module.exports = MainReducer;
