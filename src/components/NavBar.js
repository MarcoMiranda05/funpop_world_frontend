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
          <Link to={`/users/${this.props.currentUser.id}`}>my page</Link>
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
      <form>
        <label htmlFor="username">Username:</label>
        <input
          onChange={this.props.handleChange}
          id="username"
          type="text"
          name="username"
          value={this.props.username}
        />
        <label htmlFor="password">Password:</label>
        <input
          onChange={this.props.handleChange}
          id="password"
          type="password"
          name="password"
          value={this.props.password}
        />
        <button onClick={this.props.onLoginClicked}>Log in</button>
      </form>
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
            <div className="nav">
              {this.toggleSingInOut()}
              {/* {this.props.logged_in ? (
                <div>
                  <p> {`Welcome, ${this.props.username}`}</p>
                  <button onClick={this.props.handleLogOut}>Log out</button>
                </div>
              ) : (
                <form>
                  <label htmlFor="username">Username:</label>
                  <input
                    onChange={this.props.handleChange}
                    id="username"
                    type="text"
                    name="username"
                    value={this.props.username}
                  />
                  <label htmlFor="password">Password:</label>
                  <input
                    onChange={this.props.handleChange}
                    id="password"
                    type="password"
                    name="password"
                    value={this.props.password}
                  />
                  <button onClick={this.props.onLoginClicked}>Log in</button>
                </form>
              )} */}
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
