import React, { Component } from "react";
import { release } from "os";

class FunkoPage extends Component {
  render() {
    const {
      name,
      image_url,
      fandom,
      category,
      release_date
    } = this.props.funko;

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
        <a href="/">
          <button>see all funkos</button>
        </a>
      </div>
    );
  }
}

export default FunkoPage;
