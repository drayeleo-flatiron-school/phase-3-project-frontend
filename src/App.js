import React from "react";
import Header from "./components/Header";
import HighlightedRecipes from "./components/HighlightedRecipes";

function App() {
  return (
    <div>
      <Header />
      <HighlightedRecipes />
    </div>
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
