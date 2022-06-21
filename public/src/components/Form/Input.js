import PropTypes from "prop-types";

//styles
import "../../styles/form_elements/form_input.css";

const Input = ({
    label,
    input_type,
    id,
    placeholder,
    name,
    error,
    data,
    setData,
    className
}) => {
    const handleChange = (e) => {
        let key_value = e.target.value;
        if (e.target.name === "preparation_time" || e.target.value === "no_people") {
            key_value = parseInt(key_value)
        }
       setData({ ...data, [e.target.name]: key_value });
    };
    
    return (
        <div className={!className ? `input-wrapper` : `input-wrapper ${className}`}>
            <label htmlFor={id}>{label}</label>
            <input
                className={className}
                type={input_type}
                id={id}
                value={data[name]}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
            />
            <p className="error-msg">{error[name] && error[name].message}</p>
        </div>
    );
};

Input.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    input_type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    setData: PropTypes.func.isRequired
};
export default Input;
