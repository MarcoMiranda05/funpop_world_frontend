import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import api from "../util/api";
import tradeIcon from "../images/trade-icon-black.png";
import blankfunko from "../images/funkoblank.png";
import Swal from "sweetalert2";

class FunkoToTradePage extends Component {
  state = {
    isClicked: false,
    myFunkos: [],
    choosenFunko: { funko: { name: "select a funko", image_url: blankfunko } }
  };

  handleClick = () => {
    api.myFunkosToTrade(this.props.currentUser.id).then(data => {
      this.setState({ isClicked: true, myFunkos: data });
    });
  };

  handleSelect = e => {
    api.showFunkoCollection(e.target.parentNode.id).then(data => {
      this.setState({ choosenFunko: data });
    });
  };

  makeAnOffer = () => {
    api
      .makeAnOffer(this.props.selectedFunko.id, this.state.choosenFunko.id)
      .then(data => {
        if (data.error) {
          Swal.fire({
            title: "Ooops...",
            text: "You need to select a Funko to make the offer!",
            type: "error",
            confirmButtonText: "okay"
          });
        } else {
          Swal.fire({
            title: "Cool!!!",
            text: "Your offer has been placed",
            type: "success",
            showConfirmButtonText: false,
            timer: 1500
          });
          this.props.history.push("/");
        }
      });
  };

  render() {
    const {
      name,
      image_url,
      fandom,
      category,
      release_date,
      trending_value,
      exclusivity
    } = this.props.selectedFunko.funko;

    const parts = release_date.split("-");
    const date = new Date(parts[0], parts[1] - 1, parts[2]);

    const originalRender = () => {
      return (
        <div className="funko-page-card">
          <div className="value">
            <img
              src="http://www.pngmart.com/files/8/Label-Download-PNG-Image.png"
              className="label"
            />

            <h3 className="trending-value">*trending value:</h3>
            <h1 className="price">
              {trending_value == null ? "$--" : `$${trending_value}`}
            </h1>
          </div>
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
            <h2 className="topic">exclusivity:</h2>
            <h2 className="info">
              {exclusivity === "" ? "none" : `${exclusivity}`}
            </h2>
            <div className="buttons-div">
              <button onClick={this.handleClick}>make an offer</button>
              <Link to={"/funkos-to-trade"}>
                <button>see all funkos on trade</button>
              </Link>
            </div>
          </div>
        </div>
      );
    };

    const makeAnOfferView = () => {
      return (
        <div className="make-an-offer-container">
          <div className="incoming-funko-container">
            <h1 className="info">{name}</h1>
            <div className="funko-image-div">
              <img src={image_url} alt={name} className="funko-page-img" />
              <div className="gradient" />
            </div>
            <div className="funko-incoming-details">
              <div>
                <h2 className="incoming-funko-topic">fandom:</h2>
                <h2 className="incoming-funko-info">{fandom}</h2>
              </div>
              <div>
                <h2 className="incoming-funko-topic">category:</h2>
                <h2 className="incoming-funko-info">{category}</h2>
              </div>
              <div>
                <h2 className="incoming-funko-topic">release date:</h2>
                <h2 className="incoming-funko-info">
                  {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                  })
                    .format(date)
                    .toLowerCase()}
                </h2>
              </div>
              <div>
                <h2 className="incoming-funko-topic">exclusivity:</h2>
                <h2 className="incoming-funko-info">
                  {exclusivity === "" ? "none" : `${exclusivity}`}
                </h2>
              </div>
              <div>
                <h2 className="incoming-funko-topic">trending value:</h2>
                <h2 className="incoming-funko-info">
                  {trending_value == null ? "$--" : `$${trending_value}`}
                </h2>
              </div>
              <br />
              <div>
                <h2 className="incoming-funko-topic">funko belongs to:</h2>
                <h2 className="incoming-funko-info">
                  {this.props.selectedFunko.user.username}
                </h2>
              </div>
              <div>
                <h2 className="incoming-funko-topic">from:</h2>
                <h2 className="incoming-funko-info">
                  {this.props.selectedFunko.user.city},{" "}
                  {this.props.selectedFunko.user.country}
                </h2>
              </div>
            </div>
          </div>
          <div className="confirm-offer-container">
            <div>
              <h2>{this.state.choosenFunko.funko.name}</h2>
              <div className="funko-to-trade-image-div">
                <img
                  src={this.state.choosenFunko.funko.image_url}
                  alt="funko-image"
                  className="funko-to-trade-image"
                />
                <div className="gradient" />
              </div>
            </div>
            <img src={tradeIcon} alt="transfer-logo" className="trade-image" />
            <button onClick={this.makeAnOffer}>confirm offer</button>
            <Link to={"/funkos-to-trade"}>
              <button>see all funkos on trade</button>
            </Link>
          </div>
          <div className="outgoing-funko-container">
            <h1 className="info">my funkos to trade</h1>
            <div className="my-funkos-to-trade">
              {this.state.myFunkos.map(funko => (
                <div
                  className="funko-card-outgoing"
                  id={funko.id}
                  onClick={this.handleSelect}
                >
                  <img className="funko-img" src={funko.funko.image_url} />
                  <div className="gradient" />
                  <div className="funko-details">
                    <h3>{funko.funko.name}</h3>
                    <h4>{funko.funko.fandom}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };

    return this.state.isClicked ? makeAnOfferView() : originalRender();
  }
}

export default FunkoToTradePage;
