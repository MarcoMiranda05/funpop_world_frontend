import React from "react";
import FunkoCard from "../components/FunkoCard";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const FunkosCardContainer = props => {
  return (
    <div className="funko-collection">
      {props.funkos.map(funko => {
        return (
          <FunkoCard
            key={funko.id}
            funko={funko}
            selectFunko={props.selectFunko}
          />
        );
      })}
    </div>
  );
};

export default FunkosCardContainer;
