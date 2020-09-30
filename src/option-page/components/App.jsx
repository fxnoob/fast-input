import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./home";
import Permissions from "./Permissions";

export default () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/permissions" component={Permissions} />
      </Switch>
    </Router>
  );
};