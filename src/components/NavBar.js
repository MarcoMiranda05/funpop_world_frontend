import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import logo from "../images/FunPop_logo.png";

const NavBar = props => {
  return (
    <div className="navbar">
      <ul className="topnav">
        <li>
          <img src={logo} alt="logo" className="logo" />
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="categories">
          <a className="dropbtn">Categories</a>
          <div className="categories-content">
            <a value="Link 1">Link 1</a>
            <a value="Link 1">Link 2</a>
            <a value="Link 1">Link 3</a>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
