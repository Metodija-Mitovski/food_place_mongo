import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Category from "./pages/Category/Category";
import Profile from "./pages/Profile/Profile";
import MyRecipes from "./pages/MyRecipes/MyRecipes";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
import VerifyAccount from "./pages/VerifyAccount/VerifyAccount";
import NotFound from "./pages/NotFound/NotFound";

function App() {
    return (
        <div id="app">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create-account" element={<Register />} />
                    <Route
                        path="/profile/me"
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/recipes/:category" element={<Category />} />
                    <Route path="/my-recipes" element={<PrivateRoute>
                        <MyRecipes />
                    </PrivateRoute>} />
                    <Route path="/account/verify/:id" element={<VerifyAccount/>}/>
                    <Route path="*" element={<NotFound />} />
                </Routes>
               </Router>
        </div>
    );
}

export default App;
