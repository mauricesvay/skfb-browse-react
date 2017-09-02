import { combineReducers } from "redux";

import userReducer from "./user";
import modelsReducer from "./models";
import allModelsReducer from "./model";
import loadingReducer from "./loading";

const MainReducer = combineReducers({
    user: userReducer,
    models: modelsReducer,
    isLoading: loadingReducer,
    entities: combineReducers({
        models: allModelsReducer
    })
});

module.exports = MainReducer;
