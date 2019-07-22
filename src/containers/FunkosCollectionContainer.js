import React from "react";
import FunkoCollection from "../components/FunkoCollection";

const FunkosCollectionContainer = props => {
  return (
    <div className="funko-collection">
      {props.collection.map(collection => {
        return (
          <FunkoCollection
            key={collection.id}
            funko={collection.funko}
            selectFunko={props.selectFunko}
          />
        );
      })}
    </div>
  );
};

export default FunkosCollectionContainer;
