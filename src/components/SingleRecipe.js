import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-grid-system";

function SingleRecipe() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [singleRecipe, setSingleRecipe] = useState({});
  const { id } = useParams();

  // console.log(id);

  useEffect(() => {
    fetch(`http://localhost:9292/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleRecipe(data);
        setIsLoaded(true);
      });
  }, [id]);

  const { name, ingredients, instructions, image_url } = singleRecipe;
  console.log(singleRecipe);

  if (!isLoaded) return <h2>Loading...</h2>;

  function buildTagButtons() {
    return (
      <div>
        {singleRecipe.categories.map((category) => (
          <button key={category.id}>#{category.name}</button>
        ))}
      </div>
    );
  }

  return (
    <Container>
      <Row>
        <Col lg={6}>
          <img style={{ width: "400px" }} src={image_url} alt={name} />
          {buildTagButtons()}
        </Col>
        <Col lg={6}>
          <h1>{name}</h1>
          <h3>Ingredients</h3>
          <ul>
            {JSON.parse(ingredients).map((i, index) => {
              return <li key={index}>{i}</li>;
            })}
          </ul>
          <h3>Instructions</h3>
          <ol className="steps">
            {JSON.parse(instructions).map((i, index) => {
              return <li key={index}>{i}</li>;
            })}
          </ol>
        </Col>
      </Row>
    </Container>
  );
}

export default SingleRecipe;
