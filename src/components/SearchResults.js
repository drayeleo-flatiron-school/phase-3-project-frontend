import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

function SearchResults() {
  const { searchPhrase } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  // console.log(searchPhrase);

  useEffect(() => {
    fetch(`http://localhost:9292/recipes/search/${searchPhrase}`) //currently only works with single-word search?
      .then((response) => response.json())
      .then((data) => setSearchResults(data));
  }, [searchPhrase]);

  return (
    <div>
      <h2>Search results for "{searchPhrase}":</h2>
      <div className="results-container">
        {searchResults.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
