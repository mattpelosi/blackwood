import React, { Component } from 'react';
import './App.css';
import {Router} from 'react-router-dom'
import LoginForm from './components/LoginForm.js'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <div className="Landing-page">
        <Router history={history}>
          <LoginForm/>
        </Router>
      </div>
    );
  }
}

export default App;
