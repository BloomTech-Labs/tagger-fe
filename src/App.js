import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppContainer from "./AppContainer";

import "./App.css";
///App
const App = () => {
  return (
    <Router>
      <AppContainer />
    </Router>
  );
};

export default App;
