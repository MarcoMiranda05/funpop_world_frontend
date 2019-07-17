import React, { Component } from "react";

class FunkoCard extends Component {
  state = {
    clicked: false
  };

  render() {
    const { name } = this.props.funko;
    return (
      <div>
        <h2>{name}</h2>
      </div>
    );
  }
}

export default FunkoCard;
