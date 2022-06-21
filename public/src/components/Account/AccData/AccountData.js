import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import config from "../../../config/config";

//components
import Input from "../../Form/Input";
import SubmitButton from "../../Form/SubmitButton";

//styles
import "../../../styles/account/details/acc_data_form.css";

import no_avatar from "../../../assets/images/no_avatar.png";
import { handleUpload } from "../../../services/upload/upload";

const AccountData = ({
    initUserData,
    userData,
    error,
    setError,
    editing,
    setUserData,
    updateInfoMsg,
    setUpdateInfoMsg,
    fileImg,
    setFileImg
}) => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        //clear errors
        setError(initUserData);

        const options = {
            headers: { "Content-Type": "application/json" },
        };
        try {

            const res = await axios.post(`${config.api.auth}`, userData, options);
            if (res.status === 201) {
                setUpdateInfoMsg('Your account is created. Please check your email to verify your account');
                setTimeout(() => {
                    return navigate("/login");
                }, 3000)
            }
        } catch (error) {
            if (error.response.status === 500) {
                return setError({ ...error, server: "Server error, Try again later" });
            }
            setError(error.response.data);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        let imgUrl = '';

        //clear errors
        setError(initUserData);
        //check for image
        if (fileImg) {
            imgUrl = await handleUpload(fileImg);
            userData.image = imgUrl;
        };

        const options = {
            headers: { "Content-Type": "application/json" },
        };

        try {
            const res = await axios.patch(
                `${config.api.auth}/update`,
                userData,
                options
            );
            if (res.status === 204) {
                setUserData({ ...userData, password: "", repeat_password: "" });
                setUpdateInfoMsg("Update success !");
                setTimeout(() => {
                    setUpdateInfoMsg("");
                    window.location.reload();
                }, 1000);
               
            }
        } catch (error) {
            if (error.response.status === 500) {
                return setError({ ...error, server: "Server error, Try again later" });
            }
            setError(error.response.data);
        }
    };

    return (<>
        <form
            className="acc-data-form"
            onSubmit={editing ? handleUpdate : handleSubmit}
        >
            {editing && (
                <div className="avatar-wrapper">
                    <img src={fileImg ? URL.createObjectURL(fileImg) : userData.image ? userData.image : no_avatar} />


                    <label htmlFor="avatar">change avatar</label>
                    <input id="avatar" type="file" onChange={(e) => { setFileImg(e.target.files[0]) }} />
                </div>
            )}
            <div className="acc-data-wrapper">
                <div className="account-data-row">
                    <Input
                        label="first name"
                        input_type="text"
                        id="first_name"
                        name="first_name"
                        placeholder="first name"
                        data={userData}
                        error={error}
                        setData={setUserData}
                        className="register"
                    />
                    <Input
                        label="last name"
                        input_type="text"
                        id="last_name"
                        name="last_name"
                        placeholder="last_name"
                        data={userData}
                        error={error}
                        setData={setUserData}
                        className="register"
                    />

                </div>

                <div className="account-data-row">
                    <Input
                        label="email"
                        input_type="email"
                        id="email"
                        name="email"
                        placeholder="email"
                        data={userData}
                        error={error}
                        setData={setUserData}
                        className="register"
                    />
                    <Input
                        label="birthday"
                        input_type="date"
                        id="date"
                        name="birthday"
                        placeholder="birthday"
                        data={userData}
                        error={error}
                        setData={setUserData}
                        className="register"
                    />
                </div>

                <div className="account-data-row">
                    <Input
                        label="password"
                        input_type="password"
                        id="password"
                        name="password"
                        placeholder="password"
                        data={userData}
                        error={error}
                        setData={setUserData}
                        className="register"
                    />
                    <Input
                        label="repeat password"
                        input_type="password"
                        id="repeat_password"
                        name="repeat_password"
                        placeholder="repeat_password"
                        data={userData}
                        error={error}
                        setData={setUserData}
                        className="register"
                    />
                </div>
                <SubmitButton type='submit' button_text={editing ? "save" : "create account"} />
                <p className="error-msg">{error.server && error.server}</p>
                <p className="update-info-msg">{updateInfoMsg}</p>
            </div>
        </form>

    </>
    );
};

AccountData.propTypes = {
    initUserData: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    setError: PropTypes.func.isRequired,
    editing: PropTypes.bool.isRequired,

};

export default AccountData;
