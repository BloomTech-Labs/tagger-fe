import React from "react";
import {withRouter} from 'react-router'
import { BrowserRouter as Router} from "react-router-dom";
import AppContainer from "./AppContainer";
import "./App.css";

// const AppContainer = withRouter(({location}) =>(
//   <div data-testid= 'app-container'>{location.pathname}</div>
// ))

///App
const App = () => {
  return (
    <Router>
      <AppContainer />
    </Router>
  );
};

export default App;
