import React, { Component } from "react";

class FunkoCard extends Component {
  state = {
    clicked: false
  };

  render() {
    const {
      name,
      fandom,
      image_url,
      release_date,
      category
    } = this.props.funko;
    return (
      <div className="funko-card">
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

export default FunkoCard;
