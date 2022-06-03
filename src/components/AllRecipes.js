import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

function AllRecipes() {
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
  console.log(recipeData);

  function generateCards() {
    // console.log("generateCards");
    return recipeData.map((recipe) => {
      return <RecipeCard key={recipe.id} recipe={recipe} />;
    });
  }

  // return JSX
  return (
    <div className="main-container">
      <div className="results-container">{generateCards()}</div>
    </div>
  );
}

export default AllRecipes;
