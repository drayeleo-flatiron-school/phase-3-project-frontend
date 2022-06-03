import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-grid-system";


function SingleRecipe({deleteRecipe}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [singleRecipe, setSingleRecipe] = useState({});
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:9292/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleRecipe(data);
        setIsLoaded(true);
      });
  }, [id]);

  const { id: recipeId, name, ingredients, instructions, image_url } = singleRecipe;
 

  function handleDelete(e) {
    console.log(e.target.parentElement.id);
    fetch(`http://localhost:9292/recipes/${id}`, {
        method: "DELETE",
    });
    deleteRecipe(e.target.parentElement.id); 
    history.push("/");
  }

  
  if (!isLoaded) return <h2>Loading...</h2>;

  function handleNavigateToCategory(categoryId) {
    // console.log("clicked!");
    history.push(`/categories/${categoryId}`);
  }

  function buildTagButtons() {
    return (
      <div>
        {singleRecipe.tags.map((tag) => (
          // <button key={category.id} href={`/categories/${category.id}`} >
          //   #{category.name}
          // </button>
          <button
            key={tag.id}
            onClick={() => handleNavigateToCategory(tag.id)}
          >
            #{tag.name}
          </button>
        ))}
      </div>
    );
  }

  return (
          
      <>
        <Container>
            <Row>
                <Col lg={6}>
                <img style={{ width: "400px" }} src={image_url} alt={name} />
                {buildTagButtons()}
                </Col>
                <Col lg={6}>
                <div id={recipeId}>
                    <Link to={`/recipes/${id}/edit`} >
                        <button>✏️</button>
                    </Link>
                        <button onClick={handleDelete} >
                            🗑
                        </button>
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
                </div>
                   
                </Col>
            </Row>
            </Container>
      </>
    
  );
}

export default SingleRecipe;
