import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history';
import configureStore from './store';
import ReactGA from 'react-ga'
import React from "react";

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Google Analytics
const trackingId = "UA-157555402-1";
const history = createBrowserHistory();

ReactGA.initialize(trackingId);
ReactGA.set({
  // userId: auth.currentUserId(),
  // any data that is relevant to the user session
  // that you would like to track with google analytics
})

history.listen(location => {
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  });
// End Google Analytics

ReactDOM.render(
    <Provider store={configureStore()}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
