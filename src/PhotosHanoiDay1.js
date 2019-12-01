import React from "react";

import Photos from "./Photos";

import tileData from "./img_hanoi_day1.js";

function Hanoi() {
  return <Photos {...{ tileData }} />;
}

export default Hanoi;
