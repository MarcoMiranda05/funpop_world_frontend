import React from "react";
import FunkoWishlist from "../components/FunkoWishlist";

const FunkosWishlistContainer = props => {
  return (
    <div className="funko-collection">
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
