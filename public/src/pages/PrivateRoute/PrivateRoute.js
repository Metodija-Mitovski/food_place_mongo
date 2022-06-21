import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../services/authContext/authContext";
import Loader from "../../components/Loader/Loader";

const PrivateRoute = ({ children }) => {
    const { loggedIn, pending } = useAuthContext();

    return pending ? (
        <div style={{ minHeight: '577px' }}>
            <Loader />
        </div>
    ) : loggedIn ? (
        children
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;
