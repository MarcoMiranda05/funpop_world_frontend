import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";
import NavBar from "./components/NavBar";
import FunkosCardContainer from "./containers/FunkosCardContainer";
const API = "http://localhost:3000";

class App extends Component {
  constructor() {
    super();
    this.state = {
      // funkos: Array.from({ length: 20 })
      funkos: [],
      selection: [],
      hasMore: true
    };

    this.index = 100;
  }

  componentDidMount() {
    this.fetchFunkos();
  }

  ////// ------------- funkos request ------------------- /////////////

  fetchFunkos = () => {
    fetch(`${API}/funkos`)
      .then(resp => resp.json())
      .then(data =>
        this.setState({ funkos: data, selection: data.slice(0, this.index) })
      );
  };

  ////// ------------- infinite scroll ------------------- /////////////

  fetchMoreFunkos = () => {
    if (this.state.selection.length >= this.state.funkos.length) {
      this.setState({ hasMore: false });
      return;
    }
    this.setState({
      selection: this.state.selection.concat(
        this.state.funkos.slice(this.index, this.index + 100)
      )
    });
    this.index = this.index + 100;
  };

  ////// ------------- routes ------------------- /////////////

  home = () => {
    return (
      <InfiniteScroll
        dataLength={this.state.selection.length}
        next={this.fetchMoreFunkos}
        hasMore={this.state.hasMore}
        loader={<h4>Loading...</h4>}
      >
        <FunkosCardContainer funkos={this.state.selection} />
      </InfiniteScroll>
    );
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
