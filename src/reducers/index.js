import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import imapReducer from "./imapReducer";

const rootReducer = combineReducers({
  imap: imapReducer
});

let store;
let middleware;

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  middleware = [thunk, logger];
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
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
