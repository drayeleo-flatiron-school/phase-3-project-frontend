import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";

function CategorySearchResults() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipeData, setRecipeData] = useState([]);
  const { id } = useParams();

  // fetch recipe data
  useEffect(() => {
    fetch(`http://localhost:9292/categories/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipeData(data.recipes);
        setIsLoaded(true);
      });
  }, []);

  if (!isLoaded) return <h2>Loading...</h2>;
  // console.log(recipeData);

  function generateCards() {
    // console.log("generateCards");
    return recipeData.map((recipe) => {
      return <RecipeCard key={recipe.id} recipe={recipe} />;
    });
  }

  // return JSX
  return <div>{generateCards()}</div>;
  // return null;
}

export default CategorySearchResults;
