import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../service/AuthService.jsx';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AuthService.getSession()
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                if (window.location.pathname !== "/login" && window.location.pathname !== "/signup" && window.location.pathname !== "/") {
                    window.location.href = "/login";
                }
            });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}
