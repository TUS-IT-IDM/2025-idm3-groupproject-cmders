import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../service/AuthService.jsx';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkSession = () => {
        setLoading(true);
        AuthService.getSession()
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(() => {
                setUser(null);
                setLoading(false);
            });
    };

    useEffect(() => {
        checkSession();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, checkSession }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}
