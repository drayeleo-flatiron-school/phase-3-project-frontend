function HighlightCard({ recipe }) {
  // console.log("recipe: ", recipe);
  return (
    <div className={"item"}>
      <h1>{recipe.name}</h1>
      <img
        style={{ height: "400px" }}
        src={recipe.image_url}
        alt={recipe.name}
      />
    </div>
  );
}

export default HighlightCard;
