import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import config from "../../../config/config"

//components
import Loader from "../../Loader/Loader"

//styles
import "../../../styles/account/verify/verify-account.css"

const VerifyAccountMain = () => {
    const { id } = useParams()
    const [message, setMessage] = useState('')
    const [fetching, setFetching] = useState(true)

    const verify = async () => {
        try {
            const res = await axios.patch(`${config.api.auth}/verify/${id}`)
            if (res.status === 204) {
                setMessage("Your account is verified. You can login now!")
            }
            if (res.status === 200) {
                setMessage("Confirmation link expired. We sent you new email. Please check your email")
            }
            setFetching(false)
        } catch (error) {
            console.log(error)
            setMessage('Something went wrong please try again!')
            setFetching(false)

        }
    }

    useEffect(() => {
        verify()
    }, [])

    return <div id="verify-account">
        <div className="verify-title-wrapper">
            <h1>Welcome To Baby's Food Place</h1>
            {fetching && <h2>Verifying your account, Please Wait...</h2>}
        </div>
        {!fetching ? <div className="verify-msg-wrapper">
            <h3>{message}</h3>
            <Link to="/login" className="to-login">Go to Login</Link>
        </div> : <Loader />}
    </div>
}

export default VerifyAccountMain