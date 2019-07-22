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
import FunkosWishlistContainer from "./containers/FunkosWishlistContainer";
import FunkosCollectionContainer from "./containers/FunkosCollectionContainer";
import FunkoPage from "./components/FunkoPage";
import FunkoPageWishlist from "./components/FunkoPageWishlist";
import UserPage from "./components/UserPage";
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
      api
        .getCurrentUser(token)
        .then(user => {
          this.setState({
            loggedIn: true,
            username: user.username,
            currentUser: user,
            password: "",
            collection: user.collections,
            wishlist: user.wishlists
          });
        })
        .then(() => this.props.history.push("/mypage"));
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
          api
            .getCurrentUser(token)
            .then(user => {
              this.setState({
                loggedIn: true,
                username: user.username,
                currentUser: user,
                password: "",
                collection: user.collections,
                wishlist: user.wishlists
              });
            })
            .then(() => this.props.history.push("/mypage"));
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

  selectWishFunko = e => {
    api.showFunkoWishlist(e.target.parentNode.id).then(data => {
      this.setState({ selectedFunko: data }, () =>
        this.props.history.push(`/wishfunko/${data.id}`)
      );
    });
  };

  ////// ------------- add funko ------------------- /////////////

  handleAddFunkoToCollection = () => {
    if (!this.state.loggedIn) {
      alert("You need to be logged in to add a Funko!");
      this.props.history.push("/");
    } else {
      api
        .addFunkoToCollection(
          this.state.currentUser.id,
          this.state.selectedFunko.id
        )
        .then(data => {
          this.setState({
            collection: [data, ...this.state.collection]
          });
          alert(
            `Amazing, you have add ${
              this.state.selectedFunko.name
            } to your collection!`
          );
          this.props.history.push("/mypage");
        });
    }
  };

  handleAddFunkoToWishlist = () => {
    if (!this.state.loggedIn) {
      alert("You need to be logged in to add a Funko!");
      this.props.history.push("/");
    } else {
      api
        .addFunkoToWishlist(
          this.state.currentUser.id,
          this.state.selectedFunko.id
        )
        .then(data => {
          this.setState({
            wishlist: [data, ...this.state.wishlist]
          });
          alert(
            `Amazing, you have add ${
              this.state.selectedFunko.name
            } to your wishlist!`
          );
          this.props.history.push("/mypage");
        });
    }
  };

  ////// ------------- remove funko from wishlist add to collection ------------------- /////////////

  removeFromWishlistAddToCollection = () => {
    api.removeFromWishlist(this.state.selectedFunko.id).then(() => {
      const newArray = [...this.state.wishlist].filter(
        remainingFunkos => this.state.selectedFunko.id !== remainingFunkos.id
      );
      this.setState({ wishlist: newArray });
      api
        .addFunkoToCollection(
          this.state.currentUser.id,
          this.state.selectedFunko.funko.id
        )
        .then(data => {
          this.setState({
            collection: [data, ...this.state.collection]
          });
          alert(
            `Amazing, you have add ${
              this.state.selectedFunko.funko.name
            } to your collection!`
          );
          this.props.history.push("/mycollection");
        });
    });
  };

  ////// ------------- remove funko ------------------- /////////////

  removeFromWishlist = () => {
    api.removeFromWishlist(this.state.selectedFunko.id).then(() => {
      const newArray = [...this.state.wishlist].filter(
        remainingFunkos => this.state.selectedFunko.id !== remainingFunkos.id
      );
      this.setState({ wishlist: newArray });
      alert(
        `You have remove ${
          this.state.selectedFunko.funko.name
        } from your wishlist with success!`
      );
      this.props.history.push("/mywishlist");
    });
  };
  ////// ------------- search on Google ------------------- /////////////

  searchOnGoogle = () => {
    const searchTerm = this.state.selectedFunko.funko.name.replace(" ", "+");

    window.open(
      `https://www.google.com/search?q=${searchTerm}+funko+pop&rlz=1C5CHFA_enGB841GB841&source=lnms&tbm=shop`
    );
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

  funkoPageWishlist = props => {
    return (
      <FunkoPageWishlist
        funko={this.state.selectedFunko.funko}
        removeFromWishlist={this.removeFromWishlist}
        removeFromWishlistAddToCollection={
          this.removeFromWishlistAddToCollection
        }
        searchOnGoogle={this.searchOnGoogle}
        {...props}
      />
    );
  };

  userPage = props => {
    return (
      <UserPage
        user={this.state.currentUser}
        collection={this.state.collection}
        wishlist={this.state.wishlist}
        selectWishFunko={this.selectWishFunko}
        {...props}
      />
    );
  };

  myWishlistPage = props => {
    return (
      <FunkosWishlistContainer
        wishlist={this.state.wishlist}
        selectWishFunko={this.selectWishFunko}
        {...props}
      />
    );
  };

  myCollectionPage = props => {
    return (
      <FunkosCollectionContainer
        collection={this.state.collection}
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
          <Route path="/mypage" component={props => this.userPage(props)} />
          <Route
            path="/mywishlist"
            component={props => this.myWishlistPage(props)}
          />
          <Route
            path="/mycollection"
            component={props => this.myCollectionPage(props)}
          />
          <Route
            path="/wishfunko/:id"
            component={props => this.funkoPageWishlist(props)}
          />
        </Switch>
      </div>
    );
  }
}

const AppRouter = withRouter(App);

export default AppRouter;
