import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Table from "./Table";
import Photos from "./Photos";

export default function App() {
  return (
    <Router basename={"/vietnam"}>
      <Switch>
        <Route exact path="/">
          <Table showLinks={false} />
        </Route>
        <Route path="/itinerary">
          <Table showLinks={false} />
        </Route>
        <Route path="/tc">
          <Table showLinks={true} />
        </Route>
        <Route path="/photos">
          <Photos />
        </Route>
      </Switch>
    </Router>
  );
}
