import React from "react";
import ReactDom from "react-dom";
import "./index.css"

const root = document.getElementById("root");

const App = () => {
  return <h1 className="appClass">Hello Login App!</h1>;
};

ReactDom.render(<App />, root);
