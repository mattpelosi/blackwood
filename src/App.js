import React, { Component } from "react";
import { Router } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import createBrowserHistory from "history/createBrowserHistory";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers  from "./reducers";
import "./App.css";

const history = createBrowserHistory();

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <LandingPage />
        </Router>
      </Provider>
    );
  }
}

export default App;
