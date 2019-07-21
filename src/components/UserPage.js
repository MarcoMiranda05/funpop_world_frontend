import React, { Component } from "react";

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
          <h1>trades offers</h1>
        </div>
        <div className="my-collection">
          <h2 className="title">my collection</h2>
          <div className="collection-div">
            {this.props.collection.map(collection => (
              <div className="funko-card-mypage">
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
          <h2 className="title">my wishlist</h2>
          <div className="wishlist-div">
            {this.props.wishlist.map(wishlist => (
              <div className="funko-card-mypage">
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
