import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import {AuthProvider , NoteProvider} from "./contexts"
import { BrowserRouter as Router } from "react-router-dom"

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <NoteProvider>
        <App />
        </NoteProvider>
     </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
