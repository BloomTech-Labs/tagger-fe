import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";

import LandingPage from "./components/LandingPage";

function App(props) {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
