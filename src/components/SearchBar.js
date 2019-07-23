import React from "react";

const SearchBar = props => {
  return (
    <div className="search-bar">
      <input name="searchTerm" type="text" onChange={props.handleSearch} />
      <button onClick={props.submitSearch}>Submit</button>
    </div>
  );
};

export default SearchBar;
