import React from "react";
import FunkoCard from "../components/FunkoCard";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const FunkosCardContainer = props => {
  return (
    <div className="funko-collection">
      <label className="sort">
        <select onChange={props.handleSort}>
          <option value="newest">newest</option>
          <option value="oldest">oldest</option>
          <option value="name">name(a-z) </option>
          <option value="name_back">name(z-a)</option>
        </select>
        <strong>
          <img src="https://image.flaticon.com/icons/svg/31/31063.svg" />
        </strong>
      </label>
      {props.funkos.map(funko => {
        return (
          <FunkoCard
            key={funko.id}
            funko={funko}
            selectFunko={props.selectFunko}
            handleSelect={props.handleSelect}
          />
        );
      })}
    </div>
  );
};

export default FunkosCardContainer;
