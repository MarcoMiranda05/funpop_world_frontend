import React from "react";
import FunkoWishlist from "../components/FunkoWishlist";

const FunkosWishlistContainer = props => {
  return (
    <div className="funko-collection">
      <h1 className="search-result">my wishlist</h1>
      {props.wishlist.map(wishlist => {
        return (
          <FunkoWishlist
            key={wishlist.id}
            wishlist={wishlist}
            selectWishFunko={props.selectWishFunko}
          />
        );
      })}
    </div>
  );
};

export default FunkosWishlistContainer;
