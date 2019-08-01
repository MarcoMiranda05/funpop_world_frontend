import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import api from "../util/api";
import tradeIcon from "../images/trade-icon-black.png";
import Swal from "sweetalert2";

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

  acceptOffer = e => {
    api.toggleOfferStatus(this.state.offer.id, e.target.name).then(data => {
      api.removeFromCollection(data.incoming_funko.id);
      api.removeFromCollection(data.outcoming_funko.id);
      api.addFunkoToCollection(
        data.outcoming_funko.user.id,
        data.incoming_funko.funko.id
      );
      api.addFunkoToCollection(
        data.incoming_funko.user.id,
        data.outcoming_funko.funko.id
      );
      Swal.fire({
        title: `Offer has been acceptd! Now you have ${
          data.outcoming_funko.funko.name
        } in you collection!`,
        imageUrl: `${data.outcoming_funko.funko.name.image_url}`,
        imageWidth: 150,
        imageHeight: 200,
        imageAlt: "funko image",
        showConfirmButtonText: false,
        timer: 2500
      });
      this.props.history.push("/");
    });
  };

  rejectOffer = () => {
    api.rejectOffer(this.state.offer.id).then(() => {
      Swal.fire({
        title: `Offer has been rejected!`,
        type: "success",
        showConfirmButton: false,
        timer: 1500
      });
      this.props.history.push("/");
    });
  };

  cancelOffer = () => {
    api.rejectOffer(this.state.offer.id).then(() => {
      Swal.fire({
        title: `Offer has been cancelled!`,
        type: "success",
        showConfirmButton: false,
        timer: 1500
      });
      this.props.history.push("/");
    });
  };

  incomingButtons = () => {
    return (
      <React.Fragment>
        <button onClick={this.acceptOffer} name="accepted">
          accept offer
        </button>
        <button onClick={this.rejectOffer}>reject offer</button>
      </React.Fragment>
    );
  };

  outcomingButtons = () => {
    return <button onClick={this.cancelOffer}>cancel offer</button>;
  };

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
            {this.state.offer.incoming_funko.user.id ===
            this.props.currentUser.id
              ? this.incomingButtons()
              : this.outcomingButtons()}
            <Link to={"/funkos-to-trade"}>
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
