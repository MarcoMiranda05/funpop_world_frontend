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
import FunkoPageCollection from "./components/FunkoPageCollection";
import UserPage from "./components/UserPage";
import api from "./util/api";
import SearchBar from "./components/SearchBar";
import FunkosSearchResultContainer from "./containers/FunkosSearchResultContainer";
import FunkosToTradeContainer from "./containers/FunkosToTradeContainer";
import FunkoToTradePage from "./components/FunkoToTradePage";
import OfferPage from "./components/OfferPage";
import Swal from "sweetalert2";

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
      selectedFunko: {},
      searchTerm: "",
      searchResult: []
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

  handleCategories = e => {
    api
      .funkosByCategory(e.target.name)
      .then(data => this.setState({ searchResult: data }))
      .then(() => this.props.history.push("/result"));
  };

  handleSelect = e => {
    this.setState({
      searchTerm: e.target.id
    });
  };

  ////// ------------- search funko ------------------- /////////////

  submitSearch = e => {
    e.preventDefault();
    api
      .searchFunkos(this.state.searchTerm)
      .then(data =>
        this.setState({
          searchResult: data,
          searchTerm: ""
        })
      )
      .then(() => this.props.history.push("/result"));
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
      // .then(() => this.props.history.push("/mypage"));
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
        this.props.history.push(`/funko/${id}`)
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

  selectCollectFunko = e => {
    api.showFunkoCollection(e.target.parentNode.id).then(data => {
      this.setState({ selectedFunko: data }, () =>
        this.props.history.push(`/collectfunko/${data.id}`)
      );
    });
  };

  selectFunkoToTrade = e => {
    api.showFunkoCollection(e.target.parentNode.id).then(data => {
      this.setState({ selectedFunko: data }, () =>
        this.props.history.push(`/funko-to-trade/${data.id}`)
      );
    });
  };

  ////// ------------- add funko ------------------- /////////////

  handleAddFunkoToCollection = () => {
    if (!this.state.loggedIn) {
      Swal.fire({
        title: "Error!",
        text: "You need to be logged in to add a Funko!",
        type: "error",
        confirmButtonText: "okay"
      });
      // alert("You need to be logged in to add a Funko!");
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

  ////// ------------- toggle funko availability ------------------- /////////////

  toggleFunkoAvailability = () => {
    api.toggleFunkoOnTrade(
      this.state.selectedFunko.id,
      !this.state.selectedFunko.available_to_trade
    );
    this.setState({
      selectedFunko: {
        ...this.state.selectedFunko,
        available_to_trade: !this.state.selectedFunko.available_to_trade
      }
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

  removeFromCollection = () => {
    api.removeFromCollection(this.state.selectedFunko.id).then(() => {
      const newArray = [...this.state.collection].filter(
        remainingFunkos => this.state.selectedFunko.id !== remainingFunkos.id
      );
      this.setState({ collection: newArray });
      alert(
        `You have remove ${
          this.state.selectedFunko.funko.name
        } from your collection with success!`
      );
      this.props.history.push("/mycollection");
    });
  };
  ////// ------------- search on Google ------------------- /////////////

  searchOnGoogle = () => {
    const searchTerm = this.state.selectedFunko.funko.name.replace(" ", "+");

    window.open(
      `https://www.google.com/search?q=${searchTerm}+funko+pop&rlz=1C5CHFA_enGB841GB841&source=lnms&tbm=shop`
    );
  };

  ////// ------------- sort ------------------- /////////////

  handleSort = e => {
    switch (e.target.value) {
      case "newest":
        this.setState({
          funkos: this.state.funkos.sort((a, b) => {
            const a_parts = a.release_date.split("-");
            const a_date = new Date(a_parts[0], a_parts[1] - 1, a_parts[2]);
            const b_parts = b.release_date.split("-");
            const b_date = new Date(b_parts[0], b_parts[1] - 1, b_parts[2]);
            return b_date - a_date;
          }),
          selection: this.state.funkos.slice(0, this.index)
        });
        break;

      case "oldest":
        this.setState({
          funkos: this.state.funkos.sort((a, b) => {
            const a_parts = a.release_date.split("-");
            const a_date = new Date(a_parts[0], a_parts[1] - 1, a_parts[2]);
            const b_parts = b.release_date.split("-");
            const b_date = new Date(b_parts[0], b_parts[1] - 1, b_parts[2]);
            return a_date - b_date;
          }),
          selection: this.state.funkos.slice(0, this.index)
        });
        break;

      case "name":
        this.setState({
          funkos: this.state.funkos.sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
          selection: this.state.funkos.slice(0, this.index)
        });
        break;

      case "name_back":
        this.setState({
          funkos: this.state.funkos.sort((a, b) =>
            b.name.localeCompare(a.name)
          ),
          selection: this.state.funkos.slice(0, this.index)
        });
        break;

      default:
    }
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
      <React.Fragment>
        <SearchBar
          handleChange={this.handleChange}
          submitSearch={this.submitSearch}
        />

        <InfiniteScroll
          dataLength={this.state.selection.length}
          next={this.fetchMoreFunkos}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
        >
          <FunkosCardContainer
            funkos={this.state.selection}
            selectFunko={this.selectFunko}
            handleSort={this.handleSort}
          />
        </InfiniteScroll>
      </React.Fragment>
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
        id={props.match.params.id}
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

  funkoPageCollection = props => {
    return (
      <FunkoPageCollection
        toggleFunkoAvailability={this.toggleFunkoAvailability}
        selectedFunko={this.state.selectedFunko}
        removeFromCollection={this.removeFromCollection}
        {...props}
      />
    );
  };

  userPage = () => {
    // debugger;
    return (
      <React.Fragment>
        <SearchBar
          handleChange={this.handleChange}
          submitSearch={this.submitSearch}
        />
        <UserPage
          user={this.state.currentUser}
          collection={this.state.collection}
          wishlist={this.state.wishlist}
          selectWishFunko={this.selectWishFunko}
          selectCollectFunko={this.selectCollectFunko}
        />
      </React.Fragment>
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
        selectCollectFunko={this.selectCollectFunko}
        {...props}
      />
    );
  };

  searchResultPage = () => {
    return (
      <React.Fragment>
        <SearchBar
          handleChange={this.handleChange}
          submitSearch={this.submitSearch}
        />
        <FunkosSearchResultContainer
          funkos={this.state.searchResult}
          selectFunko={this.selectFunko}
        />
      </React.Fragment>
    );
  };

  funkosToTradePage = () => {
    return (
      <FunkosToTradeContainer
        currentUser={this.state.currentUser}
        selectFunkoToTrade={this.selectFunkoToTrade}
      />
    );
  };

  funkoToTradeShowPage = props => {
    return (
      <FunkoToTradePage
        selectedFunko={this.state.selectedFunko}
        currentUser={this.state.currentUser}
        {...props}
      />
    );
  };

  offerPage = props => {
    return (
      <OfferPage
        id={props.match.params.id}
        currentUser={this.state.currentUser}
        {...props}
      />
    );
  };
  ////// ------------- render method ------------------- /////////////

  render() {
    return (
      <React.Fragment>
        <NavBar
          loggedIn={this.state.loggedIn}
          onLoginClicked={this.onLoginClicked}
          handleLogOut={this.handleLogOut}
          currentUser={this.state.currentUser}
          password={this.state.password}
          username={this.state.username}
          handleChange={this.handleChange}
          handleCategories={this.handleCategories}
        />
        <Switch>
          <Route path="/" exact component={this.home} />
          <Route
            path="/signup-form"
            component={props => this.signUpForm(props)}
          />
          <Route path="/funko/:id" component={props => this.funkoPage(props)} />
          <Route path="/mypage" component={this.userPage} />
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
          <Route
            path="/collectfunko/:id"
            component={props => this.funkoPageCollection(props)}
          />
          <Route path="/result" component={this.searchResultPage} />
          <Route path="/funkos-to-trade" component={this.funkosToTradePage} />
          <Route
            path="/funko-to-trade/:id"
            component={this.funkoToTradeShowPage}
          />
          <Route path="/offer/:id" component={this.offerPage} />
        </Switch>
      </React.Fragment>
    );
  }
}

const AppRouter = withRouter(App);

export default AppRouter;
