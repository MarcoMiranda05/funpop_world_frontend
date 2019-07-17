import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";
import NavBar from "./components/NavBar";
import FunkosCardContainer from "./containers/FunkosCardContainer";
import api from "./util/api";

class App extends Component {
  constructor() {
    super();
    this.state = {
      // funkos: Array.from({ length: 20 })
      funkos: [],
      selection: [],
      hasMore: true,
      currentUser: {},
      username: "",
      password: "",
      logged_in: false
    };

    this.index = 20;
  }

  componentDidMount() {
    api
      .fetchFunkos()
      .then(data =>
        this.setState({ funkos: data, selection: data.slice(0, this.index) })
      );

    const token = localStorage.getItem("token");
    if (token) {
      api.getCurrentUser(token).then(user => {
        this.setState({
          logged_in: true,
          username: user.username,
          currentUser: user
        });
      });
    }
  }

  ////// ------------- get current user ------------------- /////////////

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onLoginClicked = e => {
    e.preventDefault();
    api.login(this.state.username, this.state.password).then(data => {
      if (data.error) {
        alert("something is wrong with your credentials");
        this.setState({ username: "", password: "" });
      } else {
        localStorage.setItem("token", data.jwt);
        const token = localStorage.getItem("token");
        if (token) {
          api.getCurrentUser(token).then(user => {
            this.setState({
              logged_in: true,
              username: user.username,
              currentUser: user
            });
          });
        }
      }
    });
  };

  handleLogOut = () => {
    localStorage.clear("token");
    this.setState({
      logged_in: false,
      username: "",
      password: "",
      currentUser: {}
    });
  };

  ////// ------------- infinite scroll ------------------- /////////////

  fetchMoreFunkos = () => {
    if (this.state.selection.length >= this.state.funkos.length) {
      this.setState({ hasMore: false });
      return;
    }

    setTimeout(() => {
      this.setState({
        selection: this.state.selection.concat(
          this.state.funkos.slice(this.index, this.index + 20)
        )
      });
      this.index = this.index + 20;
    }, 1500);
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
        <NavBar
          logged_in={this.state.logged_in}
          onLoginClicked={this.onLoginClicked}
          handleLogOut={this.handleLogOut}
          currentUser={this.state.currentUser}
          password={this.state.password}
          username={this.state.username}
          handleChange={this.handleChange}
        />
        <Route path="/" exact component={this.home} />
      </Router>
    );
  }
}

export default App;
