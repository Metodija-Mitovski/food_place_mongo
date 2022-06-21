import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../../services/authContext/authContext";

//components
import SectionTitle from "../../SectionTitle/SectionTitle";
import AccountData from "../AccData/AccountData";

//styles
import "../../../styles/account/register/register.css";

const AccountMain = () => {
    const location = useLocation();
    const [editing, setEditing] = useState(false);
    const { user } = useAuthContext();

    let initUserData = {
        first_name: "",
        last_name: "",
        email: "",
        birthday: "",
        password: "",
        repeat_password: "",
    };

    const [userData, setUserData] = useState(
        user ? { ...user, password: "", repeat_password: "" } : initUserData
    );
    const [fileImg,setFileImg] = useState("");
    const [error, setError] = useState(initUserData);
    const [updateInfoMsg,setUpdateInfoMsg] = useState("");

    const userDataUpdate = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value.trim() });
    };

    useEffect(() => {
        if (location.pathname === "/profile/me") {
            setEditing(true);
        }
    }, [editing]);

    return (
        <section className="create-acc-section">
            <SectionTitle section_title={editing ? "my profile" : "create account"} />
            <main>
                {!editing && location.pathname === "/create-account" && (
                    <div className="create-acc-main-left">
                        <h1>
                            Create your <br /> <span>account</span>{" "}
                        </h1>
                        <p>
                            All the Lorem Ipsum generators on the Internet tend to repeat
                            predefined chunks as necessary, making this the first true
                            generator on the Internet. It uses a dictionary of over 200 Latin
                            words, combined with a handful of model sentence structures, to
                            generate Lorem Ipsum which looks reasonable.
                        </p>
                    </div>
                )}

                <div className="create-acc-main-right">
                    <AccountData
                        initUserData={initUserData}
                        userData={userData}
                        error={error}
                        setError={setError}
                        editing={editing}
                        userDataUpdate={userDataUpdate}
                        setUserData={setUserData}
                        updateInfoMsg={updateInfoMsg}
                        setUpdateInfoMsg={setUpdateInfoMsg}
                        fileImg={fileImg}
                        setFileImg={setFileImg}
                    />
                </div>
            </main>
        </section>
    );
};

export default AccountMain;


