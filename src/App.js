import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
const API = "http://localhost:3000";

class App extends Component {
  state = {
    funkos: []
  };

  componentDidMount() {
    this.fetchFunkos();
  }

  ////// ------------- funkos request ------------------- /////////////

  fetchFunkos = () => {
    fetch(`${API}/funkos`)
      .then(resp => resp.json())
      .then(data => this.setState({ funkos: data }));
  };

  ////// ------------- routes ------------------- /////////////

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
