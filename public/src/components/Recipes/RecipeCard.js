import PropTypes from "prop-types";

//components
import CardIcons from "./CardIcons";
import RecipeModal from "./RecipeModal";


//styles
import "../../styles/recipes/recipe_card.css";

const RecipeCard = ({ recipe, isModalOpen, modalId, openModal, closeModal, updateLike }) => {

    return (
        <>
            {modalId === recipe._id && <RecipeModal closeModal={closeModal} recipe={recipe} updateLike={updateLike} isModalOpen={isModalOpen} />}
            
            <div id="recipe-card" onClick={() => openModal(recipe._id)}>
                <div className="card-img-wrapper">
                    <img src={recipe.image} alt="" />
                    <span>{recipe.category}</span>
                </div>
                <div className="card-details-wrapper">
                    <h2>{recipe.title}</h2>
                    <p>{recipe.short_desc}</p>
                    <div className="card-icons-wrapper">
                        <CardIcons recipeData={recipe} card={true} updateLike={updateLike} />
                    </div>
                </div>
            </div>
        </>

    );
};


RecipeCard.propTypes = {
    recipe: PropTypes.object.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    modalId: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default RecipeCard;
