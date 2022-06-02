import React from "react";
import { Card, Button } from "react-bootstrap";

function RecipeCard({ recipe }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={recipe.image_url} />
      <Card.Body>
        <Card.Title>{recipe.name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">View Recipe</Button>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
