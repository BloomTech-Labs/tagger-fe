import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";

import LandingPage from "./components/landing/LandingPage";
import Inbox from "./components/inbox/Inbox";

function App(props) {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route path="/inbox" component={Inbox}></Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
