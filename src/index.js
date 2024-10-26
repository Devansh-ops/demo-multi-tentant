import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const pathSegments = window.location.pathname.split("/").filter(Boolean);
const tenantPath =
  pathSegments.length >= 2
    ? decodeURIComponent(pathSegments.slice(0, 2).join("/"))
    : decodeURIComponent(pathSegments[0] || "");

console.log("tenant path", tenantPath); // Outputs "india/crm" for example.com/india/crm

// ConfigLoader component to fetch config.json and determine if tenantPath exists
function ConfigLoader() {
  const [tenantExists, setTenantExists] = useState(null); // Boolean state to track tenant existence

  useEffect(() => {
    fetch("./config.json")
      .then((response) => response.json())
      .then((config) => {
        // Check if tenantPath exists in the config
        if (config[tenantPath]) {
          setTenantExists(true);
        } else {
          setTenantExists(false);
        }
      })
      .catch((error) => {
        console.error("Error loading config:", error);
        setTenantExists(false); // Treat as non-existent if fetch fails
      });
  }, []);

  if (tenantExists === null) {
    return <div>Loading...</div>; // Show loading message while fetching
  }

  if (!tenantExists) {
    return <div>404 - Not Found</div>; // Render 404 message if tenant does not exist
  }

  return (
    <BrowserRouter basename={tenantPath}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ConfigLoader />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
