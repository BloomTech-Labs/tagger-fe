import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { inboxReducer } from "./inboxReducer";
import { composerReducer } from "./composerReducer";
import { sidebarReducer } from "./sidebarReducer";
import { analyticsBarReducer } from './analyticsBarReducer'; // added the anaylytics bar to the store. 
import { viewEmailReducer } from './viewEmailReducer';
import { setOperationReducer } from './emailOperationReducer';
import { searchKeyword } from './searchReducer';

const rootReducer = combineReducers({
    inbox: inboxReducer,
    composer: composerReducer,
    sidebar: sidebarReducer,
    analyticsbar: analyticsBarReducer, // this is the reducer i added.
    viewEmail:viewEmailReducer,
    operation:setOperationReducer,
    search:searchKeyword
});

let store;
let middleware;

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    middleware = [thunk, logger];
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancer = composeEnhancers(applyMiddleware(...middleware));
    store = createStore(
        rootReducer,
        {
            /*preloaded state */
        },
        enhancer
    );
} else {
    store = createStore(
        rootReducer,
        {
            /*preloaded state */
        },
        applyMiddleware(thunk, logger)
    );
}

export { store };
