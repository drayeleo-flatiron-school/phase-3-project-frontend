import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const inputStyles = {
  padding: "10px",
  boxShadow: "0px 0px 0px",
  outline: "10px",
  borderRadius: "15px",
  width: "30%",
  margin: "20px 0",
};
const textareaStyles = {
  padding: "10px",
  boxShadow: "0px 0px 0px",
  outline: "10px",
  borderRadius: "15px",
  width: "80%",
  margin: "20px 0",
};

function EditRecipe({ category, handlePatch, handlePostCategories }) {
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [ingredientsInput, setIngredientsInput] = useState([]);
  const [instructionsInput, setInstructionsInput] = useState([]);
  const [categoryData, setCategoryData] = useState([
    {
      id: "",
      name: "",
    },
  ]);
  const [editItem, setEditItem] = useState({
    // category_id: "",
    name: "",
    // ingredients: ingredientsInput,
    // instructions: instructionsInput,
    image_url: "",
  });

  const { id } = useParams();
  const history = useHistory();

  console.log(categoryData);

  useEffect(() => {
    fetch(`http://localhost:9292/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEditItem({ name: data.name, image_url: data.image_url });
        setCategoryData(data.tags);
        setIngredientsInput(JSON.parse(data.ingredients));
        setInstructionsInput(JSON.parse(data.instructions));
      });
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setEditItem({ ...editItem, [name]: value });
  }

  function handleIngredients(e, index) {
    const { name, value } = e.target;
    console.log(name, value, index);
    const tmp = [...ingredientsInput];
    tmp[index] = value;
    setIngredientsInput(tmp);
  }

  function handleInstructions(e, index) {
    const { name, value } = e.target;
    console.log(name, value);
    const tmp = [...instructionsInput];
    tmp[index] = value;
    setInstructionsInput(tmp);
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`http://localhost:9292/recipes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        // category_id: editItem.category_id,
        name: editItem.name,
        ingredients: ingredientsInput,
        instructions: instructionsInput,
        image_url: editItem.image_url,
        tags: categoryData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        handlePatch(data);
        history.push(`/recipes/${data.id}`);
      });
  }

  // add input fields for ingredients
  function handleInputs() {
    setIngredientsInput([...ingredientsInput, ""]);
  }
  // remove input fields for ingredients
  function handleRemoveInputs(index) {
    const list = [...ingredientsInput];
    list.splice(index, 1);
    setIngredientsInput(list);
  }

  // add textarea for instructions
  function handleTextArea() {
    setInstructionsInput([...instructionsInput, ""]);
  }

  // remove textarea for instructions
  function handleRemoveTextarea(index) {
    const list = [...instructionsInput];
    list.splice(index, 1);
    setInstructionsInput(list);
  }

  function handleCategory(e) {
    const { name, value } = e.target;
    console.log(e.target.id);
    console.log(name, value);
    const newId = parseInt(value, 10);
    const cIndex = category.findIndex((item) => item.id === newId);
    let tmpObj = { id: newId, name: category[cIndex].name };
    setCategoryData([...categoryData, tmpObj]);
  }

  // function handleAddCategory() {
  //     setCategoryData([...categoryData, {id: "", name: ""}])
  // }

  function handleRemoveCategory(index) {
    const list = [...categoryData];
    list.splice(index, 1);
    setCategoryData(list);
  }

  function handleCreateCategories(e) {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  }

  function fetchNewCategory(e) {
    e.preventDefault();
    fetch("http://localhost:9292/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newCategory),
    })
      .then((res) => res.json())
      .then((data) => handlePostCategories(data));
    setNewCategory({ name: "" });
  }

  return (
    <div id="edit-page-container">
      <form onSubmit={fetchNewCategory}>
        <div className="edit-page-group">
          <h5>Add a new category option:</h5>
          <div>
            <input
              style={inputStyles}
              type="text"
              name="name"
              value={newCategory.name}
              onChange={handleCreateCategories}
            />
            <input
              style={{
                height: "30px",
                ["box-shadow"]: "0px 0px 0px",
                outline: "10px",
                ["border-radius"]: "5px",
                margin: "10px",
              }}
              type="submit"
              value="add"
            />
          </div>
        </div>
      </form>

      <form onSubmit={handleSubmit}>
        <h3>Edit your recipe!</h3>

        <div className="edit-page-group">
          <h5>Tags: </h5>
          <div>
            {categoryData.map((c, index) => {
              return (
                <div key={index}>
                  <input
                    style={inputStyles}
                    type="text"
                    name="categories"
                    value={c.name}
                    onChange={handleCategory}
                  />
                  {/* {categoryData.length -1 === index && (<button  onClick={handleCategoryNum} type="button"> + </button>)} */}
                  {categoryData.length > 1 && (
                    <button
                      className="edit-page-delete-button"
                      onClick={() => handleRemoveCategory(index)}
                      type="button"
                    >
                      {" "}
                      X{" "}
                    </button>
                  )}
                </div>
              );
            })}
            <select
              style={{ width: "30%" }}
              onChange={handleCategory}
              name="categories"
            >
              <option defaultValue>Select additional category...</option>
              {category.map((c) => {
                return (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* <div className="edit-page-group">
          <h5></h5>
          <select
            style={{ width: "30%" }}
            onChange={handleCategory}
            name="categories"
          >
            <option defaultValue>Select additional category...</option>
            {category.map((c) => {
              return (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              );
            })}
          </select>
        </div> */}

        {/* <br></br> */}
        <div className="edit-page-group">
          <h5>Recipe Name: </h5>
          <input
            style={inputStyles}
            type="text"
            name="name"
            value={editItem.name}
            onChange={handleChange}
          />
        </div>

        {/* <br></br> */}
        <div className="edit-page-group">
          <h5>Ingredients: </h5>
          <div>
            {ingredientsInput.map((i, index) => {
              return (
                <div key={index}>
                  <input
                    style={inputStyles}
                    name="ingredients"
                    value={i}
                    onChange={(e) => handleIngredients(e, index)}
                  />

                  {ingredientsInput.length > 1 && (
                    <button
                      className="edit-page-delete-button"
                      onClick={() => handleRemoveInputs(index)}
                      type="button"
                    >
                      {" "}
                      X{" "}
                    </button>
                  )}
                  {/* {ingredientsInput.length - 1 === index && (
                    <button onClick={handleInputs} type="button">
                      {" "}
                      Add New{" "}
                    </button>
                  )} */}
                </div>
              );
            })}
            <button onClick={handleInputs} type="button">
              {" "}
              Add New Ingredient{" "}
            </button>
          </div>
        </div>

        {/* <br></br> */}
        <div className="edit-page-group">
          <h5>Instructions: </h5>
          <div>
            {instructionsInput.map((i, index) => {
              return (
                <div key={index}>
                  <textarea
                    style={textareaStyles}
                    name="instructions"
                    value={i}
                    onChange={(e) => handleInstructions(e, index)}
                  />
                  {/* {instructionsInput.length - 1 === index && (
                    <button onClick={handleTextArea} type="button">
                      {" "}
                      +{" "}
                    </button>
                  )} */}
                  {instructionsInput.length > 1 && (
                    <button
                      className="edit-page-delete-button"
                      onClick={() => handleRemoveTextarea(index)}
                      type="button"
                    >
                      {" "}
                      X{" "}
                    </button>
                  )}
                </div>
              );
            })}
            <button onClick={handleTextArea} type="button">
              {" "}
              Add New Step{" "}
            </button>
          </div>
        </div>

        {/* <br></br> */}
        <div className="edit-page-group">
          <h5>Image URL: </h5>
          <input
            style={inputStyles}
            type="text"
            name="image_url"
            value={editItem.image_url}
            onChange={handleChange}
          />
        </div>

        {/* <br></br> */}
        <input type="submit" value="update" />
      </form>
    </div>
  );
}

export default EditRecipe;
