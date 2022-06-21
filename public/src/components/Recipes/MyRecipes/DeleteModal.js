import ReactDOM from "react-dom"
import PropTypes from "prop-types"

//styles
import "../../../styles/delete-modal/delete_modal.css"

//icons
import {AiFillCheckCircle,AiOutlineCloseCircle} from "react-icons/ai"

const DeleteModal = ({isOpen,closeModal,handleDelete})=>{
    if (!isOpen) return null
    return ReactDOM.createPortal(
        <>
        <div className="delete-modal-overlay"></div>
        <div className="delete-modal-wrapper">
            <button onClick={async()=>{
               await handleDelete()
               closeModal()
            }}>
                <AiFillCheckCircle className="delete-modal-icon delete-confirm"/>
            </button>
            <button onClick={closeModal}>
                <AiOutlineCloseCircle className="delete-modal-icon delete-cancel"/>
            </button>
        </div>
        
        </>,
        document.getElementById("delete-modal")
    )
}

DeleteModal.propTypes = {
    isOpen:PropTypes.bool.isRequired,
    closeModal:PropTypes.func.isRequired,
    handleDelete:PropTypes.func.isRequired
}

export default DeleteModal