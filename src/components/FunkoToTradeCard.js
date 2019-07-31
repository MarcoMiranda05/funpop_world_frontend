import React, { Component } from "react";

class FunkoToTradeCard extends Component {
  render() {
    const { name, fandom, image_url, id } = this.props.funko.funko;
    return (
      <div
        className="funko-card"
        onClick={this.props.selectFunkoToTrade}
        id={this.props.funko.id}
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

export default FunkoToTradeCard;
