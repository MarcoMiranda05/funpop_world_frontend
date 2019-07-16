import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "./images/FunPop_logo.png";
import "./App.css";

class App extends Component {
  home = () => {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  };

  render() {
    return (
      <Router>
        <Route path="/" exact component={this.home} />
      </Router>
    );
  }
}

export default App;
