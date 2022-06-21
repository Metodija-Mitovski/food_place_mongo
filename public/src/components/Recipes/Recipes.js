import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import config from "../../config/config"

//components
import RecipeCard from "./RecipeCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import Loader from "../Loader/Loader";


//styles
import "../../styles/recipes/recipes.css";

const Recipes = ({ section_title, url }) => {
    const [fetching, setFetching] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const [infoMessage, setInfoMessage] = useState("No recipes in this category");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalId, setModalId] = useState("");
    const [like, setLike] = useState(false);
    const app = document.getElementById('app');
   

    const openModal = (id) => {
        setIsModalOpen(true);
        setModalId(id);
        app.classList.add('modal-open');
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalId("");
        app.classList.remove('modal-open');
    };

    const fetchRecipes = async () => {
        try {
            const res = await axios.get(url);
            setRecipes(res.data);
            setFetching(false);
        } catch (error) {
            setFetching(false);
            setInfoMessage("Something went wrong, Please try again...")
        }
    };

    const updateLike = async (e,recipe_id) => {
        e.stopPropagation()
        try {
            await axios.patch(`${config.api.recipes}/rating/${recipe_id}`)
            setLike(!like)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchRecipes();
      }, [url, like]);

    return (
        <section id="recipes">
            <SectionTitle section_title={section_title} />
            <main className="recipes-main">
                {fetching ? (
                    <Loader />
                ) : recipes.length > 0 ? (
                    recipes.map((recipe) => {
                     
                        return <RecipeCard key={recipe._id} recipe={recipe} isModalOpen={isModalOpen} modalId={modalId}
                            openModal={openModal} closeModal={closeModal}
                            updateLike={updateLike}
                        />;
                    })
                ) : (
                    <h1 className="info-msg">{infoMessage}</h1>
                )}
            </main>
        </section>
    );
};

Recipes.propTypes = {
    section_title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export default Recipes;
