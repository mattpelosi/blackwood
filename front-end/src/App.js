import React, { Component } from "react";
// import "./App.css";
import { Router } from "react-router-dom";
import Layout from "./containers/Layout";
import createHistory from "history/createBrowserHistory";
import "./assets/css/styles.css";
import "./assets/css/Login-Form-Dark.css";
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/fonts/ionicons.min.css";

const history = createHistory()

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Layout />
      </Router>
    );
  }
}

export default App;
