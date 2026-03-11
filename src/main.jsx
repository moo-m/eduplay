import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GenieProvider } from "./components/genie/GenieContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GenieProvider>
      <App />
    </GenieProvider>
  </BrowserRouter>
);