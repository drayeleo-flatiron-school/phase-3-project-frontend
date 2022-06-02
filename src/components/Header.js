import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

function Header({ handleFoodSearch }) {
  // function handleFoodSearch(searchPhrase) {
  //   console.log("ran handleFoodSearch. searchPhrase: ", searchPhrase);
  // }

  return (
    <div>
      Header
      <NavBar />
      <SearchBar handleFoodSearch={handleFoodSearch} />
    </div>
  );
}

export default Header;
