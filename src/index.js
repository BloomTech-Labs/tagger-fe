import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./reducers";
import App from './App';
import './index.css';


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import { Provider } from "react-redux";
// import { BrowserRouter as Router } from "react-router-dom";
// import "./index.css";
// import "../node_modules/font-awesome/css/font-awesome.css";

// import { store } from "./reducers";

// ReactDOM.render(
//     <Provider store={store}>
//         <Router>
//             <App />
//         </Router>
//     </Provider>,
//     document.getElementById("root")
// );
