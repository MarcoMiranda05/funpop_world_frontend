import React, { Component } from "react";
import api from "../util/api";
import FunkoToTradeCard from "../components/FunkoToTradeCard";

class FunkosToTradeContainer extends Component {
  state = {
    funkos: []
  };

  componentDidMount() {
    api
      .funkosAvailableToTrade(this.props.currentUser.id)
      .then(data => this.setState({ funkos: data }));
  }

  render() {
    return (
      <div className="funko-collection">
        <h1 className="search-result">funkos to trade</h1>
        {this.state.funkos.map(funko => {
          return <FunkoToTradeCard key={funko.id} funko={funko} />;
        })}
      </div>
    );
  }
}

export default FunkosToTradeContainer;
