import React, { Component } from "react";
import funko from "../images/funkoblank.png";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import { withRouter } from "react-router";
import api from "../util/api";

class SignUpForm extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    pic_url: "",
    city: "",
    country: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  createNewUser = e => {
    e.preventDefault();
    const newUser = { user: { ...this.state } };
    api.createUser(newUser).then(data => {
      if (data.error) {
        console.log(data.error);
        alert(data.error[0]);
      } else {
        localStorage.setItem("token", data.jwt);
        this.props.handleCurrentUser();
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <form className="signup-form">
        <img className="blank-funko" src={funko} alt="funko" />
        <label htmlFor="username">username:</label>
        <input
          onChange={this.handleChange}
          id="username"
          type="text"
          name="username"
        />
        <label htmlFor="password">password:</label>
        <input
          onChange={this.handleChange}
          id="password"
          type="password"
          name="password"
        />
        <label htmlFor="email">email:</label>
        <input
          onChange={this.handleChange}
          id="email"
          type="email"
          name="email"
        />
        <label htmlFor="pic_url">picture url:</label>
        <input
          onChange={this.handleChange}
          id="pic_url"
          type="pic_url"
          name="pic_url"
        />
        <label htmlFor="city">city:</label>
        <input onChange={this.handleChange} id="city" type="city" name="city" />
        <label htmlFor="country">country:</label>
        <input
          onChange={this.handleChange}
          id="country"
          type="country"
          name="country"
        />
        <button onClick={this.createNewUser}>submit</button>
      </form>
    );
  }
}

export default withRouter(SignUpForm);
