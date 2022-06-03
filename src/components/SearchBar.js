import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SearchBar() {
  const [search, setSearch] = useState("");
  const history = useHistory();

  function handleSearchInput(event) {
    // console.log(event.target.value);
    setSearch(event.target.value);
  }

  function handleSubmitSearch(search) {
    const searchString = search; //.split(" ").join("+");
    history.push(`/search/${searchString}`);
  }

  return (
    <div className="searchbar">
      {/* <label htmlFor="search">Search Recipes or Ingredients</label> */}
      <input
        type="text"
        id="search"
        placeholder="Search recipes by name..."
        value={search}
        onChange={handleSearchInput}
        className="search-input"
      />
      <button
        className="search-button"
        onClick={() => handleSubmitSearch(search)}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
