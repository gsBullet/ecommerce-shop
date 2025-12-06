import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import FrontendAuthContextProvider from "./context/FrontendAuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FrontendAuthContextProvider>
    <App />
  </FrontendAuthContextProvider>
);

reportWebVitals();
