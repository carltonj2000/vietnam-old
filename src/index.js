import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onUpdate: reg => {
    console.log("reg", reg);
    console.log("installing", reg.installing);
    console.log("waiting", reg.waiting);
    console.log("active", reg.active);
    const sw = reg.waiting;
    if (!sw) return;
    sw.postMessage({ type: "SKIP_WAITING" });
  }
});
