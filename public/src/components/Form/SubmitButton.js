import PropTypes from "prop-types";

//styles
import "../../styles/form_elements/submit_button.css";

const SubmitButton = ({ button_text }) => {
  return <button className="submit-btn">{button_text}</button>;
};

SubmitButton.propTypes = {
  button_text: PropTypes.string.isRequired,
};

export default SubmitButton;
