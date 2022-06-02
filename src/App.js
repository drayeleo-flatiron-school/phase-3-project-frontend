import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import HighlightedRecipes from "./components/HighlightedRecipes";
import SingleRecipe from "./components/SingleRecipe";
import "./App.css";
import SearchResults from "./components/SearchResults";
import RecipeCards from './components/RecipeCards';

function App() {
  function handleFoodSearch(search) {
    console.log("ran handleFoodSearch. searchPhrase: ", search);
  }

  return (
    <Router>
      <Header handleFoodSearch={handleFoodSearch} />
      <Switch>
        <Route exact path="/">
          <HighlightedRecipes />
        </Route>
        <Route exact path="/recipes" >
            <RecipeCards />
        </Route>
        <Route exact path="/recipes/:id">
          {/* <SingleRecipe recipeData={filteredSearch} /> */}
          <SingleRecipe />
        </Route>
        <Route exact path="/search/:searchPhrase">
          <SearchResults />
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
    NavBar
    SearchBar
  
  HighlightedRecipes
  OR
  SearchResults
    SearchResult

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
