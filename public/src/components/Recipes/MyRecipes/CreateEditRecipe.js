import { useState, useEffect } from "react";
import no_image from "../../../assets/no.svg";
import axios from "axios";
import config from "../../../config/config";
import PropTypes from "prop-types";
import { handleUpload } from "../../../services/upload/upload";
//components
import Input from "../../Form/Input";
import Select from "../../Form/Select";
import TextArea from "../../Form/TextArea";
import SubmitButton from "../../Form/SubmitButton";

//styles
import "../../../styles/recipes/my-recipes/create_edit_recipe.css"

const CreateEditRecipe = ({ single_recipe, setSingleRecipe }) => {
    const initRecipeData = {
        title: "",
        category: "",
        preparation_time: "",
        no_people: "",
        short_desc: "",
        description: "",
    }
    const [recipeData, setRecipeData] = useState(single_recipe ? single_recipe : initRecipeData);
    const [fileImg, setFileImg] = useState("");
    const [error, setError] = useState({});
    const [updateInfoMsg, setUpdateInfoMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({});
        let imgUrl = '';
        try {
            if (fileImg) {
                imgUrl = await handleUpload(fileImg);
                recipeData.image = imgUrl;
            }
            const options = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            if (single_recipe) {
                const res = await axios.patch(`${config.api.recipes}/${single_recipe._id}`, recipeData, options);
                setUpdateInfoMsg("Success !")
            }
            if (!single_recipe) {
                const res = await axios.post(`${config.api.recipes}`, recipeData, options);
                setRecipeData(initRecipeData);
                setUpdateInfoMsg("Success !");

            }
            setTimeout(() => {
                setUpdateInfoMsg("");
            }, 3000);

        } catch (error) {
            if (error.response) {
                return setError(error.response.data);
            };
            console.log(error);
        };
    };



    useEffect(() => {
        return () => {
            setSingleRecipe(undefined);
        };
    }, []);
    return <form className="recipe-form" onSubmit={handleSubmit}>


        <div className="recipe-form-left">
            <label>recipe image</label>
            <div className="recipe-img-wrapper" >
                <img src={single_recipe && !fileImg ? single_recipe.image : fileImg ? URL.createObjectURL(fileImg) : no_image} alt="" />
            </div>
            <label htmlFor="upload-recipe-img">upload image</label>
            <input type="file" id="upload-recipe-img" onChange={(e) => {
                setFileImg(e.target.files[0]);
            }} />

            {error.image && <p className="error-msg">{error.image.message}</p>}
        </div>
        <div className="recipe-form-middle">
            <Input data={recipeData} setData={setRecipeData} error={error} placeholder="Title" label="recipe title" input_type="text" className="recipe-title" name="title" id="title" />

            <div className="category-wrapper">
                <Select label="category" className="category-select" name="category" data={recipeData} setData={setRecipeData} error={error} />
                <Input data={recipeData} setData={setRecipeData} error={error} placeholder="preparation_time" label="preparation time" input_type="number" className="number" name="preparation_time" id="prep_time" />
                <Input data={recipeData} setData={setRecipeData} error={error} placeholder="no_people" label="no. people" input_type="number" className="number" name="no_people" id="no_people" />
            </div>

            <TextArea label="short description"
                placeholder="Short description" class_name="text-area-middle"
                id="short_desc" name="short_desc"
                data={recipeData} setData={setRecipeData}
                error={error} />
            <SubmitButton button_text="save" />
            <p className="update-info-msg">{updateInfoMsg}</p>
        </div>
        <div className="recipe-form-right">
            <TextArea label="recipe" placeholder="Recipe" class_name="text-area-right" id="description"
                name="description" data={recipeData}
                setData={setRecipeData}
                error={error} />
        </div>


    </form>
}

CreateEditRecipe.propTypes = {
    single_recipe: PropTypes.object,
    setSingleRecipe: PropTypes.func.isRequired
}

export default CreateEditRecipe