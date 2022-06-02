import React, { useState, useEffect } from 'react'
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


function EditRecipe({category, handlePatch}) {

    const [ingredientsInput, setIngredientsInput] = useState([]);
    const [instructionsInput, setInstructionsInput] = useState([]);
    const [editItem, setEditItem] = useState({
        // category_id: "",
        name: "",
        // ingredients: ingredientsInput,
        // instructions: instructionsInput,
        image_url: "",
    });

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:9292/recipes/${id}`)
        .then(res => res.json())
        .then(data => {
            setEditItem({name:data.name,
            image_url:data.image_url})
            
        
            
            setIngredientsInput(JSON.parse(data.ingredients));
            setInstructionsInput(JSON.parse(data.instructions));
        })
    }, [id]);

    function handleChange(e) {
        const {name, value} = e.target;
        setEditItem({...editItem, [name]: value});
    };

    function handleIngredients(e, index) {
        const {name, value} = e.target;
        console.log(name, value, index)
        const tmp = [...ingredientsInput];
            tmp[index] = value;
        setIngredientsInput(tmp);
    }

    function handleInstructions(e, index) {
        const {name, value} = e.target;
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
                Accept: 'application/json'
            },
            body: JSON.stringify({
                // category_id: editItem.category_id,
                name: editItem.name,
                ingredients: ingredientsInput,
                instructions: instructionsInput,
                image_url: editItem.image_url
            })
        })
        .then(res => res.json())
        .then(data => {
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


  return (
    <form onSubmit={handleSubmit} >
        <h3>Edit your recipe!</h3>
        {/* <select onChange={handleChange} name="category_id" value={editItem.category_id}>
        <option  defaultValue>select a category</option>
            {category.map(c => {
                return <option key={c.id} value={c.id}>{c.name}</option>
            })}
        </select> */}
            <br></br>
        <label>Recipe Name: </label>
        <input style={inputStyles} type="text" name="name" value={editItem.name} onChange={handleChange} />
            <br></br>
        <label>Ingredients: </label>
             {ingredientsInput.map((i, index) => {
                return (
                    <div key={index}>
                        <input  style={inputStyles} name="ingredients" value={i} onChange={(e) => handleIngredients(e, index)} />
                        {ingredientsInput.length -1 === index && (<button  onClick={handleInputs} type="button"> + </button>)}
                        {ingredientsInput.length > 1 && (<button onClick={() => handleRemoveInputs(index)} type="button"> X </button>)}
                    </div>
                )
                })}
            <br></br>
        <label>Instructions: </label>
            {instructionsInput.map((i, index) => {
                return (
                    <div key={index}>
                        <textarea style={textareaStyles} name="instructions" value={i} onChange={(e) => handleInstructions(e, index)} />
                        {instructionsInput.length -1 === index && (<button  onClick={handleTextArea} type="button"> + </button>)}
                        {instructionsInput.length > 1 && (<button onClick={() => handleRemoveTextarea(index)} type="button"> X </button>)}
                    </div>
                )
            })}
            <br></br>
        <label>Image URL: </label>
        <input style={inputStyles} type="text" name="image_url" value={editItem.image_url} onChange={handleChange} />
            <br></br>
        <input type="submit" value="update" />
    </form>
  )
}

export default EditRecipe