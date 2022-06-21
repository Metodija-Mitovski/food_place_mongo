import PropTypes from 'prop-types';

//styles
import '../../styles/section_title/section_title.css';

//icons
import icon_back from "../../assets/icons/icon_back_white.svg"
import icon_plus from "../../assets/icons/icon_plus_white.svg"

const SectionTitle = ({ section_title, toggleInterface, my_recipes, display_table }) => {
    return (
        <div id="section-title">
            <h1 className="title">{section_title}</h1>
            <div className="underline"></div>
            {my_recipes && <button onClick={toggleInterface}>
                <img src={display_table ? icon_plus : icon_back} />
            </button>}

        </div>
    );
};

SectionTitle.propTypes = {
    section_title: PropTypes.string.isRequired,
    toggleInterface:PropTypes.func,
    my_recipes:PropTypes.bool,
    display_table:PropTypes.bool
};

export default SectionTitle;
