import React, { useState, useEffect, useContext } from 'react';
import config from '../../config/config';
import axios from 'axios';

const AuthenticationContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const [loggedIn, setLoggedIn] = useState(false);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        axios
            .get(`${config.api.auth}`)
            .then((res) => {
                setUser(res.data);
                setLoggedIn(true);
                setPending(false);
            })
            .catch((err) => {
                setPending(false);
            });
    }, []);

    return (
        <AuthenticationContext.Provider value={{ loggedIn, pending, user, setLoggedIn, setUser }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthenticationContext);
};
