import PropTypes from "prop-types";

//components
import Loader from "../../Loader/Loader";
import DeleteModal from "./DeleteModal";

//styles
import "../../../styles/recipes/my-recipes/my-recepies-table.css";

//icons
import trashcan from "../../../assets/icons/icon_trashcan.svg";

const MyRecipesTable = ({ recipes, handleDelete, fetching, infoMessage, goToUpdate, openModal }) => {
    return (
        <>
            {fetching ? <Loader /> : recipes.length > 0 ? <>

                <table id="my-recepies-table" cellSpacing="0">

                    <thead>
                        <tr>
                            <th>recipe name</th>
                            <th>category</th>
                            <th>created on</th>
                            <th>delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {recipes.length > 0 &&
                            recipes.map((recipe) => {
                                const date = new Date(recipe.createdAt);
                              
                                return (
                                    <tr key={recipe._id} onClick={() => { goToUpdate(recipe) }}>

                                        <td className="table-recipe-name">{recipe.title}</td>
                                        <td className="table-recipe-category">
                                            <span>{recipe.category}</span>
                                        </td>
                                        <td className="table-recipe-date">{`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}</td>
                                        <td className="table-recipe-delete">

                                            <button onClick={(e) => { openModal(e, recipe._id) }}>
                                                <img src={trashcan} />
                                            </button>

                                        </td>

                                    </tr>
                                );
                            })}
                    </tbody>
                </table></> : <h1 className="info-msg">{infoMessage}</h1>}
        </>
    )
};

MyRecipesTable.propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleDelete: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    infoMessage: PropTypes.string,
    goToUpdate: PropTypes.func.isRequired
};

export default MyRecipesTable;
