import React from "react";

import Photos from "./Photos";

import tileData from "./img_saigon-arrival";

function Hanoi() {
  return <Photos {...{ tileData }} />;
}

export default Hanoi;
