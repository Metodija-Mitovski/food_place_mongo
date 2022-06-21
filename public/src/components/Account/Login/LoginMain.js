import { useState } from "react";
import axios from "axios";
import config from "../../../config/config";

//components
import SectionTitle from "../../SectionTitle/SectionTitle";
import Input from "../../Form/Input";
import SubmitButton from "../../Form/SubmitButton";

//styles
import "../../../styles/account/login/login_main.css";

const LoginMain = () => {

    const initUserData = {
        email: "",
        password: "",
    };
    const [userData, setUserData] = useState(initUserData);
    const [error, setError] = useState({...initUserData,auth:'',server:''});

    const handleLogin = async (e) => {
        e.preventDefault();

        //clear errors
        setError(initUserData);

        try {
            const options = {
                headers: { "Content-Type": "application/json" },
            };

            const res = await axios.post(
                `${config.api.auth}/login`,
                userData,
                options
            );
            if (res.status === 200) {
                return (window.location.href = "/profile/me");
            }
        } catch (error) {
            if (error.response.status === 500) {
                return setError({ ...error, server: "Server error, Try again later" });
            }
            
            setError(error.response.data);
        }
    };

  

    return (
        <section className="login-section">
            <SectionTitle section_title="log in" />
            <main className="login-main">
                <div className="login-main-left">
                    <h1>
                        Welcome to <span>Baby's</span>{" "}
                    </h1>
                    <p>
                        All the Lorem Ipsum generators on the Internet tend to repeat
                        predefined chunks as necessary, making this the first true generator
                        on the Internet. It uses a dictionary of over 200 Latin words,
                        combined with a handful of model sentence structures, to generate
                        Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is
                        therefore always free from repetition, injected humour, or
                        non-characteristic words etc.
                    </p>
                </div>
                <div className="login-main-right">
                    <form className="login-form" onSubmit={handleLogin}>
                        <Input
                            label="email"
                            input_type="email"
                            id="email"
                            placeholder="email"
                            name="email"
                            data={userData}
                            setData={setUserData}
                            error={error}
                            className="register"
                        />
                        <Input
                            label="password"
                            input_type="password"
                            id="password"
                            placeholder="password"
                            name="password"
                            data={userData}
                            setData={setUserData}
                            error={error}
                            className="register"
                           
                        />
                        <SubmitButton button_text="log in" />
                        <p className="error-msg">{error.server && error.server}</p>
                        <p className="error-msg">{error.auth ? error.auth.message : ''}</p>
                    </form>
                </div>
            </main>
        </section>
    );
};

export default LoginMain;
