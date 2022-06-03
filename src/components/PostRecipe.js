import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from 'react-grid-system';

const inputStyles = {
    padding: "10px",
    boxShadow: "0px 0px 0px",
    outline: "10px",
    borderRadius: "15px",
    width: "70%",
    margin: "20px 0",
    borderColor: "rgba(194, 55, 74, 0.61)"
};


function PostRecipe({ handlePost, category, handlePostCategories }) {

    const history = useHistory();

    // for category tags
    const [categoryData, setCategoryData] = useState([])
    // for ingredients
    const [addInputs, setAddInputs] = useState([""]);
    // for instructions
    const [addSteps, setAddSteps] = useState([""]);
    // for other info
    const [formData, setFormData] = useState({
        name: "",
        image_url: ""
    });
    // for creating new categories
    const [newCategory, setNewCategory] = useState({name: ""})



    // add input fields for ingredients 
    function handleInputs() {
        setAddInputs([...addInputs, ""]);
    }

    // remove input fields for ingredients
    function handleRemoveInputs(index) {
        const list = [...addInputs];
        list.splice(index, 1);
        setAddInputs(list);
    }

    // get input data for ingredients
    function handleInputData(e, index) {
        const {name, value} = e.target;
        const list = [...addInputs];
        list[index] = value;
        console.log(list);
        setAddInputs(list);
    }

    //add input fields for instructions
    function handleSteps() {
        setAddSteps([...addSteps, ""]);
    }

    // remove input fields for instructions
    function handleRemoveSteps(index) {
        const list = [...addSteps];
        list.splice(index, 1);
        setAddSteps(list);
    }

    // get input data for instructions
    function handleStepData(e, index) {
        const {name, value} = e.target;
        const list = [...addSteps];
        list[index] = value;
        console.log(list);
        setAddSteps(list);
    }

    // get input data for name, image_url etc.
    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    function handleCategory(e) {
        const {name, value} = e.target;
        console.log(e.target.id)
        console.log(name, value);
        const newId = parseInt(value, 10);
        const cIndex = category.findIndex(item => item.id === newId);
        let tmpObj = {id: newId, name: category[cIndex].name};
        setCategoryData([...categoryData, tmpObj]);
    }

    function handleRemoveCategory(index) {
        const list = [...categoryData];
        list.splice(index, 1);
        setCategoryData(list);
    }


    // POST request to server
    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:9292/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                ingredients: addInputs,
                instructions: addSteps,
                image_url: formData.image_url,
                tags: categoryData
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            handlePost(data);
            history.push(`/recipes/${data.id}`);
        });
    }

    function handleCreateCategories(e) {
        const { name, value } = e.target;
        setNewCategory({...newCategory, [name]: value})
    }

    function fetchNewCategory(e) {
        e.preventDefault();
        fetch("http://localhost:9292/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json'
            },
            body: JSON.stringify(newCategory)
        })
        .then(res => res.json())
        .then(data => handlePostCategories(data));
        setNewCategory({name: ""});
    }


  return (
      <Container>
        <Row className="title-box">
            <Col>
                <h1 className="recipe-title">What's your favorite recipe?</h1>
            </Col>
            <Col>
            <form onSubmit={fetchNewCategory} className="new-category">
                    <label className="label-size l-color">want a new category?</label>
                    <input style={inputStyles} type="text" name="name" value={newCategory.name} onChange={handleCreateCategories} />
                    <input className="addButton c-button" type="submit" value="add" />
            </form>
            </Col>
        </Row>
        
        <form onSubmit={handleSubmit}>
        <Row>
        <Col lg={6}>
        <label className="label-size">Recipe Name: </label>
                <br></br>
         <input  style={inputStyles} onChange={handleChange} type="text" name="name" value={formData.name} />
                <br></br>

                <label className="label-size">Categories: </label>
                <select className="dropdown" onChange={handleCategory} name="categories" >
                    <option  defaultValue>select a category</option>
                        {category.map(c => {
                            return <option key={c.id} value={c.id}>{c.name}</option>
                        })}
                </select>
                {categoryData.name === undefined ? categoryData.map((c, index) => {
                    return (
                            <div key={index}>
                            <input style={inputStyles} type="text" name="categories" value={c.name} onChange={handleCategory} />
                            {/* {categoryData.length -1 === index && (<button  onClick={handleCategoryNum} type="button"> + </button>)} */}
                            {categoryData.length > 1 && (<button className="deleteButton" onClick={() => handleRemoveCategory(index)} type="button"> X </button>)}
                            </div>
                            )
                }) : null}

      


                <br></br>  
        <label className="label-size">Image URL: </label>
                <br></br>
        <input style={inputStyles} onChange={handleChange} type="text" name="image_url" value={formData.image_url} />
                 <br></br>
        <label className="label-size">Ingredients: </label>
        <div>
                {addInputs.map((ta, index) => {
                                return (
                                    <div key={index}>
                                        <input style={inputStyles} onChange={(e)=> handleInputData(e,index)} type="text" name="ingredients" value={ta.addInputs}  /> 
                                        {addInputs.length -1 === index &&  (<button  className="addButton ingredients" onClick={handleInputs} type="button"> more ingredients </button>)}
                                        {addInputs.length > 1 && (<button className="deleteButton" onClick={() => handleRemoveInputs(index)} type="button"> X </button>)}
                                    </div>)})} 
        </div>
        </Col>
        <Col lg={6}>
        <label className="label-size">Instructions: </label>
        <div>
                {addSteps.map((step, index) => {
                                return (
                                    <div key={index}>
                                        <textarea className="form-box"  onChange={(e)=> handleStepData(e,index)} type="text" name="ingredients" value={step.addSteps}  rows="5" cols="50" /> 
                                        {addSteps.length -1 === index &&  (<button  className="addButton ta-button" onClick={handleSteps} type="button"> more steps </button>)}
                                        {addSteps.length > 1 && (<button className="deleteButton ta-deletebutton" onClick={() => handleRemoveSteps(index)} type="button"> X </button>)}
                                    </div>)})} 
        </div>

        <input className="submitButton"  type="submit" value="Submit" />
    
        </Col>
        </Row>
        </form> 
        
        
        
      </Container>
    
  )
}

export default PostRecipe