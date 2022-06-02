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
      <label htmlFor="search">Search Recipes or Ingredients</label>
      <input
        type="text"
        id="search"
        placeholder="Type a recipe to search..."
        value={search}
        onChange={handleSearchInput}
      />
      <button onClick={() => handleSubmitSearch(search)}>Search</button>
    </div>
  );
}

export default SearchBar;
