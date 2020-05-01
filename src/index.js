import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/scss/style.scss";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB1N4QkKcAkMJFI-5G6bVuB8ZSfv_3U1hM&libraries=places"></script>
ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
