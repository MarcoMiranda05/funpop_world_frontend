import React from "react";

const SearchBar = props => {
  return (
    <div>
      <form className="search-bar" onSubmit={props.submitSearch}>
        <input name="searchTerm" type="text" onChange={props.handleChange} />
        <button value="submit">
          <img src="https://image.flaticon.com/icons/png/512/14/14968.png" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
