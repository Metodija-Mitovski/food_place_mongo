import PropTypes from "prop-types"
//styles
import "../../styles/form_elements/text-area.css"

const TextArea = ({ label, placeholder, class_name, id, name, error, data, setData }) => {

    const handleChage = (e)=>{
       setData({...data,[e.target.name]:e.target.value});
    };
    
    return <>
        <label htmlFor={id}>{label}</label>
        <textarea id={id} name={name} className={class_name} placeholder={placeholder} onChange={handleChage} value={data[name]}></textarea>
        <p className="error-msg">{error[name] && error[name].message}</p>
    </>
}

TextArea.propTypes = {
    label: PropTypes.string,
    placeholder:PropTypes.string,
    class_name:PropTypes.string,
    id:PropTypes.string,
    name:PropTypes.string,
    error:PropTypes.object,
    data:PropTypes.object.isRequired,
    setData:PropTypes.func.isRequired
}

export default TextArea