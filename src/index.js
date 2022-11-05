import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import {AuthProvider , NoteProvider} from "./contexts"
import { BrowserRouter as Router } from "react-router-dom"
import { FilterProvider } from "./contexts/filterContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <FilterProvider>
      <AuthProvider>
        <NoteProvider>
        <App />
        </NoteProvider>
     </AuthProvider>
     </FilterProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
