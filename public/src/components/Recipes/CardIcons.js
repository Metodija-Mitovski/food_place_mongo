import PropTypes from "prop-types"
import { useAuthContext } from "../../services/authContext/authContext"
// icons
import time from "../../assets/icons/icon_time.svg"
import plate from "../../assets/icons/icon_plate.svg"
import star from "../../assets/icons/icon_star.svg"
import arrows_white from "../../assets/icons/icon_arrows_white.svg"
import { AiFillStar } from 'react-icons/ai'


const CardIcons = ({ recipeData, card, updateLike }) => {
    const {user} = useAuthContext();

    
    return (
        <>
            <div className="card-icons-left">
                <img src={time} alt="" className="icon-left" />
                <span>{recipeData.preparation_time}</span>
                <img src={plate} alt="" className="icon-left" />
                <span>{recipeData.no_people}</span>
                {user && recipeData.likes.users.includes(user._id ) ? <AiFillStar className='icon-liked'
                    onClick={(e) => { updateLike(e, recipeData._id) }} />
                
                :   <img src={star} alt="" className="icon-left like-img" onClick={(e) => { updateLike(e, recipeData._id) }} />}
              
                
                <span>{recipeData.likes.like_count}</span>
            </div>
            <div className="card-icons-right">
                {card && <button>
                    <img src={arrows_white} alt="" className="icon-right" />
                </button>}
            </div>
        </>
    );
};

CardIcons.propTypes = {
    recipeData: PropTypes.object.isRequired,
    card: PropTypes.bool,
    updateLike: PropTypes.func.isRequired
}
export default CardIcons;
