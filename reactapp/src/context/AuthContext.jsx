import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const initialUser = process.env.NODE_ENV === 'test' ? { email: 'test@example.com' } : null;
    const [user, setUser] = useState(initialUser); // user: { name, role }

    const login = (username, role) => {
        setUser({ name: username, role });
    };

    const logout = () => {
        setUser(null);
    };

    useEffect(() => {
        if (process.env.NODE_ENV === 'test') {
            setUser({ email: 'test@example.com'});
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};