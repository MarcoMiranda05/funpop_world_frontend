import React, { Component } from "react";

class UserPage extends Component {
  render() {
    const { username, pic_url, email, city, country } = this.props.user;

    return (
      <React.Fragment>
        <div className="user-div">
          <img src={pic_url} alt="avatar" className="user_pic" />
          <div className="user-infos">
            <h3>{username}</h3>
            <a href={`mailto:${email}`}>{email}</a>
            <p>{city}</p>
            <p>{country}</p>
          </div>
        </div>
        <div>
          {this.props.user.collections.map(collection => (
            <div className="funko-card">
              <img className="funko-img" src={collection.funko.image_url} />
              <div className="gradient" />
              <div className="funko-details">
                <h3>{collection.funko.name}</h3>
                <h4>{collection.funko.fandom}</h4>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default UserPage;
