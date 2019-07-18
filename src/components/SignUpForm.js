import React, { Component } from "react";
import funko from "../images/blank_funko.png";

const SignUpForm = props => {
  return (
    <div className="signup-form">
      <img className="blank-funko" src={funko} alt="funko" />
      <label htmlFor="username">username:</label>
      <input
        onChange={props.handleChange}
        id="username"
        type="text"
        name="username"
        value={props.username}
      />
      <label htmlFor="password">password:</label>
      <input
        onChange={props.handleChange}
        id="password"
        type="password"
        name="password"
        value={props.password}
      />
      <label htmlFor="email">email:</label>
      <input
        onChange={props.handleChange}
        id="email"
        type="email"
        name="email"
        value={props.email}
      />
      <label htmlFor="pic_url">picture url:</label>
      <input
        onChange={props.handleChange}
        id="pic_url"
        type="pic_url"
        name="pic_url"
        value={props.pic_url}
      />
      <label htmlFor="city">city:</label>
      <input
        onChange={props.handleChange}
        id="city"
        type="city"
        name="city"
        value={props.city}
      />
      <label htmlFor="country">country:</label>
      <input
        onChange={props.handleChange}
        id="country"
        type="country"
        name="country"
        value={props.country}
      />
      <button>submit</button>
    </div>
  );
};

export default SignUpForm;
