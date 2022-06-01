import React, { useState, useEffect } from 'react'

function Test() {
    const [recipeData, setRecipeData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/recipes")
    .then(res => res.json())
    .then(data => setRecipeData(data))
  }, []);


  const recipeDetail = recipeData.map(r => {
      console.log(JSON.parse(r.ingredients));
      console.log(JSON.parse(r.instructions));
      return (
          <div keu={r.id}>
              <p>{r.name}</p>
          <p>{JSON.parse(r.ingredients)}</p>
          <p>{JSON.parse(r.instructions)}</p>
          </div>
      )
  })




  return (
    <div>{recipeDetail}</div>
  )
}

export default Test