import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SimpleTabs from "./App";
import ParticlesBg from "particles-bg";

ReactDOM.render(
  <React.StrictMode>
    <SimpleTabs />
    <ParticlesBg type="random" bg={true} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
