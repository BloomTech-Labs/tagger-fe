import React from "react";
<<<<<<< HEAD
import "./App.css";

function App() {
  return <div className="App"></div>;
=======
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
>>>>>>> 0d5870466e83f716bb84675428afb7f1f43cc2ed
}

export default withRouter(App);
