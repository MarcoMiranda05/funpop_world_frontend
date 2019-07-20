import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";
import NavBar from "./components/NavBar";
import SignUpForm from "./components/SignUpForm";
import FunkosCardContainer from "./containers/FunkosCardContainer";
import FunkoPage from "./components/FunkoPage";
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
      wishlist: [],
      selectedFunko: {}
    };

    this.index = 20;
  }

  componentDidMount() {
    api
      .fetchFunkos()
      .then(data =>
        this.setState({ funkos: data, selection: data.slice(0, this.index) })
      );
    this.handleCurrentUser();
  }

  ////// ------------- handle change ------------------- /////////////

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  ////// ------------- get current user ------------------- /////////////

  handleCurrentUser = () => {
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

  ////// ------------- select funko ------------------- /////////////

  selectFunko = id => {
    api.showFunko(id).then(data => {
      this.setState({ selectedFunko: data }, () =>
        this.props.history.push(`/funkopage/${id}`)
      );
    });
  };

  ////// ------------- add funko ------------------- /////////////

  handleAddFunkoToCollection = () => {
    api
      .addFunkoToCollection(
        this.state.currentUser.id,
        this.state.selectedFunko.id
      )
      .then(() => {
        this.setState({
          collection: [...this.state.collection, this.state.selectedFunko]
        });
        alert(
          `Amazing, you have add ${
            this.state.selectedFunko.name
          } to your collection!`
        );
        this.props.history.push("/");
      });
  };

  handleAddFunkoToWishlist = () => {
    api
      .addFunkoToWishlist(
        this.state.currentUser.id,
        this.state.selectedFunko.id
      )
      .then(() => {
        this.setState({
          wishlist: [...this.state.wishlist, this.state.selectedFunko]
        });
        alert(
          `Amazing, you have add ${
            this.state.selectedFunko.name
          } to your wishlist!`
        );
        this.props.history.push("/");
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

  home = props => {
    return (
      <InfiniteScroll
        dataLength={this.state.selection.length}
        next={this.fetchMoreFunkos}
        hasMore={this.state.hasMore}
        loader={<h4>Loading...</h4>}
        selectFunko={this.selectFunko}
        {...props}
      >
        <FunkosCardContainer
          funkos={this.state.selection}
          selectFunko={this.selectFunko}
        />
      </InfiniteScroll>
    );
  };

  signUpForm = props => {
    return <SignUpForm handleCurrentUser={this.handleCurrentUser} {...props} />;
  };

  funkoPage = props => {
    return (
      <FunkoPage
        funko={this.state.selectedFunko}
        handleAddFunkoToCollection={this.handleAddFunkoToCollection}
        handleAddFunkoToWishlist={this.handleAddFunkoToWishlist}
        {...props}
      />
    );
  };

  ////// ------------- render method ------------------- /////////////

  render() {
    return (
      <div>
        <NavBar
          loggedIn={this.state.loggedIn}
          onLoginClicked={this.onLoginClicked}
          handleLogOut={this.handleLogOut}
          currentUser={this.state.currentUser}
          password={this.state.password}
          username={this.state.username}
          handleChange={this.handleChange}
        />
        <Switch>
          <Route path="/" exact component={props => this.home(props)} />
          <Route
            path="/signup-form"
            component={props => this.signUpForm(props)}
          />
          <Route
            path="/funkopage/:id"
            component={props => this.funkoPage(props)}
          />
        </Switch>
      </div>
    );
  }
}

const AppRouter = withRouter(App);

export default AppRouter;
