import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";

class UserPage extends Component {
  render() {
    const { username, pic_url, email, city, country } = this.props.user;

    return (
      <div className="mypage">
        <div className="user-div">
          <img src={pic_url} alt="avatar" className="user_pic" />
          <div className="user-infos">
            <h3>{username}</h3>
            <a href={`mailto:${email}`}>{email}</a>
            <p>{city}</p>
            <p>{country}</p>
          </div>
        </div>
        <div className="trades-div">
          <h1 />
        </div>
        <div className="my-collection">
          <Link to={"/mycollection"}>
            <h2 className="title">my collection</h2>
          </Link>
          <div className="collection-div">
            {this.props.collection.map(collection => (
              <div
                className="funko-card-mypage"
                onClick={this.props.selectCollectFunko}
                id={collection.id}
              >
                <img className="funko-img" src={collection.funko.image_url} />
                <div className="gradient" />
                <div className="funko-details">
                  <h3>{collection.funko.name}</h3>
                  <h4>{collection.funko.fandom}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="my-wishlist">
          <Link to={"/mywishlist"}>
            <h2 className="title">my wishlist</h2>
          </Link>
          <div className="wishlist-div">
            {this.props.wishlist.map(wishlist => (
              <div
                className="funko-card-mypage"
                onClick={this.props.selectWishFunko}
                id={wishlist.id}
              >
                <img className="funko-img" src={wishlist.funko.image_url} />
                <div className="gradient" />
                <div className="funko-details">
                  <h3>{wishlist.funko.name}</h3>
                  <h4>{wishlist.funko.fandom}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;
