import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import api from "../util/api";
import tradeIcon from "../images/trade-icon-black.png";

class OfferPage extends Component {
  state = {
    offer: [],
    ready: false
  };

  componentDidMount() {
    api.showOffer(this.props.id).then(data => {
      this.setState({ offer: data, ready: true });
    });
  }

  render() {
    const renderOffer = () => {
      const parts = this.state.offer.incoming_funko.funko.release_date.split(
        "-"
      );
      const date = new Date(parts[0], parts[1] - 1, parts[2]);

      const parts2 = this.state.offer.outcoming_funko.funko.release_date.split(
        "-"
      );
      const date2 = new Date(parts2[0], parts2[1] - 1, parts2[2]);

      return (
        <div className="make-an-offer-container">
          <div className="incoming-funko-container">
            <h1 className="info">
              {this.state.offer.incoming_funko.funko.name}
            </h1>
            <div className="funko-image-div">
              <img
                src={this.state.offer.incoming_funko.funko.image_url}
                alt={this.state.offer.incoming_funko.funko.name}
                className="funko-page-img"
              />
              <div className="gradient" />
            </div>
            <div className="funko-incoming-details">
              <div>
                <h2 className="incoming-funko-topic">fandom:</h2>
                <h2 className="incoming-funko-info">
                  {this.state.offer.incoming_funko.funko.fandom}
                </h2>
              </div>
              <div>
                <h2 className="incoming-funko-topic">category:</h2>
                <h2 className="incoming-funko-info">
                  {this.state.offer.incoming_funko.funko.category}
                </h2>
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
                  {this.state.offer.incoming_funko.funko.exclusivity === ""
                    ? "none"
                    : `${this.state.offer.incoming_funko.funko.exclusivity}`}
                </h2>
              </div>
              <div>
                <h2 className="incoming-funko-topic">trending value:</h2>
                <h2 className="incoming-funko-info">
                  {this.state.offer.incoming_funko.funko.trending_value == null
                    ? "$--"
                    : `$${
                        this.state.offer.incoming_funko.funko.trending_value
                      }`}
                </h2>
              </div>
              <br />
              <div>
                <h2 className="incoming-funko-topic">funko belongs to:</h2>
                <h2 className="incoming-funko-info">
                  {this.state.offer.incoming_funko.user.username}
                </h2>
              </div>
              <div>
                <h2 className="incoming-funko-topic">from:</h2>
                <h2 className="incoming-funko-info">
                  {this.state.offer.incoming_funko.user.city},{" "}
                  {this.state.offer.incoming_funko.user.country}
                </h2>
              </div>
            </div>
          </div>
          <div className="confirm-offer-container">
            <img src={tradeIcon} alt="transfer-logo" className="trade-image" />
            <button onClick={console.log("hello")}>accept offer</button>
            <button onClick={console.log("hello")}>reject offer</button>
            <Link to={"/mypage"}>
              <button>see all funkos on trade</button>
            </Link>
          </div>
          <div className="outgoing-funko-container">
            <h1 className="info">
              {this.state.offer.outcoming_funko.funko.name}
            </h1>
            <div className="funko-image-div">
              <img
                src={this.state.offer.outcoming_funko.funko.image_url}
                alt={this.state.offer.outcoming_funko.funko.name}
                className="funko-page-img"
              />
              <div className="gradient" />
            </div>
            <div className="funko-incoming-details">
              <div>
                <h2 className="incoming-funko-topic">fandom:</h2>
                <h2 className="incoming-funko-info">
                  {this.state.offer.outcoming_funko.funko.fandom}
                </h2>
              </div>
              <div>
                <h2 className="incoming-funko-topic">category:</h2>
                <h2 className="incoming-funko-info">
                  {this.state.offer.outcoming_funko.funko.category}
                </h2>
              </div>
              <div>
                <h2 className="incoming-funko-topic">release date:</h2>
                <h2 className="incoming-funko-info">
                  {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                  })
                    .format(date2)
                    .toLowerCase()}
                </h2>
              </div>
              <div>
                <h2 className="incoming-funko-topic">exclusivity:</h2>
                <h2 className="incoming-funko-info">
                  {this.state.offer.outcoming_funko.funko.exclusivity === ""
                    ? "none"
                    : `${this.state.offer.outcoming_funko.funko.exclusivity}`}
                </h2>
              </div>
              <div>
                <h2 className="incoming-funko-topic">trending value:</h2>
                <h2 className="incoming-funko-info">
                  {this.state.offer.outcoming_funko.funko.trending_value == null
                    ? "$--"
                    : `$${
                        this.state.offer.outcoming_funko.funko.trending_value
                      }`}
                </h2>
              </div>
              <br />
              <div>
                <h2 className="incoming-funko-topic">funko belongs to:</h2>
                <h2 className="incoming-funko-info">
                  {this.state.offer.outcoming_funko.user.username}
                </h2>
              </div>
              <div>
                <h2 className="incoming-funko-topic">from:</h2>
                <h2 className="incoming-funko-info">
                  {this.state.offer.outcoming_funko.user.city},{" "}
                  {this.state.offer.outcoming_funko.user.country}
                </h2>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return this.state.ready ? renderOffer() : <div>loading</div>;
  }
}

export default OfferPage;
