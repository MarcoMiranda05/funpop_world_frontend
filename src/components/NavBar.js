// import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import logo from "../images/FunPop_logo.png";

// const NavBar = props => {
//   return (
//     <div className="navbar">
//       <ul className="topnav">
//         <li>
//           <img src={logo} alt="logo" className="logo" />
//         </li>
//         <li>
//           <Link to="/">home</Link>
//         </li>
//         <li className="categories">
//           <a className="dropbtn">categories</a>
//           <div className="categories-content">
//             <a value="Link 1">Link 1</a>
//             <a value="Link 1">Link 2</a>
//             <a value="Link 1">Link 3</a>
//           </div>
//         </li>
//         <li>
//           <div className="nav">
//             {props.logged_in ? (
//               <div>
//                 <p> {`you're logged in as ${props.username}`}</p>
//                 <button onClick={props.handleLogOut}>Log out</button>
//               </div>
//             ) : (
//               <form>
//                 <label htmlFor="username">Username:</label>
//                 <input
//                   onChange={props.handleChange}
//                   id="username"
//                   type="text"
//                   name="username"
//                   value={props.username}
//                 />
//                 <label htmlFor="password">Password:</label>
//                 <input
//                   onChange={props.handleChange}
//                   id="password"
//                   type="password"
//                   name="password"
//                   value={props.password}
//                 />
//                 <button onClick={props.onLoginClicked}>Log in</button>
//               </form>
//             )}
//           </div>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default NavBar;

import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <ul className="topnav">
          <li>
            <img src={logo} alt="logo" className="logo" />
          </li>
          <li>
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
              {this.props.logged_in ? (
                <div>
                  <p> {`you're logged in as ${this.props.username}`}</p>
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
              )}
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
