import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import HighlightedRecipes from "./components/HighlightedRecipes";
import SingleRecipe from "./components/SingleRecipe";
import "./App.css";
import SearchResults from "./components/SearchResults";
import AllRecipes from "./components/AllRecipes";
import CategorySearchResults from "./components/CategorySearchResults";
import EditRecipe from "./components/EditRecipe";
import PostRecipe from "./components/PostRecipe";

function App() {
  const [category, setCategoty] = useState([]);
  const [recipeData, setRecipeData] = useState([]);


  useEffect(() => {
    fetch("http://localhost:9292/categories")
    .then(res => res.json())
    .then(data => setCategoty(data))
  }, []);

  useEffect(() => {
    fetch("http://localhost:9292/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipeData(data);
      });
  }, []);

  function handleFoodSearch(search) {
    console.log("ran handleFoodSearch. searchPhrase: ", search);
  }

  function handlePost(data) {
    console.log(data);
  }
  
  function deleteRecipe(id) {
    const deleteId = parseInt(id, 10);
    console.log(deleteId);
    // add a delete function
    const newData = recipeData.filter(recipe => recipe.id !== deleteId);
    console.log(newData);
    setRecipeData(newData);
  }


  function handlePatch(data) {
    const newData = recipeData.map(recipe => {
      if(recipe.id === data.id) {
        return data;
      } else {
        return recipe;
      }
    })
    setRecipeData(newData);
  }

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <HighlightedRecipes />
        </Route>
        <Route exact path="/recipes">
          <AllRecipes />
        </Route>
        <Route exact path="/recipes/:id">
          {/* <SingleRecipe recipeData={filteredSearch} /> */}
          <SingleRecipe deleteRecipe={deleteRecipe} />
        </Route>
        <Route exact path="/categories/:id">
          <CategorySearchResults />
        </Route>
        <Route exact path="/search/:searchPhrase">
          <SearchResults />
        </Route>
        <Route exact path="/recipes/:id/edit" >
          <EditRecipe category={category} handlePatch={handlePatch} />
        </Route>
        <Route exact path="/post">
          <PostRecipe handlePost={handlePost} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

/*
Component File:

index.js
  App
    Header
      SearchBar    
    HighlightedRecipes
      RecipeCard
    AllRecipes
      RecipeCard
    SearchResults
      RecipeCard
    CategorySearchResults
      RecipeCard
    SingleRecipe
*/

// Template App.js file:

// import logo from "./logo.svg";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
