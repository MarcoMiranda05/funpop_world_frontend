import React, { Component } from "react";

class FunkoWishlist extends Component {
  render() {
    const { id, funko } = this.props.wishlist;
    return (
      <div
        className="funko-card"
        onClick={() => this.props.handleSelectWish(id)}
        id={id}
      >
        <img className="funko-img" src={funko.image_url} alt={funko.name} />
        <div className="gradient" />
        <div className="funko-details">
          <h3>{funko.name}</h3>
          <h4>{funko.fandom}</h4>
        </div>
      </div>
    );
  }
}

export default FunkoWishlist;
