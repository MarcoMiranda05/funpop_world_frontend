import React, { Component } from "react";

class FunkoWishlist extends Component {
  render() {
    const { name, fandom, image_url, id } = this.props.wishlist.funko;
    return (
      <div
        className="funko-card"
        onClick={this.props.selectWishFunko}
        id={this.props.wishlist.id}
        funkoid={id}
      >
        <img className="funko-img" src={image_url} alt={name} />
        <div className="gradient" />
        <div className="funko-details">
          <h3>{name}</h3>
          <h4>{fandom}</h4>
        </div>
      </div>
    );
  }
}

export default FunkoWishlist;
