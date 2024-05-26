import { createContext, useEffect, useState } from "react";

const authContext = createContext({
    isAuthenticated: '',
    login: () => { },
    logout: () => { },
});

// export function authContextProvider({ children }) {
export const AuthContextProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <authContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </authContext.Provider>
    );
}

export default authContext;