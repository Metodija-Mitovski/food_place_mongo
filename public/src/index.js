import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/style.css";
import { AuthContextProvider } from "./services/authContext/authContext";

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById("root")
);
