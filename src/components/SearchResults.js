import SearchResult from "./SearchResult";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function SearchResults() {
  const { searchPhrase } = useParams();

  console.log(searchPhrase);

  useEffect(() => {
    fetch("http://localhost:9292/recipes") //add: /search/<searchPhrase>
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div>
      <h2>Search Results for {searchPhrase} </h2>
      <SearchResult />
    </div>
  );
}

export default SearchResults;
