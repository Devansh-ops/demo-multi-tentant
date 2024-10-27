import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [config, setConfig] = useState(null); // State to hold the configuration data

  useEffect(() => {
    // Fetch config.json on component mount
    fetch("./config.json")
      .then((response) => response.json())
      .then((data) => {
        setConfig(data);
      })
      .catch((error) => {
        console.error("Error loading config:", error);
      });
  }, []);

  if (config === null) {
    console.log("loading config...");
  }
  else if (config) {
    console.log("config found\n", config);
  } else {
    console.log("config not found");
  }

  return <div className="App">
    <div>Hello, World!</div>
    <div>{config ? JSON.stringify(config, null, 2) : "Config not found"}</div>
  </div>;
}

export default App;
