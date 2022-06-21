import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../config/config";

//components
import SectionTitle from "../../SectionTitle/SectionTitle";
import MyRecipesTable from "./MyRecipesTable";
import CreateEditRecipe from "./CreateEditRecipe";
import DeleteModal from "./DeleteModal";


//styles
import "../../../styles/recipes/my-recipes/my-recipes-main.css";

const MyRecipesMain = () => {
    const [recipes, setRecipes] = useState([]);
    const [fetching, setFetching] = useState(true)
    const [deleteRecipe, setDeleteRecipe] = useState(false)
    const [infoMessage, setInfoMessage] = useState("Your recipe list is empty")
    const [display_table, setDisplayTable] = useState(true)
    const [single_recipe, setSingleRecipe] = useState(undefined)
    const [isOpen, setIsOpen] = useState(false)
    const [recipe_id, setRecipeId] = useState(undefined)

    const getMyRecipes = async () => {
        try {
            const res = await axios.get(`${config.api.recipes}/me`);
            if (res.status === 200) {
                setRecipes(res.data);
                setFetching(false)
            }
        } catch (error) {
            console.log(error);
            setFetching(false);
            setInfoMessage("Oop's something went wrong, please try again...");
        };
    };

    const handleDelete = async () => {

        try {
            const res = await axios.delete(`${config.api.recipes}/${recipe_id}`);
            if (res.status === 204) {
                setDeleteRecipe(!deleteRecipe)
            };
        } catch (error) {
            console.log(error);
        };
    };

    const toggleInterface = () => {
        setDisplayTable(!display_table);
    };

    const goToUpdate = (recipe) => {
        setDisplayTable(false);
        setSingleRecipe(recipe);
    };

    const openModal = (e, id) => {
        e.stopPropagation();
        setIsOpen(true);
        setRecipeId(id);
    };
    const closeModal = () => {
        setIsOpen(false);
        setRecipeId(undefined);
    };


    useEffect(() => {
        getMyRecipes();
    }, [deleteRecipe, display_table]);

    return (
        <section id="my-recipes">
            <DeleteModal isOpen={isOpen} closeModal={closeModal} handleDelete={handleDelete} />
            <SectionTitle section_title="my recipes" my_recipes={true} toggleInterface={toggleInterface} display_table={display_table} />
            <main className="my-recipes-main">
                {display_table ? <MyRecipesTable recipes={recipes} handleDelete={handleDelete} fetching={fetching} openModal={openModal}
                    goToUpdate={goToUpdate} infoMessage={infoMessage} /> : <CreateEditRecipe single_recipe={single_recipe} setSingleRecipe={setSingleRecipe} />}
            </main>
        </section>
    );
};

export default MyRecipesMain;
