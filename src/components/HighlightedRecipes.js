import React, { useState, useEffect } from "react";
// import Test from "./Test";
// import SearchBar from "./SearchBar";
// import HighlightCard from "./HighlightCard";
import RecipeCard from "./RecipeCard";

function HighlightedRecipes() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipeData, setRecipeData] = useState([]);

  // fetch recipe data
  useEffect(() => {
    fetch("http://localhost:9292/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipeData(data);
        setIsLoaded(true);
      });
  }, []);

  if (!isLoaded) return <h2>Loading...</h2>;

  // assign random recipes to be displayed
  // const randomNum = Math.floor(Math.random() * recipeData.length);

  const displayArray = [];
  while (displayArray.length < 4) {
    let rand = Math.floor(Math.random() * recipeData.length);
    if (displayArray.indexOf(rand) === -1) displayArray.push(rand);
    // console.log("displayArray:", displayArray);
  }
  console.log(displayArray);
  console.log(recipeData);

  function generateHighlights() {
    // console.log("generateHighlights");
    return displayArray.map((index) => {
      // console.log(index, recipeData);
      // return <HighlightCard key={index} recipe={recipeData[index]} />;
      return <RecipeCard key={index} recipe={recipeData[index]} />;
    });
  }

  // return JSX
  return (
    <div>
      <div className="highlights-section">{generateHighlights()}</div>
    </div>
  );
}

export default HighlightedRecipes;
