import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Table from "./Table";
import Photos from "./Photos";
import PhotosMain from "./PhotosMain";
import PicsHanoiDay1 from "./img_hanoi-day1";
import PicsSaigonArrival from "./img_saigon-arrival";
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
          <PhotosMain />
        </Route>
        <Route path="/hanoi1">
          <Photos tileData={PicsHanoiDay1} />
        </Route>
        <Route path="/saigonarrival">
          <Photos tileData={PicsSaigonArrival} />
        </Route>
        <Route path="/activities">
          <Activities showLinks={false} />
        </Route>
      </Switch>
    </Router>
  );
}
