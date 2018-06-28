import React, { Component } from "react";
import { Router } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import createBrowserHistory from "history/createBrowserHistory";
import "./App.css";

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <LandingPage />
      </Router>
    );
  }
}

export default App;
