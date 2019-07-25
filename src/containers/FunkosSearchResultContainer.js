import React from "react";
import FunkoCard from "../components/FunkoCard";

const FunkosSearchResultContainer = props => {
  return (
    <div className="funko-collection">
      <h1 className="search-result">
        {props.funkos.length} funkos match your search
      </h1>
      {props.funkos.map(funko => {
        return (
          <FunkoCard
            key={funko.id}
            funko={funko}
            handleSelect={props.handleSelect}
          />
        );
      })}
    </div>
  );
};

export default FunkosSearchResultContainer;
