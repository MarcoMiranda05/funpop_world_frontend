import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "./images/FunPop_logo.png";
import "./App.css";
import NavBar from "./components/NavBar";

class App extends Component {
  home = () => {
    return <div>Hello FunPop! WORLD</div>;
  };

  render() {
    return (
      <Router>
        <NavBar />
        <Route path="/" exact component={this.home} />
      </Router>
    );
  }
}

export default App;
