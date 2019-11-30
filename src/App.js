import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Table from "./Table";
import CoverPhotos from "./CoverPhotos";
import Hanoi from "./Hanoi";
import Activities from "./Activities";

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
          <CoverPhotos />
        </Route>
        <Route path="/Hanoi">
          <Hanoi />
        </Route>
        <Route path="/activities">
          <Activities showLinks={false} />
        </Route>
      </Switch>
    </Router>
  );
}
