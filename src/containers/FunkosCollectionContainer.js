import React from "react";
import FunkoCollection from "../components/FunkoCollection";

const FunkosCollectionContainer = props => {
  return (
    <div className="funko-collection">
      <h1 className="search-result">my collection</h1>
      {props.collection.map(collection => {
        return (
          <FunkoCollection
            key={collection.id}
            collection={collection}
            selectCollectFunko={props.selectCollectFunko}
          />
        );
      })}
    </div>
  );
};

export default FunkosCollectionContainer;
