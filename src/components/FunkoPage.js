import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import api from "../util/api";

class FunkoPage extends Component {
  state = {
    funko: {
      release_date: "1989-03-06"
    }
  };

  componentDidMount() {
    api.showFunko(this.props.id).then(data => {
      this.setState({ funko: data });
    });
  }

  render() {
    const {
      name,
      image_url,
      fandom,
      category,
      release_date
    } = this.state.funko;

    const parts = release_date.split("-");
    const date = new Date(parts[0], parts[1] - 1, parts[2]);

    return (
      <div class="funko-page-card">
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
          <div className="buttons-div">
            <button onClick={this.props.handleAddFunkoToCollection}>
              add to my collection
            </button>
            <button onClick={this.props.handleAddFunkoToWishlist}>
              add to my wishlist
            </button>
          </div>
        </div>
        <Link to={"/"}>
          <button onClick={this.props.refreshData}>see all funkos</button>
        </Link>
      </div>
    );
  }
}

export default FunkoPage;
