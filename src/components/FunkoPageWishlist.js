import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import api from "../util/api";

class FunkoPageWishlist extends Component {
  state = {
    wishlist: {
      funko: {
        release_date: "1989-03-06"
      }
    }
  };

  componentDidMount() {
    api.showFunkoWishlist(this.props.id).then(data => {
      this.setState({ wishlist: data });
      // console.log(data);
    });
  }

  render() {
    const {
      name,
      image_url,
      fandom,
      category,
      release_date
    } = this.state.wishlist.funko;

    const parts = release_date.split("-");
    const date = new Date(parts[0], parts[1] - 1, parts[2]);

    return (
      <div className="funko-page-card">
        <h1 className="info">{name}</h1>
        <div className="funko-image-div">
          <img src={image_url} alt={name} className="funko-page-img" />
          <div className="gradient" />
        </div>
        <div className="funko-page-details">
          <h2 className="topic">fandom:</h2>
          <h2 className="info">{fandom}</h2>
          <h2 className="topic">category:</h2>
          <h2 className="info">{category}</h2>
          <h2 className="topic">release date:</h2>
          <h2 className="info">
            {new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit"
            })
              .format(date)
              .toLowerCase()}
          </h2>
          <div className="buttons-div-wishlist">
            <button onClick={this.props.removeFromWishlist}>
              remove from wishlist
            </button>
            <button onClick={this.props.searchOnGoogle}>
              search on shopping
            </button>
            <button onClick={console.log("hello")}>trades (soon)</button>
            <button onClick={this.props.removeFromWishlistAddToCollection}>
              add to collection
            </button>
          </div>
        </div>
        <Link to={"/mywishlist"}>
          <button>see my wishlist</button>
        </Link>
      </div>
    );
  }
}

export default FunkoPageWishlist;
