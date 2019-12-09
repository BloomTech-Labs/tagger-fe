import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppContainer from "./AppContainer";
import LandingPage from './components/landing_page/LandingPage';

import "./App.css";
///App
const App = () => {
  return (
    <Router>
    <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route path="/inbox" component={AppContainer}/>
      {/* <AppContainer />s */}
    </Switch>
    </Router>
  );
};

export default App;
