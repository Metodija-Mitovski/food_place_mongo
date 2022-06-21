import PropTypes from "prop-types"
//styles
import "../../styles/form_elements/select_element.css"

const Select = ({ label, name, error, data, setData, className }) => {
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value.trim() });
    };

    return <div>
        <label>{label}</label>
        <select className={className} name={name} onChange={handleChange}>
            <option value="" >select category</option>
            <option value="breakfast" >breakfast</option>
            <option value="brunch">brunch</option>
            <option value="lunch">lunch</option>
            <option value="dinner">dinner</option>
        </select>
        <p className="error-msg">{error[name] && error[name].message}</p>
    </div>
}
Select.propTypes = {
    label: PropTypes.string,
    name:PropTypes.string,
    error:PropTypes.object,
    data:PropTypes.object,
    setData:PropTypes.func,
    className:PropTypes.string
}

export default Select