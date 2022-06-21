import { Link } from "react-router-dom"

//styles
import "../../styles/not_found/not_found.css"

const NotFound = () => {
    return (
        <div id="not-found">
            <h1>Page Not Found</h1>
            <Link className='to-home' to='/'>Home</Link>
        </div>
    )
}

export default NotFound