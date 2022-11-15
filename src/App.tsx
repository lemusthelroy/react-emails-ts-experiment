import React from "react";
import "./App.css";

const App = (): JSX.Element => (
  <div className="App">
    <button
      onClick={() => {
        // Call netlify test function
        fetch("/.netlify/functions/test");
        console.log("click");
      }}
    >
      BANG
    </button>
  </div>
);

export default App;
