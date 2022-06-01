import React from "react";

function SearchBar({handleFoodSearch}) {
  
  return <div className= "searchbar">
           <label htmlFor="search">Search Recipes or Ingredients</label>
           <input 
            type="text" 
            id="search" 
            placeholder="Type an ingredient or recipe to search..."
            onChange={handleFoodSearch}
            />
         </div> 
}

export default SearchBar;
