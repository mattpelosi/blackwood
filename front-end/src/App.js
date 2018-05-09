import React, { Component } from "react";
import "./App.css";
import { Router } from "react-router-dom";
import Layout from "./containers/Layout";
import createHistory from "history/createBrowserHistory";

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
