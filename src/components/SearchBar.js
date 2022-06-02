import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SearchBar({ handleFoodSearch }) {
  const [search, setSearch] = useState("");
  const history = useHistory();

  function handleSearchInput(event) {
    // console.log(event.target.value);
    setSearch(event.target.value);
  }

  function handleSubmitSearch(search) {
    const searchString = search; //.split(" ").join("+");
    history.push(`/search/${searchString}`);
    handleFoodSearch(search); //delete? If I can delete handleFoodSearch from App. Will also mean deleteing prop passing in app and header
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
