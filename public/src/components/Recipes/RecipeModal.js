import ReactDOM from "react-dom"
import PropTypes from "prop-types"

// components
import CardIcons from "./CardIcons";

//styles
import "../../styles/recipes/recipe_modal.css";

//icons
import close from "../../assets/icons/icon_close.svg"


const RecipeModal = ({ isModalOpen, closeModal, recipe, updateLike }) => {
    if (!isModalOpen) return null
    return ReactDOM.createPortal(
        <div className='recipe-portal-overlay'>
            <main id="recipe-modal">
                <div className="modal-top">
                    <h1>{recipe.title}</h1>
                    <button onClick={closeModal}>
                        <img src={close} alt="" className="modal-close-icon" />
                    </button>
                </div>
                <div className="modal-content-wrapper">
                    <div className="modal-content-left">
                        <img src={recipe.image} alt="recipe image" className="recipe-img" />
                        <div className="best-served-for">
                            <h3>best served for</h3>
                            <span>{recipe.category}</span>
                        </div>
                        <p>
                            {recipe.short_desc}
                        </p>
                        <CardIcons recipeData={recipe} card={false} updateLike={updateLike} />
                    </div>
                    <div className="modal-content-right">
                        <h3>recipe details</h3>
                        <p>
                            {recipe.description}
                        </p>
                    </div>
                </div>
            </main>

        </div>,
        document.getElementById('recipe-portal')
    );
};

RecipeModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    recipe: PropTypes.object.isRequired,
    updateLike: PropTypes.func.isRequired
}
export default RecipeModal;
