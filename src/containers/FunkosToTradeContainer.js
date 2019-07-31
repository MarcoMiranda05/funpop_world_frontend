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
        <h1 className="search-result">
          There's {this.state.funkos.length} funkos available to trade
        </h1>
        {this.state.funkos.map(funko => {
          return (
            <FunkoToTradeCard
              key={funko.id}
              funko={funko}
              selectFunkoToTrade={this.props.selectFunkoToTrade}
            />
          );
        })}
      </div>
    );
  }
}

export default FunkosToTradeContainer;
