import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import logo from "../images/FunPop_logo.png";
class NavBar extends Component {
  toggleSingInOut = () => {
    return this.props.loggedIn ? (
      <React.Fragment>
        <li className="nav-item">
          <NavLink
            exact
            className="nav-link"
            to="/"
            onClick={this.props.handleLogOut}
          >
            log out
          </NavLink>
        </li>
        <li className="my-page">
          <Link to={`/mypage`}>my page</Link>
        </li>
        <li className="login">
          <div>
            <li className="welcome">welcome,</li>
            <li className="name">{this.props.currentUser.username}</li>
            <li className="exclamation">!</li>
          </div>
        </li>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <li className="signup-btn">
          <NavLink to="/signup-form"> sign up</NavLink>
        </li>
        <li className="login-btn" onClick={this.props.onLoginClicked}>
          login
        </li>
        <form className="login-form">
          <label htmlFor="username">username:</label>
          <input
            onChange={this.props.handleChange}
            id="username"
            type="text"
            name="username"
            value={this.props.username}
          />
          <label htmlFor="password">password:</label>
          <input
            onChange={this.props.handleChange}
            id="password"
            type="password"
            name="password"
            value={this.props.password}
          />
        </form>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="navbar">
        <ul className="topnav">
          <li>
            <img src={logo} alt="logo" className="logo" />
          </li>
          <li className="home">
            <Link to="/">home</Link>
          </li>
          <li className="categories">
            <a className="dropbtn">categories</a>
            <div className="categories-content">
              <a value="Link 1">Link 1</a>
              <a value="Link 1">Link 2</a>
              <a value="Link 1">Link 3</a>
            </div>
          </li>
          <li>
            <div className="nav">{this.toggleSingInOut()}</div>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
