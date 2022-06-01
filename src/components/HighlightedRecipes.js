import React, { useState, useEffect } from 'react';
import Test from "./Test";

function HighlightedRecipes() {
  const [recipeData, setRecipeData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/recipes")
    .then(res => res.json())
    .then(data => setRecipeData(data))
  }, []);

  const randomNum = Math.floor(Math.random() * recipeData.length);
  



  return (
    <div>
      {recipeData.length > 0 ? <img style={{ "height": "400px" }} src={recipeData[randomNum].image_url} alt={recipeData[randomNum].name} /> : null}
      {/* <Test /> */}
    </div>
  );
}

export default HighlightedRecipes;
