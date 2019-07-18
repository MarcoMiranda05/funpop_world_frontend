import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";
import NavBar from "./components/NavBar";
import SignUpForm from "./components/SignUpForm";
import FunkosCardContainer from "./containers/FunkosCardContainer";
import api from "./util/api";

class App extends Component {
  constructor() {
    super();
    this.state = {
      funkos: [],
      selection: [],
      hasMore: true,
      currentUser: {},
      username: "",
      password: "",
      loggedIn: false,
      collection: [],
      wishlist: []
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
          loggedIn: true,
          username: user.username,
          currentUser: user,
          password: "",
          collection: user.collections,
          wishlist: user.wishlists
        });
      });
    }
  }

  ////// ------------- handle change ------------------- /////////////

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  ////// ------------- get current user ------------------- /////////////

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
              loggedIn: true,
              username: user.username,
              currentUser: user,
              password: "",
              collection: user.collections,
              wishlist: user.wishlists
            });
          });
        }
      }
    });
  };

  handleLogOut = () => {
    localStorage.clear("token");
    this.setState({
      loggedIn: false,
      username: "",
      password: "",
      currentUser: {},
      collection: [],
      wishlist: []
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

  signUpForm = props => {
    return <SignUpForm />;
  };

  ////// ------------- render method ------------------- /////////////

  render() {
    return (
      <Router>
        <NavBar
          loggedIn={this.state.loggedIn}
          onLoginClicked={this.onLoginClicked}
          handleLogOut={this.handleLogOut}
          currentUser={this.state.currentUser}
          password={this.state.password}
          username={this.state.username}
          handleChange={this.handleChange}
        />
        <div id="content">
          <Route path="/" exact component={this.home} />
          <Route path="/signup-form" component={this.signUpForm} />
        </div>
      </Router>
    );
  }
}

export default App;
